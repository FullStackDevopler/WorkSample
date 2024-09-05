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
        color: Colors.BLACK,
        width: '60%',
        flexWrap: 'wrap',
    },
    rightIcon: {
        height: 25,
        width: 25,
        marginHorizontal: 5
    },
    rightIconsView: {
        flexDirection: 'row',
        marginRight: 15,
        alignSelf: 'center',
        flex: 0.2
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
        fontSize: 16,
        fontFamily: Fonts.DM_SANS_BOLD
    },
    textsOfDetails: {
        fontSize: 14,
        fontFamily: Fonts.DM_SANS_REGULAR,
        color: Colors.BLACK_3,
        flex: 1
    },
    detailsRow: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingTop: 8,
        paddingBottom: 12,
    },
    locationsText: {
        fontSize: 14,
        fontFamily: Fonts.DM_SANS_SEMIBOLD,
        marginTop: 25,
        // marginBottom:14,
        marginLeft: DimensionsValue.VALUE_26,
        color: Colors.BLACK
    },
    addressText: {
        fontSize: 14,
        fontFamily: Fonts.DM_SANS_SEMIBOLD,
        marginTop: 25,
        marginLeft: 20,
        color: Colors.BLACK
    },
    routeStatusText: {
        marginStart: 22,
        fontSize: 18,
        fontFamily: Fonts.DM_SANS_BOLD,
        color: Colors.BLACK,
        marginTop: 20,
        marginBottom: -10
    },
    circleLineView: {
        marginLeft: 26,
        flexDirection: 'column'
    },
    circleLeftIcon: {
        // alignSelf: 'center',
    },
    dottedLineView: {
        justifyContent: 'center',
        flex: 1
    },
    verticalDotLine: {
        // alignSelf:'center',
        // marginStart: (DimensionsValue.VALUE_34),
        // marginVertical: -10,
        // marginVertical: -4,
        // height: 'auto',
        resizeMode: "repeat",
        height: '105%',
        alignSelf: 'center',
        marginVertical: -5

    },
    greenView: {
        backgroundColor: Colors.GREEN,
        marginStart: 8,
        paddingHorizontal: 11,
        paddingVertical: 7,
        borderRadius: 2
    },
    textInside: {
        fontFamily: Fonts.DM_SANS_REGULAR,
        color: Colors.WHITE,
        fontSize: 14
    },
    orangeView: {
        backgroundColor: Colors.ORANGE,
        marginStart: 8,
        paddingHorizontal: 11,
        paddingVertical: 7,
        borderRadius: 2,

    },
    textInsideBlack: {
        fontFamily: Fonts.DM_SANS_REGULAR,
        fontSize: 14,
        marginRight: 20,
        color: Colors.BLACK,
    },
    dotLine: {
        marginHorizontal: DimensionsValue.VALUE_34,
        marginVertical: -4
    },
    iconTextView: {
        flexDirection: 'row',
        marginHorizontal: DimensionsValue.VALUE_26,
    },
    iIcon: {
        height: 20,
        width: 20,
        marginLeft: 6
    },

    containerStyles: {
        backgroundColor: Colors.ORANGE,
        height: 43
    },
    iIconView: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    itemValues: {
        flex: 0.5,
        alignSelf: 'center',
        paddingHorizontal: 10
    },
    notesStyles: {
        backgroundColor: Colors.LIGHT_GREY3,
        borderWidth: 0,
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
    textTime: {
        marginStart: 10,
        fontSize: 12,
        fontFamily: Fonts.DM_SANS_LIGHT,
        color: Colors.COLOR_GREY1,
        alignSelf: 'center'
    },
    textAdress: {
        marginStart: 15,
        fontSize: 12,
        fontFamily: Fonts.DM_SANS_LIGHT,
        color: Colors.COLOR_GREY1,
        marginTop: 5,
        flex: 1,
        marginEnd: 20,
        marginBottom: 24
    },
    itemsCount: {
        marginStart: 45,
        fontSize: 14,
        fontFamily: Fonts.DM_SANS_MEDIUM,
        color: Colors.BLACK,
        marginVertical: 5,
        marginRight: 6
    },
    viewSignature: {
        height: 30,
        width: 100,
        backgroundColor: Colors.BLACK,
        marginLeft: 26,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewSignatureText: {
        fontSize: 12,
        fontFamily: Fonts.DM_SANS_LIGHT,
        color: Colors.WHITE
    },
    horizontalBottomLine: {
        height: 1,
        width: DimensionsValue.VALUE_348,
        backgroundColor: Colors.LIGHT_GREY,
        alignSelf: 'center',
        marginTop: 12,
        marginBottom: 25
    },


})