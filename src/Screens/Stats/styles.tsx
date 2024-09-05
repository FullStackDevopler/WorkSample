import { StyleSheet } from "react-native";
import { Colors } from "../../Theme/colors";
import { Fonts } from "../../Theme/fonts";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: 'center'
    },
    bottomView: {
        position: 'absolute',
        left: 36,
        bottom: 10,
    },
    contentView: {
        width: '80%',
        backgroundColor: Colors.secondary,
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderRadius: 40
    },
    contentTextBold: {
        fontFamily: Fonts.Livvic_Bold,
        fontSize: 16,
        color: Colors.primary
    },
    contentTextRegular: {
        fontFamily: Fonts.Livvic_Regular,
        fontSize: 16,
        color: Colors.primary
    },
    contentItemView: { flexDirection: 'row', marginVertical: 5 },
    loginButton: {
        backgroundColor: Colors.redColor,
        paddingHorizontal: 4,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginButtonText: {
        fontFamily: Fonts.Livvic_Bold,
        color: Colors.whiteColor,
        fontSize: 11,
        textAlign: 'center',
        textAlignVertical: 'center',
        lineHeight: 13
    },
    italicContentLabel: {
        color: Colors.primary,
        fontFamily: Fonts.Livvic_Italic,
        fontSize: 14,
        fontWeight: '500',
    },
    greenContentLabel: {
        color: Colors.greenColor,
        fontFamily: Fonts.Livvic_Regular,
        fontSize: 14,
        fontWeight: '400'
    },
    wordListItem: {
        height: 22,
        // backgroundColor: 'red'
    }

})