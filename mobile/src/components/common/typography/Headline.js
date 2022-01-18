import React from 'react';
import { StyleSheet } from 'react-native';
import { Text as Txt } from 'react-native-paper';

const _style = StyleSheet.create({
  headline: {
    fontSize: 26,
    lineHeight: 32,
    marginVertical: 2,
  },
  italic: {
    fontStyle: 'italic'
  },
  bold: {
    fontWeight: '700'
  }
});

const Headline = ({ style, italic, bold, children }) => {
  const activeStyles = [style, _style.headline];
  if(italic) activeStyles.push(_style.italic);
  if(bold) activeStyles.push(_style.bold);

  return (
    <Txt style={activeStyles}>{children}</Txt>
  );
};

export default Headline;
