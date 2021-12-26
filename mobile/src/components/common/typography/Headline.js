import React from 'react';
import { StyleSheet } from 'react-native';
import { Text as Txt } from 'react-native-paper';

const defaultStyle = StyleSheet.create({
  headline: {
    fontSize: 26,
    lineHeight: 32,
    marginVertical: 2,
  }
});

const Headline = ({ style, children }) => {
  return (
    <Txt style={[style, defaultStyle.headline]}>{children}</Txt>
  );
};

export default Headline;