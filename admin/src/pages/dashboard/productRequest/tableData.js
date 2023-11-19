import { Tag } from 'antd';
import { Role } from 'services/enums';
import { sortAlphabet } from 'utils';

const columns = [
  {
    title: 'No',
    render: (text, _, index) => <>{index + 1}</>,
    width: '6%',
    align: 'center',
  },
  {
    title: 'Image',
    dataIndex: 'image',
    render: (_, record) => {
      if (!record.product?.image) return;
      return <img src={record.image} alt="" className="row-img" />;
    },
    width: '8%',
    align: 'center',
  },
  {
    title: 'Title',
    dataIndex: ['product', 'name'],
    sorter: (a, b) => sortAlphabet(a.product, b.product),
    width: '18%',
  },
  {
    title: 'Barcode',
    dataIndex: ['product', 'original_barcode'],
    width: '9%',
  },
  {
    title: 'Price (MMK)',
    dataIndex: ['product', 'price'],
    width: '13%',
    align: 'right',
    render: (_, record) => {
      return <span>{(+record?.product?.price).toLocaleString('en-US')}</span>;
    },
    sorter: (a, b) => a.product?.price - b.product?.price,
  },
  {
    title: 'Vendor',
    dataIndex: 'vendor_name',
  },
  {
    title: 'Warehouse Info',
    dataIndex: ['product', 'warehouse_info'],
    width: '20%',
    render: (_, record) => (
      <span>{record?.product?.warehouse_info.replaceAll(',', ', ')}</span>
    ),
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
