import React from 'react';
import { View } from 'react-native';
import { theme } from 'shared';
import Sheet from '@gorhom/bottom-sheet';

const BottomSheet = ({ innerRef, children, snapPoint, ...rest }) => {
  return (
    <Sheet
      ref={innerRef}
      snapPoints={[snapPoint]}
      initialSnap={1}
      borderRadius={10}
      enablePanDownToClose
      animateOnMount={false}
      handleIndicatorStyle={{ backgroundColor: theme.colors.screen }}
      handleStyle={{ backgroundColor: theme.colors.backdrop }}
      backgroundStyle={{ backgroundColor: theme.colors.backdrop }}
      {...rest}
    >
      <View
        style={{
          height: snapPoint,
          backgroundColor: theme.colors.backdrop,
          padding: 16
        }}
      >
        {children}
      </View>
    </Sheet>
  );
};

export default BottomSheet;
