import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { theme } from 'shared';
import { MatchCardsIcon, SearchIcon, UserIcon } from 'shared/icons';
import { ProfileStack, SearchStack } from './stack_navigators';
import MatchStack from './stack_navigators/MatchStack';

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
        component={MatchStack}
        options={{
          title: 'Match',
          tabBarIcon: ({ size, color }) => <MatchCardsIcon color={color} size={size}/>
        }}
        initialParams={route.params}
      />
      <Tab.Screen
        name='SearchStack'
        component={SearchStack}
        options={{
          title: 'Search',
          tabBarIcon: ({ size, color }) => <SearchIcon color={color} size={size}/>
        }}
        initialParams={route.params}
      />
      <Tab.Screen
        name='ProfileStack'
        component={ProfileStack}
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => <UserIcon color={color} size={size}/>
        }}
        initialParams={route.params}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
