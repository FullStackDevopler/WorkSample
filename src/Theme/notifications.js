import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid , Alert, Platform} from 'react-native';


export const getFcmToken = async () => {
    try {
      const newFcmToken = await messaging().getToken();
      console.log('newFcmToken in getFcmToken=>>>>',newFcmToken);
      return newFcmToken;
    } catch (error) {
      console.log('error in getting fcm token==>>',error);
      return null;
    }
  };




  export const requestPermissionIOS = async () => {
    const authorizationStatus = await messaging().requestPermission();
    console.log("authorizationStatus in ios:", authorizationStatus);

    switch (authorizationStatus) {
      case messaging.AuthorizationStatus.AUTHORIZED:
        console.log('Permission granted. Getting FCM token...');
        return await getFcmToken();
        break;
      case messaging.AuthorizationStatus.DENIED:
        console.log('Permission denied. User has disabled notifications.');
        Alert.alert(
          'Permission Denied',
          'The notification permission have been denied. Please enable it in settings to receive notifications.',
          [
            {
              text: 'OK',
              onPress: () => console.log('OK Pressed'),
            },
          ],
          { cancelable: false }
        );
        break;
      case messaging.AuthorizationStatus.NOT_DETERMINED:
        console.log('Permission not determined. The user hasn\'t made a choice yet.');
        break;
      default:
        console.log("in default case of requestPermissionIOS ");
        break;

    }
  };

  export const requestPermissionAndroid = async () => {
    try {
      if (Platform.OS === 'android' && Platform.Version >= 33) {  // Check for Android 13 and above
        const checkPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
        console.log("checkPermission in requestPermissionAndroid:", checkPermission);
  
        if (!checkPermission) {
          const requestPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
            {
              title: 'Notification Permission',
              message: 'App needs access to your notifications so you can get updates.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );
  
          if (requestPermission === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Notification Permission is granted by user');
            return await getFcmToken();
  
          } else if (requestPermission === PermissionsAndroid.RESULTS.DENIED) {
            console.log('Notification Permission is denied by user');
            Alert.alert(
              'Permission Denied',
              'You have denied the notification permission. Please enable it in settings to receive notifications.',
              [
                {
                  text: 'OK',
                  onPress: () => console.log('OK Pressed in DENIED'),
                },
              ],
              { cancelable: false }
            );
          } else if (requestPermission === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            console.log('Notification Permission is set to never ask again by user');
            // Alert.alert(
            //   'Permission Disabled',
            //   'The notification permission has been denied. Please enable it in settings to receive notifications.',
            //   [
            //     {
            //       text: 'OK',
            //       onPress: () => console.log('OK Pressed in NEVER_ASK_AGAIN'),
            //     },
            //   ],
            //   { cancelable: false }
            // );
          }
        } else {
          console.log('Notification Permission is already granted by user');
          return await getFcmToken();
        }
      } else {
        console.log('Notification Permission is not required for this Android version as it is already granted.');
        return await getFcmToken();  // FCM token can be fetched without this permission on lower Android versions
      }
    } catch (err) {
      console.log('error in PermissionsAndroid', err);
    }
  };

  
