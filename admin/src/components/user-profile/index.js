import React from 'react';
import './index.less';
import { useSelector } from 'react-redux';
import { Avatar } from 'antd';

export default function Profile() {
  const { display_name, role } = useSelector((state) => state.auth);

  return (
    <div className="profile">
      <div className="profile-text">
        <span>{display_name}</span>
        <span>{role}</span>
      </div>
      <Avatar
        shape="square"
        size={40}
        style={{ backgroundColor: '#f56a00', borderRadius: '50%' }}
      >
        {display_name.charAt(0).toUpperCase()}
      </Avatar>
    </div>
  );
}
