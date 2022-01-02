import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet } from 'react-native';
import { theme } from 'shared';
import { SearchIcon, UserIcon } from 'shared/icons';
import { ProfileStack, SearchStack } from './stack_navigators';

const Tab = createBottomTabNavigator();

const style = StyleSheet.create({
  tabBarIcon: {
    color: theme.colors.text
  }
});

const screenOptions = {
  headerShown: false,
  tabBarActiveTintColor: theme.colors.text,
  tabBarInactiveTintColor: theme.colors.surface,
  tabBarStyle: {
    backgroundColor: theme.colors.backdrop,
    borderColor: 'transparent'
  },
  tabBarShowLabel: false
};

const MainTabs = ({ route }) => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name='SearchStack'
        component={SearchStack}
        options={{
          title: 'Search',
          tabBarIcon: ({ size, color }) => <SearchIcon style={style.tabBarIcon} color={color} size={size}/>
        }}
        initialParams={route.params}
      />
      <Tab.Screen
        name='ProfileStack'
        component={ProfileStack}
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => <UserIcon style={style.tabBarIcon} color={color} size={size}/>
        }}
        initialParams={route.params}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
