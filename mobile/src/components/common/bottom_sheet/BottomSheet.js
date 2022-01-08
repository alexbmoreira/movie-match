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
            height: 200,
            backgroundColor: theme.colors.surface,
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
