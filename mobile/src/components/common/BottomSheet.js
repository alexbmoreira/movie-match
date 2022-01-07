import * as React from 'react';
import { Dialog, Portal, Provider } from 'react-native-paper';

const BottomSheet = ({ title, visible, onDismiss, children }) => {
  const containerStyle = { backgroundColor: 'white', padding: 20, margin: 20 };

  return (
    <Provider>
      <Portal>
        <Dialog visible={visible} onDismiss={onDismiss} contentContainerStyle={containerStyle}>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Content>
            {children}
          </Dialog.Content>
        </Dialog>
      </Portal>
    </Provider>
  );
};

export default BottomSheet;
