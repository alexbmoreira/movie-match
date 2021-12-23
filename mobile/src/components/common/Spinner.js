import React from 'react';
import { StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import theme from 'shared/theme';

const style = StyleSheet.create({
  spinner: {
    display: 'flex',
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10
  }
});

const Spinner = () => {
  return (
    <ActivityIndicator style={style.spinner} size={36} animating={true} color={theme.colors.primary} />
  );
};

export default Spinner;
