import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
// import { Icon } from 'components/common';
import React from 'react';
import { theme } from 'shared';
// import { ProfileStack, SearchStack } from './stack_navigators';
// import MatchStack from './stack_navigators/MatchStack';

const Tab = createBottomTabNavigator();

const screenOptions = {
  headerShown: false,
  tabBarActiveTintColor: theme.colors.primary,
  tabBarInactiveTintColor: theme.colors.text,
  tabBarStyle: {
    backgroundColor: theme.colors.surface,
    borderColor: 'transparent'
  },
  tabBarShowLabel: false
};

// const MainTabs = ({ route }) => {
//   return (
//     <Tab.Navigator screenOptions={screenOptions}>
//       <Tab.Screen
//         name='MatchStack'
//         component={MatchStack}
//         options={{
//           title: 'Match',
//           tabBarIcon: ({ size, color }) => <Icon name='match-cards' color={color} size={size}/>
//         }}
//         initialParams={route.params}
//       />
//       <Tab.Screen
//         name='SearchStack'
//         component={SearchStack}
//         options={{
//           title: 'Search',
//           tabBarIcon: ({ size, color }) => <Icon name='search' color={color} size={size}/>
//         }}
//         initialParams={route.params}
//       />
//       <Tab.Screen
//         name='ProfileStack'
//         component={ProfileStack}
//         options={{
//           title: 'Profile',
//           tabBarIcon: ({ size, color }) => <Icon name='user' color={color} size={size}/>
//         }}
//         initialParams={route.params}
//       />
//     </Tab.Navigator>
//   );
// };

const MainTabs = () => (
  <View/>
);

export default MainTabs;
