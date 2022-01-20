import React from 'react';
import { TouchableHighlight as Touchable } from 'react-native-gesture-handler';
import { theme } from 'shared';

const TouchableHighlight = ({ onPress, children, ...rest }) => {
  return (
    <Touchable underlayColor={theme.colors.surface} activeOpacity={0.9} onPress={onPress} {...rest}>
      {children}
    </Touchable>
  );
};

export default TouchableHighlight;
