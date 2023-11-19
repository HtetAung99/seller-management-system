export const Role = Object.freeze({
  admin: 'admin',
  staff: 'staff',
  management: 'management',
  superAdmin: 'super_admin',
});

export const HistoryType = Object.freeze({
  price: 'price',
  product: 'product',
});

export const HistoryStatus = Object.freeze({
  reject: 'reject',
  approve: 'approve',
  delete: 'delete',
});

export const UserActionEnum = Object.freeze({
  report: 'report',
  approve: 'approve',
  reject: 'reject',
});

export const TrashStatus = Object.freeze({
  rejected: 'rejected',
  discontinued: 'discontinued',
});
