import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  orderBy,
  where,
  runTransaction,
} from 'firebase/firestore';
import { db } from 'services';
import { dateformat } from 'utils';
import History from './history';
import Trash from './trash';

export default class Product {
  static path = 'products';
  static ref = collection(db, this.path);

  constructor(data) {
    this.id = data.id;
    this.category_id = data.category_id;
    this.image = data.image;
    this.management_status = data.management_status;
    this.ir = data.ir;
    this.name = data.name;
    this.original_barcode = data.original_barcode;
    this.price = data.price;
    this.price_history = data.price_history;
    this.specification = data.specification;
    this.srp_price = data.srp_price;
    this.vendor_guarantee = data.vendor_guarantee;
    this.vendor_id = data.vendor_id;
    this.warehouse_info = data.warehouse_info;
    this.created_at = data.created_at;
  }

  static createProduct = async (data) => await addDoc(this.ref, data);

  static getProducts = async () => {
    const q = query(this.ref, orderBy('created_at', 'desc'));
    return (await getDocs(q)).docs.map(
      (doc) =>
        new Product({
          ...doc.data(),
          id: doc.id,
          created_at: dateformat(doc.data().created_at),
        })
    );
  };

  static getProductById = async (id) => {
    const docSnapshot = await getDoc(doc(db, this.path, id));
    if (docSnapshot.empty) {
      throw Error('Product not found');
    }

    return new Product({
      ...docSnapshot.data(),
      id: docSnapshot.id,
      created_at: dateformat(docSnapshot.data().created_at),
    });
  };

  static deleteProduct = async (id) => {
    await deleteDoc(doc(db, this.path, id));
  };

  static updateProduct = async (id, data) =>
    await updateDoc(doc(db, this.path, id), data);

  static getProductsByBarcode = async (barcode) => {
    const q = query(this.ref, where('original_barcode', '==', barcode));
    return (await getDocs(q)).docs.map(
      (doc) =>
        new Product({
          ...doc.data(),
          id: doc.id,
          created_at: dateformat(doc.data().created_at),
        })
    );
  };

  static moveToTrash = async (id, product, record) => {
    try {
      await runTransaction(db, async (transaction) => {
        const productRef = doc(db, this.path, id);
        const trashRef = doc(Trash.ref);
        const historyRef = doc(History.ref);

        transaction.set(trashRef, product);
        transaction.set(historyRef, {
          ...record,
          trash_id: trashRef.id,
        });
        transaction.delete(productRef);
      });
    } catch (error) {
      console.log(error);
    }
  };

  static productsExistByVendorId = async (vendor_id) =>
    !(await getDocs(query(this.ref, where('vendor_id', '==', vendor_id))))
      .empty;

  static productsExistByCategoryId = async (category_id) =>
    !(await getDocs(query(this.ref, where('category_id', '==', category_id))))
      .empty;
}
