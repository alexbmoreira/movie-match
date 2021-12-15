import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Provider as MobxProvider } from "mobx-react";
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import MainTabs from './components/navigation/MainTabs';
import { navigationRef } from './RootNavigation';
import stores from "./stores";


const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="ResolveAuth" component={ResolveAuth} /> */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <MobxProvider {...stores}>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <AppNavigator/>
      </SafeAreaProvider>
    </MobxProvider>
  );
}
