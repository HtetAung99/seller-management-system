import firestore from '@react-native-firebase/firestore';
import { format } from 'date-fns';

export const TimeStamp = firestore.Timestamp;

export const DetailType = Object.freeze({
  pend: 'pending',
  prod: 'product',
  reject: 'reject',
});

export const ActionType = Object.freeze({
  approve: 'approve',
  reject: 'reject',
});

export const HistoryTabIndex = Object.freeze({
  product: 0,
  price: 1,
});

export const dateformat = date => {
  if (!date) {
    return;
  }
  return format(date, 'h:mm:ss aaa , dd.MM.yyyy');
};

export const validateBadge = size => {
  return size >= 100 ? '99+' : size;
};
