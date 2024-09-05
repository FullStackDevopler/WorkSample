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
    imageBG:{
        width:'100%',
        flex:1,
        resizeMode:'cover', 
        // resizeMode:'stretch', 
    },
    textWelcome:{
        fontSize:32,
        fontFamily:Fonts.DM_SANS_BOLD,
        color:Colors.BLACK, 
       
    },
    textKindra:{
        fontSize:32,
        fontFamily:Fonts.DM_SANS_BOLD,
        color:Colors.ORANGE,
    },
    touchForgotPassword:{
        alignSelf:'flex-end',
        paddingVertical:10,
        paddingHorizontal:27 
    },
    viewDontHaveAccount:{
        flexDirection:'row',
        marginBottom:30
    },
    textDontHaveAccount:{
        fontSize:14,
        fontFamily:Fonts.DM_SANS_LIGHT,
        color:Colors.COLOR_GREY1, 
    },
    textSignUpNow:{
        fontSize:14,
        fontFamily:Fonts.DM_SANS_BOLD,
        color:Colors.ORANGE, 
    }
})

