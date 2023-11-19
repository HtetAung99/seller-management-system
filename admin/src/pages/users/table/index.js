import React, { useEffect, useState } from 'react';
import {
  Table,
  Input,
  Popconfirm,
  Form,
  Typography,
  Dropdown,
  Menu,
  Select,
} from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import './index.less';
import { useDispatch } from 'react-redux';
import { differenceObject, showError, showMessage } from 'utils';
import UserAction from 'redux/thunks/userAction';
import { Role } from 'services/enums';
import { userDeleteModalToggle } from 'redux/slices/user';

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
  const inputNode =
    dataIndex === 'role' ? (
      <Select defaultValue={record?.role}>
        {[Role.admin, Role.staff].map((r, index) => (
          <Select.Option value={r} key={index}>
            {r}
          </Select.Option>
        ))}
      </Select>
    ) : (
      <Input />
    );

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

function UserTable({ userData }) {
  const [form] = Form.useForm();
  const [data, setData] = useState(userData);
  const [editingKey, setEditingKey] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    setData(userData);
  }, [userData]);

  const isEditing = (record) => record.id === editingKey;

  const save = async (old) => {
    try {
      const rawUpdate = await form.validateFields();
      const id = old.id;
      const update = differenceObject(rawUpdate, old);
      await dispatch(UserAction.updateUser({ id, update })).unwrap();
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
      showError("Can't update vendor");
    }
  };

  const handleBlock = async (record) => {
    try {
      await dispatch(UserAction.blockUser(record.id)).unwrap();
      showMessage(`Blocked user: ${record.display_name}`);
    } catch (e) {
      console.log(e);
      showError("Can't block user");
    }
  };

  const handleUnBlock = async (record) => {
    try {
      await dispatch(UserAction.unBlockUser(record.id)).unwrap();
      showMessage(`Unblocked user: ${record.display_name}`);
    } catch (e) {
      console.log(e);
      showError("Can't unblock user");
    }
  };
  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const columns = [
    {
      title: 'No',
      render: (text, record, index) => <>{index + 1}</>,
      sorter: (a, b) => a - b,
      width: '6%',
      align: 'center',
    },
    {
      title: 'Display Name',
      dataIndex: 'display_name',
      editable: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      editable: true,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      editable: true,
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
                {record.active_status ? (
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
                <Menu.Item
                  onClick={() =>
                    dispatch(
                      userDeleteModalToggle({
                        visible: true,
                        user_id: record.id,
                        user_name: record.display_name,
                      })
                    )
                  }
                  key="3"
                >
                  Delete
                </Menu.Item>
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
          body: {
            cell: EditableCell,
          },
        }}
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
        rowKey="id"
      />
    </Form>
  );
}

export default UserTable;
