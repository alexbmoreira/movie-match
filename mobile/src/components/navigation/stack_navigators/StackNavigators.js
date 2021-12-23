import { createStackNavigator } from '@react-navigation/stack';
import { MovieDetails } from 'pages/movie_details';
import { ProfilePage } from 'pages/profile';
import { SearchPage } from 'pages/search';
import React from 'react';
import screenOptions from './screenOptions';

const ProfileNavigator = createStackNavigator();
const SearchNavigator = createStackNavigator();

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

const SearchStack = ({ route }) => {
  return (
    <SearchNavigator.Navigator screenOptions={screenOptions}>
      <SearchNavigator.Screen
        name='Search'
        component={SearchPage}
        initialParams={route.params}
        options={{
          headerLeft: () => null
        }}
      />
      <SearchNavigator.Screen
        name='MovieDetails'
        component={MovieDetails}
      />
    </SearchNavigator.Navigator>
  );
};

export {
  ProfileStack,
  SearchStack
};
