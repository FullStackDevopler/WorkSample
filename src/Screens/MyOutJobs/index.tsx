import { View, Text, Image, Pressable, Keyboard, Alert, Linking, Platform, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { styles } from './styles'
import { Images } from '../../Assets';
import { StringConstants } from '../../Theme/StringConstants';
import Header from '../../Components/Header';
import { Colors } from '../../Theme/Colors';
import Button from '../../Components/Button';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import UploadDocuments from '../../Components/UploadDocuments';
import ReasonModal from '../../Modals/ReasonModal';
import { AppConstants } from '../../Theme/AppConstants';
import { useToast } from 'react-native-toast-notifications';
import { useDispatch, useSelector } from 'react-redux';
import { emojiRegex } from '../../Theme/validation';
import { cancelJobAction, jobDetailAction } from '../../Redux/Actions/jobActions';
import ValidationModal from '../../Modals/ValidationModal';
import LoaderModal from '../../Modals/LoaderModal';
import { clearJobsResponse } from '../../Redux/Reducers/jobListSlice';
import moment from 'moment';
import { ApiConstants } from '../../Theme/ApiConstants';
import { capitalizeFirstLetter, numberWithCommas } from '../../Theme/Helper';
import JobDetailsList from '../../Components/JobDetailsList';
import { Fonts } from '../../Theme/Fonts';
import ImageModal from '../../Modals/ImageModal';
import { SocketManager, socket } from '../../Components/SocketManager';

// let socket: any;
let connected;
let connecting;
export default function MyOutJobs({ navigation, route }: any): React.JSX.Element {
    const toast = useToast()
    const dispatch = useDispatch()
    const accessToken = useSelector((state: any) => state?.persistedReducer.userData.userToken);
    const isLoading = useSelector((state: any) => state?.persistedReducer.jobListData.isLoading)
    const errorMessage = useSelector((state: any) => state.persistedReducer.jobListData.error);
    const cancelJob = useSelector((state: any) => state.persistedReducer.jobListData.cancelJob);
    const jobsList = useSelector((state: any) => state.persistedReducer.jobListData.myOutJobs);
    const profileDetails = useSelector((state: any) => state?.persistedReducer.userData.profileDetails);
    // console.log('profileDetails in MyOutJobs:', profileDetails);

    const [showReasonModal, setShowReasonModal] = useState<boolean>(false)
    const [reason, setReason] = useState<any>()
    const [showValidationModal, setShowValidationModal] = useState<boolean>(false)
    const [alertTitle, setAlertTitle] = useState<string>('')
    const [jobItem, setJobItem] = useState<any>({})
    const [locationData, setLocationData] = useState<any[]>([])     // merged both pick and drop array to show the bottom route status
    const [currentRouteIndex, setCurrentRouteIndex] = useState(0)            // driver is on first location or second or so on
    const [showImageModal, setShowImageModal] = useState<boolean>(false)
    const [signature, setSignature] = useState<any>()
    const { item } = route?.params
    // console.log('item from paraams in MyOutJobs==>', item);
    const jobItemRef = useRef(jobItem);



    // Update jobItemRef when jobItem changes
    useEffect(() => {
        jobItemRef.current = jobItem;
        // console.log("jobitem in useeffect", JSON.stringify(jobItem));

        if (jobItem._id) {
            const tempArr = [...jobItem?.locations, ...jobItem?.dropAddress];
            setLocationData(tempArr);
        }
    }, [jobItem]);



    //to get the updated jobitem from the api 
    useEffect(() => {
        // console.log('item?.jobId', item?.jobId);
        if (item && jobsList) {
            // console.log("in useeffect of item", item);
            dispatch(jobDetailAction(accessToken, item?._id, 'myOutJobs'))
        }

    }, [item]);

    // console.log('route?.params?.jobId outside useEffect',route?.params?.jobId);




    // to set the jobItem after searching it in the jobList
    useEffect(() => {
        if (item && jobsList && !isLoading) {
            const tempItem = jobsList.find((job: any) => job._id === item._id);
            // console.log("item id found in useecfect", item._id);

            if (tempItem) {
                // console.log("tempItem found in useecfect", tempItem);

                if (tempItem?.locations) {
                    setLocationData([...tempItem?.locations, ...tempItem?.dropAddress])
                    setJobItem(tempItem)
                }
            }
        }

    }, [jobsList])




    useEffect(() => {
        if (socket) {
            socket.on('message', (data: any) => {
                console.log('called message sockets in myOutjobs:', data);
                updateLocationData(JSON.parse(data));
            });
        }

        return () => {
            if (socket) {
                socket.removeAllListeners();
            }
        };
    }, []);

    const updateLocationData = (data: any) => {
        const { job_id, _id, collected } = data?.data;

        if (job_id === jobItemRef.current?._id) {
            const updatedLocation = jobItemRef.current.locations.map((item: any) => {
                if (item._id === _id) {
                    return data.data;
                }
                return item;
            });

            const updatedDropLocation = jobItemRef.current.dropAddress.map((item: any) => {

                if (item._id === _id) {
                    return data.data;
                }
                return item;
            });

            // Use a callback function with setJobItem to ensure you're working with the latest state
            setJobItem((prevState: any) => ({
                ...prevState,
                locations: updatedLocation,
                dropAddress: updatedDropLocation
            }));

            if (collected == true) {
                setCurrentRouteIndex(prev => prev + 1)
            }
        } else {
            console.log("Job id does not match");
        }
    }



    const tapOnButton = () => {
        setShowReasonModal(true)
    }


    useEffect(() => {
        if (!isLoading && cancelJob?.deleteId) {
            setShowReasonModal(false)
            setShowValidationModal(true)
            setAlertTitle(StringConstants.JOB_CANCELLED_SUCCESSFULLY)
        }
    }, [cancelJob])


    useEffect(() => {

        if (errorMessage != null && !isLoading) {
            setShowReasonModal(false)
            setShowValidationModal(true)
            setAlertTitle(`${errorMessage}`)

        } else if (errorMessage == null) {
            setShowReasonModal(false)
            console.log("errormessage is  null login", errorMessage);
            setShowValidationModal(false)
            setAlertTitle('')
        }
    }, [errorMessage])

    const tapOnCancelJob = () => {
        // console.log('reason==>>',reason);

        if (!reason) {
            toast.show(StringConstants.PLEASE_ENTER_REASON, {
                placement: "top",
                duration: 1000,
                animationType: "slide-in",
            });
        }
        else if (emojiRegex.test(reason)) {
            toast.show(StringConstants.EMOJI_IS_NOT_ALLOWED_IN_THIS_FIELD, {
                placement: "top",
                duration: 1000,
                animationType: "slide-in",
            });
        }
        else {
            setShowReasonModal(false)
            dispatch(cancelJobAction(accessToken, reason, jobItem?._id, profileDetails?.full_name))
        }
    }


    const tapOnIIcon = (item: any, index: number) => {

        if (item?.pickup && item?.collected === false) {
            toast.show(`Driver yet to be reached by you`, {
                placement: "bottom",
                duration: 500,
                animationType: "slide-in",
            });
        }
        else if (item?.pickup && item?.collected === true) {
            toast.show(`Goods collected`, {
                placement: "bottom",
                duration: 500,
                animationType: "slide-in",
            });
        }
        else if (item?.dropup && item?.is_delivered === false) {
            toast.show(`Driver yet to be reached by you`, {
                placement: "bottom",
                duration: 500,
                animationType: "slide-in",
            });
        }
        else if (item?.dropup && item?.is_delivered === true) {
            toast.show(`Goods dropped off`, {
                placement: "bottom",
                duration: 500,
                animationType: "slide-in",
            });
        }


    }


    const openPdf = (docUrl: string) => {

        Linking.openURL(docUrl)
            .then(supported => {
                if (!supported) {
                    console.log('Opening PDF link in browser is not supported');
                }
            })
            .catch((error) => console.log('Error opening PDF link in MyPastJobs:', error));

    }

    const makePhoneCall = () => {
        Linking.openURL('tel:' + `${jobItem?.contactNumber}`);
    };

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

    const getDriverProfileImage = () => {
        if (jobItem?.assignedDriver?.photo !== null) {
            return { uri: jobItem?.assignedDriver?.photo }
        } else {
            return Images.IC_PICKER
        }
    }

    const getJobDetails = () => {
        return [
            { title: StringConstants.VEHICLE, value: capitalizeFirstLetter(jobItem?.vehicle)},
            { title: StringConstants.PHONE_NUMBER, value: jobItem?.contactNumber },
            { title: StringConstants.DELIVERY_DATE, value: moment(jobItem?.dates, 'YYYY-MM-DD').format('D MMM YYYY') },
            { title: StringConstants.PRICE, value: '£' + numberWithCommas(jobItem?.amount) },
            { title: StringConstants.TIME, value: jobItem?.time_slot == 'ASAP' ? 'ASAP' : jobItem?.start_time },
            { title: StringConstants.WEIGHT, value: item?.weight ? item?.weight + ' kg' : "" },
        ]
    }

    const getPickUpData = () => {
        let locationArray = item?.locations
            .filter((item: any) => item?.pickup_count !== null)
            .map((item: any) => {
                let pickupDetails = '';
                for (let i = 0; i < item.pickup_count.length; i++) {
                    pickupDetails += `${item.pickup_count[i]} ${item.pickup[i]}`;
                    if (i !== item.pickup_count.length - 1) {
                        pickupDetails += ', ';
                    }
                }
                return {
                    title: item.pickup_count && item.location !== '' ? item.location : item.addressLine1 + ' ' + item.addressLine2 + ' ' + item.city + ' ' + item.state,
                    value: pickupDetails,
                    showIcon: item.pickup_count && (item.pick_drop_note ? true : false),
                    note: item.pickup_count && item.pick_drop_note
                };
            });

        // locationArray.unshift({
        //     title: StringConstants.ADDRESS,
        //     value: StringConstants.ITEM,
        // });

        return locationArray;
    }

    const getDropData = () => {

        let locationArray = item?.dropAddress
            .filter((item: any) => item.dropup_count !== null)
            .map((item: any) => {
                let dropupDetails = '';
                for (let i = 0; i < item.dropup_count.length; i++) {
                    dropupDetails += `${item.dropup_count[i]} ${item.dropup[i]}`;
                    if (i !== item.dropup_count.length - 1) {
                        dropupDetails += ', ';
                    }
                }
                return {
                    title: item.dropup_count && item.drop_off_location !== '' ? item.drop_off_location : item.addressLine1 + ' ' + item.addressLine2 + ' ' + item.city + ' ' + item.state,
                    value: dropupDetails,
                    showIcon: item.dropup_count && (item.pick_drop_note ? true : false),
                    note: item.dropup_count && item.pick_drop_note
                };
            });

        // locationArray.unshift({
        //     title: StringConstants.ADDRESS,
        //     value: StringConstants.ITEM,
        // },)


        return locationArray;

    }

    const totalItems = (item: any) => {
        let combinedArray
        if (item.pickup) {
            combinedArray = item?.pickup.map((items: any, index: number) => `${item?.pickup_count[index]} ${items}`);
        } else {
            combinedArray = item?.dropup?.map((items: any, index: number) => `${item?.dropup_count[index]} ${items}`);
        }
        return combinedArray.join(", ");
    };


    const getAddress = (item: any) => {
        let currentLocationText
        const { addressLine1, addressLine2, city, state } = item
        if (item.pickup) {
            currentLocationText = item?.location ? item?.location : `${addressLine1} ${addressLine2} ${city} ${state}`
        } else {
            currentLocationText = item?.drop_off_location ? item?.drop_off_location : `${addressLine1} ${addressLine2} ${city} ${state}`
        }
        return currentLocationText
    }

    const tapOnViewSignature = (index: number) => {

        setShowImageModal(true)
        setSignature(locationData[index].signature)
    }

    const formatDate = (date: any) => {
        const dates = moment(date).format("hh:mm a DD/MM/YYYY")
        return dates
    }

    return (
        <View style={styles.rootContainer}>
            {showReasonModal &&
                <ReasonModal
                    showModal={showReasonModal}
                    hideModal={() => setShowReasonModal(false)}
                    tapOnCancelJob={tapOnCancelJob}
                    reason={reason}
                    setReason={setReason}

                />
            }
            {isLoading &&
                <LoaderModal showModal={isLoading} />
            }
            {showValidationModal &&
                <ValidationModal
                    showModal={showValidationModal}
                    hideModal={() => {
                        if (alertTitle == StringConstants.JOB_CANCELLED_SUCCESSFULLY) {
                            dispatch(clearJobsResponse('cancelJob'));
                            setShowValidationModal(false)
                            setAlertTitle('')
                        } else {
                            setShowValidationModal(false)
                            setAlertTitle('')
                            dispatch(clearJobsResponse('error'));
                        }

                    }}
                    title={alertTitle}
                />
            }
            {showImageModal &&
                <ImageModal
                    image={signature}
                    showModal={showImageModal}
                    hideModal={() => {
                        setShowImageModal(false)
                        setSignature("")
                    }}
                />
            }
            <Header
                tapOnBack={() => { navigation.navigate(AppConstants.screens.HOME_SCREEN) }}
                headerText={StringConstants.JOB_DETAIL}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                {/* user details  */}
                <View style={{ flexDirection: 'row', flex: 0.8 }}>
                    <Image source={getDriverProfileImage()} style={styles.profileImage} />
                    <Text style={styles.driverName}>{capitalizeFirstLetter(jobItem?.assignedDriver?.full_name)}</Text>
                </View>

                <View style={styles.rightIconsView}>
                    <TouchableOpacity onPress={makePhoneCall}>
                        <Image source={Images.IC_CALL_CIRCULAR} style={styles.rightIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={sendSMS}>
                        <Image source={Images.IC_MESSAGE_CIRCULAR} style={styles.rightIcon} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.horizontalLine} />


            <SocketManager url={ApiConstants.MEDIA_BASE_URL}>
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
                                    onPress={() => {
                                        openPdf(item)
                                    }}
                                    uriAvaiable={false}
                                />
                            )
                        })}

                    </View>

                    {jobItem?.note && <View style={[styles.detailsView, { marginBottom: 5, marginTop: 25 }]}>
                        <View style={styles.topView}>
                            <Text style={styles.detailText}>{StringConstants.NOTES}</Text>
                        </View>
                    </View>}
                    {jobItem?.note && <ScrollView nestedScrollEnabled style={styles.notesView} >
                        <Text style={styles.textNotes}>{jobItem?.note}</Text>
                    </ScrollView>}


                    <View>
                        <Text style={[styles.routeStatusText, { marginBottom: 25 }]}>{StringConstants.ROUTE_STATUS}</Text>

                        <FlatList
                            data={locationData}
                            extraData={locationData}
                            keyExtractor={(_, index) => `${index}`}
                            renderItem={({ item, index }) => {
                                return (
                                    <View key={index}>
                                        {index == 0 &&
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={styles.circleLineView}>
                                                    <Image style={styles.circleLeftIcon}
                                                        source={item?.startTime ? Images.IC_GREEN_CIRCLE : Images.IC_GREY_CIRCLE}
                                                    />
                                                    <View style={styles.dottedLineView}>
                                                        <Image source={Images.IC_DOT_LINE} style={
                                                            { tintColor: item?.startTime ? Colors.GREEN : Colors.DARK_GREY, alignSelf: 'center' }} />
                                                    </View>
                                                </View>

                                                <View style={{ flex: 1 }}>
                                                    <Text style={[styles.textInsideBlack, { marginLeft: 5, color: item?.startTime ? Colors.GREEN : Colors.BLACK }]}>
                                                        {`Job Started at ${item.startTime && formatDate(item.startTime) || ''}`}
                                                    </Text>
                                                </View>
                                            </View>
                                        }

                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={styles.circleLineView}>
                                                <Image style={styles.circleLeftIcon}
                                                    source={item?.startTime ? Images.IC_GREEN_CIRCLE : Images.IC_GREY_CIRCLE}
                                                />
                                                <View style={styles.dottedLineView}>
                                                    <Image source={Images.IC_DOT_LINE} style={[styles.verticalDotLine,
                                                    { tintColor: item?.startTime ? Colors.GREEN : Colors.DARK_GREY }]} />
                                                </View>
                                            </View>

                                            <View style={{ flex: 1 }}>
                                                <Text style={[styles.textInsideBlack, { marginLeft: 5, color: item?.startTime ? Colors.GREEN : Colors.BLACK }]}>
                                                    {`On Route to ${item.pickup ? 'Pickup' : 'Drop-Off'} location `}<Text style={{ fontFamily: Fonts.DM_SANS_SEMIBOLD }}> {getAddress(item)}</Text>
                                                </Text>
                                                <Text style={[styles.textAdress, { marginStart: 6 }]}>{item.startTime ? `At: ${formatDate(item.startTime)}` : ""}</Text>
                                            </View>
                                        </View>





                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={styles.circleLineView}>
                                                <Image style={styles.circleLeftIcon}
                                                    source={item.reached_at_location ? Images.IC_GREEN_CIRCLE : Images.IC_GREY_CIRCLE}
                                                />
                                                <View style={styles.dottedLineView}>
                                                    <Image source={Images.IC_DOT_LINE} style={[styles.verticalDotLine,
                                                    { tintColor: item.reached_at_location ? Colors.GREEN : Colors.DARK_GREY }]} />
                                                </View>
                                            </View>

                                            <View style={{ flex: 1 }}>
                                                <Text style={[styles.textInsideBlack, { marginLeft: 5, color: item.reached_at_location ? Colors.GREEN : Colors.BLACK }]}>
                                                    {`Arrived at ${item.pickup ? 'Pickup' : 'Drop-off'} location`} <Text style={{ fontFamily: Fonts.DM_SANS_SEMIBOLD }}> {getAddress(item)}</Text>
                                                </Text>
                                                <Text style={[styles.textAdress, { marginStart: 6 }]}>{item.reachTime ? `At: ${formatDate(item.reachTime)}` : item.estimateReachTime ? `ETA: ${item.estimateReachTime}` : ""}</Text>
                                            </View>
                                        </View>



                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={styles.circleLineView}>
                                                <Image style={styles.circleLeftIcon}
                                                    source={item.collected || item.delivered_time ? Images.IC_GREEN_CIRCLE : Images.IC_GREY_CIRCLE}
                                                />
                                            </View>

                                            <View style={{ flex: 1 }}>
                                                <Text style={[styles.textInsideBlack, { marginLeft: 5, color: item.collected || item.delivered_time ? Colors.GREEN : Colors.BLACK }]}>
                                                    {`Goods ${item.pickup ? 'Collected from' : 'Dropped at'}  `}<Text style={{ fontFamily: Fonts.DM_SANS_SEMIBOLD }}>{getAddress(item)}</Text>
                                                </Text>
                                            </View>
                                        </View>

                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                            <Text style={styles.itemsCount}>{totalItems(item)}</Text>
                                            <Pressable style={{ justifyContent: 'center' }} onPress={() => tapOnIIcon(item, index)}>
                                                <Image source={Images.IC_I_ICON} style={{ height: 20, width: 20 }} />
                                            </Pressable>
                                        </View>
                                        <Text style={[styles.textAdress, { marginStart: 45, marginTop: -2 }]}>{item.collectedTime ? `At: ${formatDate(item.collectedTime)}` : item.delivered_time ? `At: ${formatDate(item.delivered_time)}` : ""}</Text>

                                        {item?.signature !== null &&
                                            <TouchableOpacity style={styles.viewSignature} onPress={() => tapOnViewSignature(index)}>
                                                <Text style={styles.viewSignatureText}>{StringConstants.VIEW_SIGNATURE}</Text>
                                            </TouchableOpacity>}

                                        <View style={[styles.horizontalBottomLine]} />
                                    </View>
                                )

                            }}
                        />
                    </View>

                    {jobItem?.locations &&
                        jobItem?.locations[0]?.collected == false &&
                        <Button primaryTitle={StringConstants.CANCEL_JOB}
                            containerStyles={{ backgroundColor: Colors.ORANGE, height: 43 }}
                            onPress={tapOnButton} />}

                </KeyboardAwareScrollView>
            </SocketManager>

        </View>
    )
}