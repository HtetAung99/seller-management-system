import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from 'services';

export default class Warehouse {
  static path = 'warehouses';
  static ref = collection(db, this.path);

  constructor(data) {
    this.id = data.id;
    this.name = data.name;
  }

  static createWarehouse = async (data) => await addDoc(this.ref, data);

  static getWarehouses = async () =>
    (await getDocs(this.ref)).docs.map(
      (doc) =>
        new Warehouse({
          ...doc.data(),
          id: doc.id,
        })
    );

  static deleteWarehouse = async (id) =>
    await deleteDoc(doc(db, this.path, id));

  static warehouseAlreadyExists = async (name) =>
    !(await getDocs(query(this.ref, where('name', '==', name)))).empty;
}
