import { createStackNavigator } from '@react-navigation/stack';
import { ProfileFriendsList, Watchlist } from 'pages/lists';
import { MovieDetails } from 'pages/movie_details';
import { ProfilePage } from 'pages/profile';
import { SearchPage } from 'pages/search';
import React from 'react';
import screenOptions from './screenOptions';

const SearchNavigator = createStackNavigator();

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
        options={{ title: '' }}
      />
      <SearchNavigator.Screen
        name='OtherProfile'
        component={ProfilePage}
        initialParams={route.params}
        options={{ title: '' }}
      />
      <SearchNavigator.Screen
        name='ProfileFriendsList'
        component={ProfileFriendsList}
        initialParams={route.params}
        options={{ title: 'Friends' }}
      />
      <SearchNavigator.Screen
        name='Watchlist'
        component={Watchlist}
        initialParams={route.params}
        options={{ title: 'Watchlist' }}
      />
    </SearchNavigator.Navigator>
  );
};

export default SearchStack;
