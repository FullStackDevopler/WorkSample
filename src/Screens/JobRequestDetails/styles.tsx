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
        // backgroundColor: 'red'
    },
    topUserView: { 
        flexDirection: 'row', 
        justifyContent: 'space-between'
     },
     userImageName: {
        flexDirection: 'row' ,
        flex: 1
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
        // backgroundColor: 'green'
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
    locationsTable: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    iIcon: {
        height: 15,
        width: 15,
        marginLeft: 10
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
        marginBottom: 15,
        backgroundColor: Colors.LIGHT_GREY3,

    }


})