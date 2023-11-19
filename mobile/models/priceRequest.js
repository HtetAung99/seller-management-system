import firestore from '@react-native-firebase/firestore';

export class PriceRequest {
  static path = 'price_requests';

  constructor(data) {
    this.previous_price = data.previous_price;
    this.price_requested = data.price_requested;
    this.type = data.type;
    this.product_id = data.product_id;
    this.vendor_id = data.vendor_id;
    this.created_at = data.created_at;
  }

  /**
   *  @param {PriceRequest} data
   * */
  static createPriceRequest = async data =>
    (await firestore().collection(this.path).add(data)).id;

  static getPriceRequests = async () =>
    (await firestore().collection(this.path).get()).docs.map(
      doc =>
        new PriceRequest({
          ...doc.data(),
          id: doc.id,
          created_at: doc.data().created_at.toDate(),
        }),
    );

  /**
   * @param {string} id
   * */
  static getPriceRequest = async id => {
    const result = (
      await firestore().collection(this.path).doc(id).get()
    ).data();
    return new PriceRequest({
      ...result,
      id,
      created_at: result?.created_at?.toDate(),
    });
  };

  /**
   * @param {string} product_id
   * */
  static priceRequestExists = async product_id =>
    !(
      await firestore()
        .collection(this.path)
        .where('product_id', '==', product_id)
        .get()
    ).empty;

  /**
   * @param {PriceRequest} data
   * @param {string} id
   * */
  static updatePriceRequest = async (id, data) =>
    await firestore().collection(this.path).doc(id).update(data);

  /**
   * @param {string} id
   * */
  static deletePriceRequest = async id =>
    await firestore().collection(this.path).doc(id).delete();
}
