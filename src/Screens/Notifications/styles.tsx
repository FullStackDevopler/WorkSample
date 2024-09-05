import React from "react";
import { StyleSheet } from 'react-native'
import { Colors } from "../../Theme/Colors";
import { Fonts } from "../../Theme/Fonts";


export const styles = StyleSheet.create({

    rootContainer: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    notificationText: {
        marginTop: 30,
        marginLeft: 25,
        fontFamily: Fonts.DM_SANS_BOLD,
        fontSize: 22,
        color: Colors.BLACK,
        marginBottom: 10

    },

    hiddenListView: {
        backgroundColor: Colors.WHITE,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 25
    },
    touchRead: {
        paddingStart: 20,
        justifyContent: 'center',
        backgroundColor: '#5469D4',
        width: '50%',
    },


    touchArchive: {

        backgroundColor: Colors.RED,
        paddingEnd: 20,
        alignItems: 'flex-end',
        justifyContent: 'center',
        width: '50%'

    },
    imageEmail: {
        height: 20,
        width: 20,
        marginStart: 3,
        marginBottom: 5
    },
    imageArchive: {
        height: 20,
        width: 20,
        marginEnd: 10,
        marginBottom: 5,
        tintColor: 'white'
    },
    textRead: {
        fontFamily: Fonts.DM_SANS_MEDIUM,
        fontSize: 11,
        color: Colors.WHITE,
    },
    //TO BE DELETED
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    noDataFoundText: {
        fontSize: 16,
        fontFamily: Fonts.DM_SANS_REGULAR,
        color: Colors.LIGHT_GREY2,
        marginHorizontal: 28,
        textAlign: 'center',
    
    },
})