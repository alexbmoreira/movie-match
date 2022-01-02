import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'components/common';
import { MovieDetails } from 'pages/movie_details';
import { ProfilePage, ProfileSettings } from 'pages/profile';
import React from 'react';
import { navigate } from 'shared/RootNavigation';
import screenOptions from './screenOptions';

const ProfileNavigator = createStackNavigator();

const ProfileStack = ({ route }) => {
  return (
    <ProfileNavigator.Navigator screenOptions={screenOptions}>
      <ProfileNavigator.Screen
        name='Profile'
        component={ProfilePage}
        initialParams={route.params}
        options={{
          headerLeft: () => null,
          headerRight: () => (
            <Button mode='contained' onPress={() => navigate('ProfileSettings')}>
              Settings
            </Button>
          )
        }}
      />
      <ProfileNavigator.Screen
        name='ProfileSettings'
        component={ProfileSettings}
        initialParams={route.params}
      />
      <ProfileNavigator.Screen
        name='OtherProfile'
        component={ProfilePage}
        initialParams={route.params}
      />
      <ProfileNavigator.Screen
        name='MovieDetails'
        component={MovieDetails}
      />
    </ProfileNavigator.Navigator>
  );
};

export default ProfileStack;
