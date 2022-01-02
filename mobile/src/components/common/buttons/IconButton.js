import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import { PropTypes } from 'prop-types';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

const getIconSize = (size) => {
  switch (size) {
  case 'xs':
    return 18;
  case 'sm':
    return 24;
  case 'md':
    return 30;
  case 'lg':
    return 36;
  default:
    return 24;
  }
};

const defaultStyle = StyleSheet.create({
  iconButton: {
    margin: 0
  }
});

class IconButton extends React.Component {
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
    const { onPress, icon, style, color, size, ...rest } = this.props;

    const Icon = icon;
    const iconSize = getIconSize(size);

    return(
      <Pressable onPress={async (e) => this.onPress(e, onPress)} disabled={this.isDisabled}>
        <View style={[style, defaultStyle.iconButton]} {...rest}>
          <Icon color={color} size={iconSize}/>
        </View>
      </Pressable>
    );
  }
}

IconButton.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg'])
};

export default observer(IconButton);
