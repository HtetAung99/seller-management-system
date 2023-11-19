import messaging from '@react-native-firebase/messaging';
import { Vendor } from './vendor';

export class CloudMessagaing {
  static requestUserPermission = async vendorId => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      const token = await messaging().getToken();
      Vendor.updateFcm(token, vendorId);
    }
  };
}
