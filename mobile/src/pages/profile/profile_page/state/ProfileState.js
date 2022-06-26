import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteRequest, getRequest, postRequest } from 'api';
import { Icon, IconButton } from 'components/common';
import _ from 'lodash';
import { action, computed, makeObservable, observable } from 'mobx';
import React from 'react';
import { endpoints, theme, types } from 'shared';
import { User } from 'stores';
import { DomainStore } from 'shared/stores';

class ProfileState {
  store = new DomainStore();

  userId;
  route;
  navigation;

  user = {};
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
    await this.store._compose([
      endpoints.USER.with(this.userId)
    ]);

    this.user = new User(
      this.store._getSingle(types.USER, { id: this.userId })
    );
  }
}

export default ProfileState;
