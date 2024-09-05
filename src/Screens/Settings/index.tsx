import React from 'react';
import {
    Image,
    Linking,
    Pressable,
    View,
} from 'react-native';
import { styles } from './styles';
import AppButton from '../../Components/AppButton';
import LogoView from '../../Components/LogoView';
import { AppImages } from '../../Assets';
import BottomBackButton from '../../Components/BottomBackButton';
import { useNavigation } from '@react-navigation/native';
import { AppConstants } from '../../Theme/constants';
import { useDispatch, useSelector } from 'react-redux';
import { logoutGuestUser, logoutUser } from '../../Redux/Actions/userActions';

export default function Settings(): JSX.Element {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const accessToken = useSelector(state => state.user.token)
    const onLoginButtonPress = () => {
        dispatch(logoutGuestUser())
    }
    const onMyProfileButtonPress = () => {
        navigation.navigate(AppConstants.screens.myProfile)
    }
    const onBackButtonPress = () => {
        navigation.goBack()
    }
    return (
        <View style={styles.container}>
            <LogoView />

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', marginBottom: 70 }}>
                {!accessToken ?
                    <AppButton buttonStyle={{ width: '60%' }}
                        title={"Log in/Register"}
                        titleStyle={{ fontSize: 14 }}
                        onPress={onLoginButtonPress} /> :
                    <AppButton buttonStyle={{ width: '60%' }}
                        title={"My Profile"}
                        titleStyle={{ fontSize: 14 }}
                        onPress={onMyProfileButtonPress} />}
                <AppButton buttonStyle={{ width: '60%' }}
                    title={"Privacy Policy"}
                    titleStyle={{ fontSize: 14 }}
                    onPress={() => Linking.openURL("https://studydoctor.org/privacy-policy")} />
                {/* onPress={() => Linking.openURL("https://apps.apple.com/account/subscriptions")} /> */}
                <AppButton buttonStyle={{ width: '60%' }}
                    title={"Terms of Use"}
                    titleStyle={{ fontSize: 14 }}
                    onPress={() => Linking.openURL("https://studydoctor.org/terms")} />
                <AppButton buttonStyle={{ width: '60%' }}
                    title={"Report Bug"}
                    titleStyle={{ fontSize: 14 }}
                    onPress={() => Linking.openURL('mailto:info@studydoctor.org')} />
                <Image style={{ height: 100, alignSelf: 'center', marginTop: 30 }} resizeMode={'contain'} source={AppImages.BeagleSleepingImage} />
            </View>
            <BottomBackButton onButtonPress={onBackButtonPress} />
        </View>
    );
}