import React from 'react';
import { StyleSheet } from 'react-native';
import { Text as Txt } from 'react-native-paper';
import { theme } from 'shared';

const defaultStyle = StyleSheet.create({
  text: {
    fontSize: 15
  },
  soft: {
    color: theme.colors.surface
  },
  italic: {
    fontStyle: 'italic'
  },
  bold: {
    marginVertical: 2,
    fontWeight: '700'
  },
  large: {
    fontSize: 18
  }
});

const Text = ({ style, soft, italic, bold, large, children }) => {
  const activeStyles = [style, defaultStyle.text];
  if(soft) activeStyles.push(defaultStyle.soft);
  if(italic) activeStyles.push(defaultStyle.italic);
  if(bold) activeStyles.push(defaultStyle.bold);
  if(large) activeStyles.push(defaultStyle.large);

  return (
    <Txt style={activeStyles}>{children}</Txt>
  );
};

export default Text;
