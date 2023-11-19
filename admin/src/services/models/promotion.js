import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import store from 'redux/store';
import { db } from 'services';
import { showMessage } from 'utils';

export default class Promotion {
  static path = 'promotions';
  static ref = collection(db, this.path);

  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.vendor_id = data.vendor_id;
  }

  static watchPromotions = (notiCb, dataCb, vendors) => {
    const q = query(this.ref, orderBy('created_at', 'desc'));
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const {
        noti: { promoInitial },
      } = store.getState();

      snapshot.docChanges().forEach((change) => {
        if (!promoInitial) {
          if (change.type === 'added') {
            showMessage('New Promotion');
          }
          if (change.type === 'removed') {
            showMessage('Promotion removed');
          }
        }
      });

      if (promoInitial) {
        notiCb();
      }

      const result = await Promise.all([
        ...snapshot.docs.map(async (doc) => {
          const vendor_name = vendors.filter(
            (vendor) => vendor.id === doc.data().vendor_id
          )[0]?.name;

          const newPromotion = new Promotion({
            ...doc.data(),
            id: doc.id,
          });
          return { ...newPromotion, vendor_name };
        }),
      ]);

      dataCb(result);
    });
    return unsubscribe;
  };
}
