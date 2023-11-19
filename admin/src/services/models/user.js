import {
  collection,
  doc,
  addDoc,
  query,
  where,
  getDocs,
  onSnapshot,
  deleteDoc,
  updateDoc,
  setDoc,
  getDoc,
} from 'firebase/firestore';

import { db } from 'services';
import { Role } from '../enums';

export default class User {
  static path = 'users';
  static ref = collection(db, this.path);

  constructor(data) {
    this.id = data.id;
    this.active_status = data.active_status;
    this.display_name = data.display_name;
    this.role = data.role;
    this.email = data.email;
  }

  /**
   *  @param {User} data
   * */
  static createUser = async (uid, data) => {
    await setDoc(doc(this.ref, uid), data);
    return new User({ id: uid, ...data });
  };

  static getUserByAuthId = async (id) => {
    const docRef = doc(this.ref, id);

    const documentSnapshot = await getDoc(docRef);

    if (!documentSnapshot.exists()) {
      throw Error('User not found');
    }
    const result = documentSnapshot.data();
    return new User({ ...result, id: documentSnapshot.id });
  };

  static watchUser = (id, cb) => {
    const unsubscribe = onSnapshot(doc(db, 'users', id), (doc) =>
      cb(doc.data())
    );
    return unsubscribe;
  };

  static getAdminsNStaffs = async () =>
    (
      await getDocs(
        query(this.ref, where('role', 'in', [Role.admin, Role.staff]))
      )
    ).docs.map(
      (doc) =>
        new User({
          ...doc.data(),
          id: doc.id,
        })
    );

  static userAlreadyExists = async (email) =>
    !(await getDocs(query(this.ref, where('email', '==', email)))).empty;

  static deleteUser = async (id) => {
    await deleteDoc(doc(db, this.path, id));
  };

  static updateUser = async (id, data) =>
    await updateDoc(doc(db, this.path, id), data);
}
