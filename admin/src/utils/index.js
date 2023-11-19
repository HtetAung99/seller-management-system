import { message } from 'antd';
import * as jose from 'jose';
import _t from 'lodash/transform';
import _o from 'lodash/isObject';
import _e from 'lodash/isEqual';

export const showMessage = (msg) => {
  message.success({
    content: msg,
  });
};

export const showError = (msg) => {
  message.error({
    content: msg,
  });
};

export const isEmptyObj = (obj) =>
  Object.keys(obj).length === 0 && obj.constructor === Object;

export const assignJWT = async (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const key = new TextEncoder().encode('123456');
      const jwt = await new jose.SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .sign(key);
      resolve(jwt);
    } catch (error) {
      console.log(error);
      reject('JWT Sign Error');
    }
  });

export const differenceObject = (object, base) => {
  function changes(object, base) {
    return _t(object, function (result, value, key) {
      if (!_e(value, base[key])) {
        result[key] =
          _o(value) && _o(base[key]) ? changes(value, base[key]) : value;
      }
    });
  }
  return changes(object, base);
};

export const addPagination = (curPage, pageSize) => (index) =>
  (curPage - 1) * pageSize + index + 1;

export const dateformat = (date) => {
  return date?.toDate().toLocaleString('en-GB', {
    hour12: true,
  });
};

export const sortAlphabet = (a, b) => {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  return 0;
};
