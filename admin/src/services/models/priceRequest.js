import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import store from 'redux/store';
import { db } from 'services';
import { dateformat, showMessage } from 'utils';
import CloudStorage from './cloudStorage';
import { Role } from '../enums';
import Product from './product';
import History from './history';

export default class PriceRequest {
  static path = 'price_requests';
  static ref = collection(db, this.path);

  constructor(data) {
    /** @type {string} */
    this.id = data.id;
    /** @type {string} */
    this.product_id = data.product_id;
    /** @type {string} */
    this.vendor_id = data.vendor_id;
    /** @type {number} */
    this.price_requested = data.price_requested;
    /** @type {string} */
    this.created_at = data.created_at;
    /** @type {string} */
    this.type = data.type;
    /** @type {boolean} */
    this.from_management = data.from_management;
  }

  static getPriceRequests = async () =>
    (await getDocs(this.ref)).docs.map(
      (doc) =>
        new PriceRequest({
          ...doc.data(),
          id: doc.id,
          created_at: dateformat(doc.data().created_at),
        })
    );

  static watchPriceRequests = (notiCb, dataCb, vendors, categories, type) => {
    const q = query(
      this.ref,
      where('type', '==', type),
      orderBy('created_at', 'desc')
    );
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const {
        noti: { prrInitial },
      } = store.getState();

      snapshot.docChanges().forEach((change) => {
        if (!prrInitial) {
          if (change.type === 'added') {
            showMessage('New Price Request');
            console.log(change.doc.data());
          }
          if (change.type === 'modified') {
            console.log('Modified: ', change.doc.data());
          }
          if (change.type === 'removed') {
            showMessage('Price Request Deleted');
          }
        }
      });

      if (prrInitial) {
        notiCb();
      }

      const result = await Promise.all([
        ...snapshot.docs
          // .sort((a, b) => b.data().created_at - a.data().created_at)
          .map(async (doc) => {
            const vendor_name = vendors.filter(
              (vendor) => vendor.id === doc.data().vendor_id
            )[0]?.name;

            const product = await Product.getProductById(doc.data().product_id);

            const image = await CloudStorage.getProductImageUrl(product.image);

            const category_name = categories.filter(
              (c) => c.id === product.category_id
            )[0]?.name;

            const newPrr = new PriceRequest({
              ...doc.data(),
              id: doc.id,
              created_at: dateformat(doc.data().created_at),
            });
            return {
              ...newPrr,
              vendor_name,
              product,
              image,
              category_name,
            };
          }),
      ]);

      dataCb(result);
    });
    return unsubscribe;
  };

  static moveToProduct = (prr, record) =>
    new Promise(async (resolve, reject) => {
      try {
        await runTransaction(db, async (transaction) => {
          const prrRef = doc(db, this.path, prr.id);
          const productRef = doc(db, Product.path, prr.product_id);
          const historyRef = doc(History.ref);

          const productDoc = await transaction.get(productRef);
          if (!productDoc.exists()) {
            throw 'Product does not exist!';
          }

          const newPriceHistory = [
            ...productDoc.data().price_history,
            {
              price_confirmed: prr.price_requested,
              created_at: Timestamp.now(),
            },
          ];

          transaction.update(productRef, {
            price: prr.price_requested,
            price_history: newPriceHistory,
          });
          transaction.set(historyRef, record);
          transaction.delete(prrRef);
        });
        resolve();
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });

  static rejectRequest = (prr, record) =>
    new Promise(async (resolve, reject) => {
      try {
        await runTransaction(db, async (transaction) => {
          const prrRef = doc(db, this.path, prr.id);
          const historyRef = doc(History.ref);

          transaction.set(historyRef, record);
          transaction.delete(prrRef);
        });
        resolve();
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  /**
   * @param {string} id PriceRequest ID
   * @param {Role} type Role Type
   */
  static requestToOtherRole = async (id, type) =>
    await updateDoc(doc(db, this.path, id), { type });

  static managementApprove = async (id) =>
    await updateDoc(doc(db, this.path, id), {
      from_management: true,
      type: Role.admin,
    });
}
