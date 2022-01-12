import { createStackNavigator } from '@react-navigation/stack';
import { FriendsList, MatchScreen } from 'pages/match';
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
          title: 'Friends List'
        }}
      />
      <MatchNavigator.Screen
        name='MatchScreen'
        component={MatchScreen}
        initialParams={route.params}
        options={{ title: '' }}
      />
    </MatchNavigator.Navigator>
  );
};

export default MatchStack;
