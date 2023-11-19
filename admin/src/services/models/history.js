import { addDoc, collection } from 'firebase/firestore';
import { db } from 'services';

export default class History {
  static path = 'history';
  static ref = collection(db, this.path);

  constructor(data) {
    this.id = data.id;
    this.previous_price = data.previous_price || 0;
    this.price_requested = data.price_requested || 0;
    this.product_id = data.product_id || '';
    this.trash_id = data.trash_id || '';
    this.product_name = data.product_name;
    this.price = data.price;
    this.image = data.image;
    this.status = data.status;
    this.type = data.type;
    this.user_id = data.user_id;
    this.vendor_id = data.vendor_id;
    this.created_at = data.created_at;
  }

  static createRecord = async (data) => await addDoc(this.ref, data);
}
