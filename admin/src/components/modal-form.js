import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

export const ModalForm = ({
  visible,
  handleCancel,
  handleSubmit,
  handleChange,
  handleDelete,
  inputValue,
  lists,
  type,
}) => {
  return (
    <Modal
      title={`${type} (${lists.length})`}
      visible={visible}
      onCancel={handleCancel}
      bodyStyle={{
        padding: 0,
        maxHeight: '40vh',
        overflow: 'auto',
      }}
      footer={
        <Form className="modal-form" onSubmitCapture={handleSubmit}>
          <Input
            placeholder={`Add ${type} ...`}
            value={inputValue}
            onChange={handleChange}
            allowClear
          />
          <Button htmlType="submit" disabled={Boolean(inputValue.length < 2)}>
            &#43;
          </Button>
        </Form>
      }
    >
      <ul className="category-list">
        {lists.map(({ id, name }) => (
          <li key={id} className="list-item">
            {name}
            <DeleteOutlined
              onClick={() => handleDelete(id)}
              style={{ color: 'red' }}
            />
          </li>
        ))}
      </ul>
    </Modal>
  );
};
