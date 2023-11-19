import { Timeline } from 'antd';
import { dateformat } from 'utils';
import './index.less';

export function getCollapseData(
  specification,
  vendor_guarantee,
  price_history
) {
  const normalData = [
    {
      header: 'Specification',
      content: <p style={{ padding: '0 1rem' }}>{specification}</p>,
    },
    {
      header: 'Vendor Gurantee',
      content: <p style={{ padding: '0 1rem' }}>{vendor_guarantee}</p>,
    },
  ];
  return price_history
    ? [
        ...normalData,
        {
          header: 'Price History',
          content: (
            <Timeline>
              {price_history?.map((h, index) => (
                <Timeline.Item key={index}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingRight: 18,
                    }}
                  >
                    <span>{h.price_confirmed}</span>
                    <span>{dateformat(h.created_at)}</span>
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>
          ),
        },
      ]
    : normalData;
}
