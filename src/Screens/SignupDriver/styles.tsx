import { StyleSheet } from 'react-native'
import { Colors } from "../../Theme/Colors";
import { Fonts } from "../../Theme/Fonts";
import { DimensionsValue } from '../../Theme/DimensionsValue';

export const styles = StyleSheet.create({

    rootContainer: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    imageBG: {
        width: '102%',
        flex: 1,
        height: 453,
        resizeMode: 'stretch',
    },
    textWelcome: {
        fontSize: 30,
        fontFamily: Fonts.DM_SANS_BOLD,
        color: Colors.BLACK,
        alignSelf: 'center'

    },
    textLogin: {
        fontSize: 14,
        fontFamily: Fonts.DM_SANS_REGULAR,
        color: Colors.COLOR_GREY1,
        marginBottom: 35,
        alignSelf: 'center'
    },
    touchForgotPassword: {
        alignSelf: 'flex-end',
        paddingVertical: 10,
        paddingHorizontal: 27
    },
    viewDontHaveAccount: {
        flexDirection: 'row',
        marginBottom: 30,
        alignSelf: 'center'
    },
    textDontHaveAccount: {
        fontSize: 14,
        fontFamily: Fonts.DM_SANS_LIGHT,
        color: Colors.COLOR_GREY1,
    },
    textSignUpNow: {
        fontSize: 14,
        fontFamily: Fonts.DM_SANS_BOLD,
        color: Colors.ORANGE,
        marginLeft: 4,
        textDecorationLine: 'underline'
    },
    containerStyles: {
        backgroundColor: Colors.LIGHT_GREY3,
        borderWidth: 0
    },
    parentStyles: {
        width: DimensionsValue.VALUE_160,
        height: 44,
        borderRadius: 27,
        borderWidth: 1,
        borderColor: Colors.FIELD_BORDER,

    },
    inputFieldView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 26
    },
    locationIcon: {
        height: 20,
        width: 17,
        alignSelf: 'center',
        marginLeft: 20,
        tintColor: Colors.FIELD_BORDER
    },
    selectLocation: {
        fontSize: 14.5,
        fontFamily: Fonts.DM_SANS_REGULAR,
        alignSelf: 'center',
        marginLeft: 12,
        color: Colors.BLACK
    },
    locationButtonView: {
        flexDirection: 'row',
        height: 45,
        width: DimensionsValue.VALUE_346,
        alignSelf: 'center',
        borderRadius: 25,
        marginBottom: 20,
        borderWidth: 0.5,
        borderColor: Colors.FIELD_BORDER,
    },
    placeholderStyle: {
        fontSize: 14,
        color: Colors.FIELD_BORDER,
        marginLeft: 10
    },
    selectedTextStyle: {
        fontSize: 14,
        color: Colors.BLACK,
        marginLeft: 10
    },
    dropdownContainer: {
        height: 44,
        width: DimensionsValue.VALUE_346,
        borderWidth: 0.5,
        borderColor: Colors.FIELD_BORDER,
        marginBottom: 20,
        borderRadius: 27,
        paddingStart: 10,
        paddingEnd: 10,
        alignSelf: 'center',
        //elevation and shadow
        shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.5,
        shadowRadius: 2,
        // elevation: 2,
    },
    viewAcceptTerms: {
        flexDirection: 'row',
        marginHorizontal: 25,
    },
    touchCheckBox: {
        paddingHorizontal: 10,
    },
    readAndAgreeText: {
        color: Colors.DARK_GREY,
        fontFamily: Fonts.DM_SANS_MEDIUM,
        fontSize: 14,
    },
    textTermsConditions: {
        color: Colors.SEA_BLUE,
        fontFamily: Fonts.DM_SANS_MEDIUM,
        fontSize: 14,
        textDecorationLine: 'underline',
        paddingHorizontal: 5,
        paddingStart: 2
    },
    findAddressText: {
        color: Colors.SEA_BLUE,
        textDecorationLine: 'underline',
        fontSize: 14,
        fontFamily: Fonts.DM_SANS_REGULAR,
        marginBottom: 20
    },
    dropPinText: {
        color: Colors.ORANGE,
        textDecorationLine: 'underline',
        fontSize: 14,
        fontFamily: Fonts.DM_SANS_REGULAR,
        alignSelf: 'flex-end',
        marginRight: 16,
        marginTop: -25
    },
 
    uploadText: {
        color: Colors.BLACK,
        fontSize: 14,
        fontFamily: Fonts.DM_SANS_SEMIBOLD,
        marginBottom: 20,
        marginLeft: DimensionsValue.VALUE_26
    },
    termsView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    termsBoxView: {
        borderRadius: 8,
        height: 45,
        width: 95,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    termsText: {
        fontSize: 11,
        color: Colors.BLACK,
        textAlign: 'center'
       

    }
})

