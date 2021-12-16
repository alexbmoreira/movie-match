import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ProfilePage from '../profile/ProfilePage';

const ProfileNav = createStackNavigator();


function ProfileStack() {
  return (
    <ProfileNav.Navigator>
      <ProfileNav.Screen name="Profile" component={ProfilePage} options={{ headerLeft: () => null }}/>
    </ProfileNav.Navigator>
  );
}

export default {
  ProfileStack,
};
