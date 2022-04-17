import _ from 'lodash';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import QuickAction from './QuickAction';

const _style = StyleSheet.create({
  quickActionContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  }
});

const QuickActionSet = ({ item, quickActions }) => {
  return (
    <View style={_style.quickActionContainer}>
      {_.map(quickActions, (action, index) => (
        <QuickAction key={index} item={item} action={action}/>
      ))}
    </View>
  );
};

export default QuickActionSet;
