import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from '../../../gesture_handlers';
import { Text } from '../../../typography';

const _style = StyleSheet.create({
  quickActionButton: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const ActionComponent = ({ action }) => {
  if(action.text) {
    return <Text>{action.text}</Text>;
  }

  if(action.component) {
    const Component = action.component;
    return <Component />;
  }
};

const QuickAction = ({ item, action }) => {
  return (
    <View style={[_style.quickActionButton, action.style]}>
      <TouchableOpacity onPress={() => action.onPress(item)}>
        <ActionComponent action={action}/>
      </TouchableOpacity>
    </View>
  );
};

export default QuickAction;
