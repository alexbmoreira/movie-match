import React from 'react';
import { StyleSheet, View } from 'react-native';
import theme from 'shared/theme';
import { Text } from './typography';

const _style = StyleSheet.create({
  errorMessage: {
    color: theme.colors.error
  }
});

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return(
    <View>
      <Text style={_style.errorMessage}>{message}</Text>
    </View>
  );
};

export default ErrorMessage;
