import React from 'react';
import { TouchableOpacity as Touchable } from 'react-native-gesture-handler';

const TouchableOpacity = ({ onPress, children, ...rest }) => {
  return (
    <Touchable activeOpacity={0.7} onPress={onPress} {...rest}>
      {children}
    </Touchable>
  );
};

export default TouchableOpacity;
