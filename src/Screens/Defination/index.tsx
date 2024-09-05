import React from 'react';
import {
    Dimensions,
    Image,
    Pressable,
    Text,
    View,
    ScrollView
} from 'react-native';
import { styles } from './styles';
import AppButton from '../../Components/AppButton';
import LogoView from '../../Components/LogoView';
import { AppImages } from '../../Assets';
import { Fonts } from '../../Theme/fonts';
import { useNavigation } from '@react-navigation/native';
import { AppConstants } from '../../Theme/constants';
import AdsComponent from '../../Components/AdsComponent';
import { useSelector } from 'react-redux';

export default function Defination(): JSX.Element {
    const navigation = useNavigation()
    const isProUser = useSelector(state => state.user.isProUser)
    const details = useSelector(state => state.game.cardDetails)
    const onNextButtonClick = () => {
        navigation.navigate(AppConstants.screens.chooseLetters)
    }
    return (
        <View style={styles.container}>
            {/* <LogoView /> */}
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <View style={{ height: 80, marginHorizontal: 25 }}>
                    <ScrollView>
                        <Text style={styles.definationText}>
                            <Text style={{ fontFamily: Fonts.Livvic_Bold }}>{`${details?.card?.word || ''}`}</Text>
                            {details?.card?.word ? ` -` : null}
                            {` ${details?.card?.explanation || ''}`}
                        </Text>
                    </ScrollView>
                </View>
                <View style={styles.answerView}>
                    <Text style={styles.answerText}>
                        {'Bark bark!'} <Text style={{ fontFamily: Fonts.Livvic_Bold }}>{'Memorize'}</Text> {'the definition of the word for later on in the game.'}
                    </Text>
                    <Image style={styles.polygonStyle}
                        resizeMode={'contain'}
                        source={AppImages.DownPolygon} />
                </View>
                <View style={styles.buttonView}>
                    <AppButton
                        buttonStyle={{ width: "25%" }}
                        title={'Next'}
                        onPress={onNextButtonClick} />
                    <Image style={{ width: '25%', aspectRatio: 1 }}
                        resizeMode={'contain'}
                        source={AppImages.BeagleSideImage} />
                </View>
            </View>
            {
                !isProUser ?
                    <AdsComponent /> : null
            }
        </View>
    );
}