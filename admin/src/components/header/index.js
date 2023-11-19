import React, { memo } from 'react';
import Profile from 'components/user-profile';
import './index.less';

function Header({ children }) {
  return (
    <div className="header">
      <div className="db-header">{children}</div>
      <Profile />
    </div>
  );
}

export default memo(Header);
