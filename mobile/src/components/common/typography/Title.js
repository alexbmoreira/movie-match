import React from 'react';
import { StyleSheet } from 'react-native';
import { Text as Txt } from 'react-native-paper';

const defaultStyle = StyleSheet.create({
  title: {
    fontSize: 22,
    lineHeight: 30,
    marginVertical: 2,
    letterSpacing: 0.15
  }
});

const Title = ({ style, children }) => {
  return (
    <Txt style={[style, defaultStyle.title]}>{children}</Txt>
  );
};

export default Title;
