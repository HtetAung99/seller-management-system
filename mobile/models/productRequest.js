import firestore from '@react-native-firebase/firestore';
import { CloudStorage } from './cloudStorage';

class Product {
  constructor(data) {
    /** @type {string} */
    this.name = data.name;
    /** @type {number} */
    this.price = data.price;
    /** @type {string} */
    this.specification = data.specification;
    /** @type {number} */
    this.srp_price = data.srp_price;
    /** @type {string} */
    this.vendor_guarantee = data.vendor_guarantee;
    /** @type {string} */
    this.warehouse_info = data.warehouse_info;
    /** @type {string} */
    this.image = data.image;
    /** @type {string} */
    this.image_url = data.image_url;
  }
}

export class ProductRequest {
  static path = 'product_requests';

  constructor(data) {
    this.id = data.id;
    /** @type {Product} */
    this.product = data.product;
    this.created_at = firestore.Timestamp.now();
    this.type = data.type;
    this.vendor_id = data.vendor_id;
    this.image_url = data.image_url;
    this.from_management = data.from_management;
  }

  /**
   *  @param {ProductRequest} data
   * */
  static createProductRequest = async data =>
    (await firestore().collection(this.path).add(data)).id;

  static getProductRequests = async vendorId => {
    const result = await firestore()
      .collection(this.path)
      .where('vendor_id', '==', vendorId)
      .get();
    return result.docs.map(
      doc =>
        new ProductRequest({
          ...doc.data(),
          id: doc.id,
          created_at: doc.data().created_at.toDate(),
        }),
    );
  };

  /**
   * @param {string} id
   * */
  static getProductRequest = async id => {
    const result = (
      await firestore().collection(this.path).doc(id).get()
    ).data();
    const image_url = await CloudStorage.getProductImageUrl(
      result.product.image,
    );
    return new ProductRequest({
      ...result,
      id,
      image_url,
      created_at: result?.created_at?.toDate(),
    });
  };

  /**
   * @param {ProductRequest} data
   * @param {string} id
   * */
  static updateProductRequest = async (id, data) =>
    await firestore().collection(this.path).doc(id).update(data);

  /**
   * @param {string} id
   * */
  static deleteProductRequest = async id =>
    await firestore().collection(this.path).doc(id).delete();

  static watchPending = (setPending, vendorId) => {
    const unsubscribe = firestore()
      .collection(this.path)
      .where('vendor_id', '==', vendorId)
      .orderBy('created_at', 'desc')
      .onSnapshot(async querySnapShot => {
        const result = await Promise.all([
          ...querySnapShot.docs.map(async doc => {
            const image_url = await CloudStorage.getProductImageUrl(
              doc.data().product.image,
            );

            return new ProductRequest({
              ...doc.data(),
              id: doc.id,
              image_url,
              created_at: doc.data().created_at?.toDate(),
            });
          }),
        ]);

        setPending(result);
      });

    return unsubscribe;
  };
}
