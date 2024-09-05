import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';  
import { ToastProvider } from 'react-native-toast-notifications';
import { Provider } from 'react-redux';
import { store } from './src/Redux/Store';
import { Setup } from './src/Router/Setup';
import { getFcmToken } from './src/Theme/notifications';





function App(): React.JSX.Element {

  const [generatedToken, setGeneratedToken] = React.useState<string>('');

  // useEffect(() => {
  //   const fetchToken = async () => {

  //     const token = await getFcmToken();
  //     console.log("token in fetchToken", token);

  //     if (token) {
  //       setGeneratedToken(token);
  //     }
  //   };
  //   fetchToken();
  // }, []);

 

  // useEffect(() => {
  //   const requestPermissions = async () => {
  //     let token;
  //     if (Platform.OS === 'android') {
  //       token = await requestPermissionAndroid();
  //     } else {
  //       token = await requestPermissionIOS();
  //     }
  //     console.log('FCM Token:', token);
  //     if (token) {
  //       setGeneratedToken(token);
  //     }
  //   };

  //   requestPermissions();
  // }, []);

  return (
    <SafeAreaView style={styles.rootContainer}>
      <Provider store={store}>
      <ToastProvider offset={50}>
      <Setup />
      </ToastProvider>
      </Provider>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1, 
  }
})


export default App;

