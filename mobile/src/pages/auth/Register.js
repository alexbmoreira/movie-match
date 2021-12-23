import { FormLayout, ScreenContainer, Text, TextInput } from 'components/common';
import { observer } from 'mobx-react';
import React from 'react';
import { Button, Title } from 'react-native-paper';
import { withState } from 'shared';
import AuthState from './state/AuthState';

const Register = observer(({ uiState, navigation }) => {
  const { username, email, password, password2, errors } = uiState;
  return (
    <ScreenContainer center>
      <Title>Create an Account</Title>
      <FormLayout>
        <TextInput
          placeholder='Username'
          value={username}
          onChange={value => uiState.updateUsername(value)}
          errorMessage={errors.username}
        />
        <TextInput
          placeholder='Email'
          value={email}
          onChange={value => uiState.updateEmail(value)}
          errorMessage={errors.email}
        />
        <TextInput
          placeholder='Password'
          value={password}
          onChange={value => uiState.updatePassword(value)}
          secureTextEntry
          errorMessage={errors.password1}
        />
        <TextInput
          placeholder='Confirm Password'
          value={password2}
          onChange={value => uiState.updatePassword2(value)}
          secureTextEntry
          errorMessage={errors.password2}
        />
        <Button mode='contained' onPress={uiState.register}>
          Register
        </Button>
      </FormLayout>
      <Text>Already have an account?</Text>
      <Text onPress={() => navigation.navigate('Login')}>Log In</Text>
    </ScreenContainer>
  );
});

export default withState(Register, AuthState);
