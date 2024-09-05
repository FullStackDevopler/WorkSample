import React, { useEffect, useRef, useState } from 'react';
import {
    Image,
    Pressable,
    ScrollView,
    Text,
    View,
} from 'react-native';
import { styles } from './styles';
import AppButton from '../../Components/AppButton';
import LogoView from '../../Components/LogoView';
import { AppImages } from '../../Assets';
import { Fonts } from '../../Theme/fonts';
import { Colors } from '../../Theme/colors';
import { useNavigation } from '@react-navigation/native';
import { AppConstants } from '../../Theme/constants';
import { InterstitialAd, TestIds } from '@react-native-admob/admob';
import { useDispatch, useSelector } from 'react-redux';
import { saveGameScore } from '../../Redux/Actions/gameActions';
import AdsComponent from '../../Components/AdsComponent';
import { calculateScore } from '../../Theme/utils';
import Loader from '../../Components/Loader';
export default function Answer(): JSX.Element {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const loaderRef = useRef(null)
    const isProUser = useSelector(state => state.user.isProUser)
    const quizAnswerStatus = useSelector(state => state.game.quizAnswerStatus)
    const details = useSelector(state => state.game.cardDetails)
    const wordsList = useSelector(state => state.game.wordsList)
    const loading = useSelector(state => state.game.loading)
    const gameScoreResponse = useSelector(state => state.game.gameScoreResponse)
    const [interstitialAd, setInterstitialAd] = useState<InterstitialAd | null>(
        null
    );
    const [adLoaded, setAdLoaded] = useState(false);
    const [adDismissed, setAdDismissed] = useState(false);

    useEffect(() => {
        if (loading === false) {
            loaderRef?.current?.hideLoader()
            if (gameScoreResponse !== null) {
                if (!isProUser) {
                    if (adLoaded) {
                        interstitialAd?.show();
                    } else {
                        navigation.navigate(AppConstants.screens.score)
                    }
                } else {
                    navigation.navigate(AppConstants.screens.score)
                }
            }
        }
    }, [loading, gameScoreResponse])

    useEffect(() => {
        // const interstitial = InterstitialAd.createAd("ca-app-pub-3940256099942544/4411468910");
        const interstitial = InterstitialAd.createAd("ca-app-pub-4360140884090178/3882782605");
        // const interstitial = InterstitialAd.createAd("ca-app-pub-4360140884090178/2918815603");
        setInterstitialAd(interstitial);
        const subscriptions = [
            interstitial.addEventListener('adLoaded', () => {
                setAdLoaded(true);
                console.log("Add Loaded Listener")
            }),
            interstitial.addEventListener('adDismissed', () => {
                setAdDismissed(true);
                navigation.navigate(AppConstants.screens.score)
            }),
        ];

        return () => subscriptions.forEach((sub) => sub.remove());
    }, []);
    const onRevealButtonClick = () => {
        if (wordsList) {
            const scoreFromWords = calculateScore(wordsList)
            loaderRef?.current?.showLoader()
            if (quizAnswerStatus === "Correct") {
                dispatch(saveGameScore((scoreFromWords) + 5))
            } else {
                dispatch(saveGameScore(scoreFromWords))
            }

        }
    }
    const CorrectBottomView = () => {
        return (
            <View style={styles.bottomView}>
                <Image style={styles.bottomImage} resizeMode={'contain'} source={AppImages.BeagleFrontImage} />
                <View style={styles.bottomRightView}>
                    <Image style={styles.bottomPolygonImage}
                        resizeMode={'contain'} source={AppImages.LeftPolygon} />
                    <Text style={styles.bottomContentText}>{'Woof Woof... '}
                        <Text style={{ fontFamily: Fonts.Livvic_BoldItalic }}>
                            {'You`re\n on fire!!!'}
                        </Text>
                    </Text>
                </View>
            </View>
        )
    }

    const InCorrectBottomView = () => {
        return (
            <View style={styles.bottomView}>
                <Image style={styles.bottomImage} resizeMode={'contain'} source={AppImages.BeagleFrontImage} />
                <View style={styles.bottomRightView}>
                    <Image style={styles.bottomPolygonImage}
                        resizeMode={'contain'} source={AppImages.LeftPolygon} />
                    <Text style={styles.bottomContentText}>{'So close... '}
                        <Text style={{ fontFamily: Fonts.Livvic_BoldItalic }}>
                            {'You’ll get it \nnext time!!'}
                        </Text>
                    </Text>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {/* <LogoView /> */}
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                {
                    quizAnswerStatus === "Correct" ?
                        <Text style={[styles.responseTitle, { color: Colors.greenColor }]}>{'Correct.'}</Text> :
                        <Text style={[styles.responseTitle, { color: Colors.redColor }]}>{'Incorrect.'}</Text>
                }
                <View style={{ height: 80, marginHorizontal: 25, marginTop: 25 }}>
                    <ScrollView>
                        <Text style={styles.responseText}>
                            <Text style={{ fontFamily: Fonts.Livvic_Bold }}>
                                {`${details?.card?.word}`}
                            </Text>
                            {details?.card?.word ? ` -` : null}
                            {` ${details?.card?.explanation}`}
                        </Text>
                    </ScrollView></View>
                <AppButton
                    title='Reveal Score'
                    buttonStyle={{ width: 150, height: 40, marginTop: 40 }}
                    onPress={onRevealButtonClick} />
            </View>
            {
                !isProUser ?
                    <AdsComponent /> : null
            }
            {/* {
                isCorrectScreen ?
                    <CorrectBottomView /> :
                    <InCorrectBottomView />
            } */}
            <Loader ref={loaderRef} />
        </View>
    );
}