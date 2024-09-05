import { View, Text, Image, Pressable, Keyboard, Linking, Platform, TouchableOpacity, FlatList, ScrollView, Alert, PermissionsAndroid } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { styles } from './styles'
import { Images } from '../../Assets';
import { StringConstants } from '../../Theme/StringConstants';
import Header from '../../Components/Header';
import { Colors } from '../../Theme/Colors';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import UploadDocuments from '../../Components/UploadDocuments';
import { AppConstants } from '../../Theme/AppConstants';
import FinalBillsModal from '../../Modals/FinalBillsModal';
import { useToast } from 'react-native-toast-notifications';
import { useDispatch, useSelector } from 'react-redux';
import { completeJobAction, createBillAction, jobDetailAction } from '../../Redux/Actions/jobActions';
import ValidationModal from '../../Modals/ValidationModal';
import moment from 'moment';
import { ApiConstants } from '../../Theme/ApiConstants';
import { capitalizeFirstLetter, numberWithCommas } from '../../Theme/Helper';
import { io } from 'socket.io-client';
import JobDetailsList from '../../Components/JobDetailsList';
import LoaderModal from '../../Modals/LoaderModal';
import LocationView from '../../Components/LocationView';
import { Fonts } from '../../Theme/Fonts';
import { calculateTimeDurationAndDistance, calculateTimeDurationAndDistance2 } from '../../Theme/GoogleApi';

import Geolocation from 'react-native-geolocation-service';
import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import AddSignatureModal from '../../../src/Modals/AddSignatureModal';
import { clearJobsResponse } from '../../Redux/Reducers/jobListSlice';
import ConfirmationModal from '../../Modals/ConfirmationModal';
import { AppLogger } from '../../Theme/utils';
import ImageModal from '../../Modals/ImageModal';
import { SocketManager, socket } from '../../Components/SocketManager';

// let socket: any;
let connected;
let connecting;


