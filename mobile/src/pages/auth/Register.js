import { TextInput } from '@components/common';
import { withState } from '@shared';
import { observer } from 'mobx-react';
import React from 'react';
import { View } from 'react-native';
import { Button, Text, Title } from 'react-native-paper';
import AuthState from './state/AuthState';

const Register = observer(({ uiState, navigation }) => {
  const {username, email, password, password2, errors} = uiState
  return (
    <View>
      <Title>Register</Title>
      <TextInput
        placeholder="Username"
        value={username}
        onChange={value => uiState.updateUsername(value)}
        autoCapitalize="none"
        autoCorrect={false}
        errorMessage={errors.username}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChange={value => uiState.updateEmail(value)}
        autoCapitalize="none"
        autoCorrect={false}
        errorMessage={errors.email}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChange={value => uiState.updatePassword(value)}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
        errorMessage={errors.password1}
      />
      <TextInput
        placeholder="Confirm Password"
        value={password2}
        onChange={value => uiState.updatePassword2(value)}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
        errorMessage={errors.password2}
      />
      <Button onPress={uiState.register}>
        Register
      </Button>
      <Text>Already have an account?</Text>
      <Text onPress={() => navigation.navigate('Login')}>Log In</Text>
    </View>
  );
})

export default withState(Register, AuthState)
