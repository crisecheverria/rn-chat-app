import React from 'react';
import {View, Image, KeyboardAvoidingView, Platform} from 'react-native';
import {globalStyles} from '../../global-styles';
import {Input, Button, Chip} from 'react-native-elements';
import {useAuth} from '../../context/AuthContext';
import {CometChat} from '@cometchat-pro/react-native-chat';
import {COMETCHAT_CONSTANTS} from '../../../constants';
import DismissKeyboard from '../../components/DismissKeyboard';

export default function Login({navigation}) {
  const [uid, setUsername] = React.useState('');

  const {auth, dispatchAuth} = useAuth();

  const handleSignIn = async () => {
    CometChat.login(uid, COMETCHAT_CONSTANTS.AUTH_KEY).then(
      user => {
        console.log('User is logged in: ', user);
        dispatchAuth({type: 'LOGIN', user: {...user}, isLoggedIn: true});
      },
      error => {
        console.log('error on login: ', error);
        dispatchAuth({
          type: 'AUTH_FAILED',
          error: error.message,
          isLoggedIn: false,
        });
      },
    );
  };

  return (
    <DismissKeyboard>
      <View style={globalStyles.container}>
        <View style={globalStyles.header}>
          <Image
            source={require('../../assets/logo.png')}
            style={globalStyles.logo}
            resizeMode="stretch"
          />
        </View>
        <View style={globalStyles.body}>
          <Input
            placeholder="username"
            leftIcon={{type: 'font-awesome', name: 'user'}}
            onChangeText={value => setUsername(value)}
          />

          <Button title="Sign In" loading={false} onPress={handleSignIn} />
          <Button
            title="Sign Up"
            type="outline"
            style={globalStyles.mt10}
            onPress={() => navigation.navigate('SignUp')}
          />
        </View>
        {auth?.error !== null ? (
          <Chip
            title={auth.error}
            icon={{
              name: 'exclamation-circle',
              type: 'font-awesome',
              size: 20,
              color: 'white',
            }}
          />
        ) : null}
      </View>
    </DismissKeyboard>
  );
}
