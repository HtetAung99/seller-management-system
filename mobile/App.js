import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { AuthProvider } from './AuthProvider';
import Navigation from './navigation';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}

export default App;
