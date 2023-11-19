import { Collapse, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { prrGbSelected, prrRowSelected } from 'redux/slices/priceRequest';
import { pdrGbSelected, pdrRowSelected } from 'redux/slices/productRequest';
import './index.less';

const { Panel } = Collapse;

const GroupByTable = ({
  groupByState,
  columns,
  data,
  handleClick,
  tableState,
}) => {
  const { vendors } = useSelector((state) => state.vendors);
  const { categories } = useSelector((state) => state.categories);

  const dispatch = useDispatch();

  const {
    selectedRowIndex: pdrSelectedRowIndex,
    selectedGbIndex: pdrSelectedGbIndex,
  } = useSelector((state) => state.pdr);
  const {
    selectedRowIndex: prrSelectedRowIndex,
    selectedGbIndex: prrSelectedGbIndex,
  } = useSelector((state) => state.prr);

  const gbStates = {
    vendor: vendors,
    category: categories,
  };

  const selectedRow = {
    pdr: pdrSelectedRowIndex,
    prr: prrSelectedRowIndex,
  };

  const selectedGb = {
    pdr: pdrSelectedGbIndex,
    prr: prrSelectedGbIndex,
  };

  const rowSelectAction = {
    pdr: pdrRowSelected,
    prr: prrRowSelected,
  };

  const gBSelectAction = {
    pdr: pdrGbSelected,
    prr: prrGbSelected,
  };

  return (
    <>
      <Table
        className="group-by-table-header"
        columns={columns}
        pagination={false}
      />
      <Collapse
        style={{
          marginTop: 7,
          border: 'none',
        }}
        expandIconPosition="right"
        defaultActiveKey={['1']}
      >
        {gbStates[groupByState].map((stateData, gbIndex) => {
          const tableData = data.filter(
            (d) => d[`${groupByState}_name`] === stateData.name
          );
          if (tableData.length) {
            return (
              <Panel
                key={stateData.id}
                header={
                  <span
                    style={{
                      paddingLeft: 15,
                    }}
                  >
                    {`${stateData.name} (${tableData.length})`}
                  </span>
                }
              >
                <Table
                  onRow={(record, index) => {
                    return {
                      onClick: (event) => {
                        if (
                          selectedRow[tableState] === index &&
                          selectedGb[tableState] === gbIndex
                        ) {
                          dispatch(rowSelectAction[tableState](null));
                          dispatch(gBSelectAction[tableState](null));
                          handleClick({});
                        } else {
                          dispatch(rowSelectAction[tableState](index));
                          dispatch(gBSelectAction[tableState](gbIndex));
                          handleClick(record);
                        }
                      },
                    };
                  }}
                  rowKey="id"
                  rowClassName={(record, index) =>
                    `ant-table-row ${
                      selectedGb[tableState] === gbIndex &&
                      selectedRow[tableState] === index
                        ? 'selectedRow'
                        : ''
                    }`
                  }
                  className="none-thead-table"
                  columns={columns}
                  dataSource={tableData}
                  pagination={false}
                />
              </Panel>
            );
          }
        })}
      </Collapse>
    </>
  );
};

export default GroupByTable;
