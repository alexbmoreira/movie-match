import React from 'react';
import { StyleSheet } from 'react-native';
import { Text as Txt } from 'react-native-paper';
import { theme } from 'shared';

const _style = StyleSheet.create({
  title: {
    color: theme.colors.text,
    fontSize: 22,
    lineHeight: 30,
    marginVertical: 2,
    letterSpacing: 0.15
  },
  italic: {
    fontStyle: 'italic'
  },
  bold: {
    fontWeight: '700'
  }
});

const Title = ({ style, italic, bold, children, ...rest }) => {
  const activeStyles = [style, _style.title];
  if(italic) activeStyles.push(_style.italic);
  if(bold) activeStyles.push(_style.bold);

  return (
    <Txt style={activeStyles} {...rest}>{children}</Txt>
  );
};

export default Title;
