import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  runTransaction,
} from 'firebase/firestore';
import { db } from 'services';
import { dateformat } from 'utils';
import History from './history';

export default class Trash {
  static path = 'trashs';
  static ref = collection(db, this.path);
  constructor(data) {
    this.id = data.id;
    this.image = data.image;
    this.name = data.name;
    this.original_barcode = data.original_barcode;
    this.price = data.price;
    this.specification = data.specification;
    this.srp_price = data.srp_price;
    this.vendor_guarantee = data.vendor_guarantee;
    this.vendor_id = data.vendor_id;
    this.status = data.status;
    this.warehouse_info = data.warehouse_info;
    this.created_at = data.created_at;
  }

  static getTrashs = async () => {
    const q = query(this.ref, orderBy('created_at', 'desc'));
    return (await getDocs(q)).docs.map(
      (doc) =>
        new Trash({
          ...doc.data(),
          id: doc.id,
          created_at: dateformat(doc.data().created_at),
        })
    );
  };

  static getTrashById = async (id) => {
    const docSnapshot = await getDoc(doc(db, this.path, id));
    if (docSnapshot.empty) {
      throw Error('Trash not found');
    }

    return new Trash({
      ...docSnapshot.data(),
      id: docSnapshot.id,
      created_at: dateformat(docSnapshot.data().created_at),
    });
  };

  static delete = async (id, record) => {
    try {
      await runTransaction(db, async (transaction) => {
        const trashRef = doc(db, this.path, id);
        const historyRef = doc(History.ref);

        transaction.set(historyRef, {
          ...record,
        });
        transaction.delete(trashRef);
      });
    } catch (error) {
      console.log(error);
    }
  };
}
