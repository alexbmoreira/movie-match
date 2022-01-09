import AsyncStorage from '@react-native-async-storage/async-storage';
import { friendApi, profileApi } from 'api';
import { IconButton } from 'components/common';
import { action, computed, makeObservable, observable } from 'mobx';
import React from 'react';
import { theme } from 'shared';
import { MenuIcon } from 'shared/icons';
import { FriendRequest, Friendship, User } from 'stores';

class ProfileState {
  userId;
  route;
  navigation;

  user = {};
  friendRequest = {};
  friendship = {};
  isCurrentUser = false;
  bottomSheetRef;

  constructor() {
    makeObservable(this, {
      user: observable,
      friendRequest: observable,
      friendship: observable,
      load: action.bound,
      userRequesting: computed,
      userRequested: computed,
      userIsAFriend: computed
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
    const user = await profileApi.getUser(this.userId);
    this.user = new User(user.data);
    
    const storedUser = await AsyncStorage.getItem('user');
    this.isCurrentUser = JSON.parse(storedUser).id === this.user.id;

    if(!this.isCurrentUser) {
      const friendRequest = await friendApi.getFriendRequest(this.userId);
      this.friendRequest = new FriendRequest(friendRequest.data);
      const friendship = await friendApi.getFriendship(this.userId);
      this.friendship = new Friendship(friendship.data);
    }
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

  acceptFriendRequest() {
    console.log('accept friend request');
    this.closeUserOptionsSheet();
  }

  declineFriendRequest() {
    console.log('decline friend request');
    this.closeUserOptionsSheet();
  }

  removeFriend() {
    console.log('remove friend');
    this.closeUserOptionsSheet();
  }

  openUserOptionsSheet() {
    this.bottomSheetRef.current?.snapTo(0);
  }

  closeUserOptionsSheet() {
    this.bottomSheetRef.current?.snapTo(1);
  }

  get userRequesting() {
    return this.friendRequest.toJS().receiver &&
      this.friendRequest.receiver.id === this.user.id;
  }

  get userRequested() {
    return this.friendRequest.toJS().creator &&
      this.friendRequest.creator.id === this.user.id;
  }

  get userIsAFriend() {
    return !!(this.friendship.toJS().user || this.friendship.toJS().friend);
  }
}

export default ProfileState;
