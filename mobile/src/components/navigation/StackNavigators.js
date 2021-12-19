import { ProfilePage } from '@pages/profile';
import { createStackNavigator } from '@react-navigation/stack';
import theme from '@shared/theme';
import React from 'react';

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

export {
  ProfileStack,
};