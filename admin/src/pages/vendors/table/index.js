import React, { useState } from 'react';
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Typography,
  Dropdown,
  Menu,
} from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import './index.less';
import { differenceObject, showError, showMessage } from 'utils';
import { useDispatch, useSelector } from 'react-redux';
import VendorAction from 'redux/thunks/vendorAction';
import { Role } from 'services/enums';
import { vendorDeleteModalToggle } from 'redux/slices/vendor';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

function VendorTable({ vendorData }) {
  const [form] = Form.useForm();

  const [editingKey, setEditingKey] = useState('');
  const dispatch = useDispatch();

  const isEditing = (record) => record.id === editingKey;
  const { role } = useSelector((state) => state.auth);

  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (old) => {
    try {
      const rawUpdate = await form.validateFields();
      const id = old.id;
      const update = differenceObject(rawUpdate, old);
      await dispatch(VendorAction.updateVendor({ id, update })).unwrap();
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
      showError("Can't update vendor");
    }
  };

  const handleBlock = async (record) => {
    try {
      await dispatch(VendorAction.blockVendor(record.id)).unwrap();
      showMessage(`Blocked vendor: ${record.name}`);
    } catch (e) {
      console.log(e);
      showError("Can't block vendor");
    }
  };

  const handleUnBlock = async (record) => {
    try {
      await dispatch(VendorAction.unBlockVendor(record.id)).unwrap();
      showMessage(`Unblocked vendor: ${record.name}`);
    } catch (e) {
      console.log(e);
      showError("Can't unblock vendor");
    }
  };

  const columns = [
    {
      title: 'No',
      render: (text, record, index) => <>{index + 1}</>,
      width: '6%',
      align: 'center',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      editable: true,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      editable: true,
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      editable: true,
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      editable: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      editable: false,
    },
    {
      title: '',
      dataIndex: 'operation',
      width: '4%',
      align: 'center',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm
              placement="topLeft"
              title="Sure to cancel?"
              onConfirm={cancel}
            >
              <a href="">Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Dropdown
            overlay={
              <Menu>
                {record.active ? (
                  <Menu.Item onClick={() => handleBlock(record)} key="1">
                    Block
                  </Menu.Item>
                ) : (
                  <Menu.Item onClick={() => handleUnBlock(record)} key="1">
                    Unblock
                  </Menu.Item>
                )}
                <Menu.Item onClick={() => edit(record)} key="2">
                  Edit
                </Menu.Item>
                {role === Role.management && (
                  <Menu.Item
                    onClick={() =>
                      dispatch(
                        vendorDeleteModalToggle({
                          visible: true,
                          vendor_id: record.id,
                          vendor_name: record.name,
                        })
                      )
                    }
                    key="3"
                  >
                    Delete
                  </Menu.Item>
                )}
              </Menu>
            }
          >
            <MoreOutlined />
          </Dropdown>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: { cell: EditableCell },
        }}
        dataSource={vendorData}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{ onChange: cancel }}
        rowKey="id"
      />
    </Form>
  );
}

export default VendorTable;
