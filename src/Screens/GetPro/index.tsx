import React, { useEffect } from 'react';
import {
    Image,
    Platform,
    Pressable,
    Text,
    View,
} from 'react-native';
import {
    PurchaseError,
    requestSubscription,
    useIAP,
} from 'react-native-iap';
import { styles } from './styles';
import AppButton from '../../Components/AppButton';
import LogoView from '../../Components/LogoView';
import { AppImages } from '../../Assets';
import { Colors } from '../../Theme/colors';
import { Fonts } from '../../Theme/fonts';
import BottomBackButton from '../../Components/BottomBackButton';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

export default function GetPro(): JSX.Element {
    const navigation = useNavigation()
    const accessToken = useSelector(state => state.user.token)
    const {
        subscriptions,
        currentPurchase,
        finishTransaction
    } = useIAP();
    const onBackButtonPress = () => {
        navigation.goBack()
    }

    useEffect(() => {
        console.log("Subscriptions", subscriptions)
    }, [])

    // useEffect(() => {
    //     const checkCurrentPurchase = async () => {
    //         try {
    //             if (currentPurchase?.productId) {
    //                 await finishTransaction({
    //                     purchase: currentPurchase,
    //                     isConsumable: true,
    //                 });
    //             }
    //         } catch (error) {
    //             if (error instanceof PurchaseError) {
    //                 console.log({ message: `[${error.code}]: ${error.message}`, error });
    //             } else {
    //                 console.log({ message: 'handleBuyProduct', error });
    //             }
    //         }
    //     };

    //     checkCurrentPurchase();
    // }, [currentPurchase, finishTransaction]);

    const handleBuySubscription = async () => {
        // return
        if (!accessToken) {
            alert("Please login first in order to purchase the Pro account.")
            return
        }
        try {
            if (subscriptions && subscriptions.length > 0) {
                if (Platform.OS === 'android') {
                    await requestSubscription({
                        sku: subscriptions[0].productId,
                        subscriptionOffers: [{ sku: subscriptions[0].productId, offerToken: subscriptions?.[0].subscriptionOfferDetails?.[0].offerToken }]
                    });
                } else {
                    await requestSubscription({
                        sku: subscriptions[0].productId
                    });
                }

            }
        } catch (error) {
            if (error instanceof PurchaseError) {
                console.log({ message: `[${error.code}]: ${error.message}`, error });
            } else {
                console.log({ message: 'handleBuySubscription', error });
            }
        }
    };

    return (
        <View style={styles.container}>
            {/* <LogoView image={AppImages.GetProWithDog} imageStyle={{ height: 130, marginTop: 70 }} /> */}
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <View style={styles.logoView}>
                    <Image resizeMode='contain' style={styles.getProLogo} source={AppImages.GetProText} />
                    <Image style={styles.polygonStyle}
                        resizeMode={'contain'}
                        source={AppImages.DownPolygon} />
                </View>
                <View style={styles.dogView}>
                    <>
                        <Image resizeMode='contain' style={styles.dogImage} source={AppImages.BeagleFullFrontImage} />
                    </>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <AppButton buttonStyle={[{ width: '75%', backgroundColor: Colors.secondary, alignSelf: 'center' }, styles.shadowProp]}
                            titleStyle={{ color: Colors.primary, fontFamily: Fonts.Livvic_BoldItalic }}
                            title={"Purchase"}
                            onPress={handleBuySubscription} />
                    </View>
                </View>
                <View style={[styles.contentView, styles.shadowProp]}>
                    <View style={[styles.contentTextView, { marginTop: 30 }]}>
                        <Image resizeMode='contain' style={styles.tick} source={AppImages.Tick} />
                        <Text style={styles.contentText}>{'No Ads\n'}</Text>
                    </View>
                    <View style={styles.contentTextView}><Image resizeMode='contain' style={styles.tick} source={AppImages.Tick} /><Text style={styles.contentText}>{'Ability to shuffle letters\n'}</Text></View>
                    <View style={styles.contentTextView}><Image resizeMode='contain' style={styles.tick} source={AppImages.Tick} /><Text style={styles.contentText}>{'Play unlimited times\n'}</Text></View>
                    <View style={[styles.contentTextView]}><Image resizeMode='contain' style={styles.tick} source={AppImages.Tick} /><Text style={styles.contentText}>{'Cancel anytime'}</Text></View>
                    <View style={[styles.contentTextView, { marginBottom: 30 }]}><Image resizeMode='contain' style={styles.tick} source={AppImages.Tick} /><Text style={styles.contentText}><Text style={{ textDecorationLine: 'underline' }}>{'$1.99'}</Text>{' per month'}</Text></View>
                </View>
                {/* onPress={() => { }} /> */}
                {/* <Text style={styles.contentText}>{'or'}</Text>
                <AppButton buttonStyle={[{ width: '50%', backgroundColor: Colors.secondary }, styles.shadowProp]}
                    titleStyle={{ color: Colors.blackColor, fontFamily: Fonts.Livvic_Bold, }}
                    title={"$29.99/Year"}
                    onPress={() => { }} /> */}
            </View>
            <BottomBackButton onButtonPress={onBackButtonPress} />
        </View >
    );
}