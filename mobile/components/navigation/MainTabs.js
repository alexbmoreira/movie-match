import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Text, View } from 'react-native';


// const screenOptions = ({ route }) => ({
//   tabBarIcon: ({ focused, color, size }) => {
//     let iconName;
//     let custom;

//     switch (route.name) {
//       case 'HomeStack':
//         iconName = 'home';
//         custom = false;
//         break;
//       case 'SearchStack':
//         iconName = 'search';
//         custom = false;
//         break;
//       case 'CreateDrinkStack':
//         iconName = 'plus-square';
//         custom = false;
//         break;
//       case 'OnTapStack':
//         iconName = 'on-tap';
//         custom = true;
//         break;
//       case 'ProfileStack':
//         iconName = 'user-circle';
//         custom = false;
//         break;
//     }

//     return custom ? <BarCartIcons name={iconName} size={size} color={color} /> : <FontAwesome name={iconName} size={size} color={color} />;
//   },
// });

const Temp = () => {
  return (
    <View>
      <Text>Open up App.js to start working on your app</Text>
    </View>
  )
}

const Tab = createBottomTabNavigator();

function MainTabs() {

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeStack"
        component={Temp}
        options={{
          title: 'Home',
        }}
      />
      {/* <Tab.Screen
        name="SearchStack"
        component={Stacks.SearchStack}
        options={{
          title: 'Search',
        }}
      />
      <Tab.Screen
        name="CreateDrinkStack"
        component={Stacks.CreateDrinkStack}
        options={{
          title: 'Create Drink',
        }}
      />
      <Tab.Screen
        name="OnTapStack"
        component={Stacks.OnTapStack}
        options={{
          title: 'On Tap',
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={Stacks.ProfileStack}
        options={{
          title: 'Profile',
        }}
      /> */}
    </Tab.Navigator>
  );
}

export default MainTabs;
