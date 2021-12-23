import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { theme } from 'shared';
import ErrorMessage from './ErrorMessage';

const style = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderColor: theme.colors.surface,
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    color: theme.colors.text,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderColor: theme.colors.surface,
    backgroundColor: theme.colors.surface,
    borderRadius: 10,
    color: theme.colors.text,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  iconContainer: {
    top: 10,
    right: 15,
  },
});

const Select = ({ items, value, onValueChange, onDonePress, errorMessage, ...rest }) => {
  return(
    <View>
      <RNPickerSelect
        style={style}
        useNativeAndroidPickerStyle={false}
        onValueChange={(value) => onValueChange(value)}
        onDonePress={onDonePress}
        placeholder={{}}
        value={value}
        items={items}
        Icon={() => <FontAwesomeIcon icon={faChevronDown} size={16} color={theme.colors.text} />}
        {...rest}
      />
      {errorMessage && <ErrorMessage message={errorMessage[0]}/>}
    </View>
  );
};

export default Select;
