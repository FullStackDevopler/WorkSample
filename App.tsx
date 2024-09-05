import "react-native-devsettings/withAsyncStorage";
import React, { useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import Setup from './src/Router/Setup';
import { DataManager } from "./src/Manager/DataManager";
import { useDispatch } from "react-redux";
import { guestSignInAction, setupToken } from "./src/Redux/Actions/userActions";
import { generateGUID } from "./src/Theme/utils";




if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

function App(): JSX.Element {
  const dispatch = useDispatch()
  useEffect(() => {
    setupLocalContent()
  }, [])

  const setupLocalContent = async () => {
    const guid = await DataManager.getGUID()
    if (!guid) {
      DataManager.setGUID(generateGUID())
    }
    const isGuestLogin = await DataManager.getIsGuestLogin()
    const token = await DataManager.getAccessToken()
    console.log("GuestSignin Value", isGuestLogin)
    console.log("Token Value", token)
    if (isGuestLogin) {
      dispatch(guestSignInAction())
    }
     dispatch(setupToken(token))
  }

  return (
    <SafeAreaView style={styles.container} >
      <Setup />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default App;
