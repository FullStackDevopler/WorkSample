import React from "react";
import { StyleSheet } from 'react-native'
import { Colors } from "../../Theme/Colors";
import { Fonts } from "../../Theme/Fonts";
import { DimensionsValue } from "../../Theme/DimensionsValue";


export const styles = StyleSheet.create({
    viewModalContainer: {
        flex: 1,
        // backgroundColor: '#00000099',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        position: 'absolute',
        zIndex: 999,
    },

    rootContainer: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    myProfileText: {
        marginTop: 14,
        marginLeft: 20,
        fontFamily: Fonts.DM_SANS_BOLD,
        fontSize: 22,
    },
    profileImage: {
        height: 90,
        width: 90,
        borderRadius: 45,
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    cameraIcon: {
        height: 24,
        width: 24,
        position:'absolute',
        bottom: 10,
        end: 10

    },
    touchImage: {
        alignSelf: 'center',
        height: 100,
        width: 100,
        marginBottom: 25
   
    },
    containerStyles: {
        backgroundColor: Colors.LIGHT_GREY3, 
        borderWidth: 0
     },
     parentStyles:{
        width: DimensionsValue.VALUE_160,
        height: 46, 
        backgroundColor: Colors.LIGHT_GREY3,
        borderRadius: 27,
        paddingStart: 10,
        paddingEnd: 10,
        justifyContent: 'center',
        borderWidth: 0,
        
      },
      inputFieldView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 30,
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
    genderIcon: { 
        height: 18, 
        width: 18, 
        tintColor: Colors.FIELD_BORDER 
    },
    dropdownContainer: {
        height: 44,
        width: DimensionsValue.VALUE_346,
        marginBottom: 20,
        borderRadius: 27,
        paddingStart: 10,
        paddingEnd: 10,
        alignSelf: 'center',
        backgroundColor: Colors.LIGHT_GREY3,
        //elevation and shadow
        shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.5,
        shadowRadius: 2,
        // elevation: 2,
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
        color: Colors.BLACK,
    },
    locationButtonView: {
        flexDirection: 'row',
        height: 45,
        width: DimensionsValue.VALUE_346,
        alignSelf: 'center',
        borderRadius: 25,
        marginBottom: 20,
       backgroundColor: Colors.LIGHT_GREY3,
    },
    findAddressText: {
        color: Colors.SEA_BLUE,
        textDecorationLine: 'underline',
        fontSize: 14,
        fontFamily: Fonts.DM_SANS_REGULAR,
        marginBottom: 15
    },
    dropPinText: {
        color: Colors.ORANGE,
        textDecorationLine: 'underline',
        fontSize: 14,
        fontFamily: Fonts.DM_SANS_REGULAR,
        alignSelf: 'flex-end',
        marginRight: 30,
        marginTop: -25
    },
    uploadText: {
        color: Colors.BLACK,
        fontSize: 14,
        fontFamily: Fonts.DM_SANS_SEMIBOLD,
        marginBottom: 20,
        marginLeft: DimensionsValue.VALUE_26
    },
})