import React from 'react';
import { StyleSheet, View } from 'react-native';

const style = StyleSheet.create({
  formLayout: {
    marginBottom: '4%',
  }
});

const FormLayout = ({ children }) => {

  return React.Children.map(children, c => {
    if (!c) return null;

    if (c.props.wrapper && c.props.wrapper.name === 'FormLayout') {
      return c;
    } else {
      return (
        <View style={style.formLayout}>
          {c}
        </View>
      );
    }
  });
};

export default FormLayout;
