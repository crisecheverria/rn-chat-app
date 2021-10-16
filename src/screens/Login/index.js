import React from 'react';
import {View, Image} from 'react-native';
import {styles} from './styles';
import {Input, Button, Chip} from 'react-native-elements';
import {useAuth} from '../../context/AuthContext';
import {CometChat} from '@cometchat-pro/react-native-chat';
import {COMETCHAT_CONSTANTS} from '../../../constants';

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
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <View style={styles.body}>
        <Input
          placeholder="username"
          leftIcon={{type: 'font-awesome', name: 'user'}}
          onChangeText={value => setUsername(value)}
        />

        <Button title="Sign In" loading={false} onPress={handleSignIn} />
        <Button
          title="Sign Up"
          type="outline"
          style={styles.mt10}
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
  );
}
