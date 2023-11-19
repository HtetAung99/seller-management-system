import firestore from '@react-native-firebase/firestore';
import { CloudStorage } from './cloudStorage';
import { ActionType } from './helper';
import { Product } from './product';
import Trash from './trash';

export default class History {
  static path = 'history';

  constructor(data) {
    this.id = data.id;
    this.type = data.type;
    this.status = data.status;
    this.user_id = data.user_id;
    this.vendor_id = data.vendor_id;
    this.product_name = data.product_name;
    this.image = data.image;
    this.price = data.price;
    this.previous_price = data.previous_price;
    this.price_requested = data.price_requested;
    this.product_id = data.product_id;
    this.trash_id = data.trash_id;
    this.product_data = data.product_data;
    this.created_at = data.created_at;
  }

  static getRecordsForPdr = async vendorId =>
    await Promise.all([
      ...(
        await firestore()
          .collection(this.path)
          .where('vendor_id', '==', vendorId)
          .where('type', '==', 'product')
          .orderBy('created_at', 'desc')
          .get()
      ).docs.map(async doc => {
        const image = await CloudStorage.getProductImageUrl(doc.data().image);
        const record = new History({
          ...doc.data(),
          id: doc.id,
          image,
          created_at: doc.data()?.created_at?.toDate(),
        });

        return record;
      }),
    ]);

  static getRecordsForPrr = async vendorId =>
    await Promise.all([
      ...(
        await firestore()
          .collection(this.path)
          .where('vendor_id', '==', vendorId)
          .where('type', '==', 'price')
          .orderBy('created_at', 'desc')
          .get()
      ).docs.map(async doc => {
        const image = await CloudStorage.getProductImageUrl(doc.data().image);
        const record = new History({
          ...doc.data(),
          id: doc.id,
          image,
          created_at: doc.data()?.created_at?.toDate(),
        });

        return record;
      }),
    ]);

  /**
   * @param {string} id
   * */
  static getRecord = async id => {
    const result = (
      await firestore().collection(this.path).doc(id).get()
    ).data();
    return new History({
      ...result,
      id,
      created_at: result?.created_at?.toDate(),
      modified_at: result?.modified_at?.toDate(),
    });
  };
}