export default function MyInJobs({ navigation, route }: any): React.JSX.Element {
    const toast = useToast()

    const dispatch = useDispatch()
    const { item } = route.params       //this is the job  i have send from the job listing screen that consist of the selected job details
    // console.log("item from paraams in myinjobs", JSON.stringify(item));


    //access token to be  send in the api
    const accessToken = useSelector((state: any) => state?.persistedReducer.userData.userToken);
    //is loading to check the api response and to show loader if required
    const isLoading = useSelector((state: any) => state?.persistedReducer.jobListData.isLoading)

    //job list is the list of jobs stored in the redux
    const jobsList = useSelector((state: any) => state.persistedReducer.jobListData.myInJobs);
    const completeJobData = useSelector((state: any) => state.persistedReducer.jobListData.completeJobData);
    const createBillData = useSelector((state: any) => state.persistedReducer.jobListData.createBillData);


    const errorMessage = useSelector((state: any) => state.persistedReducer.jobListData.error);

    //job item is the same  item from route.params. i want to update it when i enter the screen so updating it in useeffect
    const [jobItem, setJobItem] = useState<any>({})

    const [showBillModal, setShowBillModal] = useState<boolean>(false)
    const [additionalAmount, setAdditionalAmount] = useState<any>()
    const [note, setNote] = useState<any>()
    const [showValidationModal, setShowValidationModal] = useState<boolean>(false)
    const [alertTitle, setAlertTitle] = useState<string>('')
    const [isLoaderShown, setIsLoaderShown] = useState<boolean>(false)
    const [locationData, setLocationData] = useState<any[]>([])     // merged both pick and drop array to show the bottom route status
    const [currentRouteIndex, setCurrentRouteIndex] = useState(0)            // driver is on first location or second or so on
    const [currentLocation, setCurrentLocation] = useState<any>({
        latitude: null,
        longitude: null,
        formattedAddress: ''
    })
    const [showSignModal, setShowSignModal] = useState<boolean>(false)
    const [jobFinished, setJobFinished] = useState<boolean>(false)
    const [showHotshotModal, setShowHotshotModal] = useState<boolean>(false)
    const [showImageModal, setShowImageModal] = useState<boolean>(false)
    const [signature, setSignature] = useState<any>()
    const [shouldShowModal, setShouldShowModal] = useState(false);

    const jobItemRef = useRef(jobItem);

    // console.log('jobItem in myInjobs', JSON.stringify(jobItem));

    // Assuming 'dates' is a string in the format 'YYYY-MM-DD'
    const isTodayDate = (dates: any) => {
        // Get today's date in the same format as 'dates'
        const todayDate = moment().format('YYYY-MM-DD');

        // Compare 'dates' with today's date
        return dates === todayDate;
    };

    const result = isTodayDate(item?.dates);

    useEffect(() => {

        if (completeJobData && completeJobData.message && !shouldShowModal) {
            setShowValidationModal(true);
            setAlertTitle(StringConstants.JOB_FINISHED_SUCCESSFULLY);
            // Set shouldShowModal to true to prevent showing the modal multiple times
            setShouldShowModal(true);
        }
    }, [completeJobData, shouldShowModal]);

    useEffect(() => {
        if (!isLoading && createBillData?._id) {
            const completeJobData = {
                jobId: jobItem?._id
            }
            dispatch(clearJobsResponse('createBillData'));
            dispatch(completeJobAction(accessToken, completeJobData))
        }


    }, [createBillData])


    useEffect(() => {
        if (errorMessage != null && !isLoading) {
            setShowValidationModal(true)
            setAlertTitle(`${errorMessage}`)

        } else if (errorMessage == null) {
            setShowValidationModal(false)
            setAlertTitle('')
        }

        return () => { dispatch(clearJobsResponse('error')) }
    }, [errorMessage])

    // Update jobItemRef when jobItem changes
    useEffect(() => {
        jobItemRef.current = jobItem;

        console.log("jobItem in useEffect=>>>", JSON.stringify(jobItem));


        if (jobItem._id) {
            const tempArr = [...jobItem?.locations, ...jobItem?.dropAddress];  //merge both arrays and make it one array

            let index = tempArr.findIndex(item => item.hasOwnProperty('collected') && !item.collected);
            //index is 0 when it has collected property and item.collected is false (ie pick up case)

            if (index > -1) {
                // Found an item where 'collected' is false
                setCurrentRouteIndex(index);  //here index is 0 initially
            } else {
                // No item found where 'collected' is false, check 'is_delivered'
                index = tempArr.findIndex(item => item.hasOwnProperty('is_delivered') && !item.is_delivered);

                if (index > -1) {
                    // Found an item where 'is_delivered' is false
                    setCurrentRouteIndex(index); //here index is 1 for drop case
                } else {
                    // AppLogger(" Neither 'collected' nor 'is_delivered' is false");
                    if (tempArr[tempArr.length - 1].is_delivered == true)
                        setJobFinished(true)
                }
            }

            setLocationData(tempArr);
        }
    }, [jobItem]);



    //to get the updated jobitem from the api 
    useEffect(() => {
        if (item && jobsList) {
            // console.log('jobList in useEffect=>>', JSON.stringify(jobsList));

            dispatch(jobDetailAction(accessToken, item._id, 'myInJobs'))
        }
    }, [item]);

    // to set the jobItem after searching it in the jobList
    useEffect(() => {
        if (item && jobsList && !isLoading) {
            const tempItem = jobsList.find((job: any) => job._id === item._id);
            // console.log("tempItem in useEffect==>>>", JSON.stringify(tempItem));

            if (tempItem) {
                if (tempItem?.locations) {
                    setJobItem(tempItem)
                }
            }
        }
    }, [jobsList])



    useEffect(() => {
        if (Platform.OS == 'android') {
            requestLocationPermissionAndroid()
        } else {
            requestLocationPermissionIOS()
        }
    }, [])

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

    const tapOnIIcon = (item: any, index: number) => {

        if (item?.pickup) {
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

    const getJobDetails = () => {
        return [
            { title: StringConstants.VEHICLE, value: capitalizeFirstLetter(jobItem?.vehicle) },
            { title: StringConstants.PHONE_NUMBER, value: jobItem?.contactNumber },
            { title: StringConstants.DELIVERY_DATE, value: moment(jobItem?.dates, 'YYYY-MM-DD').format('D MMM YYYY') },
            { title: StringConstants.PRICE, value: '£' + numberWithCommas(jobItem?.driver_amount) },
            { title: StringConstants.TIME, value: jobItem?.time_slot == 'ASAP' ? 'ASAP' : jobItem?.start_time },
            { title: StringConstants.WEIGHT, value: jobItem?.weight ? jobItem?.weight + ' kg' : "" },
        ]
    }


    useEffect(() => {
        // Add event listeners here if needed
        socket.on('message', (data: any) => {
            console.log('called message sockets in myinjobs:', data);
            updateLocationData(JSON.parse(data))
        });

        return () => {
            // Remove event listeners if needed
            socket.removeAllListeners();
        };
    }, []);

   

    const updateLocationData = (data: any) => {
        setIsLoaderShown(false)
        const { job_id, _id } = data?.data;


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

        } else {
            AppLogger("jobid does not match");
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


    const tapOnUpdateLocation = async (signatureData?: any) => {
        setIsLoaderShown(true)
        const location = locationData


        let type = ''
        let location_id
        let drop_off_id

        if (locationData[currentRouteIndex].pickup) {
            type = 'pick'
            location_id = locationData[currentRouteIndex]._id
            drop_off_id = undefined
        } else {
            type = 'drop'
            location_id = undefined
            drop_off_id = locationData[currentRouteIndex]._id
        }

        let socketBody = {
            route: getRouteType(),
            driver_id: jobItem?.assignedDriver?._id || jobItem?.driverId,
            job_id: jobItem._id,
            type,
            location_id,
            drop_off_id,
            is_hotshot: false,
            location_name: getCurrentAddress(),
        }

        AppLogger("socketBody in myInJobs=>>>", socketBody);

        const todayDate = new Date()
        // const currentTime = moment(todayDate).format("hh:mm a DD/MM/YYYY")

        if (currentRouteIndex == 0) {
            switch (getRouteType()) {
                case 'en_route':
                    if (locationData[currentRouteIndex].en_route == false) {
                        const estimateTime = await calculateEstimationTime()
                        callSocketEvent({ ...socketBody, startTime: todayDate, estimateReachTime: estimateTime })
                    }
                    else
                        return;

                case 'reached_at_location':

                    if (locationData[currentRouteIndex].en_route == true && locationData[currentRouteIndex].reached_at_location == false) {
                        callSocketEvent({ ...socketBody, reachTime: todayDate })
                    }
                    else
                        return;


                case 'collected':
                    if (locationData[currentRouteIndex].en_route == true && locationData[currentRouteIndex].reached_at_location == true && locationData[currentRouteIndex].collected == false) {
                        callSocketEvent({ ...socketBody, collectedTime: todayDate })
                        break
                    }
                    else
                        return;

                case 'finished':
                    setShowBillModal(true)

            }
        } else {


            let collectedOrDelivered = location[currentRouteIndex - 1].collected && location[currentRouteIndex - 1].collected === true
                || location[currentRouteIndex - 1].is_delivered && location[currentRouteIndex - 1].is_delivered === true

            if (collectedOrDelivered) {

                switch (getRouteType()) {
                    case 'en_route':

                        if (locationData[currentRouteIndex].en_route == false) {
                            const estimateTime = await calculateEstimationTime()
                            callSocketEvent({ ...socketBody, startTime: todayDate, estimateReachTime: estimateTime })
                        }
                        return

                    case 'reached_at_location':

                        if (locationData[currentRouteIndex].en_route == true && locationData[currentRouteIndex].reached_at_location == false) {
                            callSocketEvent({ ...socketBody, reachTime: todayDate })
                        }
                        return

                    case 'collected':
                        if (locationData[currentRouteIndex].en_route == true && locationData[currentRouteIndex].reached_at_location == true && locationData[currentRouteIndex].collected == false) {
                            callSocketEvent({ ...socketBody, collectedTime: todayDate })
                        }
                        return

                    case 'deliverd':

                        if (locationData[currentRouteIndex].en_route == true && locationData[currentRouteIndex].reached_at_location == true && locationData[currentRouteIndex].is_delivered == false) {
                            if (signatureData) {
                                callSocketEvent({ ...socketBody, delivered_time: todayDate, signature: signatureData })
                                break
                            } else {
                                setShowSignModal(true)
                                break
                            }
                        }
                        return

                    case 'finished':
                        setShowBillModal(true)


                }
            }
        }
    }

    const callSocketEvent = (body: any) => {
        console.log('body in callSocketEvent ', body);
        socket.emit("message", body)
    }

    const getUserProfileImage = () => {
        if (item?.createdByUser?.photo !== null) {
            return { uri: item?.createdByUser?.photo }
        } else {
            return Images.IC_PICKER
        }
    }

    const openPdf = (docUrl: string) => {

        Linking.openURL(docUrl)
            .then(supported => {
                if (!supported) {
                    AppLogger('Opening PDF link in browser is not supported');
                }
            })
            .catch((error) => AppLogger('Error opening PDF link in MyPastJobs:', error));

    }

    const tapOnSubmit = () => {
        setShowBillModal(false)
        const createBillData = {
            amount: jobItem?.driver_amount,
            additional_amount: additionalAmount,
            job_id: jobItem?._id,
            bill_notes: note
        }
        dispatch(createBillAction(accessToken, createBillData))
    }

    const makePhoneCall = () => {
        Linking.openURL('tel:' + `${jobItem?.contactNumber}`);
    };

    const sendSMS = async () => {
        let url = `sms:${jobItem?.contactNumber}${getSMSDivider()}body=${''}`
        try {
            const shareResponse = await Linking.openURL(url);
            AppLogger("shareResponse shareResponse=>>", JSON.stringify(shareResponse))
        } catch (error) {
            AppLogger("error while sharing app link=>", error);
        }
    }



    const getSMSDivider = () => {
        return Platform.OS === "ios" ? "&" : "?";
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

    const totalItems = (item: any) => {
        let combinedArray
        if (item.pickup) {
            combinedArray = item?.pickup.map((items: any, index: number) => `${item?.pickup_count[index]} ${items}`);
        } else {
            combinedArray = item?.dropup?.map((items: any, index: number) => `${item?.dropup_count[index]} ${items}`);
        }
        return combinedArray.join(", ");
    };

    const calculateEstimationTime = async () => {
        let origin = ''
        let destination = ''
        // let originLat
        // let originLng
        // let destinationLat
        // let destinationLng

        

        if (currentRouteIndex == 0) {
            // console.log("locationData[currentRouteIndex]==>>>>",locationData[currentRouteIndex]);

            origin = currentLocation.formattedAddress;
            destination = locationData[currentRouteIndex]?.location || (locationData[currentRouteIndex]?.addressLine1 + locationData[currentRouteIndex]?.addressLine2 + locationData[currentRouteIndex]?.city + locationData[currentRouteIndex]?.state)

            // originLat = currentLocation.formattedAddress.latitude
            // originLng = currentLocation.formattedAddress.longitude
            // destinationLat = locationData[currentRouteIndex]?.latitude
            // destinationLng = locationData[currentRouteIndex]?.longitude

            // console.log("originLat=>>>", originLat);
            // console.log("originLng==>>>", originLng);
            // console.log("destinationLat=>>>", destinationLat);
            // console.log("destinationLng=>>>", destinationLng);


        } else {
            if (locationData[currentRouteIndex - 1].pickup) {
                origin = locationData[currentRouteIndex - 1]?.location || (locationData[currentRouteIndex - 1]?.addressLine1 + locationData[currentRouteIndex - 1]?.addressLine2 + locationData[currentRouteIndex - 1]?.city + locationData[currentRouteIndex - 1]?.state)
            } else {
                origin = locationData[currentRouteIndex - 1]?.drop_off_location || (locationData[currentRouteIndex - 1]?.addressLine1 + locationData[currentRouteIndex - 1]?.addressLine2 + locationData[currentRouteIndex - 1]?.city + locationData[currentRouteIndex - 1]?.state)
            }

        
            if (locationData[currentRouteIndex].pickup) {
                destination = locationData[currentRouteIndex]?.location || (locationData[currentRouteIndex]?.addressLine1 + locationData[currentRouteIndex]?.addressLine2 + locationData[currentRouteIndex]?.city + locationData[currentRouteIndex]?.state)
            } else {
                destination = locationData[currentRouteIndex]?.drop_off_location || (locationData[currentRouteIndex]?.addressLine1 + locationData[currentRouteIndex]?.addressLine2 + locationData[currentRouteIndex]?.city + locationData[currentRouteIndex]?.state)
            }

            // originLat = locationData[currentRouteIndex - 1].latitude
            // originLng = locationData[currentRouteIndex - 1].longitude
            // destinationLat = locationData[currentRouteIndex]?.latitude
            // destinationLng = locationData[currentRouteIndex]?.longitude

            // console.log("originLat in else=>>>", originLat);
            // console.log("originLng in else==>>>", originLng);
            // console.log("destinationLat in else=>>>", destinationLat);
            // console.log("destinationLng in else=>>>", destinationLng);

        }

       
        const { duration, distance } = await calculateTimeDurationAndDistance(origin, destination);
        // const { duration, distance } = await calculateTimeDurationAndDistance2(originLat, originLng, destinationLat, destinationLng);

        let totalTime
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        if (hours > 0) {
            totalTime = `${hours} hours ${minutes} minutes`
        } else {
            totalTime = `${minutes} minutes`
        }
        console.log("totalTime==>>>", totalTime);

        return totalTime

    }

    //to get the button title
    const getButtonTitle = () => {
        if (locationData.length > 0) {
            if (currentRouteIndex == 0 && locationData[0].startTime == null) {
                return StringConstants.START_JOB

            } else if (locationData[locationData.length - 1].signature && locationData[locationData.length - 1].signature != null) {
                return StringConstants.FINISH_JOB
            }

            else if (currentRouteIndex > 0 && locationData[currentRouteIndex].en_route == false) {
                return StringConstants.ON_ROUTE
            } else if (locationData[currentRouteIndex].reached_at_location == false) {
                return StringConstants.ARRIVED
            } else if (locationData[currentRouteIndex].collected != undefined && locationData[currentRouteIndex].collected == false) {
                return StringConstants.COLLECTED
            } else if (locationData[currentRouteIndex].is_delivered != undefined && locationData[currentRouteIndex].is_delivered == false) {
                return StringConstants.DELIEVERED
            } else if (locationData[currentRouteIndex].collected != undefined && locationData[currentRouteIndex].collected == true) {
                return StringConstants.ON_ROUTE
            } else if (locationData[currentRouteIndex].is_delivered != undefined && locationData[currentRouteIndex].is_delivered == true && locationData[currentRouteIndex].signature) {
                return StringConstants.ON_ROUTE
            }
        }
    }

    const getCurrentAddress = () => {
        let currentLocationText = ""
        if (locationData.length > 0) {
            const { addressLine1, addressLine2, city, state } = locationData[currentRouteIndex]

            if (locationData[currentRouteIndex].pickup) {
                currentLocationText = locationData[currentRouteIndex]?.location ? locationData[currentRouteIndex]?.location : `${addressLine1} ${addressLine2} ${city} ${state}`
            } else {
                currentLocationText = locationData[currentRouteIndex]?.drop_off_location ? locationData[currentRouteIndex]?.drop_off_location : `${addressLine1} ${addressLine2} ${city} ${state}`
            }
        }
        return currentLocationText
    }

    const tapOnConfirmSign = (signatureData: any) => {
        setShowSignModal(false)
        tapOnUpdateLocation(signatureData)
    }

    const tapOnYes = () => {
        setShowHotshotModal(false)
        navigation.navigate(AppConstants.screens.ADD_HOTSHOT)
    }

    const hideModal = () => {
        setShowHotshotModal(false)
        navigation.navigate(AppConstants.screens.HOME_SCREEN)
    }

    const tapOnViewSignature = (index: number) => {
        setShowImageModal(true)
        setSignature(locationData[index].signature)
    }

    const formattedDate =(date: any)=>{
        const dates = moment(date).format("hh:mm a DD/MM/YYYY")
        return dates
     }

    return (
        <View style={styles.rootContainer}>
            {/* to be done later when required for showing location in google map */}
            {/* {showMap &&
                <TrackLocationModal
                    showModal={showMap}
                    hideModal={() => {
                        setShowMap(false)
                    }}
                    destinations={destinations}
                    driverLocation={driverLocation}
                />
            } */}
            {showBillModal &&
                <FinalBillsModal
                    showModal={showBillModal}
                    hideModal={() => {
                        setShowBillModal(false)
                        setIsLoaderShown(false)}
                    }
                    previousAmount={jobItem?.driver_amount}
                    additionalAmount={additionalAmount}
                    setAdditionalAmount={setAdditionalAmount}
                    note={note}
                    setNote={setNote}
                    tapOnSubmit={() => {
                        tapOnSubmit()
                    }}
                />
            }
            {showHotshotModal &&
                <ConfirmationModal                    //for Hotshot 
                    showModal={showHotshotModal}
                    hideModal={hideModal}
                    tapOnConfirm={tapOnYes}
                    title={StringConstants.LIKE_TO_CREATE_HOTSHOT}
                    tapOnNo={hideModal}
                />
            }
            {(isLoaderShown) && <LoaderModal showModal={isLoading} />}
            {isLoading &&
                <LoaderModal showModal={isLoading} />
            }
            {showValidationModal &&
                <ValidationModal
                    showModal={showValidationModal}
                    hideModal={() => {

                        if (alertTitle == StringConstants.JOB_FINISHED_SUCCESSFULLY) {
                            dispatch(clearJobsResponse('completeJobData'));
                            setShouldShowModal(false);            // Reset shouldShowModal to false when the modal is hidden
                            setIsLoaderShown(false)               //loader is set to be false

                            setShowValidationModal(false)
                            setAlertTitle('')
                            setTimeout(() => {
                                setShowHotshotModal(true)
                            }, 500);
                        } else {
                            dispatch(clearJobsResponse('error'));
                            setShowValidationModal(false)
                            setAlertTitle('')
                        }
                    }}
                    title={alertTitle}
                />
            }
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
                        console.log("In hide modal ImageModal");

                        setShowImageModal(false)
                        setSignature("")

                    }}
                />
            }


            <Header
                tapOnBack={() => { navigation.navigate(AppConstants.screens.HOME_SCREEN) }}
                headerText={StringConstants.JOB_DETAIL}
            />

            {result === true &&
                <LocationView buttonTitle={getButtonTitle()}
                    address={getCurrentAddress()}
                    tapOnButton={() => tapOnUpdateLocation()}
                />}


            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                {/* user details  */}
                <View style={{ flexDirection: 'row', flex: 0.8 }}>
                    <Image source={getUserProfileImage()} style={styles.profileImage} />
                    <Text style={styles.driverName}>{capitalizeFirstLetter(item?.createdByUser?.full_name)}</Text>
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

            <SocketManager 
            // url={ApiConstants.LOCAL_IP}
             url={ApiConstants.MEDIA_BASE_URL}
             >
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

                    {/* to be implemeted later when required map for showing path */}


                    {/* <TouchableOpacity onPress={tapOnShowLocation} style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                    <Text style={{
                        fontSize: 18,
                        fontFamily: Fonts.DM_SANS_BOLD,
                        color: Colors.BLACK,
                    }} >Show location in map</Text>
                </TouchableOpacity> */}

                    {result === true && <View>
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
                                                        {`Job Started at ${item?.startTime ? formattedDate(item?.startTime) : ''}`}
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
                                                <Text style={[styles.textAdress, { marginStart: 6 }]}>{item.startTime ? `At: ${formattedDate(item.startTime)}` : ""}</Text>
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
                                                <Text style={[styles.textAdress, { marginStart: 6 }]}>{item.reachTime ? `At: ${formattedDate(item.reachTime)}` : item.estimateReachTime ? `ETA: ${item.estimateReachTime}` : ""}</Text>
                                            </View>
                                        </View>



                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={styles.circleLineView}>
                                                <Image style={styles.circleLeftIcon}
                                                    source={item.collected || item.is_delivered ? Images.IC_GREEN_CIRCLE : Images.IC_GREY_CIRCLE}
                                                />
                                            </View>

                                            <View style={{ flex: 1 }}>
                                                <Text style={[styles.textInsideBlack, { marginLeft: 5, color: item.collected || item.is_delivered ? Colors.GREEN : Colors.BLACK }]}>
                                                    {`Goods ${item.pickup ? 'collected from' : 'dropped at'} `}<Text style={{ fontFamily: Fonts.DM_SANS_SEMIBOLD }}>{getAddress(item)}</Text>
                                                </Text>
                                            </View>
                                        </View>

                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                            <Text style={styles.itemsCount}>{totalItems(item)}</Text>
                                            <Pressable style={{ justifyContent: 'center' }} onPress={() => tapOnIIcon(item, index)}>
                                                <Image source={Images.IC_I_ICON} style={{ height: 20, width: 20 }} />
                                            </Pressable>
                                        </View>
                                        <Text style={[styles.textAdress, { marginStart: 45, marginTop: -2 }]}>{ item.collectedTime ? `At: ${formattedDate(item.collectedTime)}` : item.delivered_time ? `At: ${formattedDate(item.delivered_time)}` : ""}</Text>

                                        {item?.signature !== null &&
                                            <TouchableOpacity style={styles.viewSignature} onPress={() => tapOnViewSignature(index)}>
                                                <Text style={styles.viewSignatureText}>{StringConstants.VIEW_SIGNATURE}</Text>
                                            </TouchableOpacity>}

                                        <View style={[styles.horizontalBottomLine]} />
                                    </View>
                                )

                            }}
                        />
                    </View>}

                    {/* {result == true && jobItem?.locations &&
                    jobItem?.locations[jobItem?.locations?.length - 1]?.collected == true &&
                    <Button primaryTitle={StringConstants.FINISH_JOB}
                        containerStyles={styles.containerStyles}
                        onPress={tapOnButton} />
                } */}
                </KeyboardAwareScrollView>
            </SocketManager>
        </View>
    )
}