import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet } from 'react-native';
import { theme } from 'shared';
import { ProfileStack, SearchStack } from './StackNavigators';

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
    backgroundColor: theme.colors.screen
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
          tabBarIcon: ({ color }) => <FontAwesomeIcon style={style.tabBarIcon} icon={faSearch} color={color} size={24}/>
        }}
        initialParams={route.params}
      />
      <Tab.Screen
        name='ProfileStack'
        component={ProfileStack}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <FontAwesomeIcon style={style.tabBarIcon} icon={faUser} color={color} size={24}/>
        }}
        initialParams={route.params}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
