import React from 'react';
import { Collapse } from 'antd';
const { Panel } = Collapse;

export default function Accordion({ data }) {
  return (
    <Collapse bordered={false} expandIconPosition="right">
      {data.map(({ header, content }, index) => (
        <Panel
          header={
            <span style={{ fontSize: '1rem', fontWeight: 500 }}>{header}</span>
          }
          key={String(index)}
        >
          {content}
        </Panel>
      ))}
    </Collapse>
  );
}
