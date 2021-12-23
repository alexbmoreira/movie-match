import { Button, FormLayout, ScreenContainer, Text, TextInput } from 'components/common';
import { observer } from 'mobx-react';
import React from 'react';
import { Title } from 'react-native-paper';
import { withState } from 'shared';
import AuthState from './state/AuthState';

const Login = observer(({ uiState, navigation }) => {
  const { username, password, errors } = uiState;
  return (
    <ScreenContainer center>
      <Title>Log In to Match Cut</Title>
      <FormLayout>
        <TextInput
          placeholder='Username'
          value={username}
          onChange={value => uiState.updateUsername(value)}
          errorMessage={errors.username}
        />
        <TextInput
          placeholder='Password'
          value={password}
          onChange={value => uiState.updatePassword(value)}
          secureTextEntry
          errorMessage={errors.password}
        />
        <Button mode='contained' onPress={uiState.login}>
          Log In
        </Button>
      </FormLayout>
      <Text>{'Don\'t have an Account?'}</Text>
      <Text onPress={() => navigation.navigate('Register')}>Register</Text>
    </ScreenContainer>
  );
});

export default withState(Login, AuthState);
