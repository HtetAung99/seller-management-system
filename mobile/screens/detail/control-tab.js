import React from 'react';
import ControlTab from 'react-native-segmented-control-tab';
import s from './styles';

export const TabControl = ({ index, handleIndexChange, isHistory }) => {
  return (
    <ControlTab
      values={
        isHistory ? ['Product', 'Price'] : ['Specifications', 'Guarantee']
      }
      selectedIndex={index}
      onTabPress={handleIndexChange}
      tabsContainerStyle={[
        s.tabContainerStyle,
        isHistory && { marginBottom: 10 },
      ]}
      tabStyle={s.tabStyle}
      tabTextStyle={s.tabTextStyle}
      activeTabStyle={[
        s.activeTabStyle,
        isHistory && {
          borderTopWidth: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#000',
        },
      ]}
      activeTabTextStyle={s.activeTabTextStyle}
    />
  );
};
