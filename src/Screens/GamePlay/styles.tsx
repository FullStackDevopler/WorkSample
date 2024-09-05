import { StyleSheet } from "react-native";
import { Colors } from "../../Theme/colors";
import { Fonts } from "../../Theme/fonts";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: 'center'
    },
    lettersView: {
        flexDirection: 'row',
        marginVertical: 5,
        height: 44
    },
    letterView: {
        backgroundColor: Colors.grayColor,
        margin: 2,
        padding: 0,
        width: 28,
        alignItems: 'center',
        justifyContent: 'center'
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
        top: 1,
        left: 0,
        height: 43,
        borderColor: Colors.purpleColor,
        borderWidth: 2,
        width: 96,
    },
    item: {
        paddingHorizontal: 3,
        paddingVertical: 1,
    },
    title: {
        fontSize: 20,
        fontFamily: Fonts.Livvic_Medium,
        color: Colors.primary,
        textAlign: 'center'
    },
    errorMessage: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.blackColor,
        fontFamily: Fonts.Livvic_Regular
    },
    shuffleView: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        backgroundColor: '#EADAA0',
        width: 80,
        padding: 5,
        borderRadius: 15,
    },
    shuffleText: {
        color: Colors.primary,
        fontFamily: Fonts.Livvic_Regular,
        fontWeight: '400',
        fontSize: 14
    },
    shuffleIcon: {
        height: 10,
        width: 10
    }
})