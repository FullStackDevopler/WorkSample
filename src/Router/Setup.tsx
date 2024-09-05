import React, { useCallback, useEffect, useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  Platform,
  View,
} from 'react-native';
import {
  initConnection,
  endConnection,
  finishTransaction,
  flushFailedPurchasesCachedAsPendingAndroid,
  purchaseUpdatedListener,
  purchaseErrorListener,
  useIAP, withIAPContext
} from 'react-native-iap';
import messaging from '@react-native-firebase/messaging';
import { useNetInfo } from "@react-native-community/netinfo";
import { getTrackingStatus, requestTrackingPermission } from 'react-native-tracking-transparency';
import { MainStack, LoginStack } from './MainStack';
import SplashScreen from 'react-native-splash-screen';
import { navigationRef } from './RootNavigation';
import { useDispatch, useSelector } from 'react-redux';
import TermsModal from '../Components/TermsModal';
import { DataManager } from '../Manager/DataManager';
import { purchaseSubscriptionAPI, setTrackingStatus, updateNetworkState } from '../Redux/Actions/userActions';


function Setup(): JSX.Element {
  const token = useSelector(state => state.user.token)
  const isGuestLogin = useSelector(state => state.user.isGuestLogin)
  const isLoggedIn = isGuestLogin || token
  const termsModalRef = useRef();
  const dispatch = useDispatch()
  const { type, isConnected } = useNetInfo();
  const {
    connected,
    getSubscriptions,
    subscriptions,
  } = useIAP();

  const [products, setProducts] = useState([]);

  //UseEffect to show Terms and Conditions modal
  useEffect(() => {
    DataManager.getTermsStatus().then((res) => {
      if (!res) {
        termsModalRef?.current?.showTermsModal()
      } else {

      }
    }).catch((e) => {

    })
  }, [])

  useEffect(() => {
    console.log("Is Connected", isConnected)
    if (isConnected !== null) {
      dispatch(updateNetworkState(isConnected))
    }
  }, [isConnected])

  //UseEffect to handle inapppurchases
  useEffect(() => {
    const initializeConnection = async () => {
      try {
        await initConnection();
        await fetchSubscriptions();
        if (Platform.OS === "android") {
          await flushFailedPurchasesCachedAsPendingAndroid();
        }
      } catch (error) {
        console.error("An error occurred", error.message);
      }
    }
    const purchaseUpdate = purchaseUpdatedListener(
      async (purchase) => {
        const receipt = purchase.transactionReceipt;

        if (receipt) {
          try {
            console.log("Purchase Update", purchase);
            console.log("Purchase Update", new Date(purchase.transactionDate));
            dispatch(purchaseSubscriptionAPI(purchase))
            await finishTransaction({ purchase, isConsumable: true });
          } catch (error) {
            console.error("An error occurred", error.message);
          }
        }
      });

    const purchaseError = purchaseErrorListener((error) =>
      console.error('Purchase error', error.message));


    initializeConnection();
    return () => {
      endConnection();
      purchaseUpdate.remove();
      purchaseError.remove();
    }
  }, []);

  // useEffect to handle Splash screen and app tracking permissions
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide()
    }, 2000)
    askTrackingPermissions()
  }, [])

  // useEffect to handle Push notification permissions
  useEffect(() => {
    // return
    messaging().onTokenRefresh((token) => {
      console.log("Token in refresh", token)
    })
    checkApplicationPermission()
  }, [])

  const checkApplicationPermission = async () => {
    const authorizationStatus = await messaging().requestPermission();

    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      console.log('User has notification permissions enabled.');
      if (!messaging().isDeviceRegisteredForRemoteMessages) {
        await messaging().registerDeviceForRemoteMessages();
      }
      onAppBootstrap()
    } else if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
      console.log('User has provisional notification permissions.');
    } else {
      console.log('User has notification permissions disabled');
      alert("Please go to app settings and enable notification permissions to receive push notifications.")
    }
  }

  const onAppBootstrap = async () => {
    // Register the device with FCM
    // await messaging().registerDeviceForRemoteMessages();

    // Get the token
    try {
      const token = await messaging().getToken();
      //   const apnsToken = await messaging().getAPNSToken();
      console.log("Token", token)
      //   console.log("apnsToken", apnsToken)
    } catch (e) {
      console.log("token", e)
    }
    // Save the token
    // await postToApi('/users/1234/tokens', { token });
  }


  const fetchSubscriptions = async () => {
    try {
      const products = await getSubscriptions({
        skus: Platform.select({
          ios: ['com.doggywords.subscriptions.monthly'],
          android: ['com.doggywords.subscriptions.monthly'],
        })
      });
      setProducts(products);
    } catch (error) {
      console.error("Error occurred while fetching products", error.message);
    }
  };

  const askTrackingPermissions = async () => {
    const trackingStatus = await getTrackingStatus();
    if (trackingStatus === 'authorized' || trackingStatus === 'unavailable') {
      dispatch(setTrackingStatus(true))
    } else if (trackingStatus === 'not-determined') {
      const trackingStatus = await requestTrackingPermission();
      if (trackingStatus === 'authorized' || trackingStatus === 'unavailable') {
        // enable tracking features
        dispatch(setTrackingStatus(true))
      } else {
        dispatch(setTrackingStatus(false))
      }
    } else {
      dispatch(setTrackingStatus(false))
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer ref={navigationRef} >
        {token !== undefined ? isLoggedIn ? <MainStack /> : <LoginStack /> : null}
      </NavigationContainer>
      <TermsModal ref={termsModalRef} />
    </View>
  );
}

export default withIAPContext(Setup)