import React, { useState } from 'react';
import { Table, Tag } from 'antd';
import './index.less';
import { useDispatch, useSelector } from 'react-redux';
import { trashDetailChanges, trashRowSelected } from 'redux/slices/trash';
import { addPagination, sortAlphabet } from 'utils';
import { pageSize } from 'utils/config';

function ReportTable({ reportData, handleClick, isVisible }) {
  const { vendors } = useSelector((state) => state.vendors);
  const { selectedRowIndex } = useSelector((state) => state.trashs);
  const [curPagination, setCurPagination] = useState(1);

  const dispatch = useDispatch();

  const paginationHandler = (p) => {
    dispatch(trashDetailChanges({}));
    dispatch(trashRowSelected(null));
    setCurPagination(p);
  };

  const getIndex = addPagination(curPagination, pageSize.reports);

  const columns = [
    {
      title: 'No',
      render: (text, record, index) => <>{getIndex(index)}</>,
      width: '4%',
      align: 'center',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      render: (text, record) => {
        if (!record?.image) return;
        return (
          <img src={record.image} alt="" style={{ width: 35, height: 35 }} />
        );
      },
      width: '7%',
      align: 'center',
    },
    {
      title: 'Title',
      dataIndex: 'name',
      sorter: sortAlphabet,
      width: '23%',
    },
    {
      title: 'Barcode',
      dataIndex: 'original_barcode',
      width: '10%',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      width: '12%',
      align: 'right',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'SRP Price',
      dataIndex: 'srp_price',
      sorter: (a, b) => a.srp_price - b.srp_price,
      width: '12%',
      align: 'right',
    },
    {
      title: 'Vendor',
      dataIndex: 'vendor_name',
      filters: vendors.map(({ name }) => ({
        text: name,
        value: name,
      })),
      onFilter: (value, record) => record.vendor_name.indexOf(value) === 0,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '13%',
      render: (_, record) => {
        return (
          <Tag color={record.status === 'discontinued' ? 'error' : 'warning'}>
            {record.status}
          </Tag>
        );
      },
      filters: [
        {
          text: 'Rejected',
          value: 'rejected',
        },
        {
          text: 'Discontinued',
          value: 'discontinued',
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
  ];

  const filteredOutColumns = ['vendor_name', 'srp_price'];

  const finalColumns = isVisible
    ? columns.filter((col) => filteredOutColumns.indexOf(col.dataIndex) === -1)
    : columns;

  return (
    <Table
      dataSource={reportData}
      columns={finalColumns}
      onRow={(record, index) => {
        return {
          onClick: (event) => {
            if (selectedRowIndex === index) {
              dispatch(trashRowSelected(null));
              handleClick({});
            } else {
              dispatch(trashRowSelected(index));
              handleClick(record);
            }
          },
        };
      }}
      rowKey="id"
      rowClassName={(record, index) =>
        `${selectedRowIndex === index ? 'selectedRow' : ''}`
      }
      pagination={{
        onChange: paginationHandler,
        pageSize: pageSize.reports,
      }}
    />
  );
}

export default ReportTable;
