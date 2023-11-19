import { useSelector } from 'react-redux';
import { InputNumber, Select, Input, Form } from 'antd';

export const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const { categories } = useSelector((state) => state.categories);
  const { vendors } = useSelector((state) => state.vendors);

  let inputNode;

  const inputNodeAssign = {
    number: {
      dataIndex,
      inputNode: <InputNumber />,
    },
    switch:
      dataIndex === 'category'
        ? {
            dataIndex: 'category_id',
            inputNode: (
              <Select defaultValue={record?.category_id}>
                {categories.map(({ id, name }, index) => (
                  <Select.Option value={id} key={index}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
            ),
          }
        : {
            dataIndex: 'vendor_id',
            inputNode: (
              <Select defaultValue={record?.vendor_id}>
                {vendors.map(({ id, name }, index) => (
                  <Select.Option value={id} key={index}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
            ),
          },
    text: {
      dataIndex,
      inputNode: <Input />,
    },
  };

  inputNode = inputNodeAssign[inputType]?.['inputNode'];
  dataIndex = inputNodeAssign[inputType]?.['dataIndex'];

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
              required: false,
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
