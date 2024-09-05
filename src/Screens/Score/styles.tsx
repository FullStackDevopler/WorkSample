import { StyleSheet } from "react-native";
import { Colors } from "../../Theme/colors";
import { Fonts } from "../../Theme/fonts";
import {
    responsiveFontSize
} from "react-native-responsive-dimensions";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    innerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%'
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 20,
    },
    contentView: {
        width: '80%',
        backgroundColor: Colors.primary,
        borderRadius: 35,
        padding: 15,
        marginHorizontal: 10,
        // marginTop: 30
    },
    innerContentView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    contentLabel: {
        fontFamily: Fonts.Livvic_BoldItalic,
        fontSize: responsiveFontSize(4),
        // fontSize: 22,
        color: Colors.secondary,
    },
    lettersView: {
        flexDirection: 'row',
        marginVertical: 5,
    },
    letterView: {
        backgroundColor: Colors.grayColor,
        margin: 2,
        padding: 0,
        width: 24,
        alignItems: 'center',
        justifyContent: 'center'
    },
    letterText: {
        fontFamily: Fonts.Livvic_Regular,
        fontSize: 24,
        color: Colors.primary,
        lineHeight: 30,
        padding: 2,
        textAlign: 'center',
        textAlignVertical: 'center',
        width: '100%',
    },
    selectionView: {
        position: 'absolute',
        top: 1,
        left: 0,
        height: 36,
        borderColor: Colors.purpleColor,
        borderWidth: 2,
        width: 84,
    },
    polygonStyle: {
        position: 'absolute',
        height: 15,
        width: 25,
        bottom: -15,
        right: '40%',
    },
})