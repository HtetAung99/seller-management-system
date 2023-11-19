import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const messaging = getMessaging();

export default class CloudMessaging {
  static getToken = () => {
    getToken(messaging, {
      vapidKey:
        'BCkbtw2COHKUiZPc0Nztim3XQ0hdEbt1NjsARSSZAhH3rB0GoH0NMfWNNbL3TXFOAYT4y8ofFth9rYXJvHt3U_g',
    })
      .then((currentToken) => {
        if (currentToken) {
          console.log('current token for client:', currentToken);
        } else {
          console.log(
            'No registration token available. Request permission to generate one.'
          );
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
  };
}
