import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';

import DrinkDetail from '../../pages/DrinkDetail';
import Home from '../../pages/Home';
import Search from '../../pages/Search';
import CreateDrink from '../../pages/CreateDrink';
import YourDrinks from '../../pages/YourDrinks';
import OnTap from '../../pages/OnTap';
import EditOnHand from '../../pages/EditOnHand';
import Profile from '../../pages/Profile';
import ProfileSettings from '../../pages/ProfileSettings';

import Spacer from '../theme/Spacer';

import BarCartTheme from '../../BarCartTheme';

const HomeNav = createStackNavigator();
const SearchNav = createStackNavigator();
const CreateDrinkNav = createStackNavigator();
const OnTapNav = createStackNavigator();
const ProfileNav = createStackNavigator();

const colors = BarCartTheme.theme.colors;

const headerOptions = {
  headerStyle: {
    backgroundColor: colors.primary,
  },
  headerTitleStyle: {
    color: colors.background,
  },
};

function HomeStack() {
  return (
    <HomeNav.Navigator>
      <HomeNav.Screen name="Home" component={Home} options={{ ...headerOptions, headerLeft: () => null }} />
      <HomeNav.Screen name="DrinkDetail" component={DrinkDetail} options={headerOptions} />
    </HomeNav.Navigator>
  );
}

function SearchStack() {
  return (
    <SearchNav.Navigator>
      <SearchNav.Screen name="Search" component={Search} options={{ ...headerOptions, headerLeft: () => null }} />
      <SearchNav.Screen name="DrinkDetail" component={DrinkDetail} options={headerOptions} />
    </SearchNav.Navigator>
  );
}

function CreateDrinkStack() {
  return (
    <CreateDrinkNav.Navigator>
      <CreateDrinkNav.Screen name="CreateDrink" component={CreateDrink} options={{ ...headerOptions, headerLeft: () => null }} />
      <SearchNav.Screen name="YourDrinks" component={YourDrinks} options={{ ...headerOptions, title: 'Your Drinks' }} />
      <SearchNav.Screen name="DrinkDetail" component={DrinkDetail} options={headerOptions} />
    </CreateDrinkNav.Navigator>
  );
}

function OnTapStack() {
  return (
    <OnTapNav.Navigator>
      <OnTapNav.Screen name="OnTap" component={OnTap} options={{ ...headerOptions, headerLeft: () => null }} />
      <OnTapNav.Screen name="EditOnHand" component={EditOnHand} options={headerOptions} />
      <OnTapNav.Screen name="DrinkDetail" component={DrinkDetail} options={headerOptions} />
    </OnTapNav.Navigator>
  );
}

function ProfileStack() {
  return (
    <ProfileNav.Navigator>
      <ProfileNav.Screen
        name="Profile"
        component={Profile}
        options={({ navigation }) => ({
          ...headerOptions,
          headerLeft: () => null,
          headerRight: () => (
            <Spacer x amount={24}>
              <FontAwesome name="gear" size={32} color={colors.surface} onPress={() => navigation.navigate('ProfileSettings')} />
            </Spacer>
          ),
        })}
      />
      <ProfileNav.Screen name="ProfileSettings" component={ProfileSettings} options={headerOptions} />
      <ProfileNav.Screen name="DrinkDetail" component={DrinkDetail} options={headerOptions} />
      <OnTapNav.Screen name="EditOnHand" component={EditOnHand} options={headerOptions} />
      <OnTapNav.Screen name="OnTap" component={OnTap} options={headerOptions} />
    </ProfileNav.Navigator>
  );
}

export default {
  HomeStack,
  SearchStack,
  CreateDrinkStack,
  OnTapStack,
  ProfileStack,
};
