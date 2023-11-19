import firestore from '@react-native-firebase/firestore';

export default class Category {
  static path = 'categories';
  static getCategoryById = async id =>
    (await firestore().collection(this.path).doc(id).get()).data().name;
}
