import { View, Text, Image, Pressable, Keyboard, Alert, Platform, Linking, TouchableOpacity, FlatList, PermissionsAndroid, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { styles } from './styles'
import { Images } from '../../Assets';
import { StringConstants } from '../../Theme/StringConstants';
import Header from '../../Components/Header';
import { Colors } from '../../Theme/Colors';
import Button from '../../Components/Button';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import { Fonts } from '../../Theme/Fonts';
import { useToast } from 'react-native-toast-notifications';
import JobDetailsList from '../../Components/JobDetailsList';
import LocationView from '../../Components/LocationView';
import ConfirmationModal from '../../Modals/ConfirmationModal';
import ValidationModal from '../../Modals/ValidationModal';
import LoaderModal from '../../Modals/LoaderModal';
import ImageModal from '../../Modals/ImageModal';
import { useDispatch, useSelector } from 'react-redux';
import { capitalizeFirstLetter } from '../../Theme/Helper';
import { clearHotshotResponse } from '../../Redux/Reducers/hotshotSlice';
import { cancelHotshotAction, finishHotshotAction, hotshotDetailsAction } from '../../Redux/Actions/hotshotActions';
import UploadDocuments from '../../Components/UploadDocuments';
import { AppLogger } from '../../Theme/utils';
import { ApiConstants } from '../../Theme/ApiConstants';
import { io } from 'socket.io-client';
import Geolocation from 'react-native-geolocation-service';
import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { calculateTimeDurationAndDistance2 } from '../../Theme/GoogleApi';
import moment from 'moment';
import AddSignatureModal from '../../Modals/AddSignatureModal';
import { SocketManager, socket } from '../../Components/SocketManager';
import { AppConstants } from '../../Theme/AppConstants';

// let socket: any;
let connected;
let connecting;

export default function PastJobDetails({ navigation, route }: any): React.JSX.Element {
    const toast = useToast()
    const dispatch = useDispatch()

    const [showCancelHotshotModal, setShowCancelHotshotModal] = useState<boolean>(false)
    const [showValidationModal, setShowValidationModal] = useState<boolean>(false)
    const [alertTitle, setAlertTitle] = useState<string>('')
    const [showImageModal, setShowImageModal] = useState<boolean>(false)
    const [currentLocation, setCurrentLocation] = useState<any>({
        latitude: null,
        longitude: null,
        formattedAddress: ''
    })
    const [currentRouteIndex, setCurrentRouteIndex] = useState(0)            // driver is on first location or second or so on
    const [jobItem, setJobItem] = useState<any>({})
    const [locationData, setLocationData] = useState<any[]>([])     // merged both pick and drop array to show the bottom route status
    const [signature, setSignature] = useState<any>()
    const [isLoaderShown, setIsLoaderShown] = useState<boolean>(false)


    const jobItemRef = useRef(jobItem);

    const { item } = route?.params
    // console.log("route.params in past jobdetails screen", JSON.stringify(item))

    const driverPickupLocation = item?.pickup_location ? item?.pickup_location : `${item?.pickup_address_1} ${item?.pickup_address_2} ${item?.pickup_city} ${item?.pickup_state} ${item?.pickup_zip}`
    const driverDropLocation = item?.dopoff_location ? item?.dopoff_location : `${item?.dopoff_address_1} ${item?.dopoff_address_2} ${item?.dopoff_city} ${item?.dopoff_state} ${item?.dopoff_zip}`
    const userPickupLocation = (item?.userHotSot.length > 0 && item?.userHotSot[0]?.user_pickup_location) ? item?.userHotSot[0]?.user_pickup_location : (item?.userHotSot.length > 0 && item?.userHotSot[0]?.user_pickup_address_1) ? `${item?.userHotSot[0]?.user_pickup_address_1} ${item?.userHotSot[0]?.user_pickup_address_2} ${item?.userHotSot[0]?.user_pickup_city} ${item?.userHotSot[0]?.user_pickup_state} ${item?.userHotSot[0]?.user_pickup_zip}` : ''
    const userDropLocation = (item?.userHotSot.length > 0 && item?.userHotSot[0]?.user_dopoff_location) ? item?.userHotSot[0]?.user_dopoff_location : (item?.userHotSot.length > 0 && item?.userHotSot[0]?.user_dopoff_address_1) ? `${item?.userHotSot[0]?.user_dopoff_address_1} ${item?.userHotSot[0]?.user_dopoff_address_2} ${item?.userHotSot[0]?.user_dopoff_city} ${item?.userHotSot[0]?.user_dopoff_state} ${item?.userHotSot[0]?.user_dopoff_zip}` : ''
    const pickupItem = `${item?.userHotSot[0]?.pickup_item_count} ${item?.userHotSot[0]?.pickup_item}`
    const dropOffItem = `${item?.userHotSot[0]?.dropoff_item_count} ${item?.userHotSot[0]?.dropoff_item}`

    const accessToken = useSelector((state: any) => state?.persistedReducer.userData.userToken);
    const profileDetails = useSelector((state: any) => state?.persistedReducer.userData.profileDetails);
    const isLoading = useSelector((state: any) => state?.persistedReducer.hotshotListData.isLoading)
    const errorMessage = useSelector((state: any) => state.persistedReducer.hotshotListData.error);
    const cancelHotshotResponse = useSelector((state: any) => state.persistedReducer.hotshotListData.cancelHotshotResponse);
    const finishHotshotResponse = useSelector((state: any) => state.persistedReducer.hotshotListData.finishHotshotResponse);
    const hotshotList = useSelector((state: any) => state.persistedReducer.hotshotListData.pastHotshotList);



    useEffect(() => {
        if (!isLoading && finishHotshotResponse && Object.keys(finishHotshotResponse).length !== 0) {
            setShowValidationModal(true)
            setAlertTitle(StringConstants.HOTSHOT_FINISHED_SUCCESSFULLY)
        }
    }, [finishHotshotResponse])

    useEffect(() => {
        if (!isLoading && cancelHotshotResponse) {
            setShowValidationModal(true)
            setAlertTitle(StringConstants.HOTSHOT_CANCELLED_SUCCESSFULLY)
        }


        return () => { dispatch(clearHotshotResponse('cancelHotshotResponse')) }
    }, [cancelHotshotResponse])


    useEffect(() => {

        if (errorMessage != null && !isLoading) {
            setShowValidationModal(true)
            setAlertTitle(`${errorMessage}`)

        } else if (errorMessage == null) {
            setShowValidationModal(false)
            setAlertTitle('')
        }
    }, [errorMessage])


    //to get the updated jobitem from the api 
    useEffect(() => {
        if (item && hotshotList) {
            let body = {
                hotsot_id: item._id
            }
            dispatch(hotshotDetailsAction(accessToken, body, 'hotshotList'))
        }
    }, [item]);


    // to set the jobItem after searching it in the jobList
    useEffect(() => {
        if (item && hotshotList && !isLoading) {


            //in the hotshot list, find the particular item by comparing hotshot id with item id 
            const tempItem = hotshotList.find((hotshot: any) => {
                return hotshot._id === item?._id
            });
            // const tempItem = hotshotList.find((hotshot: any) => hotshot._id === item?._id);            

            if (tempItem) {
                setJobItem(tempItem)
            }
        }
    }, [hotshotList])




    useEffect(() => {
        console.log("jobItem in useEffect=>", JSON.stringify(jobItem));
        jobItemRef.current = jobItem;

        if (jobItem?._id) {
            const tempArr = [...jobItem?.userHotSot];

            if (tempArr[0]?.pickup_collected == null || tempArr[0]?.pickup_collected == false) {
                setCurrentRouteIndex(0)
            } else {
                setCurrentRouteIndex(1)
            }

            setLocationData(tempArr);
        }

    }, [jobItem]);







    useEffect(() => {
        // Add event listeners here if needed
        socket.on('message', (data: any) => {
            console.log('called message sockets in job details:', data);
            updateLocationData(JSON.parse(data))
        });

        return () => {
            // Remove event listeners if needed
            socket.removeAllListeners();
        };
    }, []);


    const updateLocationData = (data: any) => {
        setIsLoaderShown(false)

        const socketData = data?.data[0]
        const { _id } = socketData

        if (_id === jobItemRef.current?._id) {
            setJobItem(data?.data[0])

        } else {
            AppLogger("hotshot id does not match");
        }

    }







    const delieveryDate = new Date(jobItem?.createdAt);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    const getJobDetails = () => {
        return [
            { title: StringConstants.VEHICLE, value: jobItem?.vehicle },
            { title: StringConstants.DELIVERY_DATE, value: delieveryDate.toLocaleDateString('en-US', options) },
            { title: StringConstants.TIME, value: jobItem?.time },
            { title: StringConstants.PRICE, value: '£' + jobItem?.amount },
        ]
    }

    const getUserJobDetails = () => {
        return [
            { title: StringConstants.VEHICLE, value: jobItem?.vehicle },
            { title: StringConstants.PHONE_NUMBER, value: jobItem?.userHotSot[0]?.user_phone_number },
            { title: StringConstants.DELIVERY_DATE, value: delieveryDate.toLocaleDateString('en-US', options) },
            { title: StringConstants.TIME, value: jobItem?.time },
            { title: StringConstants.PRICE, value: '£' + jobItem?.userHotSot[0]?.driver_amount },
        ]
    }

    const getPickUpData = () => {
        return [
            // { title: StringConstants.ADDRESS, value: StringConstants.ITEM, showIcon: false },
            { title: driverPickupLocation, value: '(Pick)', showIcon: false },
        ]
    }

    const getDropData = () => {
        return [
            // { title: StringConstants.ADDRESS, value: StringConstants.ITEM, showIcon: false },
            { title: driverDropLocation, value: '(Drop)', showIcon: false },
        ]
    }

    const getPickUpAssignedData = () => {
        return [
            // { title: StringConstants.ADDRESS, value: StringConstants.ITEM, showIcon: false },
            {
                title: userPickupLocation,
                value: pickupItem,
                showIcon: jobItem?.userHotSot[0]?.pickup_item_note !== '' ? true : false,
                note: jobItem?.userHotSot[0]?.pickup_item_note
            },
        ]
    }

    const getDropAssignedData = () => {
        return [
            // { title: StringConstants.ADDRESS, value: StringConstants.ITEM, showIcon: false },
            {
                title: userDropLocation,
                value: dropOffItem,
                showIcon: jobItem?.userHotSot[0]?.dropoff_item_note !== '' ? true : false,
                note: jobItem?.userHotSot[0]?.dropoff_item_note
            },
        ]
    }



    const tapOnIIconPick = () => {
        toast.show(`Goods collected`, {
            placement: "bottom",
            duration: 500,
            animationType: "slide-in",
        });
    }

    const tapOnIIconDrop = () => {
        toast.show(`Goods dropped off`, {
            placement: "bottom",
            duration: 500,
            animationType: "slide-in",
        });
    }

    const openPdf = (docUrl: string) => {
        Linking.openURL(docUrl)
            .then(supported => {
                if (!supported) {
                    console.log('Opening PDF link in browser is not supported');
                }
            })
            .catch((error) => console.log('Error opening PDF link in JobdetailsUnassigned:', error));
    }

    const makePhoneCall = () => {
        Linking.openURL('tel:' + `${jobItem?.userHotSot[0]?.user_phone_number}`);
    };



    const sendSMS = () => {
        navigation.navigate(AppConstants.screens.CHAT_SCREEN, { item })
    }



    const tapOnViewSignature = () => {
        setShowImageModal(true)
        setSignature(locationData[0]?.signature)
    }

    const tapOnCancelHotshotYes = async () => {

        setShowCancelHotshotModal(false)
        let body = {
            hotsot_id: jobItem?._id
        }
        await dispatch(cancelHotshotAction(accessToken, body))
    }





    const formattedDate = (date: any) => {
        const dates = moment(date).format("hh:mm a DD/MM/YYYY")
        return dates
    }

    const getProfileImage = () => {
        if (item?.userHotSot?.length === 0) {
            if (profileDetails?.photo) {
                return { uri: profileDetails?.photo }
            } else {
                return Images.IC_PICKER
            }
        } else {
            if (item?.users[0]?.photo !== null && item?.users?.photo !== null) {
                return { uri: item?.users[0]?.photo || item?.users?.photo }
            } else {
                return Images.IC_PICKER
            }
        }
    }

    const getName = () => {
        if (item?.userHotSot?.length === 0) {
            return capitalizeFirstLetter(profileDetails?.full_name)
        }
        else {
            return capitalizeFirstLetter(item?.users[0]?.full_name) || capitalizeFirstLetter(item?.users?.full_name)
        }
    }



    return (
        <View style={styles.rootContainer}>
            {isLoading &&
                <LoaderModal showModal={isLoading} />
            }
            {(isLoaderShown) && <LoaderModal showModal={isLoading} />}

            {showImageModal &&
                <ImageModal
                    image={signature}
                    showModal={showImageModal}
                    hideModal={() => {
                        setShowImageModal(false)
                    }}
                />
            }
            {showCancelHotshotModal &&
                <ConfirmationModal
                    showModal={showCancelHotshotModal}
                    hideModal={() => setShowCancelHotshotModal(false)}
                    tapOnConfirm={tapOnCancelHotshotYes}
                    title={StringConstants.CANCEL_HOTSHOT_WARNING}
                    tapOnNo={() => setShowCancelHotshotModal(false)}
                />
            }
            {showValidationModal &&
                <ValidationModal
                    showModal={showValidationModal}
                    hideModal={() => {
                        if (alertTitle == StringConstants.HOTSHOT_CANCELLED_SUCCESSFULLY) {
                            setShowValidationModal(false)
                            setAlertTitle('')
                            dispatch(clearHotshotResponse('cancelHotshotResponse'))
                            navigation.goBack()
                        }
                        else if (alertTitle == StringConstants.HOTSHOT_FINISHED_SUCCESSFULLY) {
                            setShowValidationModal(false)
                            setAlertTitle('')
                            dispatch(clearHotshotResponse('finishHotshotResponse'))
                            navigation.goBack()
                        }
                        else {
                            dispatch(clearHotshotResponse('error'));
                            setShowValidationModal(false)
                            setAlertTitle('')
                        }
                    }}
                    title={alertTitle}
                />
            }
            <Header tapOnBack={() => navigation.goBack()}
                headerText={StringConstants.JOB_DETAIL}
            />



            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={styles.profileImage}
                        source={getProfileImage()} />
                    <Text style={styles.driverName}>{getName()}</Text>
                </View>
                {jobItem?.userHotSot?.length > 0 && jobItem?.is_finished === false &&
                    <View style={styles.rightIconsView}>
                        <TouchableOpacity onPress={makePhoneCall}>
                            <Image source={Images.IC_CALL_CIRCULAR} style={[styles.rightIcon, { marginRight: 10 }]} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={sendSMS}>
                            <Image source={Images.IC_MESSAGE_CIRCULAR} style={styles.rightIcon} />
                        </TouchableOpacity>
                    </View>}
            </View>

            <View style={styles.horizontalLine} />

            <SocketManager url={ApiConstants.MEDIA_BASE_URL}>
                <KeyboardAwareScrollView
                    bounces={false}
                    onScrollBeginDrag={() => Keyboard.dismiss()}
                    showsVerticalScrollIndicator={false}
                >

                    {jobItem?.userHotSot?.length > 0 ? <JobDetailsList title={StringConstants.JOB_DETAIL} data={getUserJobDetails()} /> :
                        <JobDetailsList title={StringConstants.JOB_DETAIL} data={getJobDetails()} />
                    }
                    <JobDetailsList title={StringConstants.CAN_COLLECT_NEAR} data={getPickUpData()} showItemDetails={true} />
                    <JobDetailsList title={StringConstants.DRIVER_RETURNING_TO} data={getDropData()} showItemDetails={true} />
                    {jobItem?.userHotSot?.length > 0 && <JobDetailsList title={StringConstants.USER_PICKUP_INFORMATION} data={getPickUpAssignedData()} showItemDetails={true} />}
                    {jobItem?.userHotSot?.length > 0 && <JobDetailsList title={StringConstants.USER_DROP_OFF_INFORMATION} data={getDropAssignedData()} showItemDetails={true} />}

                    {(jobItem?.userHotSot?.length > 0 && jobItem?.userHotSot[0]?.document?.length > 0) &&
                        <View>
                            <View style={[styles.detailsView, { marginBottom: 5 }]}>
                                <View style={styles.topView}>
                                    <Text style={styles.detailText}>
                                        {StringConstants.DOCUMENTS}
                                    </Text>
                                </View>
                            </View>
                            {jobItem?.userHotSot[0]?.document?.map((item: any, i: number) => {
                                const pdfName = item.split('/').pop();
                                return (
                                    <UploadDocuments key={i}
                                        bottomText={StringConstants.TAP_TO_VIEW_THE_DOCUMENT}
                                        topText={pdfName || 'document.pdf'}
                                        onPress={() => openPdf(item)}
                                    />

                                )
                            })}
                        </View>}

                    {jobItem?.userHotSot?.length > 0 && jobItem?.userHotSot[0]?.notes &&
                        <View>
                            <View style={[styles.detailsView, { marginBottom: 5, marginTop: 25 }]}>
                                <View style={styles.topView}>
                                    <Text style={styles.detailText}>{StringConstants.NOTES}</Text>
                                </View>
                            </View>
                        </View>}

                    {jobItem?.userHotSot?.length > 0 && jobItem?.userHotSot[0]?.notes &&
                        <ScrollView nestedScrollEnabled style={styles.notesView} >
                            <Text style={styles.textNotes}>{jobItem?.userHotSot[0]?.notes}</Text>
                        </ScrollView>
                    }

                    {/* route status pick up location */}
                    {jobItem?.userHotSot?.length > 0 &&
                        <View>
                            <Text style={[styles.routeStatusText, { marginBottom: 25 }]}>{StringConstants.ROUTE_STATUS}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.circleLineView}>
                                    <Image style={styles.circleLeftIcon}
                                        source={locationData[0]?.pickup_startTime ? Images.IC_GREEN_CIRCLE : Images.IC_GREY_CIRCLE}
                                    />
                                    <View style={styles.dottedLineView}>
                                        <Image source={Images.IC_DOT_LINE} style={
                                            { tintColor: locationData[0]?.pickup_startTime ? Colors.GREEN : Colors.DARK_GREY, alignSelf: 'center' }} />
                                    </View>
                                </View>

                                <View style={{ flex: 1 }}>
                                    <Text style={[styles.textInsideBlack, { marginLeft: 5, color: locationData[0]?.pickup_startTime ? Colors.GREEN : Colors.BLACK }]}>
                                        {`Job Started at ${locationData[0]?.pickup_startTime ? formattedDate(locationData[0]?.pickup_startTime) : ''}`}

                                    </Text>
                                </View>
                            </View>


                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.circleLineView}>
                                    <Image style={styles.circleLeftIcon}
                                        source={locationData[0]?.pickup_startTime ? Images.IC_GREEN_CIRCLE : Images.IC_GREY_CIRCLE}
                                    />
                                    <View style={styles.dottedLineView}>
                                        <Image source={Images.IC_DOT_LINE} style={[styles.verticalDotLine,
                                        { tintColor: locationData[0]?.pickup_startTime ? Colors.GREEN : Colors.DARK_GREY }
                                        ]}
                                        />
                                    </View>
                                </View>

                                <View style={{ flex: 1 }}>
                                    <Text style={[styles.textInsideBlack, { marginLeft: 5, color: locationData[0]?.pickup_startTime ? Colors.GREEN : Colors.BLACK }]}>
                                        {`On Route to Pickup location`}
                                        <Text style={{ fontFamily: Fonts.DM_SANS_SEMIBOLD }}> {userPickupLocation}</Text>
                                    </Text>
                                    <Text style={[styles.textAdress, { marginStart: 6 }]}>{locationData[0]?.pickup_startTime ? `At: ${formattedDate(locationData[0]?.pickup_startTime)}` : ""}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.circleLineView}>
                                    <Image style={styles.circleLeftIcon}
                                        source={locationData[0]?.pickup_reached_at_location ? Images.IC_GREEN_CIRCLE : Images.IC_GREY_CIRCLE}
                                    />
                                    <View style={styles.dottedLineView}>
                                        <Image source={Images.IC_DOT_LINE} style={[styles.verticalDotLine,
                                        { tintColor: locationData[0]?.pickup_reached_at_location ? Colors.GREEN : Colors.DARK_GREY }
                                        ]} />
                                    </View>
                                </View>

                                <View style={{ flex: 1 }}>
                                    <Text style={[styles.textInsideBlack, { marginLeft: 5, color: locationData[0]?.pickup_reached_at_location ? Colors.GREEN : Colors.BLACK }]}>
                                        {`Arrived at Pickup location`}
                                        <Text style={{ fontFamily: Fonts.DM_SANS_SEMIBOLD }}> {userPickupLocation}</Text>
                                    </Text>

                                    <Text style={[styles.textAdress, { marginStart: 6 }]}>{locationData[0]?.pickup_reachTime ? `At: ${formattedDate(locationData[0]?.pickup_reachTime)}` : locationData[0]?.pickup_estimateReachTime ? `ETA: ${locationData[0]?.pickup_estimateReachTime}` : ""}</Text>
                                </View>
                            </View>


                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.circleLineView}>
                                    <Image style={styles.circleLeftIcon}
                                        source={locationData[0]?.pickup_collected ? Images.IC_GREEN_CIRCLE : Images.IC_GREY_CIRCLE}
                                    />
                                </View>

                                <View style={{ flex: 1 }}>
                                    <Text style={[styles.textInsideBlack, { marginLeft: 5, color: locationData[0]?.pickup_collected ? Colors.GREEN : Colors.BLACK }]}>
                                        {`Goods Collected from `}
                                        <Text style={{ fontFamily: Fonts.DM_SANS_SEMIBOLD }}>{userPickupLocation}</Text>
                                    </Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <Text style={styles.itemsCount}>{pickupItem}</Text>
                                <Pressable style={{ justifyContent: 'center' }} onPress={() => tapOnIIconPick()}>
                                    <Image source={Images.IC_I_ICON} style={{ height: 20, width: 20 }} />
                                </Pressable>
                            </View>
                            <Text style={[styles.textAdress, { marginStart: 45, marginTop: -2, marginBottom: 40 }]}>{locationData[0]?.pickup_collectedTime ? `At: ${formattedDate(locationData[0]?.pickup_collectedTime)}` : ""}</Text>
                            <View style={[styles.horizontalBottomLine, { marginTop: -20 }]} />
                        </View>}

                    {/* route status drop off location */}
                    {jobItem?.userHotSot?.length > 0 &&
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.circleLineView}>
                                    <Image style={styles.circleLeftIcon}
                                        source={locationData[0]?.dopoff_startTime ? Images.IC_GREEN_CIRCLE : Images.IC_GREY_CIRCLE}
                                    />
                                    <View style={styles.dottedLineView}>
                                        <Image source={Images.IC_DOT_LINE} style={[styles.verticalDotLine,
                                        { tintColor: locationData[0]?.dopoff_startTime ? Colors.GREEN : Colors.DARK_GREY }
                                        ]}
                                        />
                                    </View>
                                </View>

                                <View style={{ flex: 1 }}>
                                    <Text style={[styles.textInsideBlack, { marginLeft: 5, color: locationData[0]?.dopoff_startTime ? Colors.GREEN : Colors.BLACK }]}>
                                        {`On Route to Drop-Off location`}
                                        <Text style={{ fontFamily: Fonts.DM_SANS_SEMIBOLD }}> {userDropLocation}</Text>
                                    </Text>
                                    <Text style={[styles.textAdress, { marginStart: 6 }]}>{locationData[0]?.dopoff_startTime ? `At: ${formattedDate(locationData[0]?.dopoff_startTime)}` : ""}</Text>
                                </View>
                            </View>





                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.circleLineView}>
                                    <Image style={styles.circleLeftIcon}
                                        source={locationData[0]?.dopoff_reached_at_location ? Images.IC_GREEN_CIRCLE : Images.IC_GREY_CIRCLE}
                                    />
                                    <View style={styles.dottedLineView}>
                                        <Image source={Images.IC_DOT_LINE} style={[styles.verticalDotLine,
                                        { tintColor: locationData[0]?.dopoff_reached_at_location ? Colors.GREEN : Colors.DARK_GREY }
                                        ]} />
                                    </View>
                                </View>

                                <View style={{ flex: 1 }}>
                                    <Text style={[styles.textInsideBlack, { marginLeft: 5, color: locationData[0]?.dopoff_reached_at_location ? Colors.GREEN : Colors.BLACK }]}>
                                        {`Arrived at Drop-off location`}
                                        <Text style={{ fontFamily: Fonts.DM_SANS_SEMIBOLD }}> {userDropLocation}</Text>
                                    </Text>

                                    <Text style={[styles.textAdress, { marginStart: 6 }]}>{locationData[0]?.dopoff_reachTime ? `At: ${formattedDate(locationData[0]?.dopoff_reachTime)}` : locationData[0]?.dopoff_estimateReachTime ? `ETA: ${locationData[0]?.dopoff_estimateReachTime}` : ""}</Text>
                                </View>
                            </View>



                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.circleLineView}>
                                    <Image style={styles.circleLeftIcon}
                                        source={locationData[0]?.delivered_time ? Images.IC_GREEN_CIRCLE : Images.IC_GREY_CIRCLE}
                                    />
                                </View>

                                <View style={{ flex: 1 }}>
                                    <Text style={[styles.textInsideBlack, { marginLeft: 5, color: locationData[0]?.delivered_time ? Colors.GREEN : Colors.BLACK }]}>
                                        {`Goods Dropped at `}
                                        <Text style={{ fontFamily: Fonts.DM_SANS_SEMIBOLD }}>{userDropLocation}</Text>
                                    </Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <Text style={styles.itemsCount}>{pickupItem}</Text>
                                <Pressable style={{ justifyContent: 'center' }} onPress={() => tapOnIIconDrop()}>
                                    <Image source={Images.IC_I_ICON} style={{ height: 20, width: 20 }} />
                                </Pressable>
                            </View>
                            <Text style={[styles.textAdress, { marginStart: 45, marginTop: -2, marginBottom: 40 }]}>{locationData[0]?.delivered_time ? `At: ${formattedDate(locationData[0]?.delivered_time)}` : ""}</Text>


                            {locationData[0]?.signature &&
                                <TouchableOpacity style={styles.viewSignature} onPress={() => tapOnViewSignature()}>
                                    <Text style={styles.viewSignatureText}>{StringConstants.VIEW_SIGNATURE}</Text>
                                </TouchableOpacity>}
                        </View>}

                    <View style={styles.bottomView}>
                        <Image source={Images.IC_GREEN_TICK} style={{ height: 18, width: 18 }} />
                        <Text style={[styles.completedJobText, { color: Colors.GREEN, marginTop: 0 }]}>{StringConstants.COMPLETED_HOTSHOT} </Text>
                    </View>

                </KeyboardAwareScrollView>
            </SocketManager>
        </View>
    )
}