import React, { useEffect } from 'react';
import {
    Image,
    Text,
    View
} from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import LogoView from '../../Components/LogoView';
import TextField from '../../Components/TextField';
import AppButton from '../../Components/AppButton';
import { Fonts } from '../../Theme/fonts';
import { Colors } from '../../Theme/colors';
import { AppImages } from '../../Assets';
import BottomBackButton from '../../Components/BottomBackButton';
import { AppConstants } from '../../Theme/constants';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileAction, logoutUser } from '../../Redux/Actions/userActions';

export default function MyProfile(): JSX.Element {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const profileDetails = useSelector(state => state.user.profileDetails)
    const onChangePasswordButtonPress = () => {
        navigation.navigate(AppConstants.screens.changePassword)
    }
    const onSubscriptionButtonPress = () => {
        navigation.navigate(AppConstants.screens.manageSubscription)
    }
    const onBackButtonPress = () => {
        navigation.goBack()
    }
    useEffect(() => {
        dispatch(getProfileAction())
    }, [])
    useEffect(() => {
        console.log("Profile Details", profileDetails)
    }, [profileDetails])
    return (
        <>
            <View style={styles.container}>
                <LogoView imageStyle={{ marginBottom: 0 }} />
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', marginBottom: 30 }}>
                    <View style={styles.contentView}>
                        <Text style={styles.contentLabel}>{'Username:  '}
                            <Text style={{ fontFamily: Fonts.Livvic_Regular }}>{`${profileDetails?.data?.username ?? ''}`}</Text>
                        </Text>
                        <Text style={styles.contentLabel}>{'Email:  '}
                            <Text style={{ fontFamily: Fonts.Livvic_Regular }}>{`${profileDetails?.data?.email ?? ''}`}</Text>
                        </Text>
                        <Text style={styles.contentLabel}>{'Subscription:  '}
                            <Text style={{ fontFamily: Fonts.Livvic_Regular }}>{`${profileDetails?.data?.pro_status ? 'Pro' : 'Free'}`}</Text>
                        </Text>
                    </View>
                    <AppButton buttonStyle={{ width: '60%' }} title={'Change Password'} onPress={onChangePasswordButtonPress} />
                    <AppButton buttonStyle={{ width: '60%' }} title={'Manage Subscription'} onPress={onSubscriptionButtonPress} />
                    <AppButton buttonStyle={{ width: '60%' }} title={'Log Out'} onPress={() => { dispatch(logoutUser()) }} />
                    <Image style={{ height: 100, alignSelf: 'center', marginTop: 30 }} resizeMode={'contain'} source={AppImages.BeagleSleepingImage} />
                </View>
            </View>
            <BottomBackButton onButtonPress={onBackButtonPress} />
        </>
    );
}