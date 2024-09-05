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
import { cancelHotshotAction, finishHotshotAction, getProposalsCountAction, hotshotDetailsAction } from '../../Redux/Actions/hotshotActions';
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

export default function JobDetails({ navigation, route }: any): React.JSX.Element {
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
    const [showSignModal, setShowSignModal] = useState<boolean>(false)
    const [signature, setSignature] = useState<any>()
    const [isLoaderShown, setIsLoaderShown] = useState<boolean>(false)
    const [userHotshotIndex, setUserHotshotIndex] = useState<number>(-1)
    const [isHired, setIsHired] = useState<boolean>(false)

    const jobItemRef = useRef(jobItem);

    const { item } = route?.params
    console.log("route.params in jobdetails screen", JSON.stringify(item))

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
    const hotshotList = useSelector((state: any) => state.persistedReducer.hotshotListData.hotshotList);
    const proposalsCount = useSelector((state: any) => state.persistedReducer.hotshotListData.proposalsCount);


    // console.log("proposalsCount in jobdetails", JSON.stringify(proposalsCount));


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

    useEffect(() => {
        findAcceptedUserHotSot()
    }, [item])


    const findAcceptedUserHotSot = () => {
        // Find the index of the userHotSot object where isAccept is true
        const index = item?.userHotSot?.findIndex((userHotshot: any) => userHotshot.isAccept === true);
        console.log("index in findAcceptedUserHotSot", index);

        setUserHotshotIndex(index)
        if (index > -1) {
            setIsHired(true)
        } else {
            setIsHired(false)
        }

    };


    //to get the updated jobitem from the api 
    useEffect(() => {
        if (item && hotshotList) {
            let body = {
                hotsot_id: item._id
            }
            dispatch(hotshotDetailsAction(accessToken, body, 'hotshotList'))
        }

        if (item) {
            let body = {
                hotshot_id: item._id
            }
            dispatch(getProposalsCountAction(accessToken, body))
        }
    }, [item]);



    // to set the jobItem after searching it in the jobList
    useEffect(() => {
        if (item && hotshotList && !isLoading) {

            //in the hotshot list, find the particular item by comparing hotshot id with item id 
            const tempItem = hotshotList.find((hotshot: any) => hotshot._id === item?._id);

            if (tempItem) {
                setJobItem(tempItem)
            }
        }
    }, [hotshotList])


    useEffect(() => {
        // console.log("jobItem in useEffect=>", JSON.stringify(jobItem));
        jobItemRef.current = jobItem;

        if (jobItem?._id) {
            const tempArr = [...jobItem?.userHotSot];

            if (tempArr[0]?.pickup?.pickup_collected == null || tempArr[0]?.pickup?.pickup_collected == false) {
                setCurrentRouteIndex(0)
            } else {
                setCurrentRouteIndex(1)
            }

            setLocationData(tempArr);
        }

    }, [jobItem]);



    useEffect(() => {

        if (item?.userHotSot?.length > 0) {
            if (Platform.OS == 'android') {
                requestLocationPermissionAndroid()
            } else {
                requestLocationPermissionIOS()
            }
        }

    }, [item])




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


    const tapOnUpdateLocation = async (signatureData?: any) => {

        setIsLoaderShown(true)

        let socketBody = {
            route: getRouteType(),
            driver_id: jobItem.createdBy,
            job_id: jobItem._id,
            is_hotshot: true,
            type: currentRouteIndex === 0 ? 'pick' : 'drop',
            location_name: getCurrentAddress(),
        }
        console.log("socketBody in JobDetails hotshot=>", socketBody);

        const todayDate = new Date()
        // const currentTime = moment(todayDate).format("hh:mm a DD/MM/YYYY")

        if (currentRouteIndex == 0) {
            switch (getRouteType()) {
                case 'en_route':
                    if (locationData[0]?.pickup?.pickup_en_route == false) {
                        const estimateTime = await calculateEstimationTime()
                        callSocketEvent({ ...socketBody, startTime: todayDate, estimateReachTime: estimateTime })
                        break
                    }
                    else
                        return;

                case 'reached_at_location':
                    if (locationData[0]?.pickup?.pickup_en_route == true && locationData[0]?.pickup?.pickup_reached_at_location == false) {
                        callSocketEvent({ ...socketBody, reachTime: todayDate })
                        break
                    }
                    else
                        return;

                case 'collected':
                    if (locationData[0]?.pickup?.pickup_en_route == true && locationData[0]?.pickup?.pickup_reached_at_location == true && locationData[0]?.pickup?.pickup_collected == false) {
                        callSocketEvent({ ...socketBody, collectedTime: todayDate })
                        break
                    }
                    else
                        return;

            }
        } else {

            switch (getRouteType()) {
                case 'en_route':

                    if (locationData[0]?.dropOff?.dopoff_en_route == false) {
                        const estimateTime = await calculateEstimationTime()
                        callSocketEvent({ ...socketBody, startTime: todayDate, estimateReachTime: estimateTime })
                        break
                    }
                    return

                case 'reached_at_location':

                    if (locationData[0]?.dropOff?.dopoff_en_route == true && locationData[0]?.dropOff?.dopoff_reached_at_location == false) {
                        callSocketEvent({ ...socketBody, reachTime: todayDate })
                        break
                    }
                    return

                case 'deliverd':
                    if (locationData[0]?.dropOff?.dopoff_en_route == true && locationData[0]?.dropOff?.dopoff_reached_at_location == true && locationData[0]?.is_delivered == false) {
                        if (signatureData) {
                            callSocketEvent({ ...socketBody, delivered_time: todayDate, signature: signatureData })
                            break
                        } else {
                            setShowSignModal(true)
                            break
                        }
                    }
                    else
                        return;

                case 'finished':
                    finishedHotshot()
            }
        }
    }


    const callSocketEvent = (body: any) => {
        console.log('body in callSocketEvent', body);

        try {
            socket.emit("message", body)
        } catch (error) {
            console.log("error while sending socket message", JSON.stringify(error));

        }

    }


    const getRouteType = () => {
        const routeStatus = getButtonTitle()


        switch (routeStatus) {
            case StringConstants.ARRIVED:
                return 'reached_at_location';

            case StringConstants.COLLECTED:
                return 'collected';

            case StringConstants.DELIEVERED:
                return 'deliverd';

            case StringConstants.FINISH_JOB:
                return 'finished'

            default:
                return 'en_route';
        }
    }


    //to get the button title

    const getButtonTitle = () => {

        if (locationData.length > 0) {
            if (currentRouteIndex === 0 && locationData[0]?.pickup?.pickup_startTime == null) {
                return StringConstants.START_JOB
            }
            else if (currentRouteIndex === 1 && locationData[0]?.dropOff?.dopoff_en_route == false) {
                return StringConstants.ON_ROUTE
            }
            else if (locationData[0]?.pickup?.pickup_reached_at_location == false) {
                return StringConstants.ARRIVED
            }
            else if (locationData[0]?.pickup?.pickup_collected == false) {
                return StringConstants.COLLECTED
            }
            else if (locationData[0]?.pickup?.pickup_collected == true && locationData[0]?.dropOff?.dopoff_reached_at_location == false) {
                return StringConstants.ARRIVED
            }
            else if (locationData[0]?.pickup?.pickup_collected == true && locationData[0]?.is_delivered == false) {
                return StringConstants.DELIEVERED
            }
            else if (currentRouteIndex === 1 && locationData[0]?.signature !== null) {
                return StringConstants.FINISH_JOB
            }
        }


    }

    const getCurrentAddress = () => {
        let currentLocationText = ""


        if (locationData.length > 0) {
            if (currentRouteIndex == 0) {
                currentLocationText = locationData[0]?.pickup?.pickup_location ? locationData[0]?.pickup?.pickup_location : `${locationData[0]?.pickup?.pickup_address_1} ${locationData[0]?.pickup?.pickup_address_2} ${locationData[0]?.pickup?.pickup_city} ${locationData[0]?.pickup?.pickup_state}`
            } else {
                currentLocationText = locationData[0]?.dropOff?.dopoff_location ? locationData[0]?.dropOff?.dopoff_location : `${locationData[0]?.dropOff?.dopoff_address_1} ${locationData[0]?.dropOff?.dopoff_address_2} ${locationData[0]?.dropOff?.dopoff_city} ${locationData[0]?.dropOff?.dopoff_state}`

            }
        }
        return currentLocationText
    }

    const calculateEstimationTime = async () => {
        // let origin
        // let destination
        let originLat
        let originLng
        let destinationLat
        let destinationLng

        if (currentRouteIndex == 0) {
            // origin = currentLocation.formattedAddress;
            // destination = locationData[0]?.pickup?.pickup_location || (locationData[0]?.pickup?.pickup_address_1 + locationData[0]?.pickup?.pickup_address_2 + locationData[0]?.pickup?.pickup_city + locationData[0]?.pickup?.pickup_state)
            originLat = currentLocation.latitude
            originLng = currentLocation.longitude
            destinationLat = locationData[0]?.pick_up_latitude
            destinationLng = locationData[0]?.pick_up_longitude

        } else {
            // origin = locationData[0]?.pickup?.pickup_location || (locationData[0]?.pickup?.pickup_address_1 + locationData[0]?.pickup?.pickup_address_2 + locationData[0]?.pickup?.pickup_city + locationData[0]?.pickup?.pickup_state)
            // destination = locationData[0]?.dropOff?.dopoff_location || (locationData[0]?.dropOff?.dopoff_address_1 + locationData[0]?.dropOff?.dopoff_address_2 + locationData[0]?.dropOff?.dopoff_city + locationData[0]?.dropOff?.dopoff_state)

            originLat = locationData[0]?.pick_up_latitude
            originLng = locationData[0]?.pick_up_longitude
            destinationLat = locationData[0]?.drop_off_latitude
            destinationLng = locationData[0]?.drop_off_longitude
        }

        const { duration, distance } = await calculateTimeDurationAndDistance2(originLat, originLng, destinationLat, destinationLng);
        // const { duration, distance } = await calculateTimeDurationAndDistance(origin, destination);

        let totalTime
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        if (hours > 0) {
            totalTime = `${hours} hours ${minutes} minutes`

        } else {
            totalTime = `${minutes} minutes`
        }
        return totalTime

    }



    const requestLocationPermissionAndroid = async () => {

        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,

            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                AppLogger('Location permission granted in android');

                Geolocation.getCurrentPosition(
                    (position) => {

                        const { latitude, longitude } = position.coords;

                        getAddressFromCordinates(latitude, longitude)

                    },
                    (error) => AppLogger('Error getting location Android:', error),
                    { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 },
                );
            } else {
                AppLogger('Location permission denied in android');
            }
        } catch (err) {
            AppLogger('err in catch requestLocationPermissionAndroid=> ', err);
        }
    }

    const requestLocationPermissionIOS = async () => {
        try {
            const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);


            if (result === RESULTS.GRANTED) {
                Geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;

                        getAddressFromCordinates(latitude, longitude)

                    },
                    (error) => {
                        AppLogger('Error getting location IOS:', error);
                    },
                    { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 }
                );
            } else {
                AppLogger('Location permission denied in IOS');
            }
        } catch (err) {
            AppLogger('Error requesting location permission IOS:', err);
        }
    };

    const getAddressFromCordinates = async (latitude: number, longitude: number) => {

        const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyD18in84QdXIsB25ms_snw1C-xxTkQsDd8`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.status === 'OK' && data.results.length > 0) {
                setCurrentLocation({
                    latitude,
                    longitude,
                    formattedAddress: data?.results[0]?.formatted_address
                })

            } else {
                throw new Error('No address found for the given coordinates');
            }
        } catch (error) {
            throw error;
        }

    }

    const tapOnButton = () => {
        setShowCancelHotshotModal(true)
    }

    const delieveryDate = new Date(jobItem?.createdAt);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    const getJobDetails = () => {
        return [
            { title: StringConstants.VEHICLE, value: capitalizeFirstLetter(jobItem?.vehicle) },
            { title: StringConstants.DELIVERY_DATE, value: delieveryDate.toLocaleDateString('en-US', options) },
            { title: StringConstants.TIME, value: jobItem?.time },
            { title: StringConstants.PRICE, value: '£' + jobItem?.driver_amount },
        ]
    }

    const getUserJobDetails = () => {
        return [
            { title: StringConstants.VEHICLE, value: capitalizeFirstLetter(jobItem?.vehicle) },
            { title: StringConstants.PHONE_NUMBER, value: jobItem?.userHotSot[userHotshotIndex]?.user_phone_number },
            { title: StringConstants.DELIVERY_DATE, value: delieveryDate.toLocaleDateString('en-US', options) },
            { title: StringConstants.TIME, value: jobItem?.time },
            { title: StringConstants.PRICE, value: '£' + jobItem?.userHotSot[userHotshotIndex]?.driver_amount },
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

    const tapOnIIcon = (item: any, index: number) => {
        if (index == 0) {

            toast.show(`Goods collected`, {
                placement: "bottom",
                duration: 500,
                animationType: "slide-in",
            });
        } else {
            toast.show(`Goods dropped off`, {
                placement: "bottom",
                duration: 500,
                animationType: "slide-in",
            });
        }
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

    const finishedHotshot = async () => {
        let body = {
            hotsot_id: jobItem?._id
        }
        await dispatch(finishHotshotAction(accessToken, body))
    }

    const tapOnConfirmSign = (signatureData: any) => {
        setShowSignModal(false)
        tapOnUpdateLocation(signatureData)
    }

    const formattedDate = (date: any) => {
        const dates = moment(date).format("hh:mm a DD/MM/YYYY")
        return dates
    }

    // const getProfileImage = () => {
    //     if (item?.userHotSot?.length === 0) {
    //         if (profileDetails?.photo) {
    //             return { uri: profileDetails?.photo }
    //         } else {
    //             return Images.IC_PICKER
    //         }
    //     } else {
    //         if (item?.users[0]?.photo !== null && item?.users?.photo !== null) {
    //             return { uri: item?.users[0]?.photo || item?.users?.photo }
    //         } else {
    //             return Images.IC_PICKER
    //         }
    //     }
    // }

    // const getName = () => {
    //     if (item?.userHotSot?.length === 0) {
    //         return capitalizeFirstLetter(profileDetails?.full_name)
    //     }
    //     else {
    //         return capitalizeFirstLetter(item?.users[0]?.full_name) || capitalizeFirstLetter(item?.users?.full_name)
    //     }
    // }

    const tapOnProposals = () => {
        navigation.navigate(AppConstants.screens.PROPOSAL_SCREEN, { hotshotId: jobItem?._id })
    }


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


    return (
        <View style={styles.rootContainer}>
            {isLoading &&
                <LoaderModal showModal={isLoading} />
            }
            {(isLoaderShown) && <LoaderModal showModal={isLoading} />}
            {showSignModal &&
                <AddSignatureModal
                    showModal={showSignModal}
                    hideModal={() => {
                        console.log("In hide modal AddSignatureModal");
                        setShowSignModal(false)
                        setIsLoaderShown(false)

                    }}
                    tapOnConfirm={(signatureData: any) => { tapOnConfirmSign(signatureData) }}
                />
            }
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

            {/* {(jobItem?.userHotSot?.length > 0 && jobItem?.is_finished === false) &&
                <LocationView buttonTitle={getButtonTitle()}
                    address={getCurrentAddress()}
                    tapOnButton={() => tapOnUpdateLocation()}
                />
            } */}

            {isHired &&
                item?.is_finished === false && locationData[0]?.signature == null && 
                <LocationView buttonTitle={getButtonTitle()}
                    address={getCurrentAddress()}
                    tapOnButton={() => tapOnUpdateLocation()}
                />
            }



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

                    {isHired ? <JobDetailsList title={StringConstants.JOB_DETAIL} data={getUserJobDetails()} /> :
                        <JobDetailsList title={StringConstants.JOB_DETAIL} data={getJobDetails()} />
                    }
                    <JobDetailsList title={StringConstants.CAN_COLLECT_NEAR} data={getPickUpData()} showItemDetails={true} />
                    <JobDetailsList title={StringConstants.DRIVER_RETURNING_TO} data={getDropData()} showItemDetails={true} />
                    {isHired && <JobDetailsList title={StringConstants.USER_PICKUP_INFORMATION} data={getPickUpAssignedData()} showItemDetails={true} />}
                    {isHired && <JobDetailsList title={StringConstants.USER_DROP_OFF_INFORMATION} data={getDropAssignedData()} showItemDetails={true} />}

                    {(isHired && jobItem?.userHotSot?.length > 0 && jobItem?.userHotSot[0]?.document?.length > 0) &&
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

                    {isHired && jobItem?.userHotSot?.length > 0 && jobItem?.userHotSot[0]?.notes &&
                        <View>
                            <View style={[styles.detailsView, { marginBottom: 5, marginTop: 25 }]}>
                                <View style={styles.topView}>
                                    <Text style={styles.detailText}>{StringConstants.NOTES}</Text>
                                </View>
                            </View>
                        </View>}

                    {isHired && jobItem?.userHotSot?.length > 0 && jobItem?.userHotSot[0]?.notes &&
                        <ScrollView nestedScrollEnabled style={styles.notesView} >
                            <Text style={styles.textNotes}>{jobItem?.userHotSot[0]?.notes}</Text>
                        </ScrollView>
                    }

                    {/* route status pick up location */}
                    {/* {jobItem?.userHotSot?.length > 0 && */}
                    {isHired &&
                        <View>
                            <Text style={[styles.routeStatusText, { marginBottom: 25 }]}>{StringConstants.ROUTE_STATUS}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.circleLineView}>
                                    <Image style={styles.circleLeftIcon}
                                        source={locationData[0]?.pickup?.pickup_startTime ? Images.IC_GREEN_CIRCLE : Images.IC_GREY_CIRCLE}
                                    />
                                    <View style={styles.dottedLineView}>
                                        <Image source={Images.IC_DOT_LINE} style={
                                            { tintColor: locationData[0]?.pickup?.pickup_startTime ? Colors.GREEN : Colors.DARK_GREY, alignSelf: 'center' }} />
                                    </View>
                                </View>

                                <View style={{ flex: 1 }}>
                                    <Text style={[styles.textInsideBlack, { marginLeft: 5, color: locationData[0]?.pickup?.pickup_startTime ? Colors.GREEN : Colors.BLACK }]}>
                                        {`Job Started at ${locationData[0]?.pickup?.pickup_startTime ? formattedDate(locationData[0]?.pickup?.pickup_startTime) : ''}`}

                                    </Text>
                                </View>
                            </View>


                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.circleLineView}>
                                    <Image style={styles.circleLeftIcon}
                                        source={locationData[0]?.pickup?.pickup_startTime ? Images.IC_GREEN_CIRCLE : Images.IC_GREY_CIRCLE}
                                    />
                                    <View style={styles.dottedLineView}>
                                        <Image source={Images.IC_DOT_LINE} style={[styles.verticalDotLine,
                                        { tintColor: locationData[0]?.pickup?.pickup_startTime ? Colors.GREEN : Colors.DARK_GREY }
                                        ]}
                                        />
                                    </View>
                                </View>

                                <View style={{ flex: 1 }}>
                                    <Text style={[styles.textInsideBlack, { marginLeft: 5, color: locationData[0]?.pickup?.pickup_startTime ? Colors.GREEN : Colors.BLACK }]}>
                                        {`On Route to Pickup location`}
                                        <Text style={{ fontFamily: Fonts.DM_SANS_SEMIBOLD }}> {userPickupLocation}</Text>
                                    </Text>
                                    <Text style={[styles.textAdress, { marginStart: 6 }]}>{locationData[0]?.pickup?.pickup_startTime ? `At: ${formattedDate(locationData[0]?.pickup?.pickup_startTime)}` : ""}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.circleLineView}>
                                    <Image style={styles.circleLeftIcon}
                                        source={locationData[0]?.pickup?.pickup_reached_at_location ? Images.IC_GREEN_CIRCLE : Images.IC_GREY_CIRCLE}
                                    />
                                    <View style={styles.dottedLineView}>
                                        <Image source={Images.IC_DOT_LINE} style={[styles.verticalDotLine,
                                        { tintColor: locationData[0]?.pickup?.pickup_reached_at_location ? Colors.GREEN : Colors.DARK_GREY }
                                        ]} />
                                    </View>
                                </View>

                                <View style={{ flex: 1 }}>
                                    <Text style={[styles.textInsideBlack, { marginLeft: 5, color: locationData[0]?.pickup?.pickup_reached_at_location ? Colors.GREEN : Colors.BLACK }]}>
                                        {`Arrived at Pickup location`}
                                        <Text style={{ fontFamily: Fonts.DM_SANS_SEMIBOLD }}> {userPickupLocation}</Text>
                                    </Text>

                                    <Text style={[styles.textAdress, { marginStart: 6 }]}>{locationData[0]?.pickup?.pickup_reachTime ? `At: ${formattedDate(locationData[0]?.pickup?.pickup_reachTime)}` : locationData[0]?.pickup?.pickup_estimateReachTime ? `ETA: ${locationData[0]?.pickup?.pickup_estimateReachTime}` : ""}</Text>
                                </View>
                            </View>


                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.circleLineView}>
                                    <Image style={styles.circleLeftIcon}
                                        source={locationData[0]?.pickup?.pickup_collected ? Images.IC_GREEN_CIRCLE : Images.IC_GREY_CIRCLE}
                                    />
                                </View>

                                <View style={{ flex: 1 }}>
                                    <Text style={[styles.textInsideBlack, { marginLeft: 5, color: locationData[0]?.pickup?.pickup_collected ? Colors.GREEN : Colors.BLACK }]}>
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
                            <Text style={[styles.textAdress, { marginStart: 45, marginTop: -2, marginBottom: 40 }]}>{locationData[0]?.pickup?.pickup_collectedTime ? `At: ${formattedDate(locationData[0]?.pickup?.pickup_collectedTime)}` : ""}</Text>
                            <View style={[styles.horizontalBottomLine, { marginTop: -20 }]} />
                        </View>}

                    {/* route status drop off location */}
                    {isHired &&
                        // {jobItem?.userHotSot?.length > 0 &&
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.circleLineView}>
                                    <Image style={styles.circleLeftIcon}
                                        source={locationData[0]?.dropOff?.dopoff_startTime ? Images.IC_GREEN_CIRCLE : Images.IC_GREY_CIRCLE}
                                    />
                                    <View style={styles.dottedLineView}>
                                        <Image source={Images.IC_DOT_LINE} style={[styles.verticalDotLine,
                                        { tintColor: locationData[0]?.dropOff?.dopoff_startTime ? Colors.GREEN : Colors.DARK_GREY }
                                        ]}
                                        />
                                    </View>
                                </View>

                                <View style={{ flex: 1 }}>
                                    <Text style={[styles.textInsideBlack, { marginLeft: 5, color: locationData[0]?.dropOff?.dopoff_startTime ? Colors.GREEN : Colors.BLACK }]}>
                                        {`On Route to Drop-Off location`}
                                        <Text style={{ fontFamily: Fonts.DM_SANS_SEMIBOLD }}> {userDropLocation}</Text>
                                    </Text>
                                    <Text style={[styles.textAdress, { marginStart: 6 }]}>{locationData[0]?.dropOff?.dopoff_startTime ? `At: ${formattedDate(locationData[0]?.dropOff?.dopoff_startTime)}` : ""}</Text>
                                </View>
                            </View>





                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.circleLineView}>
                                    <Image style={styles.circleLeftIcon}
                                        source={locationData[0]?.dropOff?.dopoff_reached_at_location ? Images.IC_GREEN_CIRCLE : Images.IC_GREY_CIRCLE}
                                    />
                                    <View style={styles.dottedLineView}>
                                        <Image source={Images.IC_DOT_LINE} style={[styles.verticalDotLine,
                                        { tintColor: locationData[0]?.dropOff?.dopoff_reached_at_location ? Colors.GREEN : Colors.DARK_GREY }
                                        ]} />
                                    </View>
                                </View>

                                <View style={{ flex: 1 }}>
                                    <Text style={[styles.textInsideBlack, { marginLeft: 5, color: locationData[0]?.dropOff?.dopoff_reached_at_location ? Colors.GREEN : Colors.BLACK }]}>
                                        {`Arrived at Drop-off location`}
                                        <Text style={{ fontFamily: Fonts.DM_SANS_SEMIBOLD }}> {userDropLocation}</Text>
                                    </Text>

                                    <Text style={[styles.textAdress, { marginStart: 6 }]}>{locationData[0]?.dropOff?.dopoff_reachTime ? `At: ${formattedDate(locationData[0]?.dropOff?.dopoff_reachTime)}` : locationData[0]?.dropOff?.dopoff_estimateReachTime ? `ETA: ${locationData[0]?.dropOff?.dopoff_estimateReachTime}` : ""}</Text>
                                </View>
                            </View>



                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.circleLineView}>
                                    <Image style={styles.circleLeftIcon}
                                        source={locationData[0]?.dropOff?.delivered_time ? Images.IC_GREEN_CIRCLE : Images.IC_GREY_CIRCLE}
                                    />
                                </View>

                                <View style={{ flex: 1 }}>
                                    <Text style={[styles.textInsideBlack, { marginLeft: 5, color: locationData[0]?.dropOff?.delivered_time ? Colors.GREEN : Colors.BLACK }]}>
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
                            <Text style={[styles.textAdress, { marginStart: 45, marginTop: -2, marginBottom: 40 }]}>{locationData[0]?.dropOff?.delivered_time ? `At: ${formattedDate(locationData[0]?.dropOff?.delivered_time)}` : ""}</Text>


                            {locationData[0]?.signature &&
                                <TouchableOpacity style={styles.viewSignature} onPress={() => tapOnViewSignature()}>
                                    <Text style={styles.viewSignatureText}>{StringConstants.VIEW_SIGNATURE}</Text>
                                </TouchableOpacity>}
                        </View>}




                    {!isHired &&
                        <Button primaryTitle={StringConstants.VIEW_PROPOSALS + ' (' + `${proposalsCount.length}` + ')'}
                            containerStyles={{ backgroundColor: Colors.GREEN, height: 43, marginBottom: -3 }}
                            onPress={tapOnProposals} />
                    }

                    {!isHired &&
                        <Button primaryTitle={StringConstants.CANCEL}
                            containerStyles={{ backgroundColor: Colors.ORANGE, height: 43 }}
                            onPress={tapOnButton} />
                    }

                    {/* { jobItem?.is_finished === false && jobItem?.userHotSot?.length === 0 &&
                        <Button primaryTitle={StringConstants.VIEW_PROPOSALS + '(' + `${proposalsCount.length}` + ')'}
                            containerStyles={{ backgroundColor: Colors.GREEN, height: 43, marginBottom: -3 }}
                            onPress={tapOnProposals} />
                    } */}

                    {/* {jobItem?.is_finished === false && jobItem?.userHotSot?.length === 0 &&
                        <Button primaryTitle={StringConstants.CANCEL}
                            containerStyles={{ backgroundColor: Colors.ORANGE, height: 43 }}
                            onPress={tapOnButton} />
                    } */}



                </KeyboardAwareScrollView>
            </SocketManager>
        </View>
    )
}