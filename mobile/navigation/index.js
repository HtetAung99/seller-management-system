/* eslint-disable curly */
import React, { useState, useEffect, useContext } from 'react';
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../AuthProvider';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomNavigator from './BottomNavigator';
import Loading from '../screens/loading';
import Create from '../screens/create/index';
import Detail from '../screens/detail/index';
import Pending from '../screens/pending';
import LogIn from '../screens/login';
import SignUp from '../screens/signup';
import CustomToast from '../components/Toast';

export default function Navigation() {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#454242',
      background: '#fff',
      text: 'black',
    },
  };

  return (
    <>
      <NavigationContainer theme={MyTheme}>
        <Routes />
        <CustomToast />
      </NavigationContainer>
    </>
  );
}

function Routes() {
  const [initializing, setInitializing] = useState(true);
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  function onAuthStateChanged(u) {
    setUser(u);
    if (initializing) setInitializing(false);
    setLoading(false);
  }

  const Stack = createStackNavigator();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  });

  if (initializing) return null;

  if (loading) {
    return <Loading />;
  }

  return (
    <Stack.Navigator>
      {user ? (
        <Stack.Group>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="BottomTab"
            component={BottomNavigator}
          />
          <Stack.Screen
            name="Create"
            options={{ headerBackTitleVisible: false }}
            component={Create}
          />
          <Stack.Screen
            name="Detail"
            options={{
              headerBackTitleVisible: false,
              headerTransparent: true,
              headerTitle: '',
              headerTintColor: 'white',
            }}
            component={Detail}
          />
          <Stack.Screen
            name="Pending"
            options={{
              headerBackTitleVisible: false,
            }}
            component={Pending}
          />
        </Stack.Group>
      ) : (
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name="LogIn" component={LogIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}
