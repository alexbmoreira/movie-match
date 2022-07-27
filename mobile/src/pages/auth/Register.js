import { Button, FormLayout, ScreenContainer, Text, TextInput, Title, TouchableOpacity } from 'components/common';
import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { withState } from 'shared';
import AuthState from './state/AuthState';

const _style = StyleSheet.create({
  registerRedirect: {
    display: 'flex',
    alignItems: 'center'
  }
});

const Register = observer(({ uiState, navigation }) => {
  const { user, errors } = uiState;
  return (
    <ScreenContainer center>
      <Title>Create an Account</Title>
      <FormLayout>
        <TextInput
          placeholder='Username'
          value={user.username}
          onChange={value => user.merge({ username: value })}
          errorMessage={errors.username}
        />
        <TextInput
          placeholder='Email'
          value={user.email}
          onChange={value => user.merge({ email: value })}
          errorMessage={errors.email}
        />
        <TextInput
          placeholder='Password'
          value={user.password}
          onChange={value => user.merge({ password: value })}
          secureTextEntry
          errorMessage={errors.password}
        />
        <TextInput
          placeholder='Confirm Password'
          value={user.passwordConfirmation}
          onChange={value => user.merge({ passwordConfirmation: value })}
          secureTextEntry
          errorMessage={errors.passwordConfirmation}
        />
        <Button mode='contained' onPress={uiState.register}>
          Register
        </Button>
      </FormLayout>
      <View style={_style.registerRedirect}>
        <Text bold>Already have and account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text>Log In</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
});

export default withState(Register, AuthState);
