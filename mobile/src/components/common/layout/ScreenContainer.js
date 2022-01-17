import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import theme from 'shared/theme';

const style = StyleSheet.create({
  screenContainer: {
    display: 'flex',
    overflow: 'visible',
    backgroundColor: theme.colors.screen,
    padding: 20
  },
  center: {
    justifyContent: 'center'
  },
  background: {
    backgroundColor: theme.colors.screen
  }
});

const ScreenContainer = ({ children, center, scroll }) => {
  const activeStyle = [
    style.screenContainer,
    (center && style.center)
  ];

  const Container = scroll ? ScrollView : View;

  return(
    <Container style={style.background}>
      <View style={activeStyle}>
        {children}
      </View>
    </Container>
  );
};

export default ScreenContainer;
