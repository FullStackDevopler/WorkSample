import React, { FC, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
} from 'react-native';
import { Colors } from '../Theme/Colors';
import { Fonts } from '../Theme/Fonts';
import { Images } from '../Assets';
import { StringConstants } from '../Theme/StringConstants';
import { DimensionsValue } from '../Theme/DimensionsValue';
import { useSelector } from 'react-redux';
import { ApiConstants } from '../Theme/ApiConstants';
import { capitalizeFirstLetter } from '../Theme/Helper';

interface HotshotDataProps {
    item: any;
    onPress: () => void;
    hiredUser ?: boolean
}

const HotshotData: FC<HotshotDataProps> = ({ item, onPress , hiredUser}) => {
// console.log("item in HotshotData",item);

    const profileDetails = useSelector((state: any) => state?.persistedReducer.userData.profileDetails);

    let originLocation = item?.pickup_location ? item?.pickup_location : `${item?.pickup_address_1} ${item?.pickup_address_2} ${item?.pickup_city} ${item?.pickup_state} ${item?.pickup_zip}`
    let destinationLocation = item?.dopoff_location ? item?.dopoff_location : `${item?.dopoff_address_1} ${item?.dopoff_address_2} ${item?.dopoff_city} ${item?.dopoff_state} ${item?.dopoff_zip}`

    const getProfileImage = () => {
        // Check if item.users is empty or not provided
        if (!item?.users || (Array.isArray(item?.users) && item?.users?.length === 0) || (typeof item?.users === 'object' && Object.keys(item?.users)?.length === 0)) {
            if (profileDetails?.photo) {
                return { uri: profileDetails?.photo };
            } else {
                return Images.IC_PICKER;
            }
        } else {
            // Check if item.users is an array
            if (Array.isArray(item?.users)) {
                if (item?.users?.length > 0 && item?.users[0]?.photo) {
                    return { uri: item?.users[0]?.photo };
                } else {
                    return Images.IC_PICKER;
                }
            }
            // Check if item.users is an object
            else if (typeof item?.users === 'object') {
                if (item?.users?.photo) {
                    return { uri: item?.users?.photo };
                } else {
                    return Images.IC_PICKER;
                }
            } else {
                return Images.IC_PICKER;
            }
        }
    };


    const getName = () => {
        if (item?.userHotSot?.length === 0 || !item?.users) {
            return capitalizeFirstLetter(profileDetails?.full_name);
        } else if (Array.isArray(item.users)) {
            return item?.users?.length > 0 ? capitalizeFirstLetter(item?.users[0]?.full_name) : capitalizeFirstLetter(profileDetails?.full_name);
        } else if (typeof item.users === 'object') {
            return capitalizeFirstLetter(item?.users?.full_name) || capitalizeFirstLetter(profileDetails?.full_name);
        } else {
            return capitalizeFirstLetter(profileDetails?.full_name);
        }
    }

    const getBorderColor = () => {
        if (item?.userHotSot?.length === 0) {
            return Colors.ORANGE;
        } else if (item?.userHotSot?.length > 0 && hiredUser === false) {
            return Colors.ORANGE;
        } else if (item?.userHotSot?.length > 0 && hiredUser === true) {
            return Colors.GREEN;
        } else if (item?.is_finished === true) {
            return Colors.DARK_GREY;
        } else {
            return 
        }
    };

    return (
        <TouchableOpacity onPress={onPress}
            style={[styles.mainContainer, { borderColor: getBorderColor() }]}>
            {/* style={[styles.mainContainer, { borderColor: item?.userHotSot?.length === 0 ? Colors.ORANGE : (item?.userHotSot?.length > 0 && item?.is_finished === true) ? Colors.DARK_GREY : Colors.GREEN }]}> */}
         
            {
                item?.userHotSot?.length === 0 || (item?.userHotSot?.length > 0 && hiredUser == false)  ?
                    <View style={[styles.topLineView, { backgroundColor: Colors.ORANGE }]}>
                        <Text style={[styles.topLineText, { color: Colors.WHITE }]}>{StringConstants.AVAILABLE_FROM}</Text>
                        <Text style={[styles.topLineText, { color: Colors.WHITE }]}>{item?.time}</Text>
                    </View>
                    :
                    (item?.userHotSot?.length > 0 && item?.is_finished === true)
                        ?
                        <View style={[styles.topLineView, { justifyContent: 'center', backgroundColor: Colors.LIGHT_GREY }]}>
                            <Text style={[styles.topLineText, { color: Colors.DARK_GREY }]}>{"Completed Hotshot"}</Text>
                        </View>
                        :
                        (item?.userHotSot?.length > 0 && hiredUser === true) &&

                        <View style={[styles.topLineView, { justifyContent: 'center', backgroundColor: Colors.GREEN }]}>
                            <Text style={[styles.topLineText, { color: Colors.WHITE }]}>{`Leaving at ${item?.time}`}</Text>
                        </View>
            }

            <View style={styles.middleRowView}>
                <View style={styles.locationContainer}>
                    <Text numberOfLines={2} style={styles.locationText}>{originLocation}</Text>
                </View>

                <View style={{ marginTop: -10 }}>
                    <Text style={styles.aboveDottedLineText}>{item?.totalDistance}</Text>
                    <Text style={{ color: Colors.ORANGE }}>------</Text>
                </View>

                <Image source={Images.IC_TRUCK} style={styles.truckIcon} />

                <View style={{ marginTop: -10 }}>
                    <Text style={styles.aboveDottedLineText}>{item?.totalTime}</Text>
                    <Text style={{ color: Colors.ORANGE }}> ------</Text>
                </View>

                <View style={styles.locationContainer}>
                    <Text numberOfLines={2} style={styles.locationText}>{destinationLocation}</Text>
                </View>
            </View>

            <View style={[styles.horizontalLine, { backgroundColor: getBorderColor()}]} />
            {/* <View style={[styles.horizontalLine, { backgroundColor: item?.userHotSot?.length === 0 ? Colors.ORANGE : (item?.userHotSot?.length > 0 && item?.is_finished === true) ? Colors.LIGHT_GREY : Colors.GREEN }]} /> */}

            <View style={styles.bottomRowView}>
                <View style={{ flexDirection: 'row', flex: 0.65 }}>
                    <Image style={styles.driverProfilePic} source={getProfileImage()} />
                    <Text style={styles.truckName}>{getName()}</Text>
                </View>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>{item?.isHired == true ?  '£' + item?.userHotSot[0]?.driver_amount : '£' + item?.driver_amount}</Text>
                    {/* <Text style={styles.buttonText}>{'£' + item?.driver_amount}</Text> */}
                </View>
            </View>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    mainContainer: {
        width: DimensionsValue.VALUE_348,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 25,
        borderColor: Colors.LIGHT_GREY,
        borderWidth: .5,
        paddingBottom: 10

    },
    topLineView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15,
        // backgroundColor: Colors.LIGHT_GREY,
        width: '100%',
        alignSelf: 'center',
        paddingVertical: 7,
        paddingLeft: 10,
        paddingRight: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10

    },
    topLineText: {
        fontSize: 12,
        fontFamily: Fonts.DM_SANS_REGULAR,
    },
    locationContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },

    locationText: {
        flex: 1,
        fontFamily: Fonts.DM_SANS_MEDIUM,
        fontSize: 11,
        color: Colors.BLACK,
        textAlign: 'center',
    },
    middleRowView: {
        flexDirection: 'row',
        marginTop: 25,
        marginHorizontal: 14,
        justifyContent: 'space-evenly'
    },
    truckIcon: {
        // height: 30,
        // width: 60,
        // marginTop: -5
        height: 20,
        width: 35
    },
    aboveDottedLineText: {
        color: Colors.BLACK,
        fontFamily: Fonts.DM_SANS_LIGHT,
        fontSize: 10,
        alignSelf: 'center'
    },
    horizontalLine: {
        height: 1,
        width: '95%',
        backgroundColor: Colors.LIGHT_GREY,
        alignSelf: 'center',
        marginTop: 12
    },
    bottomRowView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        marginHorizontal: 20
    },
    button: {
        backgroundColor: Colors.ORANGE,
        height: 42,
        width: 85,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.3
    },
    buttonText: {
        color: Colors.WHITE,
        fontSize: 16,
        fontFamily: Fonts.DM_SANS_SEMIBOLD
    },
    driverProfilePic: {
        height: 44,
        width: 44,
        borderRadius: 22
    },
    truckName: {
        fontSize: 14,
        fontFamily: Fonts.DM_SANS_SEMIBOLD,
        alignSelf: 'center',
        marginLeft: 10,
        color: Colors.BLACK,
        paddingEnd: 20,

    }
})

export default HotshotData