import _ from 'lodash';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const _style = StyleSheet.create({
  stackChild: {
    marginBottom: 30,
  },
});

const ScreenContainerStack = ({ children }) => {
  return (
    <View>
      {_.map(children, (child, index) => 
        child && 
          <View key={index} style={_style.stackChild}>
            {child}
          </View>
      )}
    </View>
  );
};

export default ScreenContainerStack;
