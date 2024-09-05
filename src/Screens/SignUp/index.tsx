import React, { useEffect, useState } from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import LogoView from '../../Components/LogoView';
import TextField from '../../Components/TextField';
import AppButton from '../../Components/AppButton';
import { Fonts } from '../../Theme/fonts';
import { Colors } from '../../Theme/colors';
import { AppImages } from '../../Assets';
import { AppConstants } from '../../Theme/constants';
import reactotron from 'reactotron-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { guestSignInAction, signUpAction } from '../../Redux/Actions/userActions';
import { isValidEmail, isValidStringLength } from '../../Theme/utils';

export default function SignUp(): JSX.Element {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.user.loading)
  const error = useSelector(state => state.user.error)
  const navigation = useNavigation()
  const [username, setUsername] = useState("123456");
  const [email, setEmail] = useState("123@gmail.com");
  const [password, setPassword] = useState("123456");
  const [confirmPassword, setConfirmPassword] = useState("123456");

  useEffect(() => {
    console.log("Sign up screen")
  }, [])

  useEffect(() => {
    if (loading === false && error === null) {
      setUsername("")
      setEmail("")
      setPassword("")
      setConfirmPassword("")
    }
  }, [loading, error])

  const onSignUpButtonPress = () => {
    // navigation.navigate(AppConstants.screens.home)
    if (!isValidStringLength(username, 6, 20)) {
      alert("Username must be a valid string with length b/w 6-20 characters.")
    }
    else if (!isValidEmail(email)) {
      alert("Please enter a valid email.")
    } else if (!isValidStringLength(password, 6, 20)) {
      alert("Password must be a valid string with length b/w 6-20 characters.")
    } else if (!isValidStringLength(confirmPassword, 6, 20)) {
      alert("Confirm Password must be a valid string with length b/w 6-20 characters.")
    } else if (password !== confirmPassword) {
      alert("Password and Confirm password must be same.")
    } else {
      dispatch(signUpAction(username, email, password))
    }
  }

  const onSkipButtonPress = () => {
    dispatch(guestSignInAction())
  }

  const onLoginButtonPress = () => {
    navigation.navigate(AppConstants.screens.login)
  }

  const HyperLinkView = () => {
    return (
      <View style={styles.hyperLinkView}>
        <Text style={styles.hyperLinkText}>
          {'I have read and accept the\n'} <Text style={{ textDecorationLine: 'underline' }} onPress={() => { alert("Terms") }}>{'terms of use'} </Text>{'and '}
          <Text onPress={() => { alert("Privacy") }} style={{ textDecorationLine: 'underline' }}>{'privacy policy'}</Text>
          <View style={{ backgroundColor: 'white' }} >
            <Pressable style={({ pressed }) => [styles.checkboxView, { opacity: pressed ? 0.5 : 1 }]} /></View>
        </Text>
      </View>
    )
  }

  const BottomView = () => {
    return (
      <View style={styles.bottomView}>
        <Pressable onPress={onSkipButtonPress} style={({ pressed }) => [styles.bottomButtomView, { opacity: pressed ? 0.5 : 1 }]}>
          <Text style={styles.bottomBoldItalicText}>{'Skip and create later'}</Text>
        </Pressable>
        <Pressable onPress={onLoginButtonPress} style={({ pressed }) => [styles.bottomButtomView, { opacity: pressed ? 0.5 : 1 }]}>
          <Text style={styles.bottomRegularText}>{'Already have an account?'}
            <Text style={styles.bottomBoldText}>{' Login'}</Text></Text></Pressable>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }} style={styles.container}>
        <LogoView />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', }}>
          <TextField value={username} onChangeText={setUsername} placeholder={'Username'} textFieldStyle={{ marginVertical: 8 }} />
          <TextField value={email} onChangeText={setEmail} placeholder={'Email'} textFieldStyle={{ marginVertical: 8 }} />
          <TextField value={password} onChangeText={setPassword} placeholder={'Password'} textFieldStyle={{ marginVertical: 8 }} secureTextEntry={true} />
          <TextField value={confirmPassword} onChangeText={setConfirmPassword} placeholder={'Confirm Password'} textFieldStyle={{ marginVertical: 8 }} secureTextEntry={true} />
          <AppButton title={'Create Account'} onPress={onSignUpButtonPress} icon={AppImages.Lock} />
          {/* <HyperLinkView /> */}
        </View>
      </ScrollView>
      <BottomView />
    </View>
  );
}