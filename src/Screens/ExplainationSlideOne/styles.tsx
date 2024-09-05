import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../Theme/colors";
import { Fonts } from "../../Theme/fonts";

const WINDOW_WIDTH = Dimensions.get('window').width;
const LEFT_MARGIN = 10
const LETTER_HEIGHT = 40
const LETTER_WIDTH = (WINDOW_WIDTH - 2 * LEFT_MARGIN) / 13
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
        marginHorizontal: 10,
        paddingBottom: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    commentText: {
        fontFamily: Fonts.Livvic_Italic,
        fontSize: 16,
        textAlign: 'center',
        color: Colors.whiteColor,
        marginHorizontal: 10,
    },
    lettersView: {
        flexDirection: 'row',
        // marginVertical: 5
    },
    letterView: {
        height: LETTER_HEIGHT,
        width: LETTER_WIDTH,
        backgroundColor: Colors.grayColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'white',
        marginVertical: 10
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
        position: 'absolute',
        left: 0,
        height: 40,
        borderColor: Colors.purpleColor,
        borderWidth: 2,
        width: LETTER_WIDTH * 3,
        marginTop: 10
    },
    polygonStyle: {
        position: 'absolute',
        height: 15,
        width: 25,
        bottom: -14,
        left: 'auto',
        right: 'auto',
        alignSelf: 'center'
    },
})