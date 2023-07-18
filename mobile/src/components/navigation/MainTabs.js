import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { Icon } from 'components/common';
import React from 'react';
import { theme } from 'shared';
import { ProfileStack } from './stack_navigators';
// import { ProfileStack, SearchStack, MatchStack } from './stack_navigators';

const Tab = createBottomTabNavigator();

const screenOptions = {
  headerShown: false,
  tabBarActiveTintColor: theme.colors.primary,
  tabBarInactiveTintColor: theme.colors.text,
  tabBarStyle: {
    backgroundColor: theme.colors.surface,
    borderColor: 'transparent'
  },
  tabBarShowLabel: false
};

const MainTabs = ({ route }) => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name='MatchStack'
        component={View}
        options={{
          title: 'Match',
          tabBarIcon: ({ size, color }) => <Icon name='match-cards' color={color} size={size}/>
        }}
        initialParams={route.params}
      />
      <Tab.Screen
        name='SearchStack'
        component={View}
        options={{
          title: 'Search',
          tabBarIcon: ({ size, color }) => <Icon name='search' color={color} size={size}/>
        }}
        initialParams={route.params}
      />
      <Tab.Screen
        name='ProfileStack'
        component={ProfileStack}
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => <Icon name='user' color={color} size={size}/>
        }}
        initialParams={route.params}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
