import firestore from '@react-native-firebase/firestore';
export class Warehouse {
  static path = 'warehouses';
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.checked = data.checked;
  }

  static getWarehouses = async () =>
    (await firestore().collection(this.path).get()).docs.map(
      doc =>
        new Warehouse({
          ...doc.data(),
          checked: false,
          id: doc.id,
        }),
    );
}
