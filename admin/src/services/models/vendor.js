import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from 'services';

export default class Vendor {
  static path = 'vendors';
  static ref = collection(db, this.path);

  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.address = data.address;
    this.active = data.active;
    this.phone = data.phone;
    this.owner = data.owner;
  }

  static getVendorById = async (id) => {
    const docSnapshot = await getDoc(doc(db, this.path, id));

    if (docSnapshot.empty) {
      throw Error('Vendor Not Found');
    }

    return new Vendor({ ...docSnapshot.data(), id: docSnapshot.id });
  };

  static getVendors = async () => {
    const result = await getDocs(this.ref);

    return result.docs.map(
      (doc) =>
        new Vendor({
          ...doc.data(),
          id: doc.id,
        })
    );
  };

  static vendorAlreadyExists = async (email) =>
    !(await getDocs(query(this.ref, where('email', '==', email)))).empty;

  static createVendor = async (uid, data) => {
    await setDoc(doc(this.ref, uid), data);
    return new Vendor({ id: uid, ...data });
  };

  static deleteVendor = async (id) => {
    await deleteDoc(doc(db, this.path, id));
  };

  static updateVendor = async (id, data) =>
    await updateDoc(doc(db, this.path, id), data);
}
