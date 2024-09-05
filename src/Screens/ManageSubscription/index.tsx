import React from 'react';
import {
    Image,
    Text,
    View,
} from 'react-native';
import { styles } from './styles';
import LogoView from '../../Components/LogoView';
import { AppImages } from '../../Assets';
import BottomBackButton from '../../Components/BottomBackButton';
import { useNavigation } from '@react-navigation/native';

export default function ManageSubscription(): JSX.Element {
    const navigation = useNavigation()
    const onBackButtonPress = () => {
        navigation.goBack()
    }
    const BottomView = () => {
        return (
            <Image style={styles.bottomImage} resizeMode={'contain'} source={AppImages.BeagleRightFrontImage} />
        )
    }
    return (
        <View style={styles.container}>
            <LogoView />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', marginBottom: 30 }}>
                <View style={styles.contentView}>
                    <Text style={styles.contentTitleText}>
                        {'Subscriptions are managed through the app store. Here are the steps to cancel:'}
                    </Text>
                    <View>
                        <Text style={[styles.contentText, { marginTop: 15 }]}>
                            {'1. Open App Store'}
                        </Text>
                        <Text style={styles.contentText}>
                            {'2. Click your profile picture (top right)'}
                        </Text>
                        <Text style={styles.contentText}>
                            {'3. Click “subscriptions”'}
                        </Text>
                        <Text style={styles.contentText}>
                            {'4. Click “DoggyWords”'}
                        </Text>
                        <Text style={styles.contentText}>
                            {'5. Click “Cancel Subscription”'}
                        </Text>
                    </View>
                    <Image style={styles.bottomPolygonImage}
                        resizeMode={'contain'} source={AppImages.DownPolygonTwo} />
                    <Image style={{
                        height: 120,
                        left: -50,
                        top: 'auto',
                        bottom: -120,
                        position: 'absolute',
                    }} resizeMode={'contain'} source={AppImages.BeagleFullFrontImage} />
                </View>
            </View>
            <BottomBackButton onButtonPress={onBackButtonPress} />
            {/* <BottomView /> */}

        </View>
    );
}