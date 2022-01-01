import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton as Btn } from 'react-native-paper';

const defaultStyle = StyleSheet.create({
  iconButton: {
    margin: 0
  }
});

class Button extends React.Component {
  constructor() {
    super();
    extendObservable(this, { isDisabled: false });
  }

  onPress = async (e, cb) => {
    if (this.isDisabled) return null;

    e.preventDefault();
    this.isDisabled = true;
    this._handleCallback(e, cb);
  };

  _handleCallback = async (e, cb) => {
    try {
      await Promise.resolve(cb(e));
    } finally {
      this.isDisabled = false;
    }
  };

  render() {
    const { onPress, icon, style, color, ...rest } = this.props;
    // console.log(color);

    return(
      <View>
        <Btn
          icon={icon}
          onPress={async (e) => this.onPress(e, onPress)}
          style={[style, defaultStyle.iconButton]}
          disabled={this.isDisabled}
          color={color}
          {...rest}
        />
      </View>
    );
  }
}

export default observer(Button);
