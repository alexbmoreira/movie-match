import { createStackNavigator } from '@react-navigation/stack';
import { ProfilePage } from 'pages/profile';
import { SearchPage } from 'pages/search';
import React from 'react';
import theme from 'shared/theme';

const ProfileNav = createStackNavigator();

const screenOptions = {
  headerStyle: {
    backgroundColor: theme.colors.screen,
  },
  headerTitleStyle: {
    color: theme.colors.text,
  },
};

const ProfileStack = ({ route }) => {
  return (
    <ProfileNav.Navigator screenOptions={screenOptions}>
      <ProfileNav.Screen
        name='Profile'
        component={ProfilePage}
        initialParams={route.params}
        options={{ headerLeft: () => null }}
      />
    </ProfileNav.Navigator>
  );
};

const SearchStack = ({ route }) => {
  return (
    <ProfileNav.Navigator screenOptions={screenOptions}>
      <ProfileNav.Screen
        name='Search'
        component={SearchPage}
        initialParams={route.params}
        options={{ headerLeft: () => null }}
      />
    </ProfileNav.Navigator>
  );
};

export {
  ProfileStack,
  SearchStack
};
