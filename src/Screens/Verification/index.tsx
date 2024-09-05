import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
} from 'react-native';
import { styles } from './styles';
import AppButton from '../../Components/AppButton';
import LogoView from '../../Components/LogoView';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileAction, reSendVerifictaionEmail, saveFCMToken } from '../../Redux/Actions/userActions';


export default function Verification({ route }): JSX.Element {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const loading = useSelector(state => state.game.loading)
  const { email } = route.params;

  const onLoginButtonClick = async () => {
    navigation.navigate('Login')
  }

  const onResendButtonClick = async () => {
    dispatch(reSendVerifictaionEmail(email))
  }

  return (
    <View style={styles.container}>
      <LogoView />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', marginBottom: 40 }}>
        <Text style={styles.screenText}>{'Thanks for registering! Check your\nemail to verify your account. Once\nverified, click “login” and login with\nyour username and password.'}</Text>
        <AppButton buttonStyle={{ width: '80%', marginTop: 30 }}
          title={"Login"}
          onPress={onLoginButtonClick} />
        <AppButton buttonStyle={{ width: '80%' }}
          title={"Resend Verifictaion Email"}
          onPress={onResendButtonClick} />
      </View>
    </View>
  );
}