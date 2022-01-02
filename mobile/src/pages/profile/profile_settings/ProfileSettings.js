import { Button, ScreenContainer } from 'components/common';
import { observer } from 'mobx-react';
import React from 'react';
import { withState } from 'shared';
import ProfileSettingsState from './state/ProfileSettingsState';

const ProfileSettings = observer(({ uiState }) => {
  return (
    <ScreenContainer scroll>
      <Button mode='contained' onPress={uiState.logout}>
        Log Out
      </Button>
    </ScreenContainer>
  );
});

export default withState(ProfileSettings, ProfileSettingsState);
