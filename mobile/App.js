import MainTabs from '@components/navigation/MainTabs';
import { Login, Register, ResolveAuth } from '@pages/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from '@shared/RootNavigation';
import theme from '@shared/theme';
import { StatusBar } from 'expo-status-bar';
import { configure } from 'mobx';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createStackNavigator();


configure({
  enforceActions: 'never'
})

function AppNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='ResolveAuth' component={ResolveAuth} options={{gestureEnabled: false}}/>
        <Stack.Screen name='Login' component={Login} options={{gestureEnabled: false}}/>
        <Stack.Screen name='Register' component={Register} options={{gestureEnabled: false}}/>
        <Stack.Screen name='Main' component={MainTabs} options={{gestureEnabled: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <StatusBar style='auto' />
        <AppNavigator/>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
