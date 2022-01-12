import { createStackNavigator } from '@react-navigation/stack';
import { MatchScreen } from 'pages/match';
import React from 'react';
import screenOptions from './screenOptions';

const MatchNavigator = createStackNavigator();

const MatchStack = ({ route }) => {
  return (
    <MatchNavigator.Navigator screenOptions={screenOptions}>
      <MatchNavigator.Screen
        name='MatchScreen'
        component={MatchScreen}
        initialParams={route.params}
        options={{
          headerLeft: () => null
        }}
      />
    </MatchNavigator.Navigator>
  );
};

export default MatchStack;
