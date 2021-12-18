import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import theme from '@shared/theme';
import React from 'react';
import { ProfileStack } from './StackNavigators';

const Tab = createBottomTabNavigator();

const screenOptions ={
  headerShown: false,
  tabBarActiveTintColor: theme.colors.primary,
  tabBarInactiveTintColor: theme.colors.surface,
  tabBarStyle: {
    backgroundColor: theme.colors.screen,
  }
}

const MainTabs = ({ route }) => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name='ProfileStack'
        component={ProfileStack}
        options={{
          title: 'Profile',
        }}
        initialParams={route.params}
      />
    </Tab.Navigator>
  );
}

export default MainTabs;
