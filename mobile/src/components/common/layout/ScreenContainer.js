import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import theme from 'shared/theme';

const _style = StyleSheet.create({
  screenContainer: {
    display: 'flex',
    overflow: 'visible',
    backgroundColor: theme.colors.screen,
    padding: 15
  },
  center: {
    justifyContent: 'center'
  },
  background: {
    backgroundColor: theme.colors.screen
  }
});

const ScreenContainer = ({ children, center, scroll }) => {
  const style = [
    _style.screenContainer,
    (center && _style.center)
  ];

  const Container = scroll ? ScrollView : View;

  return(
    <Container style={_style.background}>
      <View style={style}>
        {children}
      </View>
    </Container>
  );
};

export default ScreenContainer;
