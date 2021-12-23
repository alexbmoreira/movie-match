import React from 'react';
import { StyleSheet } from 'react-native';
import { Text as Txt } from 'react-native-paper';

const defaultStyle = StyleSheet.create({
  text: {

  }
});

const Text = ({ style, children }) => {
  return (
    <Txt style={[style, defaultStyle.text]}>{children}</Txt>
  );
};

export default Text;
