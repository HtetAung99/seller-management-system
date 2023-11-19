import React from 'react';
import SearchBar from 'components/search-bar';
import { Button, Dropdown } from 'antd';
import {
  DownOutlined,
  GroupOutlined,
  AlignLeftOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';

export default function Search({
  setSearchInput,
  groupByState,
  menu,
  setGroupByState,
  closeHandler,
}) {
  return (
    <div className="search">
      <SearchBar {...{ setSearchInput }} />
      <Dropdown overlay={menu}>
        <Button>
          <GroupOutlined />
          Group by
          <DownOutlined />
        </Button>
      </Dropdown>
      {groupByState && (
        <Button>
          <AlignLeftOutlined />
          <span>
            {groupByState.charAt(0).toUpperCase() + groupByState.slice(1)}
          </span>
          <CloseCircleOutlined
            style={{
              fontSize: '12px',
            }}
            onClick={() => {
              setGroupByState(null);
              closeHandler();
            }}
          />
        </Button>
      )}
    </div>
  );
}
