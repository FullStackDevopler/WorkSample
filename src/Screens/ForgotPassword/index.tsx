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
import { forgotPasswordAction } from '../../Redux/Actions/userActions';
import { useDispatch } from 'react-redux';
import BottomBackButton from '../../Components/BottomBackButton';

export default function ForgotPassword(): JSX.Element {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [email, onChangeText] = useState(null);

    const onForgotPasswordButtonClick = () => {
        if (email) {
            dispatch(forgotPasswordAction(email))
        } else {
            alert("Please enter email address.")
        }
    }

    const onBackButtonClick = () => {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }} style={styles.container}>
                <LogoView />
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', marginBottom: 40 }}>
                    <TextField onChangeText={onChangeText} placeholder={'Email'} textFieldStyle={{ marginVertical: 8 }} />
                    <AppButton title={'Submit'} onPress={onForgotPasswordButtonClick} />
                </View>
            </ScrollView>
            <BottomBackButton onButtonPress={onBackButtonClick} />
        </View>
    );
}