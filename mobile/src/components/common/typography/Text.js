import React from 'react';
import { StyleSheet } from 'react-native';
import { Text as Txt } from 'react-native-paper';
import { theme } from 'shared';

const _style = StyleSheet.create({
  text: {
    color: theme.colors.text,
    fontSize: 16
  },
  soft: {
    opacity: 0.25
  },
  italic: {
    fontStyle: 'italic'
  },
  bold: {
    fontWeight: '700'
  },
  large: {
    fontSize: 20
  },
  small: {
    fontSize: 14
  }
});

const Text = ({ style, soft, italic, bold, large, small, children, ...rest }) => {
  const activeStyles = [_style.text, style];
  if(soft) activeStyles.push(_style.soft);
  if(italic) activeStyles.push(_style.italic);
  if(bold) activeStyles.push(_style.bold);
  if(large) activeStyles.push(_style.large);
  if(small) activeStyles.push(_style.small);

  return (
    <Txt style={activeStyles} {...rest}>{children}</Txt>
  );
};

export default Text;
