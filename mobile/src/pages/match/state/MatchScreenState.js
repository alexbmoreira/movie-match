import { Icon, IconButton } from 'components/common';
import { action, makeObservable, observable } from 'mobx';
import React from 'react';
import { types, endpoints, theme } from 'shared';
import { TmdbMovie, User } from 'stores';
import { DomainStore } from 'shared/stores';

class MatchScreenState {
  store = new DomainStore();

  route;
  navigation;
  friendId;
  swiperRef;
  bottomSheetRef;

  errors = {};
  friend = {};
  jointWatchlist = [];

  constructor() {
    makeObservable(this, {
      errors: observable,
      friend: observable,
      jointWatchlist: observable,
      load: action.bound,
      likeMovie: action.bound
    });
  }

  receiveProps({ route, navigation }) {
    this.route = route;
    this.navigation = navigation;
    this.friendId = route.params.friendId;
  }

  mount() {
    this.swiperRef = React.createRef();
    this.bottomSheetRef = React.createRef();
  }

  async load() {
    await this.store._compose([
      endpoints.USER.with(this.friendId),
      endpoints.USER.JOINT_WATCHLIST.with(this.friendId)
    ]);

    this.friend = new User(this.store._getSingle(types.USER, { id: this.friendId }));
    this.jointWatchlist = this.store._getAll(types.TMDB.MOVIE, TmdbMovie);
  }

  navigationConfig() {
    this.navigation.setOptions({
      title: this.friend.username,
      headerRight: () => (
        <IconButton
          style={{ marginRight: 10 }}
          icon={({ size, color }) => (
            <Icon name='menu' size={size} color={color} />
          )}
          onPress={() => {
            this.bottomSheetRef.current?.expand();
          }}
          color={theme.colors.primary}
          size={'sm'}
        />
      )
    });
  }

  async likeMovie(movieIndex) {
    await this.store.post(
      endpoints.MATCHLIST_LIKES,
      types.MATCHLIST_ACTIONS,
      { friendId: this.friendId, movieId: this.jointWatchlist[movieIndex].id }
    );
  }

  async dislikeMovie(movieIndex) {
    await this.store.post(
      endpoints.MATCHLIST_DISLIKES,
      types.MATCHLIST_ACTIONS,
      { friendId: this.friendId, movieId: this.jointWatchlist[movieIndex].id }
    );
  }
}

export default MatchScreenState;
