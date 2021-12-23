import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabs from 'components/navigation/MainTabs';
import { StatusBar } from 'expo-status-bar';
import { configure } from 'mobx';
import { Login, Register, ResolveAuth } from 'pages/auth';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { navigationRef } from 'shared/RootNavigation';
import theme from 'shared/theme';

const Stack = createStackNavigator();

configure({
  enforceActions: 'never'
});

const navigationTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: theme.colors.screen
  }
};

const AppNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef} theme={navigationTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='ResolveAuth' component={ResolveAuth} options={{ gestureEnabled: false }}/>
        <Stack.Screen name='Login' component={Login} options={{ gestureEnabled: false }}/>
        <Stack.Screen name='Register' component={Register} options={{ gestureEnabled: false }}/>
        <Stack.Screen name='Main' component={MainTabs} options={{ gestureEnabled: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <StatusBar barStyle='light-content'/>
        <AppNavigator/>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default App;
