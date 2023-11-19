import React from 'react';
import './index.less';

export default function Status({ status, count }) {
  return (
    <div className="status">
      <div className={status ? 'status-icon active' : 'status-icon inactive'} />
      {status ? 'Active' : 'Inactive'} users ({count})
    </div>
  );
}
