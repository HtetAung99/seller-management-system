import firestore from '@react-native-firebase/firestore';
import Category from './category';
import { CloudStorage } from './cloudStorage';
export class Product {
  static path = 'products';

  constructor(data) {
    this.id = data.id;
    this.article_no = data.article_no;
    this.category = data.category;
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

  static management_type = Object.freeze({
    admin: 'admin',
    management: 'management',
  });

  /**
   *  @param {Product} data
   * */
  static createProduct = async data =>
    (await firestore().collection(ths.path).add(data)).id;

  static getProducts = async () =>
    (await firestore().collection(this.path).get()).docs.map(
      doc =>
        new Product({
          ...doc.data(),
          id: doc.id,
          created_at: doc.data().created_at.toDate(),
        }),
    );

  /**
   * @param {string} id
   * */
  static getProduct = async id => {
    const result = (
      await firestore().collection(this.path).doc(id).get()
    ).data();
    const category = await Category.getCategoryById(result.category_id);
    const image_url = await CloudStorage.getProductImageUrl(result.image);
    return new Product({
      ...result,
      id,
      category,
      image_url,
      created_at: result?.created_at?.toDate(),
    });
  };

  /**
   * @param {Product} data
   * @param {string} id
   * */
  static updateProduct = async (id, data) =>
    await firestore().collection(ths.path).doc(id).update(data);

  /**
   * @param {string} id
   * */
  static deleteProduct = async id =>
    await firestore().collection(ths.path).doc(id).delete();

  static watchProducts = (setProducts, vendorId) => {
    const unsubscribe = firestore()
      .collection(this.path)
      .where('vendor_id', '==', vendorId)
      .orderBy('created_at', 'desc')
      .onSnapshot(async querySnapShot => {
        const result = await Promise.all([
          ...querySnapShot.docs.map(async doc => {
            const image_url = await CloudStorage.getProductImageUrl(
              doc.data().image,
            );
            const category = await Category.getCategoryById(
              doc.data().category_id,
            );

            return new Product({
              ...doc.data(),
              id: doc.id,
              category,
              image_url,
              created_at: doc.data().created_at?.toDate(),
            });
          }),
        ]);

        setProducts(result);
      });

    return unsubscribe;
  };
}
