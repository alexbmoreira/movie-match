import React from 'react';
import { StyleSheet, TextInput as Input, View } from 'react-native';
import { theme } from 'shared';
import ErrorMessage from './ErrorMessage';

const _style = StyleSheet.create({
  textInput: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderColor: theme.colors.surface,
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    color: theme.colors.text
  },
  withIcon: {
    paddingRight: 30, // to ensure the text is never behind the icon
  }
});

const TextInput = ({ placeholder, value, onChange, errorMessage, ...rest }) => {
  return(
    <View>
      <Input
        style={_style.textInput}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        mode='outlined'
        autoCapitalize='none'
        autoCorrect={false}
        {...rest}
      />
      {errorMessage && <ErrorMessage message={errorMessage[0]}/>}
    </View>
  );
};

export default TextInput;
