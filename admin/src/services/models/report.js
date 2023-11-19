import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from 'services';

export default class Report {
  static path = 'reports';
  static ref = collection(db, this.path);

  constructor(data) {
    this.id = data.id;
    this.previous_price = data.previous_price || 0;
    this.price_requested = data.price_requested || 0;
    this.product_id = data.product_id;
    this.status = data.status;
    this.type = data.type;
    this.user_id = data.user_id;
    this.vendor_id = data.vendor_id;
    this.created_at = data.created_at;
    this.modified_at = data.modified_at?.toDate();
  }

  static createReport = async (data) => await addDoc(this.ref, data);
}
