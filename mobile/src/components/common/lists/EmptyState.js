import { Text } from 'components/common/typography';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from 'shared';

const style = StyleSheet.create({
  emptyState: {
    backgroundColor: theme.colors.backdrop,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: theme.roundness
  }
});

const EmptyState = ({ localization }) => {
  const message = localization.emptyState || 'No data to display';
  return (
    <View style={style.emptyState}>
      <Text>{message}</Text>
    </View>
  );
};

export default EmptyState;
