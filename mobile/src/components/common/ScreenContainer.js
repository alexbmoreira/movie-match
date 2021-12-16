import theme from '@shared/theme';
import React from "react";
import { StyleSheet, View } from "react-native";

const style = StyleSheet.create({
  screenContainer: {
    display: 'flex',
    padding: '5%',
    height: '100%',
    backgroundColor: theme.colors.screen
  },
  center: { 
    justifyContent: 'center'
  }
})

const ScreenContainer = ({children, center}) => {
  const activeStyle = {
    ...style.screenContainer,
    ...(center && style.center)
  }

  return(
    <View style={activeStyle}>
      {children}
    </View>
  )
}

export default ScreenContainer
