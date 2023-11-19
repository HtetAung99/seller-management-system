import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from 'services';

export default class Category {
  static path = 'categories';
  static ref = collection(db, this.path);

  constructor(data) {
    this.id = data.id;
    this.name = data.name;
  }

  static createCategory = async (data) => await addDoc(this.ref, data);

  static getCategoryById = async (id) => {
    const docSnapshot = await getDoc(doc(db, this.path, id));
    if (docSnapshot.empty) {
      throw Error('Category not found');
    }

    return new Category({ ...docSnapshot.data(), id: docSnapshot.id });
  };

  static getCategories = async () =>
    (await getDocs(this.ref)).docs.map(
      (doc) =>
        new Category({
          ...doc.data(),
          id: doc.id,
        })
    );

  static deleteCategory = async (id) => await deleteDoc(doc(db, this.path, id));

  static categoryAlreadyExists = async (name) =>
    !(await getDocs(query(this.ref, where('name', '==', name)))).empty;
}
