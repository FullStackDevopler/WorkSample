import React, { PropsWithChildren } from 'react';
import {
    Dimensions,
    Platform,
    StyleSheet,
    View,
} from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from '@react-native-admob/admob';
import { useSelector } from 'react-redux';
type AdsComponentProps = PropsWithChildren<{
}>;


export default function AdsComponent({ }: AdsComponentProps): JSX.Element {
    const screenWidth = Dimensions.get('window').width;
    const trackingAllowed = useSelector(state => state.user.trackingAllowed)
    console.log("Tracking Allow", trackingAllowed)
    return (
        <View style={{ height: 50, width: screenWidth }}>
            {/* <BannerAd requestOptions={{ requestNonPersonalizedAdsOnly: !trackingAllowed }} size={BannerAdSize.FULL_BANNER} unitId={TestIds.BANNER} /> */}
            {/* <BannerAd requestOptions={{ requestNonPersonalizedAdsOnly: !trackingAllowed }} size={`${screenWidth}x50`} unitId={TestIds.BANNER} /> */}
            <BannerAd requestOptions={{ requestNonPersonalizedAdsOnly: !trackingAllowed }} size={BannerAdSize.ADAPTIVE_BANNER} unitId={TestIds.BANNER} />
        </View>
    )
}

const styles = StyleSheet.create({

})