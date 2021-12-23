import React from 'react';
import { StyleSheet } from 'react-native';
import { Text as Txt } from 'react-native-paper';
import { theme } from 'shared';

const defaultStyle = StyleSheet.create({
  text: {

  },
  soft: {
    color: theme.colors.surface
  },
  italic: {
    fontStyle: 'italic'
  }
});

const Text = ({ style, soft, italic, children }) => {
  const activeStyles = [style, defaultStyle.text];
  if(soft) activeStyles.push(defaultStyle.soft);
  if(italic) activeStyles.push(defaultStyle.italic);

  return (
    <Txt style={activeStyles}>{children}</Txt>
  );
};

export default Text;
