import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Stacks from './StackNavigators';

const Tab = createBottomTabNavigator();

function MainTabs() {

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="ProfileStack"
        component={Stacks.ProfileStack}
        options={{
          title: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTabs;
