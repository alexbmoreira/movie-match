import React from "react";
import { View } from "react-native";
import { TextInput as Input } from "react-native-paper";
import ErrorMessage from './ErrorMessage';

const TextInput = ({placeholder, value, onChange, errorMessage, ...rest}) => {
  return(
    <View>
      <Input placeholder={placeholder} value={value} onChangeText={onChange} {...rest}/>
      {errorMessage && <ErrorMessage message={errorMessage[0]}/>}
    </View>
  )
}

export default TextInput
