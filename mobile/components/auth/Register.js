import { observer } from 'mobx-react';
import React from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput, Title } from 'react-native-paper';
import withState from '../../shared/withState';
import AuthState from './state/AuthState';

const Register = observer(({ uiState, navigation }) => {
  const {username, email, password, password2} = uiState
  return (
    <View>
      <Title>Register</Title>
      <TextInput placeholder="Username" value={username} onChangeText={value => uiState.updateUsername(value)} autoCapitalize="none" autoCorrect={false} />
      <TextInput placeholder="Email" value={email} onChangeText={value => uiState.updateEmail(value)} autoCapitalize="none" autoCorrect={false} />
      <TextInput placeholder="Password" value={password} onChangeText={value => uiState.updatePassword(value)} autoCapitalize="none" autoCorrect={false} secureTextEntry />
      <TextInput placeholder="Confirm Password" value={password2} onChangeText={value => uiState.updatePassword2(value)} autoCapitalize="none" autoCorrect={false} secureTextEntry />
        <Button title="Register" onPress={uiState.register}>
          Register
        </Button>
      {/* {uiState.errors.password ? <Text>{state.errorMessage}</Text> : null} */}
      <Text>Already have an account?</Text>
      <Text onPress={() => navigation.navigate('Login')}>Log In</Text>
    </View>
  );
})

export default withState(Register, AuthState)
