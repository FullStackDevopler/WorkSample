import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    FlatList,
    Image,
    Pressable,
    Text,
    View,
} from 'react-native';
import { styles } from './styles';
import AppButton from '../../Components/AppButton';
import LogoView from '../../Components/LogoView';
import { AppImages } from '../../Assets';
import { Colors } from '../../Theme/colors';
import { Fonts } from '../../Theme/fonts';
import BottomBackButton from '../../Components/BottomBackButton';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getGameDetails } from '../../Redux/Actions/gameActions';
import { logoutGuestUser, logoutUser } from '../../Redux/Actions/userActions';
import { calculateScore, formatNumber } from '../../Theme/utils';

type ItemProps = { title: string, index: number };

const Item = ({ title, index }: ItemProps) => (
    <View style={styles.wordListItem}>
        <Text style={styles.italicContentLabel}>{`${index + 1}. ${title} `}
            <Text style={styles.greenContentLabel}>{`+ ${title === 'Correct Answer' ? 5 : title.length}`}</Text>
        </Text>
    </View>
);

export default function Stats(): JSX.Element {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const accessToken = useSelector(state => state.user.token)
    const wordsList = useSelector(state => state.game.wordsList)
    const gameDetails = useSelector(state => state.game.gameDetails)
    const quizAnswerStatus = useSelector(state => state.game.quizAnswerStatus)
    const [loggedIn, setLoggedIn] = useState(true)
    const [nextWordTime, setNextWordTime] = useState('')
    const [words, setWords] = useState([])


    const calculatedScore = useMemo(() => calculateScore(wordsList), [wordsList]);

    const onBackButtonPress = () => {
        navigation.goBack()
    }

    const onLoginButtonPress = () => {
        dispatch(logoutGuestUser())
    }

    useEffect(() => {
        dispatch(getGameDetails())
    }, [])

    useEffect(() => {
        if (gameDetails?.data) {
            startCountdownToTime(getTime());
            if (gameDetails?.data?.wordList?.length > 0) {
                const wordsArray = gameDetails?.data?.wordList?.split(',')
                if (wordsArray) {
                    if (gameDetails?.data?.correctAnswerStatus === true) {
                        wordsArray.unshift('Correct Answer')
                    }
                }
                setWords(wordsArray)
            }
            console.log("Words", gameDetails?.data)
        }
    }, [gameDetails?.data])

    useEffect(() => {
        if (wordsList[0] !== 'Correct Answer') {
            if (quizAnswerStatus === 'Correct') {
                wordsList.unshift('Correct Answer')
            }
        }
    }, [])

    const startCountdownToTime = useCallback((targetTime: any) => {
        // Parse the target time in "HH:MM:SS" format.
        const targetTimeParts = targetTime.split(':');
        if (targetTimeParts.length !== 3) {
            console.log("Invalid target time format. Please use 'HH:MM:SS'.");
            return;
        }

        const targetHours = parseInt(targetTimeParts[0]);
        const targetMinutes = parseInt(targetTimeParts[1]);
        const targetSeconds = parseInt(targetTimeParts[2]);

        if (isNaN(targetHours) || isNaN(targetMinutes) || isNaN(targetSeconds)) {
            console.log("Invalid target time. Please enter valid numbers.");
            return;
        }

        // Get the current time.
        const currentTime = new Date();
        const currentHours = currentTime.getHours();
        const currentMinutes = currentTime.getMinutes();
        const currentSeconds = currentTime.getSeconds();

        // Calculate the time remaining until the target time.
        let hoursRemaining = targetHours - currentHours;
        let minutesRemaining = targetMinutes - currentMinutes;
        let secondsRemaining = targetSeconds - currentSeconds;

        // Handle cases where the target time is in the future.
        if (secondsRemaining < 0) {
            secondsRemaining += 60;
            minutesRemaining--;
        }
        if (minutesRemaining < 0) {
            minutesRemaining += 60;
            hoursRemaining--;
        }
        if (hoursRemaining < 0) {
            hoursRemaining += 24; // 24 hours in a day
        }

        // Calculate the total time remaining in seconds.
        const totalSecondsRemaining = hoursRemaining * 3600 + minutesRemaining * 60 + secondsRemaining;

        let timer = totalSecondsRemaining;

        const countdownInterval = setInterval(function () {
            if (timer <= 0) {
                clearInterval(countdownInterval);
                console.log("Countdown complete!");
            } else {
                const remainingHours = Math.floor(timer / 3600);
                const remainingMinutes = Math.floor((timer % 3600) / 60);
                const remainingSeconds = timer % 60;

                // Display the remaining time in HH:MM:SS format.
                const display = `${String(remainingHours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
                setNextWordTime(display)
                // console.log(display); // You can update the display as needed (e.g., in an HTML element).
                timer--;
            }
        }, 1000); // Update the countdown every 1000 ms (1 second).
    }, []);

    const getTime = () => {
        const dateString = gameDetails?.data?.next_word;
        const dateObject = new Date(dateString);
        // Get the user's local time zone offset
        const localTimeZoneOffset = dateObject.getTimezoneOffset() * 60000;

        // Convert UTC time to local time
        const localTime = new Date(dateObject.getTime() - localTimeZoneOffset);

        const hours = localTime.getUTCHours().toString().padStart(2, '0');
        const minutes = localTime.getUTCMinutes().toString().padStart(2, '0');
        const seconds = localTime.getUTCSeconds().toString().padStart(2, '0');

        const formattedTime = `${hours}:${minutes}:${seconds}`;
        console.log(formattedTime)
        return formattedTime
    }

    return (
        <View style={styles.container}>
            <LogoView />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', marginBottom: 30 }}>
                <View style={styles.contentView}>
                    <View style={styles.contentItemView}>
                        <Text style={styles.contentTextBold}>{'Final Score: '}</Text>
                        <Text style={styles.contentTextRegular}>{`${gameDetails?.data?.final_score || ''}`}</Text>
                    </View>
                    <View style={styles.contentItemView}>
                        <Text style={styles.contentTextBold}>{'My Average Score: '}</Text>
                        {!accessToken ?
                            <Pressable onPress={onLoginButtonPress} style={styles.loginButton}>
                                <Text style={styles.loginButtonText}>
                                    {'log in'}
                                </Text></Pressable> :
                            <Text style={styles.contentTextRegular}>
                                {formatNumber(gameDetails?.data?.average_score)}
                            </Text>}

                    </View>
                    <View style={styles.contentItemView}>
                        <Text style={styles.contentTextBold}>{'My Top Score: '}</Text>
                        {!accessToken ?
                            <Pressable onPress={onLoginButtonPress} style={styles.loginButton}>
                                <Text style={styles.loginButtonText}>
                                    {'log in'}
                                </Text></Pressable> :
                            <Text style={styles.contentTextRegular}>
                                {formatNumber(gameDetails?.data?.top_score)}
                            </Text>}

                    </View>
                    <View style={styles.contentItemView}>
                        <Text style={styles.contentTextBold}>{'Current Streak: '}</Text>
                        {!accessToken ?
                            <Pressable onPress={onLoginButtonPress} style={styles.loginButton}>
                                <Text style={styles.loginButtonText}>
                                    {'log in'}
                                </Text></Pressable> :
                            <Text style={styles.contentTextRegular}>
                                {gameDetails?.data?.current_streak}
                            </Text>}

                    </View>
                    <View style={styles.contentItemView}>
                        <Text style={styles.contentTextBold}>{'Max Streak: '}</Text>
                        {!accessToken ?
                            <Pressable onPress={onLoginButtonPress} style={styles.loginButton}>
                                <Text style={styles.loginButtonText}>
                                    {'log in'}
                                </Text></Pressable> :
                            <Text style={styles.contentTextRegular}>
                                {gameDetails?.data?.max_streak}
                            </Text>}

                    </View>
                    <View style={styles.contentItemView}>
                        <Text style={styles.contentTextBold}>{'Next Word: '}

                        </Text>
                        {/* <Text style={styles.contentTextRegular}>{gameDetails?.data ? getTime() : ''}</Text> */}
                        <Text style={styles.contentTextRegular}>{nextWordTime}</Text>
                    </View>
                </View>

                <View style={[styles.contentView, { backgroundColor: 'transparent' }]}>
                    {/* <Text style={styles.italicContentLabel}>{'1. Correct Answer '}
                        <Text style={styles.greenContentLabel}>{'+5'}</Text>
                    </Text>
                    <Text style={styles.italicContentLabel}>{'2. continue '}
                        <Text style={styles.greenContentLabel}>{'+8'}</Text>
                    </Text>
                    <Text style={styles.italicContentLabel}>{'3. knuckles '}
                        <Text style={styles.greenContentLabel}>{'+8'}</Text>
                    </Text>
                    <Text style={styles.italicContentLabel}>{'4. nocturnal '}
                        <Text style={styles.greenContentLabel}>{'+9'}</Text>
                    </Text>
                    <Text style={styles.italicContentLabel}>{'5. knuckle '}
                        <Text style={styles.greenContentLabel}>{'+7'}</Text>
                    </Text> */}
                    <FlatList
                        data={words}
                        renderItem={({ item, index }) => <Item title={item} index={index} />}
                        style={{ maxHeight: 130 }}
                    />
                </View>
            </View>
            <BottomBackButton onButtonPress={onBackButtonPress} />
        </View>
    );
}