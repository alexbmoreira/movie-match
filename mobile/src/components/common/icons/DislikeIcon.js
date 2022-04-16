import React from 'react';
import { MatchCutIcons } from 'shared/fonts';

const DislikeIcon = ({ size, color, ...rest }) => (
  <MatchCutIcons
    name={'thumbs-down'}
    style={{ transform: [{ rotateY: '180deg' }] }}
    color={color}
    size={size}
    {...rest}
  />
);

export default DislikeIcon;
