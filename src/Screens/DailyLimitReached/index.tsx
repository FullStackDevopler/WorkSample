import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
    Image,
    Pressable,
    View,
    Text
} from 'react-native';
import { styles } from './styles';
import AppButton from '../../Components/AppButton';
import LogoView from '../../Components/LogoView';
import { AppImages } from '../../Assets';
import { Fonts } from '../../Theme/fonts';
import { Colors } from '../../Theme/colors';
import { useNavigation } from '@react-navigation/native';
import { AppConstants } from '../../Theme/constants';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../../Router/RootNavigation';
import BottomBackButton from '../../Components/BottomBackButton';
import { getGameDetails } from '../../Redux/Actions/gameActions';
import AdsComponent from '../../Components/AdsComponent';
import Loader from '../../Components/Loader';

export default function DailyLimitReached(): JSX.Element {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const loaderRef = useRef(null)
    const gameDetails = useSelector(state => state.game.gameDetails)
    const accessToken = useSelector(state => state.user.token)
    const isProUser = useSelector(state => state.user.isProUser)
    const [nextWordTime, setNextWordTime] = useState('')
    const error = useSelector(state => state.game.error)

    const onBackButtonPress = () => {
        reset(AppConstants.screens.home, 1)
    }

    useEffect(() => {
        loaderRef?.current?.showLoader()
        dispatch(getGameDetails())
    }, [])

    useEffect(() => {
        if (gameDetails !== null || error !== null) {
            loaderRef?.current?.hideLoader()
            if (gameDetails?.data) {
                startCountdownToTime(getTime());
            }
        }
    }, [gameDetails?.data, error])

    const onGetProButtonClick = () => {
        // if (!accessToken) {
        //     alert("Please login first in order to purchase the Pro account.")
        //     return
        // }
        navigation.navigate(AppConstants.screens.getPro)
    }

    const goToScoreScreen = () => {
        navigation.navigate(AppConstants.screens.score)
    }

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

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', marginBottom: 20 }}>
                <View style={styles.contentView}>

                    <Text style={styles.contentLabel}>
                        {`Daily play limit reached. `}
                        <Text style={{ fontWeight: '700' }}>
                            {`Get pro`}
                        </Text> {`to play unlimited times each day!\n`}
                    </Text>
                    <Text style={styles.contentLabel}>
                        <Text style={{ fontWeight: '700' }}>{`Time Until Next Game: `}</Text>
                        {`${nextWordTime}`}
                    </Text>

                    {/* <View style={styles.innerContentView}>
                        <Text style={styles.contentLabel}>{'Final Score: '}</Text>
                        <Text adjustsFontSizeToFit={true} numberOfLines={1} style={[styles.contentLabel,
                        {
                            // marginTop: calculateTempScore?.toString().length > 2 ? 0 : 0, 
                            fontFamily: Fonts.Livvic_Regular,
                            width: 40,
                            textAlignVertical: 'top',
                            fontWeight: '400'
                        }
                        ]}>{`${calculateTempScore} `}</Text>
                    </View>*/}
                    <Image style={styles.polygonStyle}
                        resizeMode={'contain'}
                        source={AppImages.DownPolygon} />
                </View>
                <View style={styles.buttonView}>
                    <AppButton buttonStyle={{ width: '35%' }}
                        iconResizeMode={'contain'}
                        icon={AppImages.GetProText}
                        iconStyle={{ height: 30, width: 90, margin: 0 }}
                        onPress={onGetProButtonClick} />
                    <Image style={{ width: '20%', aspectRatio: 1, marginRight: '10%' }}
                        resizeMode={'contain'}
                        source={AppImages.BeagleSideImage} />
                </View>
                <AppButton buttonStyle={{ width: '60%' }}
                    title={"View Score"}
                    onPress={() => goToScoreScreen()} />
            </View>
            {
                !isProUser ?
                    <AdsComponent /> : null
            }
            {/* <BottomBackButton onButtonPress={onBackButtonPress} /> */}
            <Loader ref={loaderRef} />
        </View>
    );
}