import { createStackNavigator } from '@react-navigation/stack';
import { Icon, IconButton } from 'components/common';
import { ProfileFriendsList, Watchlist } from 'pages/lists';
import { MovieDetails } from 'pages/movie_details';
import { ProfilePage, ProfileSettings } from 'pages/profile';
import React from 'react';
import { theme } from 'shared';
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
                <Icon name='settings' size={size} color={color} />
              )}
              onPress={() => navigate('ProfileSettings')}
              color={theme.colors.primary}
              size={'sm'}
            />
          ),
          title: ''
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
        options={{ title: '' }}
      />
      <ProfileNavigator.Screen
        name='ProfileFriendsList'
        component={ProfileFriendsList}
        initialParams={route.params}
        options={{ title: 'Friends' }}
      />
      <ProfileNavigator.Screen
        name='Watchlist'
        component={Watchlist}
        initialParams={route.params}
        options={{ title: 'Watchlist' }}
      />
      <ProfileNavigator.Screen
        name='MovieDetails'
        component={MovieDetails}
        options={{ title: '' }}
      />
    </ProfileNavigator.Navigator>
  );
};

export default ProfileStack;
