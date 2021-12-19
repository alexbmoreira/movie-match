import { ScreenContainer } from 'components/common';
import React from 'react';
import { withState } from 'shared';
import AuthState from './state/AuthState';

const ResolveAuth = ({ uiState }) => {
  uiState.resolveAuth();

  return <ScreenContainer/>;
};

export default withState(ResolveAuth, AuthState);
