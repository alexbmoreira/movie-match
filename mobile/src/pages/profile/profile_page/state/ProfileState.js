// import { deleteRequest, getRequest, postRequest } from 'api';
// import { Icon, IconButton } from 'components/common';
// import _ from 'lodash';
import { action, makeObservable, observable, computed } from 'mobx';
import React from 'react';
import { endpoints, types } from 'shared';
import { User, WatchlistMovie } from 'stores';
import { authStore, DomainStore } from 'shared/stores';

class ProfileState {
  store = new DomainStore();

  userId;
  route;
  navigation;

  user = {};
  watchlist = [];
  bottomSheetRef;

  constructor() {
    makeObservable(this, {
      user: observable,
      watchlist: observable,
      load: action.bound,
      isCurrentUser: computed,
      isFocused: computed
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
      endpoints.USER.WATCHLIST.with(this.userId)
    ]);

    this.user = new User(
      this.store._getSingle(types.USER, { id: this.userId })
    );

    this.watchlist = this.store._getAll(types.WATCHLIST_MOVIE, WatchlistMovie);
  }

  navigationConfig() {
    this.navigation.setOptions({ title: this.user.username });
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

  get isFocused() {
    return this.navigation.isFocused();
  }
}

export default ProfileState;
