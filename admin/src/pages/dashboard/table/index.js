import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { prrRowSelected } from 'redux/slices/priceRequest';
import { pdrRowSelected } from 'redux/slices/productRequest';
import { pageSize } from 'utils/config';
import './index.less';

const DataTable = ({ columns, data, handleClick, tableState }) => {
  const { selectedRowIndex: pdrSelectedRowIndex } = useSelector(
    (state) => state.pdr
  );
  const { selectedRowIndex: prrSelectedRowIndex } = useSelector(
    (state) => state.prr
  );

  const dispatch = useDispatch();

  const selectedRow = {
    pdr: pdrSelectedRowIndex,
    prr: prrSelectedRowIndex,
  };

  const rowSelectAction = {
    pdr: pdrRowSelected,
    prr: prrRowSelected,
  };

  return (
    <Table
      onRow={(record, index) => {
        return {
          onClick: (event) => {
            if (tableState === 'promo') {
              return;
            }
            if (selectedRow[tableState] === index) {
              dispatch(rowSelectAction[tableState](null));
              handleClick({});
            } else {
              dispatch(rowSelectAction[tableState](index));
              handleClick(record);
            }
          },
        };
      }}
      rowKey="id"
      className="table"
      columns={columns}
      dataSource={data}
      rowClassName={(record, index) =>
        `ant-table-row ${
          selectedRow[tableState] === index ? 'selectedRow' : ''
        }`
      }
      pagination={{
        pageSize: pageSize.dashboard,
      }}
    />
  );
};

export default DataTable;
