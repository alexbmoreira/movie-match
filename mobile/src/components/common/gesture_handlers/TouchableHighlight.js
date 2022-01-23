import React from 'react';
import { TouchableHighlight as Touchable } from 'react-native-gesture-handler';
import { theme } from 'shared';

const TouchableHighlight = ({ style, onPress, children, ...rest }) => {
  return (
    <Touchable style={style} underlayColor={theme.colors.surface} activeOpacity={0.9} onPress={onPress} {...rest}>
      {children}
    </Touchable>
  );
};

export default TouchableHighlight;
