import React from 'react';
import { Spin } from 'antd';
import './index.less';

export default function Spinner() {
  return (
    <div className="spin">
      <Spin size="large" />
    </div>
  );
}
