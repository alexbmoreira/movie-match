import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteRequest, getRequest, postRequest } from 'api';
import { Icon, IconButton } from 'components/common';
import _ from 'lodash';
import { action, computed, makeObservable, observable } from 'mobx';
import React from 'react';
import { endpoints, theme } from 'shared';
import { FriendRequest, Friendship, Movie, User } from 'stores';

class ProfileState {
  userId;
  route;
  navigation;
  currentUser;

  user = {};
  friends = {};
  watchlist = {};
  friendRequest = {};
  friendship = {};
  bottomSheetRef;

  constructor() {
    makeObservable(this, {
      user: observable,
      friends: observable,
      watchlist: observable,
      friendRequest: observable,
      friendship: observable,
      load: action.bound,
      sendFriendRequest: action.bound,
      acceptFriendRequest: action.bound,
      deleteFriendRequest: action.bound,
      removeFriend: action.bound,
      userRequesting: computed,
      userRequested: computed,
      userIsAFriend: computed,
      isCurrentUser: computed,
      profileListPages: computed
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
    const user = await getRequest(endpoints.PROFILE.with(this.userId));
    this.user = new User(user);
    const watchlist = await getRequest(endpoints.WATCHLIST.with(this.userId));
    this.watchlist = _.map(watchlist.results, movie => new Movie(movie));
    const friends = await getRequest(endpoints.FRIENDS.with(this.userId));
    this.friends = _.map(friends.results, friend => new User(friend));
    
    const storedUser = await AsyncStorage.getItem('user');
    this.currentUser = new User(JSON.parse(storedUser));
    
    if(!this.isCurrentUser) {
      const friendRequest = await getRequest(endpoints.FRIEND_REQUEST.WITH_USER.with(this.userId));
      this.friendRequest = new FriendRequest(friendRequest);

      const friendship = await getRequest(endpoints.FRIENDSHIP.WITH_USER.with(this.userId));
      this.friendship = new Friendship(friendship);
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
              <Icon name='menu' size={size} color={color} />
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

  async sendFriendRequest() {
    // TODO - Error handling
    const currentUser = await AsyncStorage.getItem('user');
    const payload = { creator_id: JSON.parse(currentUser).id, receiver_id: this.user.id };

    const friendRequest = await postRequest(endpoints.FRIEND_REQUESTS, payload);
    this.friendRequest = new FriendRequest(friendRequest);
    this.closeUserOptionsSheet();
  }

  async acceptFriendRequest() {
    // TODO - Error handling
    const friendship = await postRequest(endpoints.FRIEND_REQUEST.ACCEPT.with(this.friendRequest.id));
    this.friendship = new Friendship(friendship);
    this.friendRequest = null;
    this.closeUserOptionsSheet();
  }

  async deleteFriendRequest() {
    await deleteRequest(endpoints.FRIEND_REQUEST.with(this.friendRequest.id));
    this.friendRequest = null;
    this.closeUserOptionsSheet();
  }

  async removeFriend() {
    await deleteRequest(endpoints.FRIENDSHIP.with(this.friendship.id));
    this.friendship = null;
    this.closeUserOptionsSheet();
  }

  openUserOptionsSheet() {
    this.bottomSheetRef.current?.snapTo(0);
  }

  closeUserOptionsSheet() {
    this.bottomSheetRef.current?.snapTo(1);
  }

  get userRequested() {
    return this.friendRequest?.toJS().receiver &&
      this.friendRequest.receiver.id === this.user.id;
  }

  get userRequesting() {
    return this.friendRequest?.toJS().creator &&
      this.friendRequest.creator.id === this.user.id;
  }

  get userIsAFriend() {
    return !!this.friendship?.toJS().id;
  }

  get isCurrentUser() {
    return this.currentUser.id === this.user.id;
  }

  get profileListPages() {
    return [
      {
        value: 'Friends',
        navigate: 'ProfileFriendsList',
        params: { userId: this.userId }
      },
      {
        value: 'Watchlist',
        navigate: 'Watchlist',
        params: { userId: this.userId }
      }
    ];
  }
}

export default ProfileState;
