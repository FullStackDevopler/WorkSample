import React, { useState } from 'react';
import {
    Image,
    ScrollView,
    View
} from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import LogoView from '../../Components/LogoView';
import TextField from '../../Components/TextField';
import AppButton from '../../Components/AppButton';
import { AppImages } from '../../Assets';
import BottomBackButton from '../../Components/BottomBackButton';
import { isValidStringLength } from '../../Theme/utils';
import { useDispatch } from 'react-redux';
import { changePasswordAction } from '../../Redux/Actions/userActions';

export default function ChangePassword(): JSX.Element {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const onBackButtonPress = () => {
        navigation.goBack()
    }

    const onSubmitButtonPress = () => {
        if (!isValidStringLength(oldPassword, 6, 20)) {
            alert("Old Password must be a valid string with length b/w 6-20 characters.")
        } else if (!isValidStringLength(newPassword, 6, 20)) {
            alert("New Password must be a valid string with length b/w 6-20 characters.")
        } else if (!isValidStringLength(confirmPassword, 6, 20)) {
            alert("Confirm Password must be a valid string with length b/w 6-20 characters.")
        } else if (newPassword !== confirmPassword) {
            alert("Password and Confirm password must be same.")
        } else {
            dispatch(changePasswordAction(oldPassword, newPassword))
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>

            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} style={styles.container}>
                <LogoView />
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', marginBottom: 70 }}>
                    <TextField value={oldPassword} onChangeText={setOldPassword} placeholder={'Old password'} textFieldStyle={{ marginVertical: 5 }} secureTextEntry={true} />
                    <TextField value={newPassword} onChangeText={setNewPassword} placeholder={'New password'} textFieldStyle={{ marginVertical: 5 }} secureTextEntry={true} />
                    <TextField value={confirmPassword} onChangeText={setConfirmPassword} placeholder={'Confirm new password'} textFieldStyle={{ marginVertical: 5 }} secureTextEntry={true} />
                    <AppButton title={'Done'} onPress={onSubmitButtonPress} icon={AppImages.Lock} />
                    <Image style={{ height: 100, alignSelf: 'center', marginTop: 30 }} resizeMode={'contain'} source={AppImages.BeagleSleepingImage} />
                </View>
            </ScrollView>
            <BottomBackButton onButtonPress={onBackButtonPress} />
        </View>
    );
}