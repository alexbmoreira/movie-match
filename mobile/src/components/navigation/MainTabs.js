import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet } from 'react-native';
import { theme } from 'shared';
import { MatchCardsIcon, SearchIcon, UserIcon } from 'shared/icons';
import { ProfileStack, SearchStack } from './stack_navigators';
import MatchStack from './stack_navigators/MatchStack';

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
        name='MatchStack'
        component={MatchStack}
        options={{
          title: 'Match',
          tabBarIcon: ({ size, color }) => <MatchCardsIcon style={style.tabBarIcon} color={color} size={size}/>
        }}
        initialParams={route.params}
      />
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
