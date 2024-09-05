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
    profileImage: {
        height: 50,
        width: 50,
        borderRadius: 25,
        marginLeft: DimensionsValue.VALUE_26

    },
    driverName: {
        fontSize: 14,
        fontFamily: Fonts.DM_SANS_MEDIUM,
        alignSelf: 'center',
        marginLeft: 10,
        color: Colors.BLACK
    },
    cancelledJobText: {
        fontSize: 20,
        alignSelf: 'center',
        fontFamily: Fonts.DM_SANS_BOLD,
        color: Colors.TOMATO_RED,
        marginBottom: 10,
        marginHorizontal: 26
    },
    reasonText: {
        fontSize: 15,
        fontFamily: Fonts.DM_SANS_SEMIBOLD,
        color: Colors.BLACK
    },
    reasonForCancel: {
        fontSize: 15,
        fontFamily: Fonts.DM_SANS_REGULAR,
        color: Colors.BLACK,
        alignSelf: 'center',
        textAlign: 'center'
    },
    rightIcon: {
        height: 25,
        width: 25
    },
    rightIconsView: {
        flexDirection: 'row',
        marginRight: 20,
        alignSelf: 'center'
    },
    horizontalLine: {
        height: 1,
        width: DimensionsValue.VALUE_348,
        backgroundColor: Colors.LIGHT_GREY,
        alignSelf: 'center',
        marginTop: 12
    },
    detailsView: { 
        width: DimensionsValue.VALUE_348,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 25,
        borderColor: Colors.LIGHT_GREY,
        borderWidth: .5,
     
        // backgroundColor:'red'
    },
    topView: {
        height: 36,
        backgroundColor: Colors.ORANGE,
        justifyContent: 'center',
        paddingLeft: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    detailText: {
        color: Colors.WHITE,
        fontSize: 15,
        fontFamily: Fonts.DM_SANS_BOLD
    },
    textsOfDetails: {
        fontSize: 14,
        fontFamily: Fonts.DM_SANS_REGULAR,
        color: Colors.BLACK_3,
        flex:1
    },
    detailsRow: {
        flexDirection: 'row', 
        paddingHorizontal: 10,
        paddingTop: 8,
        paddingBottom:12, 
        borderRadius: 10
    },
    locationsText: {
        fontSize: 14,
        fontFamily: Fonts.DM_SANS_SEMIBOLD,
        marginTop: 25, 
        color: Colors.BLACK,
        marginLeft: DimensionsValue.VALUE_26
    },
    addressText: {
        fontSize: 14,
        fontFamily: Fonts.DM_SANS_SEMIBOLD,
        marginTop: 25,
        marginLeft: 20
    },
    circleLeftIcon: {
        alignSelf: 'center'
    },
    textNotes: {
        fontSize: 14,
        color: Colors.BLACK_3,
        fontFamily: Fonts.DM_SANS_REGULAR,
        padding: 10
    },
    notesView: {
        flex: 1,
        maxHeight: 80,
        marginHorizontal: DimensionsValue.VALUE_26,
        marginVertical: 2,
        backgroundColor: Colors.LIGHT_GREY3,
    },

    iconTextView: {
        flexDirection: 'row',
        marginHorizontal: DimensionsValue.VALUE_26,
    },
    routeStatusText: {
        marginStart: 22,
        fontSize: 18,
        fontFamily: Fonts.DM_SANS_BOLD,
        color: Colors.BLACK,
        marginTop: 20,
        marginBottom: -10
    },
    greenView: {
        backgroundColor: Colors.GREEN,
        marginStart: 8,
        paddingHorizontal: 11,
        paddingVertical: 7,
        borderRadius: 2
    },
    greenCircle: { alignSelf: 'center' },
   
    orangeView: {
        backgroundColor: Colors.ORANGE,
        marginStart: 8,
        paddingHorizontal: 11,
        paddingVertical: 7,
        borderRadius: 2
    },
    textInsideBlack: {
        fontFamily: Fonts.DM_SANS_REGULAR,
        color: Colors.BLACK,
        fontSize: 14
    },
    verticalDotLine: {
        marginStart: (DimensionsValue.VALUE_34),
        // marginHorizontal: (DimensionsValue.VALUE_34),
        marginVertical: -4,
        tintColor: Colors.GREEN
    },
    textInside: {
        fontFamily: Fonts.DM_SANS_REGULAR,
        color: Colors.WHITE,
        fontSize: 14
    },
    bottomView: {
        flexDirection: 'row',
        marginLeft: DimensionsValue.VALUE_22,
        marginBottom: 10
    },
    iIcon: {
        height: 20,
        width: 20,
        marginLeft: 6
    },
    completedJobText: {
        fontSize: 15,
        fontFamily: Fonts.DM_SANS_MEDIUM,
        color: Colors.GREEN,
        marginLeft: 7,
    },
    textTime: {
        marginStart: 15,
        fontSize: 12,
        fontFamily: Fonts.DM_SANS_LIGHT,
        color: Colors.COLOR_GREY1,
        marginTop: 5
    },
})