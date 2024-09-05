import { StyleSheet } from 'react-native'
import { Colors } from "../../Theme/Colors";
import { Fonts } from "../../Theme/Fonts";

export const styles = StyleSheet.create({

    rootContainer:{
        flex:1, 
        backgroundColor:Colors.WHITE,
    },
    imageBG:{
        width:'102%',
        flex:1,
        height:453,
        resizeMode:'stretch', 
    },
    textWelcome:{
        fontSize:30,
        fontFamily:Fonts.DM_SANS_BOLD,
        color:Colors.BLACK, 
       
       
    },
    textLogin:{
        fontSize:14,
        fontFamily:Fonts.DM_SANS_REGULAR,
        color:Colors.COLOR_GREY1, 
        marginBottom:35
    },
    forgetPasswordText: {
        fontSize:14,
        fontFamily:Fonts.DM_SANS_REGULAR,
        color: Colors.ORANGE
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
        textDecorationLine: 'underline'
    }
})

