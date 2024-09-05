import React, { useEffect, useMemo, useRef, useState } from 'react';
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
import { Colors } from '../../Theme/colors';
import { Fonts } from '../../Theme/fonts';
import { useNavigation } from '@react-navigation/native';
import { AppConstants } from '../../Theme/constants';
import { useDispatch, useSelector } from 'react-redux';
import { getCardDetails, getGameDetails, resetGameData } from '../../Redux/Actions/gameActions';
import Share from 'react-native-share';
import { calculateScore } from '../../Theme/utils';
import { logoutGuestUser, logoutUser } from '../../Redux/Actions/userActions';

export default function Score(): JSX.Element {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const accessToken = useSelector(state => state.user.token)
    const selectedLettersRef = useRef(['a', 'b', 'c'])
    const wordsList = useSelector(state => state.game.wordsList)

    const gameDetailsResponse = useSelector(state => state.game.gameDetails)
    const cardDetails = useSelector(state => state.game.cardDetails)
    const gameScoreResponse = useSelector(state => state.game.gameScoreResponse)
    const [isLoggedIn, setLoggedIn] = useState(false)
    const [gameDetails, setGameDetails] = useState(null)
    const action = useRef(null)

    const calculatedScore = useMemo(() => calculateScore(wordsList), [wordsList]);

    const onStatsButtonClick = () => {
        navigation.navigate(AppConstants.screens.stats)
    }
    const onLoginButtonClick = () => {
        action.current = "Login"
        dispatch(resetGameData())
    }
    const onHomeButtonClick = () => {
        action.current = "Home"
        dispatch(resetGameData())
    }
    const onPlayButtonClick = () => {
        action.current = "Play"
        dispatch(resetGameData())
    }
    const onShareButtonPress = () => {
        const originalDate = new Date(); // Replace with your date
        const year = originalDate.getFullYear() % 100; // Get the last two digits of the year
        const month = originalDate.getMonth() + 1; // Months are zero-based, so add 1
        const day = originalDate.getDate();

        const formattedDate = `${month}/${day}/${year.toString().padStart(2, '0')}`;
        const messageDatePart = `Date: ${formattedDate}\n`
        // const totalScore = calculatedScore + (quizAnswerStatus === "Correct" ? 5 : 0)
        const totalScore = gameDetails?.data?.final_score
        let messageEmojiPart = `My Score: `
        for (let i = 0; i < totalScore; i++) {
            messageEmojiPart += '🐕';
        }
        // const selectedCharacters = gameDetails?.data?.selectedCharacters
        // console.log("Print", selectedCharacters)
        const messageScorePart = `(${totalScore}) (${gameDetails?.data?.selectedCharacters?.toUpperCase()}) \nDownload the game: doggywords.com`
        const message = `${messageDatePart}${messageEmojiPart}${messageScorePart}`
        Share.open({ message })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                err && console.log(err);
            });
    }

    const goToHome = () => {
        navigation.navigate(AppConstants.screens.home)
    }

    const goToLogin = () => {
        dispatch(logoutGuestUser())
    }

    useEffect(() => {
        dispatch(getGameDetails())
    }, [])

    useEffect(() => {
        if (gameDetailsResponse) {
            setGameDetails(gameDetailsResponse)
        }
    }, [gameDetailsResponse?.data])

    useEffect(() => {
        if (action.current === "Play") {
            if (cardDetails !== null) {
                if (cardDetails?.gamesAvailable) {
                    navigation.navigate(AppConstants.screens.defination)
                } else {
                    navigation.navigate(AppConstants.screens.dailyLimitReached)
                }
            }
        }
    }, [cardDetails])

    useEffect(() => {
        if (action.current === "Home") {
            console.log("Home Action", gameScoreResponse, " ****", cardDetails)
            if (gameScoreResponse === null && cardDetails === null) {
                goToHome()
            }
        } else if (action.current === "Login") {
            console.log("Login Action", gameScoreResponse, " ****", cardDetails)
            goToLogin()
        } else if (action.current === "Play") {
            console.log("Play Action", gameScoreResponse, " ****", cardDetails)
            if (gameScoreResponse === null && cardDetails === null) {
                dispatch(getCardDetails())
            }
        }
    }, [gameScoreResponse, cardDetails])


    useEffect(() => {
        if (accessToken) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }
        console.log("AccessToken", accessToken)
    }, [accessToken])
    const calculateTempScore = gameDetails?.data?.final_score
    const selectedLetters = gameDetails?.data?.selectedCharacters ? gameDetails?.data?.selectedCharacters : ' , , '
    console.log("gameDetails?.data=>>>>",JSON.stringify(gameDetails?.data));
    console.log("selectedLetters =>>>",selectedLetters);
    
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.container}>
            <LogoView />
            <View style={styles.innerContainer}>
                <View style={styles.contentView}>
                    <View style={styles.innerContentView}>
                        <Text style={styles.contentLabel}>{'Letters:  '}</Text>

                      { selectedLetters.length > 0 && <View style={styles.lettersView}>
                            { 
                                selectedLetters?.split(",")?.map((letter, index) => {
                                    return (
                                        <View key={index} style={styles.letterView}>
                                            <Text adjustsFontSizeToFit={true} numberOfLines={1} style={styles.letterText}>{letter}</Text>
                                        </View>
                                    )
                                })
                            }
                            <View style={[styles.selectionView]} />
                        </View>
}
                    </View>
                    <View style={styles.innerContentView}>
                        <Text style={styles.contentLabel}>{'Final Score: '}</Text>
                        <Text adjustsFontSizeToFit={true} numberOfLines={1} style={[styles.contentLabel,
                        {
                            // marginTop: calculateTempScore?.toString().length > 2 ? 0 : 0, 
                            fontFamily: Fonts.Livvic_Regular,
                            width: 40,
                            textAlignVertical: 'top',
                            fontWeight: '400'
                        }
                        ]}>{`${calculateTempScore ? calculateTempScore : 0} `}</Text>
                    </View>
                    <Image style={styles.polygonStyle}
                        resizeMode={'contain'}
                        source={AppImages.DownPolygon} />
                </View>
                <View style={styles.buttonView}>
                    <AppButton
                        buttonStyle={[{ width: "40%", backgroundColor: Colors.secondary }, styles.shadowProp]}
                        title={"Today's Stats"}
                        titleStyle={{ fontFamily: Fonts.Livvic_BoldItalic, color: Colors.primary, fontSize: 16 }}
                        onPress={onStatsButtonClick} />
                    <Image style={{ width: '25%', aspectRatio: 1 }}
                        resizeMode={'contain'}
                        source={AppImages.BeagleSideImage} />
                </View>
                <AppButton buttonStyle={{ width: '60%' }}
                    title={"Play Again"}
                    onPress={onPlayButtonClick} />
                <AppButton buttonStyle={{ width: '60%' }}
                    title={"Share"}
                    onPress={onShareButtonPress} />
                {
                    accessToken ? <AppButton buttonStyle={{ width: '60%' }}
                        title={"Home"}
                        onPress={onHomeButtonClick} /> : <AppButton buttonStyle={{ width: '60%' }}
                            title={"Login/Register"}
                            onPress={onLoginButtonClick} />
                }

            </View>
        </ScrollView>

    );
}