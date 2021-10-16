import React from 'react';
import {View, Image} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {useAuth} from '../../context/AuthContext';
import {styles} from './styles';
import {CometChat} from '@cometchat-pro/react-native-chat';
import {COMETCHAT_CONSTANTS} from '../../../constants';
import gravatar from 'gravatar-api';

export default function SignUp() {
  const [data, setData] = React.useState({
    name: '',
    uid: '',
    email: '',
  });

  const {dispatchAuth} = useAuth();

  const handleSignUp = async () => {
    if (data.name !== '' && data.uid !== '') {
      let user = new CometChat.User(data.uid);
      user.setName(data.name);
      user.avatar = gravatar.imageUrl({
        email: data.email,
        parameters: {size: '500'},
        secure: true,
      });

      try {
        const newUser = await CometChat.createUser(
          user,
          COMETCHAT_CONSTANTS.AUTH_KEY,
        );
        console.log('User created: ', newUser);
        dispatchAuth({type: 'REGISTER', user: {...newUser}});
      } catch (error) {
        console.log('error on createUser: ', error);
      }

      try {
        const loggedUserInfo = await CometChat.login(
          data.uid,
          COMETCHAT_CONSTANTS.AUTH_KEY,
        );
        console.log('User is logged in: ', loggedUserInfo);
        dispatchAuth({
          type: 'LOGIN',
          user: {...loggedUserInfo},
          isLoggedIn: true,
        });
      } catch (error) {
        console.log('error on login: ', error);
      }
    }
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
          onChangeText={value => setData({...data, uid: value})}
        />
        <Input
          placeholder="name"
          leftIcon={{type: 'font-awesome', name: 'user'}}
          onChangeText={value => setData({...data, name: value})}
        />

        <Input
          placeholder="email"
          leftIcon={{type: 'font-awesome', name: 'envelope'}}
          onChangeText={value => setData({...data, email: value})}
        />

        <Button title="Sign Up" loading={false} onPress={handleSignUp} />
      </View>
    </View>
  );
}
