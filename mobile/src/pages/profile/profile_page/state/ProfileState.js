import { profileApi } from 'api';
import { IconButton } from 'components/common';
import { action, makeObservable, observable } from 'mobx';
import React from 'react';
import { theme } from 'shared';
import { MenuIcon } from 'shared/icons';
import { navigate } from 'shared/RootNavigation';
import { User } from 'stores';

class ProfileState {
  userId;
  route;
  navigation;

  user = {};

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

  async load() {
    const response = await profileApi.getUser(this.userId);
    this.user = new User(response.data);
  }

  navigationConfig() {
    this.navigation.setOptions({
      title: this.route.params.username,
      headerRight: () => (
        <IconButton
          style={{ marginRight: 10 }}
          icon={({ size, color }) => (
            <MenuIcon size={size} color={color} />
          )}
          onPress={() => navigate('ProfileSettings')}
          color={theme.colors.primary}
          size={'sm'}
        />
      )
    });
  }
}

export default ProfileState;
