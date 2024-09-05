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
})