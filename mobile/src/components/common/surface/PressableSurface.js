import React from 'react';
import { TouchableOpacity } from 'react-native';
import Surface from './Surface';

const PressableSurface = ({ size, style, onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Surface style={style} size={size}>
        {children}
      </Surface>
    </TouchableOpacity>
  );
};

export default PressableSurface;
