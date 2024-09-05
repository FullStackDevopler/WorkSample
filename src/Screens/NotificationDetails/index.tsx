import { View, Text, Image, Pressable, Keyboard, Linking, Platform, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import { Images } from '../../Assets';
import { StringConstants } from '../../Theme/StringConstants';
import Header from '../../Components/Header';
import { Colors } from '../../Theme/Colors';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import UploadDocuments from '../../Components/UploadDocuments';
import CancellationModal from '../../Modals/CancellationModal';
import ReasonModal from '../../Modals/ReasonModal';
import RatingModal from '../../Modals/RatingModal';
import { useToast } from 'react-native-toast-notifications';
import { useDispatch, useSelector } from 'react-redux';
import { jobDetailNotificationAction } from '../../Redux/Actions/jobActions';
import moment from 'moment';
import { capitalizeFirstLetter, numberWithCommas } from '../../Theme/Helper';
import JobDetailsList from '../../Components/JobDetailsList';
import { ApiConstants } from '../../Theme/ApiConstants';

export default function NotificationDetails({ navigation, route }: any): React.JSX.Element {
    const toast = useToast()
    const dispatch = useDispatch()
    const [showCancelModal, setShowCancelModal] = useState<boolean>(false)
    const [showReasonModal, setShowReasonModal] = useState<boolean>(false)
    const [showRatingModal, setShowRatingModal] = useState<boolean>(false)
    const [comment, setComment] = useState<string>('')
    const [rating, setRating] = useState<number>(0)
    const [jobItem, setJobItem] = useState<any>({})

    const accessToken = useSelector((state: any) => state?.persistedReducer.userData.userToken);
    const selectedJobItem = useSelector((state: any) => state.persistedReducer.jobListData.selectedJobItem);
    console.log('selectedJobItem in NotificationDetails', JSON.stringify(selectedJobItem));

    const { notificationItem } = route?.params

    useEffect(() => {

        console.log('route.params.jobId', route.params.jobId);
        dispatch(jobDetailNotificationAction(accessToken, route?.params?.jobId, 'selectedJobItem'))

    }, [route?.params?.jobId])

    useEffect(() => {

        if (selectedJobItem?.locations?.length > 0) {
            setJobItem(selectedJobItem)
        }

    }, [selectedJobItem])

    const getJobDetails = () => {
        return [
            { title: StringConstants.VEHICLE, value: jobItem?.vehicle },
            { title: StringConstants.PHONE_NUMBER, value: jobItem?.contactNumber },
            { title: StringConstants.DELIVERY_DATE, value: moment(jobItem?.dates, 'YYYY-MM-DD').format('D MMM YYYY') },
            { title: StringConstants.PRICE, value: '£' + numberWithCommas(jobItem?.amount) },
            { title: StringConstants.TIME, value: jobItem?.time_slot == 'ASAP' ? 'ASAP' : jobItem?.start_time },
        ]
    }

    const getPickUpData = () => {

        let locationArray = jobItem?.locations
            ?.filter((item: any) => item.pickup_count !== null)
            ?.map((item: any) => ({
                title: item.pickup_count && item.location !== '' ? item.location : item.addressLine1 + ' ' + item.addressLine2 + ' ' + item.city + ' ' + item.state,
                value: `${item.pickup_count} ${item.pickup} (${item?.weight}kg)`,
                showIcon: item.pickup_count && (item.pick_drop_note ? true : false),
                note: item.pickup_count && item.pick_drop_note
            }));


        locationArray?.unshift({
            title: StringConstants.ADDRESS,
            value: StringConstants.ITEM_WEIGHT,
        },)


        // console.log("locationArray after edditing", locationArray);
        return locationArray;

    }


    const getDropData = () => {

        let locationArray = jobItem?.locations
            ?.filter((item: any) => item.drop_off_count !== null)
            ?.map((item: any) => ({
                title: item.drop_off_count && item.location !== '' ? item.location : item.addressLine1 + ' ' + item.addressLine2 + ' ' + item.city + ' ' + item.state,
                value: `${item.drop_off_count} ${item.drop_off}`,
                showIcon: item.drop_off_count && (item.pick_drop_note ? true : false),
                note: item.drop_off_count && item.pick_drop_note
            }));


        locationArray?.unshift({
            title: StringConstants.ADDRESS,
            value: StringConstants.ITEM,
        },)
        return locationArray;
    }


    const tapOnIIcon = (index: number) => {

        jobItem.locations.forEach((location: any, index2: number) => {
            if (location.collected && index === index2) {
                if (location.pickup_count !== null && location.drop_off_count === null) {
                    toast.show(`Collected courier`, {
                        placement: "bottom",
                        duration: 500,
                        animationType: "slide-in",
                    });
                }
                else if (location.pickup_count === null && location.drop_off_count !== null) {
                    toast.show(`Dropped off courier`, {
                        placement: "bottom",
                        duration: 500,
                        animationType: "slide-in",
                    });
                }
            }
            else if (location.collected == false && index === index2) {
                toast.show(`Item yet to be reached by you`, {
                    placement: "bottom",
                    duration: 1000,
                    animationType: "slide-in",
                });
            }

        });
    }



    const makePhoneCall = () => {
        Linking.openURL('tel:' + `${jobItem?.contactNumber}`);
    };



    const collectedDropOff = (location: any) => {
        if (location.pickup_count !== null && location.drop_off_count === null) {
            return "Collected"
        }
        else if (location.drop_off_count !== null && location.pickup_count === null) {
            return "Dropped Off"
        }
        else {
            return "Collected"
        }
    }

    const sendSMS = async () => {

        let url = `sms:${jobItem?.contactNumber}${getSMSDivider()}body=${''}`
        try {
            const shareResponse = await Linking.openURL(url);
            console.log("shareResponse shareResponse=>>", JSON.stringify(shareResponse))

        } catch (error) {
            console.log("error while sharing app link=>", error);

        }
    }


    const getSMSDivider = () => {
        return Platform.OS === "ios" ? "&" : "?";
    }
    const openPdf = (docUrl: string) => {

        // let pdfUri
        // pdfUri = ApiConstants.DOC_BASE_URL + docUrl

        Linking.openURL(docUrl)
            .then(supported => {
                if (!supported) {
                    console.log('Opening PDF link in browser is not supported');
                }
            })
            .catch((error) => console.log('Error opening PDF link in MyPastJobs:', error));

    }

    const getProfileImage = () => {
        if (notificationItem?.sendById?.photo !== null) {
            return { uri:  notificationItem?.sendById?.photo }
        } else {
            return Images.IC_PICKER
        }
    }


    return (
        <View style={styles.rootContainer}>
            {showCancelModal &&
                <CancellationModal
                    showModal={showCancelModal}
                    hideModal={() => setShowCancelModal(false)}
                    tapOnConfirm={() => {
                        setShowCancelModal(false)
                        navigation.goBack()
                    }}
                />
            }

            {showReasonModal &&
                <ReasonModal
                    showModal={showReasonModal}
                    hideModal={() => setShowReasonModal(false)}
                    tapOnCancelJob={() => {
                        setShowReasonModal(false)
                        navigation.goBack()
                    }}
                />
            }
            {showRatingModal &&
                <RatingModal
                    showModal={showRatingModal}
                    hideModal={() => setShowRatingModal(false)}
                    onPress={() => {
                        setShowRatingModal(false)
                        navigation.goBack()
                    }}
                    comment={comment}
                    setComment={setComment}
                    rating={rating}
                    setRating={setRating}
                />
            }

            <Header tapOnBack={() => navigation.goBack()}
                headerText={StringConstants.JOB_DETAIL}
            />

            <View>

                <Text style={styles.cancelledJobText}>{notificationItem?.message}</Text>
                {/* <View style={{marginHorizontal: DimensionsValue.VALUE_26 }}>
                        <Text style={styles.reasonForCancel}>{route?.params?.message}</Text>
                </View> */}

                <View style={[styles.horizontalLine, { marginBottom: 15 }]} />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={getProfileImage()} style={styles.profileImage} />
                    <Text style={styles.driverName}>{capitalizeFirstLetter(notificationItem?.sendById?.full_name)}</Text>
                </View>
                <View style={styles.rightIconsView}>
                    <TouchableOpacity onPress={makePhoneCall}>
                        <Image source={Images.IC_CALL_CIRCULAR} style={[styles.rightIcon, { marginRight: 8 }]} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={sendSMS}>
                        <Image source={Images.IC_MESSAGE_CIRCULAR} style={styles.rightIcon} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.horizontalLine} />

            <KeyboardAwareScrollView
                onScrollBeginDrag={() => Keyboard.dismiss()}
                showsVerticalScrollIndicator={false}
                bounces={false}
            >

                <JobDetailsList title={StringConstants.JOB_DETAIL} data={getJobDetails()} />
                <JobDetailsList title={StringConstants.PICKUP_INFORMATION} data={getPickUpData()} showItemDetails={true} />
                <JobDetailsList title={StringConstants.DROP_OFF_INFORMATION} data={getDropData()} showItemDetails={true} />

                <View>
                    {jobItem?.document?.length > 0 &&
                        <View style={[styles.detailsView, { marginBottom: 5 }]}>
                            <View style={styles.topView}>
                                <Text style={styles.detailText}>
                                    {jobItem?.document?.length == 1 ? StringConstants.DOCUMENT : StringConstants.DOCUMENTS}
                                </Text>
                            </View>
                        </View>}
                    {jobItem?.document?.length > 0 && jobItem?.document?.map((item: string, i: number) => {
                        const pdfName = item.split('/').pop();

                        return (
                            <UploadDocuments key={i}
                                topText={pdfName || 'document.pdf'}
                                bottomText={StringConstants.TAP_TO_VIEW_DOCUMENT}
                                uploaded={false}
                                uriAvaiable={false}
                                onPress={() => {
                                    openPdf(item)
                                }}
                            />
                        )
                    })}

                </View>


                {jobItem?.note && <View>
                    <View style={[styles.detailsView, { marginBottom: 5, marginTop: 25 }]}>
                        <View style={styles.topView}>
                            <Text style={styles.detailText}>{StringConstants.NOTES}</Text>
                        </View>
                    </View>
                    <ScrollView nestedScrollEnabled style={styles.notesView} >
                        <Text style={styles.textNotes}>{jobItem?.note}</Text>
                    </ScrollView>
                </View>}

                {notificationItem?.type !== "job_Cancelled" && <View>
                    <Text style={styles.routeStatusText}>{StringConstants.ROUTE_STATUS}</Text>

                    <FlatList
                        data={jobItem?.locations}
                        extraData={jobItem}
                        keyExtractor={(item, index) => `${index}`}
                        renderItem={({ item, index }) => {
                            const locations = jobItem?.locations;
                            const currentLocationText = index === 0 ? "Job Started" : locations[index - 1]?.location ? locations[index - 1]?.location : `${locations[index - 1]?.addressLine1 + ' ' + locations[index - 1]?.addressLine2 + ' ' + locations[index - 1]?.city + ' ' + locations[index - 1]?.state}`;
                            const nextLocationText = item?.location ? item?.location : `${item?.addressLine1 + ' ' + item?.addressLine2 + ' ' + item?.city + ' ' + item?.state}`
                            return (
                                <View key={index}>
                                    <Text style={[styles.locationsText, { marginBottom: 25 }]}>{currentLocationText}</Text>
                                    <View style={{ flexDirection: 'row' }}>

                                        <View>
                                            <TouchableOpacity style={styles.iconTextView}
                                                disabled={item.en_route == true}
                                                onPress={() => {}}>
                                                <Image style={styles.circleLeftIcon}
                                                    source={item.en_route ? Images.IC_GREEN_CIRCLE : Images.IC_GREY_CIRCLE}
                                                />
                                                <View style={item.en_route ? styles.greenView : styles.orangeView}>
                                                    <Text style={item.en_route ? styles.textInside : styles.textInsideBlack}>en route</Text>
                                                </View>


                                            </TouchableOpacity>
                                            <View style={{ flexDirection: 'row' }}>

                                                <Image source={Images.IC_DOT_LINE} style={[styles.verticalDotLine, { tintColor: item.en_route && Colors.GREEN }]} resizeMode="repeat" />
                                                {item?.startTime && <Text style={styles.textTime}>{`${moment(item?.startTime).format('LT')}`}</Text>}
                                            </View>


                                            <TouchableOpacity style={styles.iconTextView}
                                                disabled={item.reached_at_location == true}
                                                onPress={() => {}}>
                                                <Image source={item.reached_at_location ? Images.IC_GREEN_CIRCLE : Images.IC_GREY_CIRCLE}
                                                    style={styles.circleLeftIcon}
                                                />
                                                <View style={item.reached_at_location ? styles.greenView : styles.orangeView}>
                                                    <Text style={item.reached_at_location ? styles.textInside : styles.textInsideBlack}>Reached at location</Text>
                                                </View>

                                            </TouchableOpacity>



                                            <View style={{ flexDirection: 'row' }}>

                                                <Image source={Images.IC_DOT_LINE} style={[styles.verticalDotLine, { tintColor: item.en_route && Colors.GREEN }]} resizeMode="repeat" />
                                                {item?.reachTime && <Text style={styles.textTime}>{`${moment(item?.reachTime).format('LT')}`}</Text>}
                                            </View>


                                            <TouchableOpacity style={styles.iconTextView}
                                                disabled={item.collected == true}
                                                onPress={() => {}}>
                                                <Image source={item.collected ? Images.IC_GREEN_CIRCLE : Images.IC_GREY_CIRCLE}
                                                    style={styles.circleLeftIcon}
                                                />
                                                <View style={item.collected ? styles.greenView : styles.orangeView}>
                                                    <Text style={item.collected ? styles.textInside : styles.textInsideBlack}>{collectedDropOff(item)} </Text>

                                                </View>
                                                <Pressable style={{ justifyContent: 'center' }} onPress={() => tapOnIIcon(index)}>
                                                    <Image source={Images.IC_I_ICON} style={{ height: 20, width: 20, marginLeft: 6 }} />
                                                </Pressable>


                                            </TouchableOpacity>

                                            {item?.collectedTime && <Text style={[styles.textTime, { marginStart: 50 }]}>{`${moment(item?.collectedTime).format('LT')}`}</Text>}


                                        </View>
                                    </View>
                                    {nextLocationText && <Text style={[styles.locationsText, { marginBottom: 25 }]}>{nextLocationText} </Text>}
                                </View>
                            )

                        }}
                    />
                </View>}



            </KeyboardAwareScrollView>

        </View>
    )
}