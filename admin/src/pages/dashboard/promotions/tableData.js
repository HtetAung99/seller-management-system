export const columns = [
  {
    title: 'No',
    render: (text, _, index) => <>{index + 1}</>,
    width: '5%',
    align: 'center',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    width: '17%',
  },
  {
    title: 'Description',
    dataIndex: 'description',
  },
  {
    title: 'Vendor',
    dataIndex: 'vendor_name',
    width: '17%',
  },
];
