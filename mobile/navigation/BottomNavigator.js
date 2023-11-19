import React, { useContext, useEffect, useState } from 'react';
import Blocked from '../screens/blocked';
import ContactUs from '../screens/contact-us';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../AuthProvider';
import { Vendor } from '../models/vendor';
import { screenNavs } from './screen-navs';
import Loader from '../components/loader';

const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
  const { user, logout, setVendorId, vendor, setVendor } =
    useContext(AuthContext);

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function onInit() {
      const { isValid, id } = await Vendor.validateEmail(user.email);
      if (isValid) {
        setVendorId(id);
        setIsAuthorized(true);
        const unsubscribe = Vendor.watchVendor(setVendor, setLoading, id);
        return unsubscribe;
      }
      setLoading(false);
    }

    onInit();
  }, [setVendorId, setIsAuthorized, setLoading, setVendor]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {user && isAuthorized ? (
        vendor?.active ? (
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              headerTitleAlign: 'center',
              tabBarShowLabel: false,
              tabBarActiveTintColor: '#000',
              tabBarInactiveTintColor: '#c7c7c7',
              tabBarHideOnKeyboard: true,
            }}
            initialRouteName="Home">
            {screenNavs.map(({ name, component, icon }, index) => (
              <Tab.Screen
                key={index}
                name={name}
                component={component}
                options={{
                  tabBarIcon: ({ color }) => icon(color),
                  headerShown: name === 'Home' ? false : true,
                }}
              />
            ))}
          </Tab.Navigator>
        ) : (
          <Blocked {...{ logout }} />
        )
      ) : (
        <ContactUs {...{ logout }} />
      )}
    </>
  );
}
