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
import { Colors } from '../../Theme/colors';
import { AppConstants } from '../../Theme/constants';
import { useNavigation } from '@react-navigation/native';
import AdsComponent from '../../Components/AdsComponent';
import { useSelector } from 'react-redux';
const windowWidth = Dimensions.get('window').width;
export default function ExplainationSlideTwo(): JSX.Element {
    const navigation = useNavigation()
    const isProUser = useSelector(state => state.user.isProUser)
    const onNextButtonClick = () => {
        navigation.navigate(AppConstants.screens.quizInterface)
    }
    return (
        <View style={styles.container}>
            {/* <LogoView /> */}
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <View style={styles.commentView}>
                    <Text style={styles.commentText}>
                        {'Woof woof, '}
                        <Text style={{ fontFamily: Fonts.Livvic_BoldItalic }}>{'Great Job!! '}</Text>
                        {'Answer the vocabulary question on the next slide. If you get it correct, '}
                        <Text style={{ fontFamily: Fonts.Livvic_BoldItalic }}>{'5 points will be added '}</Text>
                        {'to your final score. '}
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