import React, { useEffect, useRef, useState } from 'react';
import {
    Image,
    Text,
    View,
    Dimensions
} from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { styles } from './styles';
import AppButton from '../../Components/AppButton';
import LogoView from '../../Components/LogoView';
import { AppImages } from '../../Assets';
import { Fonts } from '../../Theme/fonts';
import { AppConstants } from '../../Theme/constants';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedLetters } from './../../Redux/Actions/gameActions';
import AdsComponent from '../../Components/AdsComponent';
const WINDOW_WIDTH = Dimensions.get('window').width;
const LEFT_MARGIN = 10
const LETTER_WIDTH = (WINDOW_WIDTH - 2 * LEFT_MARGIN) / 13
// const SLIDER_WIDTH = LETTER_WIDTH * letters.length;
export default function ChooseLetters(): JSX.Element {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const details = useSelector(state => state.game.cardDetails)
    const isProUser = useSelector(state => state.user.isProUser)
    const [letters, setLetters] = useState([])
    const [selectedLetters, setLetterSelection] = useState([])
    const onNextButtonClick = () => {
        dispatch(setSelectedLetters(selectedLetters))
        navigation.navigate(AppConstants.screens.explainationSlideOne)
    }
    useEffect(() => {
        if (details?.card?.word) {
            setLetters([...details?.card?.word.toLowerCase()])
            setLetterSelection([details?.card?.word.toLowerCase()[0], details?.card?.word.toLowerCase()[1], details?.card?.word.toLowerCase()[2]])
        }
    }, [details])
    return (
        <GestureHandlerRootView style={styles.container}>
            {/* <LogoView /> */}
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <View style={[styles.sliderView, { width: LETTER_WIDTH * letters.length }]}>
                    {
                        letters.map((letter, index) => {
                            return (
                                <View key={index} style={styles.letterView}>
                                    <Text adjustsFontSizeToFit={true} numberOfLines={1} style={styles.letterText}>{letter}</Text>
                                </View>
                            )
                        })
                    }
                    <View style={[styles.selectionView, { width: LETTER_WIDTH * letters.length }]}>
                        <SelectionView letters={letters} onSelect={(selectionArray) => { setLetterSelection(selectionArray) }} />
                    </View>
                </View>
                <Image source={AppImages.Arrow} style={{ height: 30, width: '70%' }} resizeMode='contain' />
                <View style={styles.selectedLettersView}>
                    <Text style={styles.selectedLettersText}>
                        {'Selected '}<Text style={{ fontFamily: Fonts.Livvic_Bold }}>{'Letters:'}</Text>
                    </Text>
                    <View style={{ width: 20 }} />
                    <View style={styles.lettersView}>
                        {
                            selectedLetters.map((letter, index) => {
                                return (
                                    <View key={index} style={styles.letterView}>
                                        <Text adjustsFontSizeToFit={true} numberOfLines={1} style={styles.letterText}>{letter}</Text>
                                    </View>
                                )
                            })
                        }
                        <View style={[styles.selectionBorder, { left: 0, position: 'absolute' }]} />
                    </View>
                </View>
                <View style={styles.commentView}>
                    <Text style={styles.commentText}>
                        <Text style={{ fontFamily: Fonts.Livvic_Bold }}>{'Move the pink rectangle'}</Text>{' to pick your letters.'}
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
        </GestureHandlerRootView>
    );
}

const SelectionView = (props: any) => {
    const start = useSharedValue(0)
    const offset = useSharedValue(0)
    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: offset.value }
            ]
        }
    })
    const dragGesture = Gesture.Pan()
        .onStart(_e => {

        })
        .onUpdate(e => {
            offset.value = e.translationX + start.value;
        })
        .onEnd(() => {
            const closest = getClosestPosition(positions.current, offset.value)
            offset.value = withSpring(closest);
            start.value = closest;
            getSelectedLetters(closest)
        })
        .runOnJS(true)
    const composedGesture = Gesture.Race(dragGesture);
    const positions = useRef([]);
    useEffect(() => {
        getXPositions(props.letters)
    }, [props.letters])
    const getXPositions = array => {
        let _positions = []
        for (let i = 0; i <= array.length - 3; i++) {
            _positions.push(LETTER_WIDTH * i)
        }
        positions.current = _positions
    }
    const getClosestPosition = (positions: any[], value: number) => {
        var closest = positions.reduce(function (prev: number, curr: number) {
            return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
        });
        return closest;
    }
    const getSelectedLetters = (closestValue) => {
        const selectedIndex = positions.current.findIndex((val) => {
            return val === closestValue
        })
        if (selectedIndex >= 0) {
            props.onSelect([props.letters[selectedIndex], props.letters[selectedIndex + 1], props.letters[selectedIndex + 2]])
        }

    }
    return (
        <GestureDetector gesture={composedGesture}>
            <Animated.View style={[styles.selectionBorder, animatedStyles]} />
        </GestureDetector>
    )

}