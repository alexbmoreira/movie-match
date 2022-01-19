import { PropTypes } from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from 'shared';

const getSurfaceSize = (size) => {
  switch (size) {
  case 'xs':
    return 24;
  case 'sm':
    return 36;
  case 'md':
    return 48;
  case 'lg':
    return 72;
  default:
    return 72;
  }
};

const _style = StyleSheet.create((_size) => {
  const size = getSurfaceSize(_size);
  return {
    surface: {
      display: 'flex',
      marginVertical: 10,
      width: size,
      height: size,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: size / 2,
      shadowColor: 'rgba(0, 0, 0, 0.5)',
      shadowOffset: {
        width: 0,
        height: 0.5
      },
      shadowOpacity:0.3,
    }
  };
});

const Surface = ({ size, style, children }) => {
  return (
    <View style={[style, _style(size).surface]}>
      {children}
    </View>
  );
};

Surface.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg'])
};

export default Surface;
