import { Button, FormLayout, ScreenContainer, Text, TextInput, Title } from 'components/common';
import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { withState } from 'shared';
import AuthState from './state/AuthState';

const style = StyleSheet.create({
  registerRedirect: {
    display: 'flex',
    alignItems: 'center'
  }
});

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
      <View style={style.registerRedirect}>
        <Text bold>Already have and account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text>Log In</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
});

export default withState(Register, AuthState);
