import React from "react";
import { StyleSheet } from 'react-native'
import { Colors } from "../../Theme/Colors";
import { DimensionsValue } from "../../Theme/DimensionsValue";
import { Fonts } from "../../Theme/Fonts";

export const styles = StyleSheet.create({

    rootContainer:{
        flex:1, 
        backgroundColor:Colors.WHITE,
    },
    welcomeText: {
        fontSize: 13,
        fontFamily: Fonts.DM_SANS_MEDIUM,
        color: Colors.BUTTON_GREY,
        marginLeft: 25,
        marginTop: 30
    },
    userName: {
        fontSize: 22,
        fontFamily: Fonts.DM_SANS_SEMIBOLD,
        color: Colors.ORANGE,
        marginLeft: 25,
        marginBottom: 20
    },
    locationText: {
        fontSize: 18,
        fontFamily: Fonts.DM_SANS_SEMIBOLD,
        marginLeft: 25,
        marginBottom: 15,
        color: Colors.BLACK

    },
    textPickup: {
        fontSize: 15,
        fontFamily: Fonts.DM_SANS_MEDIUM,
        marginLeft: 30,
        marginBottom: 5,
        // marginTop: 20,
        color: Colors.BLACK

    },
    locationIcon: {
        height: 20,
        width: 17,
        alignSelf: 'center',
        marginLeft: 20,
    },
    selectLocation: {
        fontSize: 14.5,
        fontFamily: Fonts.DM_SANS_REGULAR,
        alignSelf: 'center',
        marginLeft: 12,
        color: Colors.BUTTON_GREY
    },
    locationButtonView: {
         flexDirection: 'row',
          backgroundColor: Colors.LIGHT_GREY3, 
          height: 45, 
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
        marginRight: 25,
        marginVertical: 15
    },
    containerStyles: {
        backgroundColor: Colors.LIGHT_GREY3,
        borderWidth: 0,
        
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
        marginHorizontal: 25,
       
    },
    dropPinText: {
        color: Colors.ORANGE,
        textDecorationLine: 'underline',
        fontSize: 14,
        fontFamily: Fonts.DM_SANS_REGULAR,
        alignSelf: 'flex-end',
        marginRight: 30,
    },
    plusIcon: {
        marginRight: 7
    },
    addContactButton: {
        flexDirection: 'row',
        backgroundColor: Colors.DARK_GREY,
        height: 35, 
        width: 160,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        alignSelf: 'flex-end',
        marginRight: 20,
        marginBottom: 10
    },
    addContactText: {
        color: Colors.WHITE,
        fontSize: 14,
        fontFamily: Fonts.DM_SANS_REGULAR
    },
    placeholderStyle: {
        fontSize: 14,
        color: Colors.BUTTON_GREY,
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
        backgroundColor: Colors.LIGHT_GREY3,
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
      touchCross:{
        alignSelf:'flex-end',
        height: 20, 
        width: 20,
        position:'absolute',
        end:40,
        backgroundColor: Colors.LIGHT_GREY,
    
    },
      
})