import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    Pressable,
    TouchableOpacity
} from 'react-native';
import { Colors } from '../Theme/Colors';
import { Fonts } from '../Theme/Fonts';
import { DimensionsValue } from '../Theme/DimensionsValue';
import { Images } from '../Assets';
import Button from './Button';
import { StringConstants } from '../Theme/StringConstants';
import { useSelector } from 'react-redux';
import { capitalizeFirstLetter, numberWithCommas } from '../Theme/Helper';
import { ApiConstants } from '../Theme/ApiConstants';
import moment from 'moment';

interface HotshotProposalProps {
    item?: any;
    index?: number;
    jobType?: string;
    tapOnAcceptHotshot?: any

}

const HotshotProposal: React.FC<HotshotProposalProps> = ({
    item,
    index,
    jobType,
    tapOnAcceptHotshot

}) => {

    console.log('item in HotshotProposal', JSON.stringify(item));
    const originLocation = item?.user_pickup_location ? item?.user_pickup_location : `${item?.user_pickup_address_1} ${item?.user_pickup_address_2} ${item?.user_pickup_city} ${item?.user_pickup_state}`
    const destinationLocation = item?.user_dopoff_location ? item?.user_dopoff_location : `${item?.user_dopoff_address_1} ${item?.user_dopoff_address_2} ${item?.user_dopoff_city} ${item?.user_dopoff_state}`

    const tapOnAccept = (hotshotId: string, userId: string) => {
        tapOnAcceptHotshot(hotshotId, userId)
    }

 

    return (
        <Pressable style={[styles.mainTabView, { paddingTop: 0 }]}
            onPress={() => {}}>
                <View style={styles.topLineView}>
                    <Text style={styles.moneyText}> {`£${numberWithCommas(item.driver_amount)}`}</Text>
                </View>
     
            <View style={styles.divider} />

            <View style={[styles.destinationInfoView]}>
                <Text numberOfLines={2} style={styles.textOriginLocation}>
                    {originLocation}
                </Text>
                <Text style={{ color: Colors.ORANGE }}> ---- </Text>
                <Image source={Images.IC_TRUCK} />
                <Text style={{ color: Colors.ORANGE }}> ---- </Text>
                <Text numberOfLines={2} style={styles.textFinalLocation}>
                    {destinationLocation}
                </Text>
            </View>

            <Text style={[styles.textArrivesIn, { marginBottom: 25 }]}>{`${item?.pickup_item_count} ${item?.pickup_item}`}</Text>

            <Button onPress={() => tapOnAccept(item?.hotshot_id, item?.user_id)}
                containerStyles={styles.acceptButton}
                primaryTitle={StringConstants.ACCEPT}
                titleStyles={styles.textViewDetail}
            />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    mainTabView: {
        width: DimensionsValue.VALUE_348,
        borderRadius: 5,
        backgroundColor: Colors.WHITE,
        alignSelf: 'center',
        marginBottom: 20,
        paddingBottom: 15,
        borderWidth: 0.2,
        borderColor: Colors.COLOR_GREY1,
    },
    viewUserInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 9,
        marginHorizontal: 9
    },
    imageUser: {
        height: 50,
        width: 50,
        borderRadius: 25,
        marginEnd: 10
    },
    textUserName: {
        fontSize: 14,
        fontFamily: Fonts.DM_SANS_MEDIUM,
        color: Colors.BLACK,
        paddingRight: 20,
    },

    textUserNameUnassigned: {
        fontSize: 14,
        fontFamily: Fonts.DM_SANS_MEDIUM,
        color: Colors.BLACK,
        width: '90%',
        flexWrap: 'wrap',

    },
    textUserNameMyJob: {
        fontSize: 14,
        fontFamily: Fonts.DM_SANS_MEDIUM,
        color: Colors.BLACK,
        width: '62%',
        flexWrap: 'wrap',

    },
    textObjexts: {
        fontSize: 12,
        fontFamily: Fonts.DM_SANS_LIGHT,
        color: Colors.BLACK
    },
    textCompleted: {
        fontSize: 14,
        fontFamily: Fonts.DM_SANS_REGULAR,
        color: Colors.GREEN
    },
    buttonView: {
        backgroundColor: Colors.ORANGE,
        height: 26,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        alignSelf: 'center',
        marginRight: 10,
    },
    topLineView: {
        flexDirection: 'row',
        backgroundColor: Colors.ORANGE,
        width: '100%',
        alignSelf: 'center',
        paddingVertical: 7,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'

    },
    moneyText: {
        // fontSize: 11,
        // fontFamily: Fonts.DM_SANS_MEDIUM,
        fontSize: 12,
        fontFamily: Fonts.DM_SANS_BOLD,
        color: Colors.WHITE,
        paddingHorizontal: 10,

    },
    textArrivesAt: {
        fontSize: 12,
        fontFamily: Fonts.DM_SANS_MEDIUM,
        color: Colors.DARK_GREY,
        textAlign: 'right'
    },
    textArrivesAtValue: {
        fontSize: 12,
        fontFamily: Fonts.DM_SANS_MEDIUM,
        color: Colors.LIGHT_BLACK,
        textAlign: 'right'
    },
    divider: {
        height: 1,
        flex: 1,
        backgroundColor: Colors.LIGHT_GREY
    },
    destinationInfoView: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 0,
        alignItems: 'center',
        paddingHorizontal: 9,
        justifyContent: 'space-evenly'
    },
    textOriginLocation: {
        // flex: 1,
        // fontFamily: Fonts.DM_SANS_MEDIUM,
        // fontSize: 16,
        // color: Colors.BLACK,
        // marginLeft: 8
        flex: 1,
        fontFamily: Fonts.DM_SANS_MEDIUM,
        fontSize: 11,
        color: Colors.BLACK,
        textAlign: 'center'
    },
    textArrivesIn: {
        fontFamily: Fonts.DM_SANS_REGULAR,
        fontSize: 12,
        alignSelf: 'center',
        color: Colors.BLACK,
        marginBottom: 16
        // textAlign: 'right'
    },
    textPrice: {
        fontFamily: Fonts.DM_SANS_BOLD,
        fontSize: 14,
        color: Colors.BLACK,
    },
    textFinalLocation: {
        // flex: 1,
        // fontFamily: Fonts.DM_SANS_MEDIUM,
        // fontSize: 16,
        // textAlign: 'right',
        // color: Colors.BLACK,
        // marginRight: 8
        flex: 1,
        fontFamily: Fonts.DM_SANS_MEDIUM,
        fontSize: 11,
        textAlign: 'center',
        color: Colors.BLACK,
    },
    viewDetailButton: {
        backgroundColor: Colors.ORANGE,
        flex: 1,
        height: 35,
        width: DimensionsValue.VALUE_320,
        borderRadius: 5,
        marginTop: 0,
        marginBottom: 0
    },
    acceptButton: {
        backgroundColor: Colors.GREEN,
        flex: 1,
        height: 35,
        width: DimensionsValue.VALUE_320,
        borderRadius: 20,
        marginTop: 0,
        marginBottom: 0
    },
    textViewDetail: {
        fontSize: 13,
        fontFamily: Fonts.DM_SANS_BOLD
    },
    textPastViewDetail: {
        fontSize: 15,
        fontFamily: Fonts.DM_SANS_MEDIUM,
        color: Colors.WHITE
    },

    buttonText: {
        fontSize: 11,
        fontFamily: Fonts.DM_SANS_REGULAR,
        color: Colors.WHITE
    },
    acceptRejectButtons: {
        height: 30,
        width: 140,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15
    },

});

export default HotshotProposal;

