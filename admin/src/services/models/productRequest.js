import {
  collection,
  deleteDoc,
  doc,
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
import { dateformat, showMessage } from 'utils/index';
import CloudStorage from './cloudStorage';
import { Role, UserActionEnum } from '../enums';
import History from './history';
import Product from './product';
import Trash from './trash';
class MetaProduct {
  constructor(data) {
    /** @type {string} */
    this.name = data.name;
    /** @type {number} */
    this.price = data.price;
    /** @type {string} */
    this.specification = data.specification;
    /** @type {number} */
    this.srp_price = data.srp_price;
    /** @type {string} */
    this.vendor_guarantee = data.vendor_guarantee;
    /** @type {string} */
    this.original_barcode = data.original_barcode;
    /** @type {string} */
    this.warehouse_info = data.warehouse_info;
    /** @type {string} */
    this.image = data.image;
  }
}

export default class ProductRequest {
  static path = 'product_requests';
  static ref = collection(db, this.path);

  constructor(data) {
    this.id = data.id;
    /** @type {MetaProduct} */
    this.product = data.product;
    this.created_at = data.created_at;
    this.type = data.type;
    this.vendor_id = data.vendor_id;
    this.from_management = data.from_management;
  }

  static watchProductRequests = (
    notiCb,
    dataCb,
    vendors,
    type,
    nullifyUserAction
  ) => {
    const q = query(
      this.ref,
      where('type', '==', type),
      orderBy('created_at', 'desc')
    );
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const {
        noti: { pdrInitial },
        pdr: { userActionOnPdr },
      } = store.getState();

      snapshot.docChanges().forEach((change) => {
        if (!pdrInitial) {
          if (change.type === 'added') {
            showMessage('New Product Request');
          }
          if (change.type === 'removed') {
            if (userActionOnPdr === null) {
              return;
            } else if (userActionOnPdr === UserActionEnum.report) {
              showMessage('Product reported to Management Dept');
            } else if (userActionOnPdr === UserActionEnum.approve) {
              showMessage(
                'Product Request approved. You can find in Products Menu'
              );
            } else {
              showMessage(
                'Product Request rejected. You can find in Reports Menu'
              );
            }
            nullifyUserAction();
          }
        }
      });

      if (pdrInitial) {
        notiCb();
      }

      const result = await Promise.all([
        ...snapshot.docs
          // .sort((a, b) => b.data().created_at - a.data().created_at)
          .map(async (doc) => {
            const vendor_name = vendors.filter(
              (vendor) => vendor.id === doc.data().vendor_id
            )[0]?.name;

            const image = await CloudStorage.getProductImageUrl(
              doc.data().product.image
            );

            const newProduct = new MetaProduct({
              ...doc.data().product,
            });

            const newPdr = new ProductRequest({
              ...doc.data(),
              product: newProduct,
              id: doc.id,
              created_at: dateformat(doc.data().created_at),
            });
            return { ...newPdr, image, vendor_name };
          }),
      ]);

      dataCb(result);
    });
    return unsubscribe;
  };

  static deleteProductRequest = async (id) =>
    await deleteDoc(doc(db, this.path, id));

  static moveToProduct = async (id, product, record) => {
    try {
      await runTransaction(db, async (transaction) => {
        const pdrRef = doc(db, this.path, id);
        const productRef = doc(Product.ref);
        const historyRef = doc(History.ref);

        transaction.set(productRef, product);
        transaction.set(historyRef, {
          ...record,
          product_id: productRef.id,
        });
        transaction.delete(pdrRef);
      });
    } catch (error) {
      console.log(error);
    }
  };

  static moveToTrash = async (id, product, record) => {
    try {
      await runTransaction(db, async (transaction) => {
        const pdrRef = doc(db, this.path, id);
        const trashRef = doc(Trash.ref);
        const historyRef = doc(History.ref);

        transaction.set(trashRef, product);
        transaction.set(historyRef, {
          ...record,
          trash_id: trashRef.id,
        });
        transaction.delete(pdrRef);
      });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * @param {string} id ProductRequest ID
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
