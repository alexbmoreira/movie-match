import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet } from 'react-native';
import { theme } from 'shared';
import { ProfileStack } from './StackNavigators';

const Tab = createBottomTabNavigator();

const style = StyleSheet.create({
  tabBarIcon: {
    color: theme.colors.text
  }
});

const screenOptions ={
  headerShown: false,
  tabBarActiveTintColor: theme.colors.text,
  tabBarInactiveTintColor: theme.colors.surface,
  tabBarStyle: {
    backgroundColor: theme.colors.screen
  }
};

const MainTabs = ({ route }) => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name='ProfileStack'
        component={ProfileStack}
        options={{
          title: 'Profile',
          tabBarIcon: () => <FontAwesomeIcon style={style.tabBarIcon} icon={faUser} size={24}/>
        }}
        initialParams={route.params}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
