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
        marginTop: 30,
        marginLeft: 20,
        fontFamily: Fonts.DM_SANS_BOLD,
        fontSize: 22,
        color: Colors.BLACK,
        marginBottom: 20
    },
    topView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 25,
    },
    userNameText: {
        fontSize: 18,
        fontFamily: Fonts.DM_SANS_SEMIBOLD,
        color: Colors.BLACK,
        marginRight: 25

    },
    emailText: {
        fontSize: 13,
        fontFamily: Fonts.DM_SANS_LIGHT,
        color: Colors.BLACK
    },
    profileImage: {
        height: 60,
        width: 60,
        borderRadius: 30,
        alignSelf: 'center',
        // flex: 0.2
    },
    horizontalLine: {
        height: 1,
        width: DimensionsValue.VALUE_346,
        backgroundColor: Colors.LIGHT_GREY,
        alignSelf: 'center',
        marginTop: 30,
        // marginBottom: 20
    },
    icon: {
        height: 12,
        width: 12,
        alignSelf: 'center',
        marginLeft: 30
    },
    buttonText: {
        fontSize: 15,
        fontFamily: Fonts.DM_SANS_MEDIUM,
        marginLeft: 10
    }
})