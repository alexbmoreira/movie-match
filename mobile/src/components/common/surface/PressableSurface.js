import React from 'react';
import { TouchableOpacity } from '../gesture_handlers';
import Surface from './Surface';

const PressableSurface = ({ size, style, onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Surface style={style} size={size}>
        {children}
      </Surface>
    </TouchableOpacity>
  );
};

export default PressableSurface;
