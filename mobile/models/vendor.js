import firestore from '@react-native-firebase/firestore';
import { TimeStamp } from './helper';

export class Vendor {
  static path = 'vendors';

  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.uid = data.uid;
    this.address = data.address;
    this.active = data.active;
    this.phone = data.phone;
    this.products = data.products;
    this.owner = data.owner;
  }

  static validateEmail = async email => {
    const result = (
      await firestore().collection(this.path).where('email', '==', email).get()
    ).docs[0];

    return result
      ? { isValid: true, id: result.id }
      : { isValid: false, id: null };
  };

  static watchVendor = (setVendor, setLoading, vendorId) => {
    const unsubscribe = firestore()
      .collection(this.path)
      .doc(vendorId)
      .onSnapshot(docSnapshot => {
        const vendor = new Vendor({
          ...docSnapshot.data(),
          id: docSnapshot.id,
        });
        setVendor(vendor);
        setLoading(false);
      });

    return unsubscribe;
  };

  static updateFcm = async (token, id) => {
    const ref = firestore().collection(this.path).doc(id);
    const fcmTokens = (await ref.get()).data().fcmTokens;

    let state = 0;

    const modifiedTokens = fcmTokens
      ? fcmTokens.map(ft => {
          if (ft.token === token) {
            ft.modified_at = TimeStamp.now();
            state = 1;
          }
          return ft;
        })
      : [];

    if (state === 0) {
      modifiedTokens.push({
        token,
        modified_at: TimeStamp.now(),
      });
    }

    try {
      await ref.update({
        fcmTokens: modifiedTokens,
      });
    } catch (e) {
      console.log(e);
    }
  };
}
