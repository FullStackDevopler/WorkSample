import React from "react";
import { StyleSheet } from 'react-native'
import { Colors } from "../../Theme/Colors";
import { Fonts } from "../../Theme/Fonts";
import { DimensionsValue } from "../../Theme/DimensionsValue";


export const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    locationText: {
        fontSize: 18,
        fontFamily: Fonts.DM_SANS_SEMIBOLD,
        marginLeft: 25,
        marginBottom: 15,
        color: Colors.BLACK
    },
    containerStyles: {
        backgroundColor: Colors.LIGHT_GREY3,
        borderWidth: 0,
    },
    locationIcon: {
        height: 20,
        width: 17,
        alignSelf: 'center',
        marginLeft: 20
    },
    selectLocation: {
        fontSize: 14.5,
        fontFamily: Fonts.DM_SANS_REGULAR,
        alignSelf: 'center',
        marginLeft: 10,
        color: Colors.BLACK,
        marginRight: 20,
        // backgroundColor: 'red',
        paddingVertical: 15,
        overflow: 'hidden', 
        flex: 1,
    },
    locationButtonView: {
         flexDirection: 'row',
          backgroundColor: Colors.LIGHT_GREY3, 
          height: 50, 
          width: DimensionsValue.VALUE_346, 
          alignSelf: 'center', 
          borderRadius: 25 
    },
    findAddressText: {
        color: Colors.SEA_BLUE,
        textDecorationLine: 'underline',
        fontSize: 14,
        fontFamily: Fonts.DM_SANS_REGULAR,
        alignSelf: 'flex-end',
        marginRight: 20,
        marginVertical: 15
    },
    parentStyles:{
        width: 140,
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
        marginBottom: 20
    },
    dropPinText: {
        color: Colors.ORANGE,
        textDecorationLine: 'underline',
        fontSize: 14,
        fontFamily: Fonts.DM_SANS_REGULAR,
        alignSelf: 'flex-end',
        marginRight: 20,
        marginTop: -25
    }
})