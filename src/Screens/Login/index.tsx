import React, { useState } from 'react';
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
import { AppImages } from '../../Assets';
import { AppConstants } from '../../Theme/constants';
import { signInAction } from '../../Redux/Actions/userActions';
import { useDispatch } from 'react-redux';
import { AppLogger, isValidStringLength } from '../../Theme/utils';
import { DataManager } from '../../Manager/DataManager';
import messaging from '@react-native-firebase/messaging';
export default function Login(): JSX.Element {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onLoginButtonPress = async () => {
        // try {
        //     const token = await messaging().getToken();
        //     //   const apnsToken = await messaging().getAPNSToken();
        //     console.log("Token", token)
        //     //   console.log("apnsToken", apnsToken)
        // } catch (e) {
        //     console.log("token", e)
        // }
        if (!isValidStringLength(username, 1, 100)) {
            alert("Please enter valid data for Email/Username Field")
        }
        else if (!isValidStringLength(password, 1, 100)) {
            alert("Please enter valid data for Password Field.")
        } else {
            DataManager.getGUID().then((id) => {
                if (id)
                    dispatch(signInAction(username, password, id))
            }).catch((error) => {
                AppLogger("Login Screen", error)
            })

        }
    }

    const onRegisterButtonPress = () => {
        navigation.navigate(AppConstants.screens.signUp)
    }

    const onForgotPasswordButtonClick = () => {
        navigation.navigate(AppConstants.screens.forgotPassword)
    }

    const BottomView = () => {
        return (
            <View style={styles.bottomView}>
                <Pressable onPress={onForgotPasswordButtonClick} style={({ pressed }) => [styles.bottomButtomView, { opacity: pressed ? 0.5 : 1 }]}>
                    <Text style={styles.bottomBoldItalicText}>{'Forgot Password?'}</Text>
                </Pressable>
                <Pressable onPress={onRegisterButtonPress} style={({ pressed }) => [styles.bottomButtomView, { opacity: pressed ? 0.5 : 1 }]}>
                    <Text style={styles.bottomRegularText}>{'Don’t have an account? '}
                        <Text style={styles.bottomBoldText}>{'Register'}</Text></Text></Pressable>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }} style={styles.container}>
                <LogoView />
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', }}>
                    <TextField value={username} onChangeText={setUsername} placeholder={'Email or Username'} textFieldStyle={{ marginVertical: 8 }} />
                    <TextField value={password} onChangeText={setPassword} placeholder={'Password'} textFieldStyle={{ marginVertical: 8 }} secureTextEntry={true} />
                    <AppButton title={'Login'} onPress={onLoginButtonPress} icon={AppImages.Lock} />
                </View>
            </ScrollView>
            <BottomView />
        </View>
    );
}