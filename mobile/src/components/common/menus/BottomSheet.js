import React from 'react';
import { View } from 'react-native';
import Sheet from 'reanimated-bottom-sheet';
import { theme } from 'shared';

const BottomSheet = ({ innerRef, children, snapPoints, ...rest }) => {
  return (
    <Sheet
      ref={innerRef}
      renderContent={() => (
        <View
          style={{
            height: snapPoints[0],
            backgroundColor: theme.colors.backdrop,
            padding: 16
          }}
        >
          {children}
        </View>
      )}
      snapPoints={snapPoints}
      initialSnap={1}
      borderRadius={10}
      {...rest}
    />
  );
};

export default BottomSheet;
