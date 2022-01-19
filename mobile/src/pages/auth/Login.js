import { Button, FormLayout, ScreenContainer, Text, TextInput, Title } from 'components/common';
import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { withState } from 'shared';
import AuthState from './state/AuthState';

const _style = StyleSheet.create({
  registerRedirect: {
    display: 'flex',
    alignItems: 'center'
  }
});

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
      <View style={_style.registerRedirect}>
        <Text bold>{'Don\'t have an Account?'}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')} activeOpacity={0.7}>
          <Text>Register</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
});

export default withState(Login, AuthState);
