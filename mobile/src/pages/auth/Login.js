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

const Login = observer(({ uiState, navigation }) => {
  const { user, errors } = uiState;

  return (
    <ScreenContainer center>
      <Title>Log In to Match Cut</Title>
      <FormLayout>
        <TextInput
          placeholder='Username'
          value={user.username}
          onChange={value => user.merge({ username: value })}
        />
        <TextInput
          placeholder='Password'
          value={user.password}
          onChange={value => user.merge({ password: value })}
          secureTextEntry
          errorMessage={errors.base}
        />
        <Button mode='contained' onPress={uiState.login}>
          Log In
        </Button>
      </FormLayout>
      <View style={_style.registerRedirect}>
        <Text bold>{'Don\'t have an Account?'}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text>Register</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
});

export default withState(Login, AuthState);
