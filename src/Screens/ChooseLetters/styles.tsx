import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../Theme/colors";
import { Fonts } from "../../Theme/fonts";

const selectedLetters = ['n', 'c', 'u']
const WINDOW_WIDTH = Dimensions.get('window').width;
const LEFT_MARGIN = 10
const LETTER_HEIGHT = 40
const LETTER_WIDTH = (WINDOW_WIDTH - 2 * LEFT_MARGIN) / 13
const SLIDER_HEIGHT = 40
const SLIDER_WIDTH = LETTER_WIDTH * 13

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: 'center'
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%'
    },
    commentView: {
        backgroundColor: Colors.primary,
        borderRadius: 35,
        padding: 15,
        marginHorizontal: 15,
        marginTop: 30
    },
    commentText: {
        fontFamily: Fonts.Livvic_Regular,
        fontSize: 16,
        textAlign: 'center',
        color: Colors.whiteColor
    },
    polygonStyle: {
        position: 'absolute',
        height: 15,
        width: 25,
        bottom: -15,
        left: 'auto',
        right: 'auto',
        alignSelf: 'center'
    },
    selectedLettersView: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    selectedLettersText: {
        fontFamily: Fonts.Livvic_Regular,
        fontSize: 16,
        textAlign: 'center',
        color: Colors.blackColor
    },
    lettersView: {
        flexDirection: 'row',
    },
    letterView: {
        height: LETTER_HEIGHT,
        width: LETTER_WIDTH,
        backgroundColor: Colors.grayColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'white'

    },
    letterText: {
        fontFamily: Fonts.Livvic_Regular,
        fontSize: 25,
        color: Colors.primary,
        lineHeight: 32,
        padding: 2,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    selectionView: {
        width: SLIDER_WIDTH,
        height: SLIDER_HEIGHT,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        left: 0
    },
    selectionBorder: {
        height: LETTER_HEIGHT,
        width: LETTER_WIDTH * 3,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: Colors.purpleColor
    },
    sliderView: {
        width: SLIDER_WIDTH,
        height: SLIDER_HEIGHT,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center'
    }
})