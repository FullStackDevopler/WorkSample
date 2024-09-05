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
    hotshotText: {
        fontSize: 22,
        fontFamily: Fonts.DM_SANS_BOLD,
        marginTop: 30,
        marginLeft: 20,
        color: Colors.BLACK
    },

    plusIcon: {
        marginRight: 7,
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
        marginRight: 20,
        marginBottom: 10,
        marginTop: -28
    },
    addContactText: {
        color: Colors.WHITE,
        fontSize: 14,
        fontFamily: Fonts.DM_SANS_REGULAR
    },
    image: {
        height: DimensionsValue.VALUE_280,
        width: DimensionsValue.VALUE_379,
        alignSelf: 'center',
        marginTop: 70,
        marginBottom: 20
      },
    bottomText: {
      textAlign: 'center',
      fontSize: 16,
      fontFamily: Fonts.DM_SANS_REGULAR,
      marginHorizontal: 28,
      color: Colors.BLACK
    },
    mainWrapper: {
        height: 35,
        width: '90%',
        backgroundColor: Colors.COLOR_GREY3,
        alignSelf: 'center',
        marginTop: 17,
        borderRadius: 20,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    assignedButton: {
        backgroundColor: Colors.ORANGE,
        height: 35,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        alignSelf: 'flex-start'
    },
    unassignedButton: {
        backgroundColor: Colors.ORANGE,
        height: 35,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        alignSelf: 'flex-start',
        flexDirection: 'row'
    },
    tabText: {
        fontSize: 12,
        fontFamily: Fonts.DM_SANS_MEDIUM
    },
    noDataFoundText: {
        fontSize: 16,
        fontFamily: Fonts.DM_SANS_REGULAR,
        color: Colors.LIGHT_GREY2,
        marginHorizontal: 28,
        textAlign: 'center',
    
    },

})