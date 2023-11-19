import { Tag } from 'antd';
import { Role } from 'services/enums';
import { sortAlphabet } from 'utils';
import PriceRequested from './price_requested';

const columns = [
  {
    title: 'No',
    render: (text, record, index) => <>{index + 1}</>,
    width: '6%',
    align: 'center',
  },
  {
    title: 'Title',
    dataIndex: ['product', 'name'],
    sorter: (a, b) => sortAlphabet(a.product, b.product),
    width: '15%',
  },
  {
    title: 'Requested Price',
    dataIndex: 'price_requested',
    render: (text, record, index) => (
      <PriceRequested
        record={{
          price: record?.product.price,
          price_requested: record.price_requested,
        }}
      />
    ),
    sorter: (a, b) => a.price_requested - b.price_requested,
    width: '23%',
  },
  {
    title: 'Barcode',
    dataIndex: ['product', 'original_barcode'],
    width: '9%',
  },
  {
    title: 'Vendor',
    dataIndex: 'vendor_name',
    width: '12%',
  },
  {
    title: 'Category',
    dataIndex: 'category_name',
    width: '10%',
  },
  {
    title: 'Status',
    dataIndex: ['from_management'],
    width: '11%',
    render: (_, record) => {
      if (record.from_management) {
        return <Tag color="success">Management</Tag>;
      }
    },
  },
];

export function getColumns(role) {
  if (role === Role.management) {
    return columns.filter((c) => c.title !== 'Status');
  }
  return columns;
}
