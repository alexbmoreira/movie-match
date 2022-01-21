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
    width: Dimensions.get('window').width - 10,
  }
});

const Divider = ({ style }) => {
  return (
    <View style={_style.dividerContainer}>
      <Div style={[style, _style.divider]}/>
    </View>
  );
};

export default Divider;
