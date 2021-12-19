import { ScreenContainer } from '@components/common';
import { withState } from '@shared';
import React from 'react';
import AuthState from './state/AuthState';

const ResolveAuth = ({ uiState }) => {
  uiState.resolveAuth();

  return <ScreenContainer/>;
};

export default withState(ResolveAuth, AuthState);
