import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainTabs from './components/navigation/MainTabs';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ResolveAuth from './pages/auth/ResolveAuth';
import { navigationRef } from './RootNavigation';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ResolveAuth" component={ResolveAuth} options={{gestureEnabled: false}}/>
        <Stack.Screen name="Login" component={Login} options={{gestureEnabled: false}}/>
        <Stack.Screen name="Register" component={Register} options={{gestureEnabled: false}}/>
        <Stack.Screen name="Main" component={MainTabs} options={{gestureEnabled: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <AppNavigator/>
    </SafeAreaProvider>
  );
}
