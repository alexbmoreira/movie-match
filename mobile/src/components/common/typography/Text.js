import React from 'react';
import { StyleSheet } from 'react-native';
import { Text as Txt } from 'react-native-paper';
import { theme } from 'shared';

const _style = StyleSheet.create({
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

const Text = ({ style, soft, italic, bold, large, children, ...rest }) => {
  const activeStyles = [style, _style.text];
  if(soft) activeStyles.push(_style.soft);
  if(italic) activeStyles.push(_style.italic);
  if(bold) activeStyles.push(_style.bold);
  if(large) activeStyles.push(_style.large);

  return (
    <Txt style={activeStyles} {...rest}>{children}</Txt>
  );
};

export default Text;
