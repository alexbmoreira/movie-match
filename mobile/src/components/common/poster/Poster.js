import { observer } from 'mobx-react';
import { PropTypes } from 'prop-types';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { withState } from 'shared';
import theme from 'shared/theme';
import PosterState from './state/PosterState';

const getPosterDimensions = (size) => {
  switch (size) {
  case 'sm':
    return {
      width: 92, height: 138
    };
  case 'md':
    return {
      width: 154, height: 231
    };
  case 'lg':
  default:
    return {
      width: 500, height: 750
    };
  }
};

const style = StyleSheet.create((size) => {
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

const PlaceholderPoster = ({ title, size }) => {
  const { poster, posterPlaceholder, text } = style(size);

  return (
    <View style={{ ...poster, ...posterPlaceholder }}>
      <Text style={text}>{title}</Text>
    </View>
  );
};

const Poster = observer(({ source, size, title, uiState }) => {
  const { loading } = uiState;
  if(!source.uri) uiState.setLoading(true);

  return (
    <View>
      <Image
        style={style(size).poster}
        source={source}
        onLoadStart={() => uiState.setLoading(true)}
        onLoadEnd={() => uiState.setLoading(false)}
      />
      {loading && <PlaceholderPoster title={title} size={size}/>}
    </View>
  );
});

Poster.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg'])
};

export default withState(Poster, PosterState);
