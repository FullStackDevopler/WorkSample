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
        height:453,
        resizeMode:'stretch', 
    },
    textWelcome:{
        fontSize:30,
        fontFamily:Fonts.DM_SANS_BOLD,
        color:Colors.BLACK, 
        marginBottom:35
       
    },
    textLogin:{
        fontSize:14,
        fontFamily:Fonts.DM_SANS_REGULAR,
        color:Colors.COLOR_GREY1, 
        marginBottom:35
    },
    touchForgotPassword:{
        alignSelf:'flex-end',
        paddingVertical:10,
        paddingHorizontal:27 
    },
    viewDontHaveAccount:{
        flexDirection:'row',

        alignSelf: 'center',
        marginBottom: 20
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
        textDecorationLine: 'underline',
        marginLeft: 4
    }
})

