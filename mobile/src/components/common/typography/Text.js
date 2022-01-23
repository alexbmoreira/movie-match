import React from 'react';
import { StyleSheet } from 'react-native';
import { Text as Txt } from 'react-native-paper';
import { theme } from 'shared';

const _style = StyleSheet.create({
  text: {
    fontSize: 16
  },
  soft: {
    color: theme.colors.surface
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
  const activeStyles = [style, _style.text];
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
