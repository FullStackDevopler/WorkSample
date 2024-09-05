import React from 'react';
import {
    Dimensions,
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
import { useSelector } from 'react-redux';
import AdsComponent from '../../Components/AdsComponent';

export default function ExplainationSlideOne(): JSX.Element {
    const navigation = useNavigation()
    const isProUser = useSelector(state => state.user.isProUser)
    const selectedLetters = useSelector(state => state.game.selectedLetters)
    const onStartButtonClick = () => {
        navigation.navigate(AppConstants.screens.gameplay)
    }
    return (
        <View style={styles.container}>
            {/* <LogoView /> */}
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <View style={styles.commentView}>
                    <Text style={styles.commentText}>
                        {'Type as many words as possible in 60 seconds that contain the letters you selected:'}
                    </Text>
                    <View style={styles.lettersView}>
                        {
                            selectedLetters.map((letter, index) => {
                                return (
                                    <View key={index} style={styles.letterView}>
                                        <Text style={styles.letterText}>{letter}</Text>
                                    </View>
                                )
                            })
                        }
                        <View style={[styles.selectionView]} />
                    </View>
                    <Text style={styles.commentText}>
                        <Text style={{ fontFamily: Fonts.Livvic_BoldItalic }}>
                            {'Note: '}
                        </Text>
                        {'letters can be in any order'}
                    </Text>
                    <Image style={styles.polygonStyle}
                        resizeMode={'contain'}
                        source={AppImages.DownPolygon} />
                </View>
                <View style={styles.buttonView}>
                    <AppButton
                        buttonStyle={{ width: "25%" }}
                        title={'Start'}
                        onPress={onStartButtonClick} />
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