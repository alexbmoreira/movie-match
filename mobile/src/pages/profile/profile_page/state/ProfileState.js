import AsyncStorage from '@react-native-async-storage/async-storage';
import { profileApi } from 'api';
import { IconButton } from 'components/common';
import { action, makeObservable, observable } from 'mobx';
import React from 'react';
import { theme } from 'shared';
import { MenuIcon } from 'shared/icons';
import { User } from 'stores';

class ProfileState {
  userId;
  route;
  navigation;

  user = {};
  isCurrentUser = false;
  bottomSheetRef;

  constructor() {
    makeObservable(this, {
      user: observable,
      load: action.bound
    });
  }

  receiveProps({ route, navigation }) {
    this.route = route;
    this.navigation = navigation;
    this.userId = route.params.userId;
  }

  mount() {
    this.bottomSheetRef = React.createRef();
  }

  async load() {
    const response = await profileApi.getUser(this.userId);
    this.user = new User(response.data);
    
    const storedUser = await AsyncStorage.getItem('user');
    this.isCurrentUser = JSON.parse(storedUser).id === this.user.id;
  }

  navigationConfig() {
    this.navigation.setOptions({
      title: this.route.params.username,
      ...(!this.isCurrentUser && {
        headerRight: () => (
          <IconButton
            style={{ marginRight: 10 }}
            icon={({ size, color }) => (
              <MenuIcon size={size} color={color} />
            )}
            onPress={() => {
              this.bottomSheetRef.current?.snapTo(0);
            }}
            color={theme.colors.primary}
            size={'sm'}
          />
        )
      })
    });
  }

  sendFriendRequest() {
    console.log('send friend request');
    this.closeUserOptionsSheet();
  }

  openUserOptionsSheet() {
    this.bottomSheetRef.current?.snapTo(0);
  }

  closeUserOptionsSheet() {
    this.bottomSheetRef.current?.snapTo(1);
  }
}

export default ProfileState;
