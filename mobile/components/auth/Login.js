import { observer } from 'mobx-react';
import React from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput, Title } from 'react-native-paper';
import withState from '../../shared/withState';
import AuthState from './state/AuthState';

const Login = observer(({ uiState, navigation }) => {
  return (
      <View>
          <Title>Login</Title>
          <TextInput placeholder="Username" value={uiState.username} onChangeText={value => uiState.updateUsername(value)} autoCapitalize="none" autoCorrect={false} />
          <TextInput placeholder="Password" value={uiState.password} onChangeText={value => uiState.updatePassword(value)} autoCapitalize="none" autoCorrect={false} secureTextEntry />
            <Button title="Login" onPress={uiState.login}>
              Log In
            </Button>
          {/* {uiState.errors.password ? <Text>{state.errorMessage}</Text> : null} */}
          <Text>Don't have an Account?</Text>
          {/* <Text onPress={() => navigation.navigate('Register')}>Register</Text> */}
      </View>
  );
})

export default withState(Login, AuthState)
