import React from 'react';
import { StyleSheet } from 'react-native';
import { Divider as Div } from 'react-native-paper';
import { theme } from 'shared';

const defaultStyle = StyleSheet.create({
  divider: {
    backgroundColor: theme.colors.surface
  }
});

const Divider = ({ style }) => {
  return (
    <Div style={[style, defaultStyle.divider]}/>
  );
};

export default Divider;
