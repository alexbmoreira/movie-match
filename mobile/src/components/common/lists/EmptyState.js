import { Text } from 'components/common/typography';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from 'shared';

const _style = StyleSheet.create({
  emptyState: {
    backgroundColor: theme.colors.backdrop,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: theme.roundness,
    marginBottom: 10
  }
});

const EmptyState = ({ localization }) => {
  const message = localization.emptyState || 'No data to display';
  return (
    <View style={[_style.emptyState]}>
      <Text>{message}</Text>
    </View>
  );
};

export default EmptyState;
