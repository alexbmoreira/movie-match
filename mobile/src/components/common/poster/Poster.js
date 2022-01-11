import { observer } from 'mobx-react';
import { PropTypes } from 'prop-types';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { withState } from 'shared';
import theme from 'shared/theme';
import { Text } from '../typography';
import PosterState from './state/PosterState';

const getPosterDimensions = (size) => {
  switch (size) {
  case 'sm':
    return {
      width: 92, height: 138
    };
  case 'md':
    return {
      width: 122, height: 183
    };
  case 'lg':
  default:
    return {
      width: 500, height: 750
    };
  }
};

const defaultStyle = StyleSheet.create((size) => {
  const { width, height } = getPosterDimensions(size);
  return {
    poster: {
      width: width,
      height: height,
      backgroundColor: theme.colors.surface,
      borderRadius: 10,
      borderColor: theme.colors.text,
      borderWidth: 2
    },
    posterPlaceholder: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5,
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    text: {
      textAlign: 'center'
    }
  };
});

const PlaceholderPoster = observer(({ title, size }) => {
  const { poster, posterPlaceholder, text } = defaultStyle(size);

  return (
    <View style={[poster, posterPlaceholder]}>
      <Text style={text}>{title}</Text>
    </View>
  );
});

const Poster = observer(({ style, source, size, title, uiState }) => {
  const { isLoading } = uiState;
  if(!source.uri) uiState.setLoading(true);

  return (
    <View style={style}>
      <Image
        style={defaultStyle(size).poster}
        source={source}
        onLoadStart={() => uiState.setLoading(true)}
        onLoadEnd={() => { if(source.uri) uiState.setLoading(false); }}
      />
      {isLoading && <PlaceholderPoster title={title} size={size}/>}
    </View>
  );
});

Poster.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg'])
};

export default withState(Poster, PosterState);
