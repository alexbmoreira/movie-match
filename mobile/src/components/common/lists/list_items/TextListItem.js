import React from 'react';
import { StyleSheet, View } from 'react-native';
import { push } from 'shared/RootNavigation';
import { TouchableHighlight } from '../../gesture_handlers';
import { Text } from '../../typography';

const _style = StyleSheet.create({
  textListItem: {
    padding: 15
  }
});

const TextListItem = ({ model }) => {
  return (
    <TouchableHighlight onPress={() => push(model.navigate, model.params)}>
      <View style={_style.textListItem}>
        <Text>{model.value}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default TextListItem;
