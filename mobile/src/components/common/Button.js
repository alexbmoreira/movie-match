import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import { View } from 'react-native';
import { Button as Btn } from 'react-native-paper';

class Button extends React.Component {
  constructor() {
    super();
    extendObservable(this, { loading: false });
  }

  onPress = async (e, cb) => {
    if (this.loading) return null;

    e.preventDefault();
    this.loading = true;
    this._handleCallback(e, cb);
  };

  _handleCallback = async (e, cb) => {
    try {
      await Promise.resolve(cb(e));
    } finally {
      this.loading = false;
    }
  };

  render() {
    const { onPress, children, ...rest } = this.props;

    return(
      <View>
        <Btn onPress={async (e) => this.onPress(e, onPress)} {...rest} loading={this.loading}>{children}</Btn>
      </View>
    );
  }
}

export default observer(Button);
