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
    message:{
        paddingHorizontal: 50,
        textAlign:'center',
        fontSize: 16,
        fontFamily: Fonts.DM_SANS_REGULAR,
        color: Colors.LIGHT_GREY2,
      }
})