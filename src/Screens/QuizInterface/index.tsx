import React from 'react';
import {
    Image,
    Pressable,
    Text,
    View,
} from 'react-native';
import { styles } from './styles';
import AppButton from '../../Components/AppButton';
import LogoView from '../../Components/LogoView';
import { AppImages } from '../../Assets';
import { Fonts } from '../../Theme/fonts';
import { AppConstants } from '../../Theme/constants';
import { useNavigation } from '@react-navigation/native';
import AdsComponent from '../../Components/AdsComponent';
import { useDispatch, useSelector } from 'react-redux';
import { setQuizAnswerStatus } from '../../Redux/Actions/gameActions';

export default function QuizInterface(): JSX.Element {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const details = useSelector(state => state.game.cardDetails)
    const isProUser = useSelector(state => state.user.isProUser)

    const onOptionButtonClick = (selectedOption: string) => {
        if (selectedOption === details?.card?.[details?.card?.answer]) {
            dispatch(setQuizAnswerStatus("Correct"))
        } else {
            dispatch(setQuizAnswerStatus("Incorrect"))
        }
        navigation.navigate(AppConstants.screens.answer)
    }
    const BottomView = () => {
        return (
            <View style={styles.bottomView}>
                <Image style={styles.bottomImage} resizeMode={'contain'} source={AppImages.BeagleFrontImage} />
                <View style={styles.bottomRightView}>
                    <Image style={styles.bottomPolygonImage}
                        resizeMode={'contain'} source={AppImages.LeftPolygon} />
                    <Text style={styles.bottomContentText}>{'Correct answers add '}
                        <Text style={{ fontFamily: Fonts.Livvic_BoldItalic }}>
                            {'5 points '}
                        </Text>
                        {'to your score'}
                    </Text>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <Text style={styles.titleTextStyle}>{`${details?.card?.question}`}</Text>
                <AppButton buttonStyle={{ width: '80%' }}
                    title={`${details?.card?.option1}`}
                    onPress={() => onOptionButtonClick(details?.card?.option1)} />
                <AppButton buttonStyle={{ width: '80%' }}
                    title={`${details?.card?.option2}`}
                    onPress={() => onOptionButtonClick(details?.card?.option2)} />
                <AppButton buttonStyle={{ width: '80%' }}
                    title={`${details?.card?.option3}`}
                    onPress={() => onOptionButtonClick(details?.card?.option3)} />
                <AppButton buttonStyle={{ width: '80%' }}
                    title={`${details?.card?.option4}`}
                    onPress={() => onOptionButtonClick(details?.card?.option4)} />
            </View>
            {/* <BottomView /> */}
            {
                !isProUser ?
                    <AdsComponent /> : null
            }

        </View >
    );
}