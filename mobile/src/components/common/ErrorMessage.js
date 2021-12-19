import theme from '@shared/theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

const style = StyleSheet.create({
  errorMessage: {
    color: theme.colors.error
  }
});

const ErrorMessage = ({message}) => {
  if (!message) return null;

  return(
    <View>
      <Text style={style.errorMessage}>{message}</Text>
    </View>
  );
};

export default ErrorMessage;
