import React from 'react';
import Home from '../screens/home';
import History from '../screens/history';
import Profile from '../screens/profile';
import Promotions from '../screens/promotions';
import AiIcon from 'react-native-vector-icons/AntDesign';
import MdIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export const screenNavs = [
  {
    name: 'Home',
    component: Home,
    icon: color => <AiIcon name="appstore-o" size={26} color={color} />,
  },
  {
    name: 'History',
    component: History,
    icon: color => <MdIcon name="history" size={34} color={color} />,
  },
  {
    name: 'Promotions',
    component: Promotions,
    icon: color => <AiIcon name="totop" size={26} color={color} />,
  },
  {
    name: 'Profile',
    component: Profile,
    icon: color => <AiIcon name="user" size={26} color={color} />,
  },
];
