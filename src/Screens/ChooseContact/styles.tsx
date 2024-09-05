import React from "react";
import { StyleSheet } from 'react-native'
import { Colors } from "../../Theme/Colors";
import { Fonts } from "../../Theme/Fonts";


export const styles = StyleSheet.create({

    rootContainer: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    plusIcon: {
        marginRight: 7
    },
    addContactButton: {
        flexDirection: 'row',
        backgroundColor: Colors.ORANGE,
        height: 35, 
        width: 130,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        alignSelf: 'flex-end',
        marginRight: 20
    },
    addContactText: {
        color: Colors.WHITE,
        fontSize: 14,
        fontFamily: Fonts.DM_SANS_REGULAR
    },
    noDataFoundText: {
        fontSize: 16,
        fontFamily: Fonts.DM_SANS_REGULAR,
        color: Colors.LIGHT_GREY2,
        marginHorizontal: 28,
        textAlign: 'center',
    
    },


})