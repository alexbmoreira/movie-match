import { createStackNavigator } from '@react-navigation/stack';
import { MovieDetails } from 'pages/movie_details';
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
      />
    </SearchNavigator.Navigator>
  );
};

export default SearchStack;
