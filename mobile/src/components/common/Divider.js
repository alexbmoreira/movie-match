import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Divider as Div } from 'react-native-paper';
import { theme } from 'shared';

const _style = StyleSheet.create({
  dividerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  divider: {
    backgroundColor: theme.colors.surface,
  }
});

const Divider = ({ style, offset=15 }) => {
  return (
    <View style={_style.dividerContainer}>
      <Div style={[style, _style.divider, { width: Dimensions.get('window').width - offset }]}/>
    </View>
  );
};

export default Divider;
