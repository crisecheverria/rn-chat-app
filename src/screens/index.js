import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {CometChat} from '@cometchat-pro/react-native-chat';
import {CometChatUI} from '../../cometchat-pro-react-native-ui-kit/src/index';

import SignIn from './Login';
import SignUp from './SignUp';

import {useAuth} from '../context/AuthContext';

const Stack = createStackNavigator();

const CometChatUIView = () => (
  <View style={{flex: 1}}>
    <CometChatUI />
  </View>
);

const CometChatUIScreens = () => (
  <Stack.Navigator>
    <Stack.Screen name="CometChatUIView" component={CometChatUIView} />
  </Stack.Navigator>
);

const AuthScreens = () => (
  <Stack.Navigator>
    <Stack.Screen name="SignIn" component={SignIn} />
    <Stack.Screen name="SignUp" component={SignUp} />
  </Stack.Navigator>
);

const Screens = () => {
  const {auth, dispatchAuth} = useAuth();

  React.useEffect(() => {
    const retrieveUser = async () => {
      try {
        const user = await CometChat.getLoggedinUser();

        if (user) {
          dispatchAuth({
            type: 'RETRIEVE_USER',
            user: {...user},
            isLoggedIn: true,
          });
        }
      } catch (e) {
        console.log(e);
      }
    };

    retrieveUser();
  }, [dispatchAuth]);

  console.log('<Screens /> auth: ', auth);

  return auth?.isLoggedIn === true ? <CometChatUIScreens /> : <AuthScreens />;
};

export default Screens;
