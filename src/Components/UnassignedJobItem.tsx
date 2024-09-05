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

interface UnAssignedJobsProps {
    tapOnViewDetails: (item: any) => void;
    item?: any;
    index?: number;
    jobType?: string;
    tapOnAcceptJob?: any

}

const UnAssignedJobItem: React.FC<UnAssignedJobsProps> = ({
    tapOnViewDetails,
    item,
    index,
    jobType,
    tapOnAcceptJob

}) => {

    // console.log('item in UnAssignedJobItem', JSON.stringify(item));
    const [count, setCount] = useState<number>(0)

    const profileDetails = useSelector((state: any) => state?.persistedReducer.userData.profileDetails);
    const delieveryDate = moment(item?.dates, 'YYYY-MM-DD').format('MMMM Do YYYY');

    const tapOnAccept = (jobId: string) => {
        tapOnAcceptJob(jobId)
    }

    const lastLocationIndex = item?.dropAddress?.length - 1
    const originAddress = `${item?.locations[0]?.addressLine1 + ' ' + item?.locations[0]?.addressLine2 + ' ' + item?.locations[0]?.city + ' ' + item?.locations[0]?.state}`
    const destinationAddress = `${item?.dropAddress[lastLocationIndex]?.addressLine1 + ' ' + item?.dropAddress[lastLocationIndex]?.addressLine2 + ' ' + item?.dropAddress[lastLocationIndex]?.city + ' ' + item?.dropAddress[lastLocationIndex]?.state}`

    const firstLocation = item?.locations[0]?.location !== "" ? item?.locations[0]?.location : originAddress
    const lastLocation = item?.dropAddress[lastLocationIndex]?.drop_off_location !== "" ? item?.dropAddress[lastLocationIndex]?.drop_off_location : destinationAddress


   

    useEffect(() => {
        // Calculate total pickup_count

        if (item?.locations) {
            let totalPickupCount = 0;

            item?.locations?.forEach((location: any) => {
                location?.pickup_count.forEach((count: number) => {
                    totalPickupCount += count;
                });
            });

            setCount(totalPickupCount)
        }
    }, [item])


    const getProfileImage = () => {
        if (profileDetails?.photo !== null) {
            return { uri: profileDetails?.photo }
        } else {
            return Images.IC_PICKER
        }
    }

    const getDriverProfileImage = () => {
        if (item?.assignedDriver?.photo !== null) {
            return { uri: item?.assignedDriver?.photo }
        } else {
            return Images.IC_PICKER
        }
    }

    const getUserProfileImage = () => {
        if (item?.createdByUser?.photo !== null) {
            return { uri: item?.createdByUser?.photo }
        } else {
            return Images.IC_PICKER
        }
    }

    const getUserName = () => {
        if (jobType == 'UnAssigned') {
            return capitalizeFirstLetter(profileDetails?.full_name)
        } else if (jobType == 'InJobsMyJobs') {
            return capitalizeFirstLetter(item?.createdByUser?.full_name)
        } else
            return capitalizeFirstLetter(item?.assignedDriver?.full_name)
    }


    const tapOnItem = () => {
        if (jobType == 'JobRequest') {
            tapOnViewDetails(item)
        }
    }

    return (
        <Pressable style={[styles.mainTabView, { paddingTop: jobType == 'JobRequest' ? 0 : 15 }]}
            onPress={() => tapOnItem()}>

            {(jobType == 'OutJobsMyJobs' || jobType == "InJobsMyJobs" || jobType == 'UnAssigned') &&
                <View style={styles.viewUserInfo}>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <Image style={styles.imageUser}
                            source={jobType == 'UnAssigned' ? getProfileImage()
                                : jobType == 'InJobsMyJobs'
                                    ? getUserProfileImage()
                                    : getDriverProfileImage()}
                        />
                        <View style={{ alignSelf: 'center', flex: 1 }}>
                            {/* <Text style={styles.textUserName}>{getUserName()}</Text> */}
                            <Text style={jobType == 'UnAssigned'
                                ? styles.textUserNameUnassigned : jobType == 'InJobsMyJobs'
                                    ? styles.textUserNameMyJob : styles.textUserName}>
                                {getUserName()}
                            </Text>
                            <Text style={styles.textObjexts}>{count} {count > 1 ? 'Items' : 'Item'} </Text>
                        </View>
                    </View>
                    {(jobType == "InJobsMyJobs" || jobType == 'OutJobsMyJobs') &&
                        <View style={styles.buttonView}>
                            <Text style={styles.moneyText}>  {jobType === 'OutJobsMyJobs' ? `£${numberWithCommas(item?.amount)}` : `£${numberWithCommas(item?.driver_amount)}`}</Text>
                        </View>
                    }
                </View>
            }

            {(jobType == 'Past' || jobType == "OutJobsPast") ?
                <View style={styles.viewUserInfo}>
                    <Text style={[styles.textArrivesAt, { textAlign: 'center' }]}>{delieveryDate}</Text>

                    {(jobType == 'Past' || jobType == "OutJobsPast") &&
                        <Text style={[styles.textCompleted, { color: item?.isCancelled === true ? Colors.RED : Colors.GREEN }]}>
                            {item?.isCancelled === true ? StringConstants.CANCELLED : StringConstants.COMPLETED}
                        </Text>}
                </View> :


                (jobType == 'JobRequest' ) &&
                <View style={styles.topLineView}>
                    <Text style={styles.moneyText}>£{numberWithCommas(item?.driver_amount)}</Text>
                </View>
            }
            <View style={styles.divider} />

            {/* origin to destination view with van image  */}
            
                <View style={[styles.destinationInfoView, (jobType == "OutJobsMyJobs" || jobType == "UnAssigned") && { marginBottom: 10 }]}>
                    <Text numberOfLines={2} style={styles.textOriginLocation}>
                        {firstLocation}
                    </Text>
                    <Text style={{ color: Colors.ORANGE }}> ---- </Text>
                    <Image source={Images.IC_TRUCK} />
                    <Text style={{ color: Colors.ORANGE }}> ---- </Text>
                    <Text numberOfLines={2} style={styles.textFinalLocation}>
                        {lastLocation}
                    </Text>
                </View>

            {jobType == "InJobsMyJobs" && <View style={{ marginTop: 10 }}>
                <Text style={styles.textArrivesIn}>{delieveryDate}</Text>
            </View>
            }
            {jobType == "OutJobsMyJobs" && <View>
                <Text style={styles.textArrivesIn}>{delieveryDate}</Text>
            </View>
            }
            {jobType == "UnAssigned" && <View>
                <Text style={styles.textArrivesIn}>{delieveryDate}</Text>
            </View>
            }
            {jobType == "JobRequest" &&
                <Text style={[styles.textArrivesIn, { marginBottom: 25 }]}>Start time: {item?.time_slot == 'ASAP' ? 'ASAP' : item?.start_time}</Text>
            }
          
            {(jobType == "Past" || jobType == "OutJobsPast") &&
                <Text style={styles.textArrivesIn}>Total items - {count} </Text>
            }

            {(jobType == "Past" || jobType == "OutJobsPast") ?
                <View style={[styles.viewUserInfo, { marginBottom: 0, alignItems: 'center' }]}>
                 <Text style={styles.textPrice}>  {jobType === 'OutJobsPast' ? `£${numberWithCommas(item?.amount)}` : `£${numberWithCommas(item?.driver_amount)}`}</Text>
                    {/* <Text style={styles.textPrice}>£{numberWithCommas(item?.amount)}</Text> */}
                    <Pressable style={{
                        paddingVertical: 3,
                        paddingHorizontal: 15,
                        borderRadius: 5,
                        backgroundColor: Colors.ORANGE
                    }}
                        onPress={() => tapOnViewDetails(item)}>
                        <Text style={styles.textPastViewDetail}>{StringConstants.VIEW_DETAIL}</Text>
                    </Pressable>

                </View> :
                (jobType == "JobRequest") ?

                    <Button onPress={() => tapOnAccept(item?._id)}
                        containerStyles={styles.acceptButton}
                        primaryTitle={StringConstants.ACCEPT}
                        titleStyles={styles.textViewDetail}
                    />
                    :
                    <Button
                        onPress={() => tapOnViewDetails(item)}
                        containerStyles={styles.viewDetailButton}
                        primaryTitle={StringConstants.VIEW_DETAIL}
                        titleStyles={styles.textViewDetail}
                    />}
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

export default UnAssignedJobItem;

