import firestore from '@react-native-firebase/firestore';
import { CloudStorage } from './cloudStorage';

export default class Trash {
  static path = 'trashs';

  constructor(data) {
    this.id = data.id;
    this.article_no = data.article_no;
    this.image = data.image;
    this.image_url = data.image_url;
    this.management_status = data.management_status;
    this.name = data.name;
    this.original_barcode = data.original_barcode;
    this.price = data.price;
    this.specification = data.specification;
    this.srp_price = data.srp_price;
    this.vendor_guarantee = data.vendor_guarantee;
    this.vendor_id = data.vendor_id;
    this.warehouse_info = data.warehouse_info;
    this.created_at = data.created_at;
  }

  static getTrashs = async () =>
    (await firestore().collection(this.path).get()).docs.map(
      doc =>
        new Trash({
          ...doc.data(),
          id: doc.id,
          created_at: doc.data().created_at.toDate(),
        }),
    );

  static getTrash = async id => {
    const result = (
      await firestore().collection(this.path).doc(id).get()
    ).data();
    const image_url = await CloudStorage.getProductImageUrl(result.image);
    return new Trash({
      ...result,
      image_url,
      id,
      created_at: result?.created_at?.toDate(),
    });
  };
}
