import { action, makeObservable, observable, computed } from 'mobx';
import React from 'react';
import { endpoints, types } from 'shared';
import { User, WatchlistMovie, FriendRequest, Friendship } from 'stores';
import { authStore, DomainStore } from 'shared/stores';
import _ from 'lodash';

class ProfileState {
  store = new DomainStore();

  userId;
  route;
  navigation;

  user = {};
  watchlist = [];
  friendRequest = {};
  friendship = {};
  bottomSheetRef;

  constructor() {
    makeObservable(this, {
      user: observable,
      watchlist: observable,
      friendRequest: observable,
      friendship: observable,
      load: action.bound,
      unfriend: action,
      isCurrentUser: computed
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
    await this.store._compose([
      endpoints.USER.with(this.userId),
      endpoints.USER.WATCHLIST.with(this.userId),
      endpoints.FRIEND_REQUESTS.with(this.userId),
      endpoints.FRIENDSHIPS.with(this.userId)
    ]);

    this.user = new User(
      this.store._getSingle(types.USER, { id: this.userId })
    );

    this.watchlist = this.store._getAll(types.WATCHLIST_MOVIE, WatchlistMovie);

    const friendRequest = this.store._getSingle(types.FRIEND_REQUEST);
    if (friendRequest) this.friendRequest = new FriendRequest(friendRequest);
    
    const friendship = this.store._getSingle(types.FRIENDSHIP);
    if (friendship) this.friendship = new Friendship(friendship);
  }

  navigationConfig() {
    this.navigation.setOptions({ title: this.user.username });
  }

  async unfriend() {
    // TODO - Error handling
    await this.store.destroy(this.friendship);
    this.friendship = {};
  }

  async sendFriendRequest() {
    // TODO - Error handling
    const { model } = await this.store.post(
      endpoints.FRIEND_REQUESTS.ALL,
      types.FRIEND_REQUEST,
      { receiverId: this.userId }
    );
    this.friendRequest = new FriendRequest(model);
  }

  async deleteFriendRequest() {
    // TODO - Error handling
    await this.store.destroy(this.friendRequest);
    this.friendRequest = {};
  }

  async acceptFriendRequest() {
    // TODO - Error handling
    const { model } = await this.store.post(
      endpoints.FRIEND_REQUESTS.ACCEPT.with(this.friendRequest.id),
      types.FRIENDSHIP
    );
    this.friendRequest = {};
    this.friendship = new Friendship(model);
  }

  get profileListPages() {
    const links = [
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

    if (this.isCurrentUser) {
      links.push({
        value: 'Friend Requests',
        navigate: 'ProfileFriendRequestsList'
      });
    }

    return links;
  }

  get isCurrentUser() {
    return this.user.id === authStore.user.id;
  }

  get isFriend() {
    return !_.isEmpty(this.friendship);
  }

  get isRequestingFriendship() {
    return !!this.friendRequest.creator && this.friendRequest.creator.id === this.userId;
  }

  get hasReceivedFriendRequest() {
    return !!this.friendRequest.receiver && this.friendRequest.receiver.id === this.userId;
  }
}

export default ProfileState;
