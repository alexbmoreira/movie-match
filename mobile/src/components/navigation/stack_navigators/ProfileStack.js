import { createStackNavigator } from '@react-navigation/stack';
import { IconButton } from 'components/common';
import { MovieDetails } from 'pages/movie_details';
import { ProfilePage, ProfileSettings } from 'pages/profile';
import React from 'react';
import { theme } from 'shared';
import { SettingsIcon } from 'shared/icons';
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
            <IconButton
              style={{ marginRight: 10 }}
              icon={({ size, color }) => (
                <SettingsIcon size={size} color={color} />
              )}
              onPress={() => navigate('ProfileSettings')}
              color={theme.colors.primary}
            />
          )
        }}
      />
      <ProfileNavigator.Screen
        name='ProfileSettings'
        component={ProfileSettings}
        initialParams={route.params}
        options={{ title: 'Settings' }}
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
