import theme from '@shared/theme';
import React from "react";
import { StyleSheet, View } from "react-native";

const style = StyleSheet.create({
  screenContainer: {
    display: 'flex',
    padding: '5%',
    height: '100%',
    backgroundColor: theme.colors.background
  },
  center: { 
    justifyContent: 'center'
  }
})

const ScreenContainer = ({children, center}) => {
  console.log(style.screenContainer)
  return(
    <View style={{...style.screenContainer, ...(center && style.center)}}>
      {children}
    </View>
  )
}

export default ScreenContainer
