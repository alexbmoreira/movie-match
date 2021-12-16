import React from "react";
import { StyleSheet, View } from "react-native";
// import EStyleSheet from 'react-native-extended-stylesheet';

const style = StyleSheet.create({
  screenContainer: {
    display: 'flex',
    padding: '5%'
  },
  center: { 
    justifyContent: 'center',
    height: '100%'
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
