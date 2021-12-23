import { createStackNavigator } from '@react-navigation/stack';
import { ProfilePage } from 'pages/profile';
import React from 'react';
import screenOptions from './screenOptions';

const ProfileNavigator = createStackNavigator();

const ProfileStack = ({ route }) => {
  return (
    <ProfileNavigator.Navigator screenOptions={screenOptions}>
      <ProfileNavigator.Screen
        name='Profile'
        component={ProfilePage}
        initialParams={route.params}
        options={{ headerLeft: () => null }}
      />
    </ProfileNavigator.Navigator>
  );
};

export default ProfileStack;
