import { deleteObject, getDownloadURL, ref } from 'firebase/storage';
import { storage } from 'services';

export default class CloudStorage {
  static product_path = 'products';

  static getProductImageUrl = async (name) =>
    await getDownloadURL(ref(storage, `${this.product_path}/${name}`));

  static deleteImage = async (name) =>
    new Promise(async (resolve, reject) => {
      try {
        const desertRef = ref(storage, `${this.product_path}/${name}`);
        await deleteObject(desertRef);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
}
