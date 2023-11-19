import storage from '@react-native-firebase/storage';
import {customAlphabet} from 'nanoid/non-secure';
import mime from 'react-native-mime-types';
import {ImageOrVideo} from 'react-native-image-crop-picker';

export class CloudStorage {
  static product_path = 'products';

  /**
   * @param {ImageOrVideo} img
   */
  static addProductImage = async img => {
    const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);
    const file_type = mime.extension(img.mime);
    const file_name = `${nanoid()}.${file_type}`;
    const file_path = `${this.product_path}/${file_name}`;
    const ref = storage().ref(file_path);
    await ref.putFile(img.path);
    return file_name;
  };

  static getProductImageUrl = async name =>
    await storage().ref(`${this.product_path}/${name}`).getDownloadURL();

  static deleteProductImage = async name =>
    await storage().ref(`${this.product_path}/${name}`).delete();
}
