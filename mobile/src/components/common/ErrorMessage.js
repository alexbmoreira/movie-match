import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

const ErrorMessage = ({message}) => {
  if (!message) return null;

  return(
    <View>
      <Text>{message}</Text>
    </View>
  )
}

export default ErrorMessage
