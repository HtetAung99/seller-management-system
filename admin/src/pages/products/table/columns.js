import React from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Popconfirm, Typography } from 'antd';
import { sortAlphabet } from 'utils';

export function cols(
  vendors,
  categories,
  getIndex,
  isEditing,
  save,
  setEditingRow,
  cancel,
  edit,
  handleDelete
) {
  return [
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
        return <img src={record.image} alt="" className="row-img" />;
      },
      width: '7%',
      align: 'center',
    },
    {
      title: 'Title',
      dataIndex: 'name',
      sorter: sortAlphabet,
      width: '18%',
      editable: true,
    },
    {
      title: 'IR',
      dataIndex: 'ir',
      width: '8%',
      editable: true,
    },
    {
      title: 'Barcode',
      dataIndex: 'original_barcode',
      width: '8%',
      editable: true,
    },
    {
      title: 'Price (MMK)',
      dataIndex: 'price',
      width: '13%',
      align: 'right',
      render: (_, record) => {
        return <span>{(+record?.price).toLocaleString('en-US')}</span>;
      },
      sorter: (a, b) => a.price - b.price,
      editable: false,
    },
    {
      title: 'SRP Price',
      dataIndex: 'srp_price',
      sorter: (a, b) => a.srp_price - b.srp_price,
      width: '11%',
      align: 'right',
      editable: false,
    },
    {
      title: 'Vendor',
      dataIndex: 'vendor_name',
      editable: false,
      filters: vendors.map(({ name }) => ({
        text: name,
        value: name,
      })),
      width: '13%',
      onFilter: (value, record) => record.vendor_name.indexOf(value) === 0,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      editable: true,
      filters: categories.map(({ name }) => ({
        text: name,
        value: name,
      })),
      width: '13%',
      onFilter: (value, record) => record.category.indexOf(value) === 0,
    },
    {
      title: '',
      dataIndex: 'operation',
      align: 'center',
      width: '7%',
      render: (_, record, index) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={(e) => {
                e.stopPropagation();
                save(record);
              }}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm
              placement="topLeft"
              title="Sure to cancel?"
              onCancel={(e) => {
                e.stopPropagation();
                setEditingRow(null);
              }}
              onConfirm={(e) => {
                e.stopPropagation();
                setEditingRow(null);
                cancel();
              }}
            >
              <a onClick={(e) => e.stopPropagation()} href="!#">
                Cancel
              </a>
            </Popconfirm>
          </span>
        ) : (
          <div className="action-wrapper">
            <EditOutlined
              onClick={(e) => {
                e.stopPropagation();
                setEditingRow(index);
                edit(record);
              }}
            />
            <Popconfirm
              placement="topLeft"
              title="Are you sure?"
              onCancel={(e) => {
                e.stopPropagation();
                setEditingRow(null);
              }}
              onConfirm={(e) => {
                e.stopPropagation();
                handleDelete(record);
                setEditingRow(null);
              }}
            >
              <DeleteOutlined onClick={(e) => e.stopPropagation()} />
            </Popconfirm>
          </div>
        );
      },
    },
  ];
}
