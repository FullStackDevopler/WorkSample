import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  Pressable,
  View,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { styles } from './styles';
import AppButton from '../../Components/AppButton';
import LogoView from '../../Components/LogoView';
import { AppImages } from '../../Assets';
import { useNavigation } from '@react-navigation/native';
import { AppConstants } from '../../Theme/constants';
import { useDispatch, useSelector } from 'react-redux';
import { getCardDetails } from '../../Redux/Actions/gameActions';
import { AppLogger } from '../../Theme/utils';
import { Colors } from '../../Theme/colors';
import { getProfileAction, saveFCMToken } from '../../Redux/Actions/userActions';
import Loader from '../../Components/Loader';
import { DataManager } from '../../Manager/DataManager';


export default function Home(): JSX.Element {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const loaderRef = useRef(null)
  const gameLoading = useSelector(state => state.game.loading)
  const accessToken = useSelector(state => state.user.token)
  const isProUser = useSelector(state => state.user.isProUser)
  const gameError = useSelector(state => state.game.error)
  const cardDetails = useSelector(state => state.game.cardDetails)

  useEffect(() => {
    if (cardDetails) {
      if (cardDetails?.gamesAvailable) {
        navigation.navigate(AppConstants.screens.defination)
      } else {
        navigation.navigate(AppConstants.screens.dailyLimitReached)
      }
    }
  }, [cardDetails])

  useEffect(() => {
    if (gameError !== null || cardDetails !== null) {
      loaderRef?.current?.hideLoader()
    }
  }, [gameError, cardDetails])



  // useEffect(() => {
  //   if (error) {
  // alert("Error")
  // AppLogger("Get Card Details", error)
  //   }
  // }, [cardDetails])

  useEffect(() => {
    messaging().getToken().then((response) => {
      AppLogger("Get FCM Token Success", response)
      setTimeout(() => {
        dispatch(saveFCMToken(response))
      }, 1000)

    }).catch((error) => {
      AppLogger("Get FCM Token Error", error)
    })
  }, [])

  useEffect(() => {
    setTimeout(() => {
      dispatch(getProfileAction())
    }, 1000)
  }, [])



  const onSettingsButtonClick = () => {
    navigation.navigate(AppConstants.screens.settings)
  }

  const onGetProButtonClick = () => {
    // if (!accessToken) {
    //   alert("Please login first in order to purchase the Pro account.")
    //   return
    // }
    navigation.navigate(AppConstants.screens.getPro)
  }

  const onPlayGameButtonClick = async () => {
    if (accessToken == null) {
      messaging().getToken().then((response) => {
        loaderRef?.current?.showLoader()
        dispatch(getCardDetails(response, accessToken))
      }).catch((error) => {
        loaderRef?.current?.showLoader()
        dispatch(getCardDetails(null, accessToken))
      })
    } else {
      loaderRef?.current?.showLoader()
      dispatch(getCardDetails(null, accessToken))
    }
    // navigation.navigate(AppConstants.screens.defination)
  }

  const checkGuestUSer = async () => {
    const guid = await DataManager.getGUID()
    alert(guid)
  }

  const BottomView = () => {
    return (
      <View style={styles.bottomView}>
        <Pressable onPress={onSettingsButtonClick} style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1, height: 40, width: 40 }]}>
          <Image style={{ height: 40, width: 40 }} source={AppImages.Settings} />
        </Pressable>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <LogoView />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', marginBottom: 40 }}>
        <AppButton buttonStyle={{ width: '60%' }}
          title={"Play Today's Game"}
          onPress={onPlayGameButtonClick} />
        <AppButton buttonStyle={{ width: '60%' }}
          title={"Check Guest User"}
          onPress={checkGuestUSer} />
        {
          isProUser ?
            <AppButton buttonStyle={{ width: '60%' }} title={'Settings'} onPress={onSettingsButtonClick} icon={AppImages.Settings_White} titleStyle={{ fontWeight: '700' }} iconStyle={{ height: 20, width: 20 }} /> :
            <AppButton buttonStyle={{ width: '60%' }}
              iconResizeMode={'contain'}
              icon={AppImages.GetProText}
              iconStyle={{ height: 30, width: 90, margin: 0 }}
              onPress={onGetProButtonClick} />
        }

        <Image style={{ width: '50%', height: '30%', marginTop: 40 }} resizeMode={'contain'} source={isProUser ? AppImages.BeagleSideImage : AppImages.BeagleSleepingImage} />
      </View>
      {
        isProUser ? null : <BottomView />
      }
      <Loader ref={loaderRef} />
    </View>
  );
}