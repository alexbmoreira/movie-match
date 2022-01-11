import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import { View } from 'react-native';
import { Button as Btn } from 'react-native-paper';

class Button extends React.Component {
  constructor() {
    super();
    extendObservable(this, { isLoading: false });
  }

  onPress = async (e, cb) => {
    if (this.isLoading) return null;

    this.isLoading = true;
    this._handleCallback(e, cb);
  };

  _handleCallback = async (e, cb) => {
    try {
      await Promise.resolve(cb(e));
    } finally {
      this.isLoading = false;
    }
  };

  render() {
    const { onPress, children, style, ...rest } = this.props;

    return(
      <View style={style}>
        <Btn
          onPress={async (e) => this.onPress(e, onPress)}
          loading={this.isLoading}
          {...rest}
        >{children}</Btn>
      </View>
    );
  }
}

export default observer(Button);
