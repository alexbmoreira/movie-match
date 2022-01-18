import { createStackNavigator } from '@react-navigation/stack';
import { FriendsList } from 'pages/lists';
import { MatchScreen } from 'pages/match';
import { MovieDetails } from 'pages/movie_details';
import React from 'react';
import screenOptions from './screenOptions';

const MatchNavigator = createStackNavigator();

const MatchStack = ({ route }) => {
  return (
    <MatchNavigator.Navigator screenOptions={screenOptions}>
      <MatchNavigator.Screen
        name='FriendsList'
        component={FriendsList}
        initialParams={route.params}
        options={{
          headerLeft: () => null,
          title: 'Watch A Movie'
        }}
      />
      <MatchNavigator.Screen
        name='MatchScreen'
        component={MatchScreen}
        initialParams={route.params}
        options={{ title: '' }}
      />
      <MatchNavigator.Screen
        name='MovieDetails'
        component={MovieDetails}
        options={{ title: '' }}
      />
    </MatchNavigator.Navigator>
  );
};

export default MatchStack;
