import { View, Text, TouchableOpacity, Image, Keyboard, TextInput, FlatList, LogBox } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { styles } from './styles'
import { StringConstants } from '../../Theme/StringConstants'
import { Images } from '../../Assets'
import TextField from '../../Components/TextField'
import { Colors } from '../../Theme/Colors'
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view'
import { AppConstants } from '../../Theme/AppConstants'
import { Dropdown } from 'react-native-element-dropdown';
import Button from '../../Components/Button'
import DatePicker from "react-native-date-picker";
import { DimensionsValue } from '../../Theme/DimensionsValue'
import Header from '../../Components/Header'
import ValidationModal from '../../Modals/ValidationModal'
import LoaderModal from '../../Modals/LoaderModal'
import { alphaNumericRegex, alphabetRegex, emojiRegex, numberRegex, weightRegexx } from '../../Theme/validation'
import DropPinModal from '../../Modals/DropPinModal'
import FindAddressModal from '../../Modals/FindAddressModal'
import { calculateTimeDurationAndDistance2 } from '../../Theme/GoogleApi'
import { useDispatch, useSelector } from 'react-redux'
import { createHotshotAction, getHotshotPriceAction } from '../../Redux/Actions/hotshotActions'
import CommonHeading from '../../Components/CommonHeading'
import { Fonts } from '../../Theme/Fonts'
import { clearHotshotResponse } from '../../Redux/Reducers/hotshotSlice'
import { vehichleListAction } from '../../Redux/Actions/jobActions'
import { checkInternetConnection } from '../../Components/InternetConnection'

export default function AddHotshot({ navigation, route }: any): React.JSX.Element {
    const dispatch = useDispatch()

    const [selectedVehicle, setSelectedVehicle] = useState<string>('')
    const [showTimePicker, setShowTimePicker] = useState<any>(null)
    const [date, setDate] = useState<any>(null)
    const [time, setTime] = useState<any>(null)
    // const [price, setPrice] = useState<any>(null)
    const [showValidationModal, setShowValidationModal] = useState<boolean>(false)
    const [alertTitle, setAlertTitle] = useState<string>('')
    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    const [showLocationModal, setShowLocationModal] = useState<boolean>(false)
    const [showMap, setShowMap] = useState<boolean>(false);
    const [vehichleTypes, setVehichleTypes] = useState([])
    const [isLoaderShown, setIsLoaderShown] = useState<boolean>(false)
    const [totalDistanceInMile, setTotalDistance] = useState<string>('')
    const [totalTimeTaken, setTotalTimeTaken] = useState<string>('')

    const accessToken = useSelector((state: any) => state?.persistedReducer.userData.userToken);
    const vehicleList = useSelector((state: any) => state.persistedReducer.jobListData.vehicleList);
    const isLoading = useSelector((state: any) => state.persistedReducer.hotshotListData.isLoading)
    const errorMessage = useSelector((state: any) => state.persistedReducer.hotshotListData.error);
    const hotshotDetails = useSelector((state: any) => state?.persistedReducer.hotshotListData.hotshotDetails);
    const hotshotPriceResponse = useSelector((state: any) => state?.persistedReducer.hotshotListData.hotshotPriceResponse)
    console.log('hotshotPriceResponse in AddHosthot', hotshotPriceResponse);

    // console.log("errorMessage in AddHotshot", errorMessage);


    interface FormData {
        location: string;
        addressLine1: string;
        addressLine2: string;
        city: string;
        state: string;
        zip_code: string;
        findAddress: boolean;
        latitude: number,
        longitude: number,
        placeId: string
    }




    useEffect(() => {
        if (hotshotPriceResponse?.amount && hotshotPriceResponse?.amount !== '') {
            console.log("hotshotPriceResponse?.amount", hotshotPriceResponse?.amount);

        }


    }, [hotshotPriceResponse])

    useEffect(() => {

        return () => { dispatch(clearHotshotResponse('hotshotPriceResponse')) }
    }, [])

    useEffect(() => {
        if (!isLoading && hotshotDetails !== null) {
            setShowValidationModal(true)
            setAlertTitle(StringConstants.HOTSHOT_CREATED_SUCCESSFULLY)
        }

        return () => { dispatch(clearHotshotResponse('hotshotDetails')) }

    }, [hotshotDetails])

    useEffect(() => {
        if (errorMessage !== null && !isLoading) {
            setShowValidationModal(true)
            setAlertTitle(errorMessage)
        } else if (errorMessage == null) {
            setShowValidationModal(false)
            setAlertTitle('')
        }

    }, [errorMessage])


    const [noOfAddress, setNoOfAddress] = useState<Array<FormData>>([
        {
            location: '',
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            zip_code: '',
            findAddress: true,
            latitude: 0,
            longitude: 0,
            placeId: ''
        },
        {
            location: '',
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            zip_code: '',
            findAddress: true,
            latitude: 0,
            longitude: 0,
            placeId: ''
        },
    ]);


    useEffect(() => {
        const fetchData = async () => {

            // console.log('noOfAddress in fetchData=>>>',noOfAddress);
            // console.log('noOfAddress.length in fetchData=>>>',noOfAddress.length);
            
            if (noOfAddress.length >= 2 && selectedVehicle) {
                // console.log('Fetching data with new noOfAddress or selectedVehicle');
                calculateDistanceApi(selectedVehicle)
            }
        };

        fetchData();
    }, [noOfAddress, selectedVehicle]);

    const address1Ref = useRef<TextInput>(null);
    const address2Ref = useRef<TextInput>(null);
    const cityRef = useRef<TextInput>(null);
    const stateRef = useRef<TextInput>(null);
    const zipCodeRef = useRef<TextInput>(null);


    useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])

        const fetchData = async () => {
            try {
                const isConnected = await checkInternetConnection();

                if (!isConnected) {
                    setAlertTitle(StringConstants.PLEASE_CHECK_YOUR_INTERNET_CONNECTION);
                    setShowValidationModal(true);
                } else {
                    getVehichleList()
                }
            } catch (error) {
                console.error('Error checking internet connection:', error);
            }
        };

        fetchData();
    }, []);


    const getVehichleList = async () => {
        await dispatch(vehichleListAction(accessToken));
    }

    useEffect(() => {
        const types = vehicleList && vehicleList.map((item: any) => ({
            label: item.vehichle_name + ' (' + item?.max_weight + ')',
            value: item.vehichle_type
        }));

        setVehichleTypes(types);
    }, [vehicleList])



    useEffect(() => {

        if (route?.params?.selectedAddress) {

            let tempData = [...noOfAddress]
            let tempAddressObj = tempData[selectedIndex]

            if (route?.params?.selectedAddress?.location) {
                tempAddressObj = {
                    ...tempAddressObj,
                    location: route?.params?.selectedAddress?.location,
                    addressLine1: '',
                    addressLine2: '',
                    city: '',
                    state: '',
                    zip_code: '',
                    findAddress: true,
                    longitude: route?.params?.selectedAddress?.longitude,
                    latitude: route?.params?.selectedAddress?.latitude
                }
            }
            else if (route?.params?.selectedAddress?.addressLine1) {
                tempAddressObj = {
                    ...tempAddressObj,
                    location: '',
                    addressLine1: route?.params?.selectedAddress?.addressLine1,
                    addressLine2: route?.params?.selectedAddress?.addressLine2,
                    city: route?.params?.selectedAddress?.city,
                    state: route?.params?.selectedAddress?.state,
                    zip_code: route?.params?.selectedAddress?.zip_code,
                    findAddress: false,
                    longitude: route?.params?.selectedAddress?.longitude,
                    latitude: route?.params?.selectedAddress?.latitude
                };
            }

            tempData.splice(selectedIndex, 1, tempAddressObj)

            setNoOfAddress([...tempData]);


        } else return
    }, [route?.params?.selectedAddress]);






    const tapOnSave = () => {
        Keyboard.dismiss()
        let valid = true


        //validations for pick up information
        if (noOfAddress[0]?.findAddress == true) {
            if (noOfAddress[0]?.location?.length === 0) {
                valid = false;
                setShowValidationModal(true);
                setAlertTitle(StringConstants.PLEASE_SELECT_THE_PICKUP_LOCATION);
                return
            }
        } else {

            if (noOfAddress[0]?.addressLine1.length === 0) {
                valid = false;
                setShowValidationModal(true);
                setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_PICKUP_ADDRESS_LINE_1);
                return
            }
            else if (noOfAddress[0]?.addressLine2.length === 0) {
                valid = false;
                setShowValidationModal(true);
                setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_PICKUP_ADDRESS_LINE_2);
                return
            }
            else if (noOfAddress[0]?.city.length === 0) {
                valid = false;
                setShowValidationModal(true);
                setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_PICKUP_CITY);
                return
            }
            else if (noOfAddress[0].city.length < 3) {
                valid = false
                setShowValidationModal(true)
                setAlertTitle(StringConstants.PICKUP_CITY_SHOULD_BE_ATLEAST_3_CHARACTERS_LONG)
                return
            }
            else if (!alphabetRegex.test(noOfAddress[0].city)) {
                valid = false
                setShowValidationModal(true)
                setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_CORRECT_PICKUP_CITY_REGEX)
                return
            }
            else if (noOfAddress[0]?.state.length === 0) {
                valid = false;
                setShowValidationModal(true);
                setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_PICKUP_STATE);
                return
            }
            else if (noOfAddress[0].state.length < 3) {
                valid = false
                setShowValidationModal(true)
                setAlertTitle(StringConstants.PICKUP_STATE_SHOULD_BE_ATLEAST_3_CHARACTERS_LONG)
                return
            }
            else if (!alphabetRegex.test(noOfAddress[0].state)) {
                valid = false
                setShowValidationModal(true)
                setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_CORRECT_PICKUP_STATE_REGEX)
                return
            }
            else if (noOfAddress[0]?.zip_code?.length === 0) {
                valid = false;
                setShowValidationModal(true);
                setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_PICKUP_ZIP_CODE);
                return
            }
            else if (noOfAddress[0]?.zip_code?.length < 5 || alphabetRegex.test(noOfAddress[0]?.zip_code) || numberRegex.test(noOfAddress[0]?.zip_code) || !alphaNumericRegex.test(noOfAddress[0]?.zip_code) || emojiRegex.test(noOfAddress[0]?.zip_code)) {
                valid = false
                setShowValidationModal(true)
                setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_CORRECT_PICKUP_ZIP_CODE)
                return
            }
            else if (noOfAddress[0].latitude === 0 && noOfAddress[0].longitude === 0) {
                valid = false
                setShowValidationModal(true)
                setAlertTitle(StringConstants.PLEASE_SELECT_THE_PICKUP_LOCATION_ON_MAP_USING_DROP_PIN)
                return
            }
        }

        //validations for drop off information
        if (noOfAddress[1]?.findAddress == true) {
            if (noOfAddress[1]?.location?.length === 0) {
                valid = false;
                setShowValidationModal(true);
                setAlertTitle(StringConstants.PLEASE_SELECT_THE_DROP_OFF_LOCATION);
                return
            }
        } else {

            if (noOfAddress[1]?.addressLine1.length === 0) {
                valid = false;
                setShowValidationModal(true);
                setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_DROP_OFF_ADDRESS_LINE_1);
                return
            }
            else if (noOfAddress[1]?.addressLine2.length === 0) {
                valid = false;
                setShowValidationModal(true);
                setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_DROP_OFF_ADDRESS_LINE_2);
                return
            }
            else if (noOfAddress[1]?.city.length === 0) {
                valid = false;
                setShowValidationModal(true);
                setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_DROP_OFF_CITY);
                return
            }
            else if (noOfAddress[1].city.length < 3) {
                valid = false
                setShowValidationModal(true)
                setAlertTitle(StringConstants.DROP_OFF_CITY_SHOULD_BE_ATLEAST_3_CHARACTERS_LONG)
                return
            }
            else if (!alphabetRegex.test(noOfAddress[1].city)) {
                valid = false
                setShowValidationModal(true)
                setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_CORRECT_DROP_OFF_CITY_REGEX)
                return
            }
            else if (noOfAddress[1]?.state.length === 0) {
                valid = false;
                setShowValidationModal(true);
                setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_DROP_OFF_STATE);
                return
            }
            else if (noOfAddress[1].state.length < 3) {
                valid = false
                setShowValidationModal(true)
                setAlertTitle(StringConstants.DROP_OFF_STATE_SHOULD_BE_ATLEAST_3_CHARACTERS_LONG)
                return
            }
            else if (!alphabetRegex.test(noOfAddress[1].state)) {
                valid = false
                setShowValidationModal(true)
                setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_CORRECT_DROP_OFF_STATE_REGEX)
                return
            }
            else if (noOfAddress[1]?.zip_code?.length === 0) {
                valid = false;
                setShowValidationModal(true);
                setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_DROP_OFF_ZIP_CODE);
                return
            }
            else if (noOfAddress[1]?.zip_code?.length < 5 || alphabetRegex.test(noOfAddress[1]?.zip_code) || numberRegex.test(noOfAddress[1]?.zip_code) || !alphaNumericRegex.test(noOfAddress[1]?.zip_code) || emojiRegex.test(noOfAddress[1]?.zip_code)) {
                valid = false
                setShowValidationModal(true)
                setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_CORRECT_DROP_OFF_ZIP_CODE)
                return
            }
            else if (noOfAddress[1].latitude === 0 && noOfAddress[1].longitude === 0) {
                valid = false
                setShowValidationModal(true)
                setAlertTitle(StringConstants.PLEASE_SELECT_THE_DROP_OFF_LOCATION_ON_MAP_USING_DROP_PIN)
                return
            }
        }


        if (selectedVehicle.length == 0) {
            valid = false;
            setShowValidationModal(true);
            setAlertTitle(StringConstants.PLEASE_SELECT_THE_VEHICLE);
            return
        }
       
        else if (!time) {
            valid = false;
            setShowValidationModal(true);
            setAlertTitle(StringConstants.PLEASE_SELECT_THE_TIME_FOR_PICKUP);
            return
        }
        else {
            valid = true;
            if(hotshotPriceResponse?.status == "mile_not_match"){
                setShowValidationModal(true)
                setAlertTitle("The pick up and drop off locations must be different")
            } else {
                callActionForCreateHotshot()
            }
            
           
        }
    }

    // const calculateDistanceApi = async () => {
    //     setIsLoaderShown(true)
    //     const locations = noOfAddress.map(item => item?.location || (item?.addressLine1 + item?.addressLine2 + item?.city + item?.state));
    //     let totalDuration = 0;
    //     let totalDistance = 0;
    //     let totalTime



    //     for (let i = 0; i < locations.length - 1; i++) {

    //         const { latitude: originLat, longitude: originLng } = noOfAddress[i];
    //         const { latitude: destinationLat, longitude: destinationLng } = noOfAddress[i + 1];

    //         const { duration, distance } = await calculateTimeDurationAndDistance2(originLat, originLng, destinationLat, destinationLng);

    //         totalDuration += duration;
    //         totalDistance += distance;
    //     }


    //     // Conversion factor from meters to miles
    //     const metersToMilesFactor = 0.000621371;

    //     const miles = totalDistance * metersToMilesFactor;             //convert it to miles
    //     const distanceInMiles = miles.toFixed(1);              // round off the miles to 1 decimal place
    //     console.log('distance in miles', distanceInMiles);
    //     setTotalDistance(distanceInMiles)

    //     const hours = Math.floor(totalDuration / 3600);
    //     const minutes = Math.floor((totalDuration % 3600) / 60);
    //     // const totalDistanceInKm = totalDistance / 1000;

    //     if (hours > 0) {
    //         totalTime = `${hours} hours ${minutes} minutes`
    //     } else {
    //         totalTime = `${minutes} minutes`
    //     }
    //     setTotalTimeTaken(totalTime)


    //     setIsLoaderShown(false)

    //     if ((distanceInMiles == '0' || distanceInMiles == '0.0') && minutes === 0) {
    //         setShowValidationModal(true)
    //         setAlertTitle(StringConstants.PLEASE_SELECT_ANY_OTHER_LOCATION)
    //     } else {

    //         let body = {
    //             vehicle: selectedVehicle,
    //             totalDistance: distanceInMiles
    //         }

    //         console.log("body in get price API", body);
    //         dispatch(getHotshotPriceAction(accessToken, body))
    //         // callActionForCreateHotshot(totalTime, distanceInMiles)
    //     }

    // };

    // const callActionForCreateHotshot = (totalTime: string, totalDistance: any) => {
    // const callActionForCreateHotshot = (amount: string, driver_amount: any) => {
    const callActionForCreateHotshot = () => {

        const modifiedTime = time ? time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) : '';
        // const locations = noOfAddress.map((item: any, index: number) => ({
        //     location: item.location,
        //     addressLine1: item.addressLine1,
        //     addressLine2: item.addressLine2,
        //     city: item.city,
        //     state: item.state,
        //     zipcode: item.zip_code,
        //     latitude: item.latitude,
        //     longitude: item.longitude,
        //     placeId: item.placeId,
        // }));

        // let myFormData = new FormData();

        // locations.forEach((item: any, index: number) => {
        //     Object.entries(item).forEach(([key, value]) => {
        //         myFormData.append(`locations[${index}][${key}]`, value);
        //     });
        // });

        let body = {
            pickup_location: noOfAddress[0]?.location || '',
            pickup_address_1: noOfAddress[0]?.addressLine1 || '',
            pickup_address_2: noOfAddress[0]?.addressLine2 || '',
            pickup_city: noOfAddress[0]?.city || '',
            pickup_state: noOfAddress[0]?.state || '',
            pickup_zip: noOfAddress[0]?.zip_code || '',
            pick_up_latitude: noOfAddress[0]?.latitude,
            pick_up_longitude: noOfAddress[0]?.longitude,
            dopoff_location: noOfAddress[1]?.location || '',
            dopoff_address_1: noOfAddress[1]?.addressLine1 || '',
            dopoff_address_2: noOfAddress[1]?.addressLine2 || '',
            dopoff_city: noOfAddress[1]?.city || '',
            dopoff_state: noOfAddress[1]?.state || '',
            dopoff_zip: noOfAddress[1]?.zip_code || '',
            drop_off_latitude: noOfAddress[1]?.latitude,
            drop_off_longitude: noOfAddress[1]?.longitude,
            total_distence: totalDistanceInMile,
            total_time: totalTimeTaken,
            time: modifiedTime,
            vehicle: selectedVehicle,
            distanceType: "Miles",
            // amount: price,
            amount: hotshotPriceResponse?.amount,
            driver_amount: hotshotPriceResponse?.driver_amount

        }

        console.log('body in callActionForCreateHotshot->', JSON.stringify(body));
        dispatch(createHotshotAction(body, accessToken))


    }

    const tapOnSelectLocation = (index: number) => {
        const { findAddress } = noOfAddress[index]
        const selectedAddress = route?.params?.selectedAddress;

        let tempObj = {}
        let tempObjAddress = {}

        if (selectedAddress) {
            tempObjAddress = {
                addressLine1: '',
                addressLine2: '',
                city: '',
                state: '',
                zip_code: '',
                location: ''
            }
        }

        tempObj = {
            latitude: 0,
            longitude: 0,
            placeId: '',
            location: '',
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            zip_code: '',
        }



        let updatedAddress = [...noOfAddress];
        if (findAddress) {
            updatedAddress[index] = { ...updatedAddress[index], ...tempObj, ...tempObjAddress, findAddress: false };
        } else {
            updatedAddress[index] = { ...updatedAddress[index], ...tempObj, ...tempObjAddress, findAddress: true };
        }


        setNoOfAddress(updatedAddress);

    }

    const handlePlaceSelect = (data: any, details: any) => {
        const updateAddress = {
            location: details?.formatted_address,
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            zip_code: '',
            findAddress: true,
            latitude: details?.geometry.location.lat,
            longitude: details?.geometry.location.lng,
            placeId: details?.place_id,
        };


        const updatedLocation = [...noOfAddress];
        updatedLocation[selectedIndex] = { ...updatedLocation[selectedIndex], ...updateAddress };
        setNoOfAddress(updatedLocation);
    };




    const tapOnBack = () => {
        if (route?.params?.fromHotshot === true) {
            return navigation.goBack()
        } else {
            return navigation.navigate(AppConstants.screens.HOME_SCREEN)
        }
    }

 

    const calculateDistanceApi = async (vehicle: string) => {
        // setIsLoaderShown(true)
        const locations = noOfAddress.map(item => item?.location || (item?.addressLine1 + item?.addressLine2 + item?.city + item?.state));
        let totalDuration = 0;
        let totalDistance = 0;
        let totalTime



        for (let i = 0; i < locations.length - 1; i++) {

            const { latitude: originLat, longitude: originLng } = noOfAddress[i];
            const { latitude: destinationLat, longitude: destinationLng } = noOfAddress[i + 1];

            const { duration, distance } = await calculateTimeDurationAndDistance2(originLat, originLng, destinationLat, destinationLng);

            totalDuration += duration;
            totalDistance += distance;
        }

        console.log("totalDistance in add hotshot=>>>", totalDistance); //meters

        // Conversion factor from meters to miles
        const metersToMilesFactor = 0.000621371;

        const miles = totalDistance * metersToMilesFactor;             //convert it to miles
        const distanceInMiles = miles.toFixed(1);              // round off the miles to 1 decimal place
        console.log('distance in miles', distanceInMiles);
        setTotalDistance(distanceInMiles)

        const hours = Math.floor(totalDuration / 3600);
        const minutes = Math.floor((totalDuration % 3600) / 60);
        // const totalDistanceInKm = totalDistance / 1000;

        if (hours > 0) {
            totalTime = `${hours} hours ${minutes} minutes`
        } else {
            totalTime = `${minutes} minutes`
        }
        setTotalTimeTaken(totalTime)


        // setIsLoaderShown(false)

        // if ((distanceInMiles == '0' || distanceInMiles == '0.0') && minutes === 0) {
            // setShowValidationModal(true)
            // setAlertTitle(StringConstants.PLEASE_SELECT_ANY_OTHER_LOCATION)
        // } else {

            let body = {
                vehicle: vehicle,
                totalDistance: distanceInMiles
            }

            console.log("body in get price API", body);
            dispatch(getHotshotPriceAction(accessToken, body))
           
        // }

    };



    return (
        <View style={styles.rootContainer}>
            <Header tapOnBack={() => tapOnBack()} headerText={StringConstants.CREATE_HOTSHOT} />
            {isLoading && <LoaderModal showModal={isLoading} />}
            {(isLoaderShown) && <LoaderModal showModal={isLoading} />}
            {showValidationModal &&
                <ValidationModal
                    showModal={showValidationModal}
                    hideModal={() => {
                        if (alertTitle == StringConstants.HOTSHOT_CREATED_SUCCESSFULLY) {
                            setShowValidationModal(false)
                            setAlertTitle('')
                            dispatch(clearHotshotResponse('hotshotDetails'))
                            dispatch(clearHotshotResponse('hotshotPriceResponse'))
                            navigation.navigate(AppConstants.screens.HOTSHOT_SCREEN, { addHotshot: true })
                        } else {
                            setShowValidationModal(false)
                            setAlertTitle('')
                            dispatch(clearHotshotResponse('error'))
                        }

                    }}
                    title={alertTitle}
                />
            }
            {showLocationModal &&
                <FindAddressModal
                    showModal={showLocationModal}
                    hideModal={() => {
                        setShowLocationModal(false)
                    }}
                    tapOnConfirm={(data, details) => {
                        handlePlaceSelect(data, details)
                        setShowLocationModal(false)

                    }}
                />
            }
            {showMap &&
                <DropPinModal
                    showModal={showMap}
                    hideModal={() => {
                        setShowMap(false)
                    }}
                    tapOnConfirm={(data: any) => {
                        // console.log('data in tapOnConfirm in DropPinModal==>>>', data);

                        let tempData = [...noOfAddress]
                        tempData[selectedIndex].longitude = data.longitude
                        tempData[selectedIndex].latitude = data.latitude

                        setNoOfAddress(tempData)
                        setShowMap(false)
                    }}
                />
            }
            <KeyboardAwareScrollView
                automaticallyAdjustKeyboardInsets={true}
                onScrollBeginDrag={() => Keyboard.dismiss()}
                enableAutomaticScroll={false}
                bounces={false}
            >

                <FlatList
                    data={noOfAddress}
                    extraData={noOfAddress}
                    keyExtractor={(item, index) => `${index}`}
                    renderItem={({ item, index }) => {
                        return (
                            <View>

                                <CommonHeading headingText={index === 0 ? StringConstants.PICKUP_INFORMATION : StringConstants.DROP_OFF_INFORMATION}
                                    outerStyles={{ marginTop: index === 0 ? 0 : 20 }} />
                                <TouchableOpacity style={[styles.locationButtonView]}
                                    disabled={!item.findAddress}
                                    onPress={() => {
                                        setSelectedIndex(index)
                                        setShowLocationModal(true)
                                    }}>
                                    <Image source={Images.IC_LOCATION} style={[styles.locationIcon, !item.findAddress && { tintColor: Colors.COLOR_GREY1 }]} />
                                    <Text
                                        numberOfLines={1}
                                        style={[styles.selectLocation, { flex: 0.9 }, !item.findAddress && { color: Colors.COLOR_GREY1 }]}>
                                        {noOfAddress[index]?.location ? noOfAddress[index]?.location : StringConstants.SELECT_LOCATION}

                                    </Text>
                                </TouchableOpacity>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setSelectedIndex(index)
                                            navigation.navigate(AppConstants.screens.CHOOSE_CONTACT, { isFromChooseContact: true, fromCreateJob: false })
                                        }}>
                                        <Text style={[styles.findAddressText, { marginLeft: 28 }]}>{StringConstants.CHOOSE_CONTACT}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setSelectedIndex(index)
                                        tapOnSelectLocation(index)
                                    }}>
                                        <Text style={styles.findAddressText}>{item.findAddress ? StringConstants.DID_NOT_FIND_ADDRESS : StringConstants.SELECT_LOCATION}</Text>
                                    </TouchableOpacity>
                                </View>


                                {!item.findAddress &&
                                    <View>
                                        <TextField
                                            containerStyle={styles.containerStyles}
                                            placeholder={StringConstants.ADDRESS_LINE_1}
                                            placeholderTextColor={Colors.BUTTON_GREY}
                                            returnKeyType={'next'}
                                            fieldRef={address1Ref}
                                            autoCapitalize='sentences'
                                            onSubmitEditing={() => {
                                                if (address2Ref && address2Ref.current) {
                                                    address2Ref.current.focus();
                                                }
                                            }}
                                            onChangeText={(item) => {
                                                let tempData = [...noOfAddress]
                                                tempData[index].addressLine1 = item
                                                setNoOfAddress(tempData)
                                            }}
                                            defaultValue={noOfAddress[index].addressLine1}

                                        />
                                        <TextField
                                            containerStyle={styles.containerStyles}
                                            placeholder={StringConstants.ADDRESS_LINE_2}
                                            placeholderTextColor={Colors.BUTTON_GREY}
                                            returnKeyType={'next'}
                                            fieldRef={address2Ref}
                                            autoCapitalize='sentences'
                                            onSubmitEditing={() => {
                                                if (cityRef && cityRef.current) {
                                                    cityRef.current.focus();
                                                }
                                            }}
                                            onChangeText={(item) => {
                                                let tempData = [...noOfAddress]
                                                tempData[index].addressLine2 = item
                                                setNoOfAddress(tempData)
                                            }}
                                            defaultValue={noOfAddress[index].addressLine2}

                                        />
                                        <TextField
                                            containerStyle={styles.containerStyles}
                                            placeholder={StringConstants.CITY}
                                            placeholderTextColor={Colors.BUTTON_GREY}
                                            returnKeyType={'next'}
                                            fieldRef={cityRef}
                                            autoCapitalize='words'
                                            onSubmitEditing={() => {
                                                if (stateRef && stateRef.current) {
                                                    stateRef.current.focus();
                                                }
                                            }}
                                            onChangeText={(item) => {
                                                let tempData = [...noOfAddress]
                                                tempData[index].city = item
                                                setNoOfAddress(tempData)
                                            }}
                                            defaultValue={noOfAddress[index].city}
                                        />

                                        <View style={styles.inputFieldView}>
                                            <TextField
                                                containerStyle={{ width: DimensionsValue.VALUE_160, borderWidth: 0 }}
                                                parentStyles={styles.parentStyles}
                                                placeholder={StringConstants.STATE}
                                                placeholderTextColor={Colors.BUTTON_GREY}
                                                returnKeyType={'next'}
                                                fieldRef={stateRef}
                                                autoCapitalize='words'
                                                onSubmitEditing={() => {
                                                    if (zipCodeRef && zipCodeRef.current) {
                                                        zipCodeRef.current.focus();
                                                    }
                                                }}
                                                onChangeText={(item) => {
                                                    let tempData = [...noOfAddress]
                                                    tempData[index].state = item
                                                    setNoOfAddress(tempData)
                                                }}
                                                defaultValue={noOfAddress[index].state}
                                            />
                                            <TextField
                                                containerStyle={{ width: DimensionsValue.VALUE_160, borderWidth: 0 }}
                                                parentStyles={styles.parentStyles}
                                                placeholder={StringConstants.ZIP_CODE}
                                                placeholderTextColor={Colors.BUTTON_GREY}
                                                returnKeyType={'next'}
                                                maxLength={8}
                                                fieldRef={zipCodeRef}
                                                autoCapitalize='characters'
                                                onChangeText={(item) => {
                                                    let tempData = [...noOfAddress]
                                                    tempData[index].zip_code = item
                                                    setNoOfAddress(tempData)
                                                }}
                                                defaultValue={noOfAddress[index].zip_code}
                                            />
                                        </View>
                                        <TouchableOpacity onPress={() => {
                                            setSelectedIndex(index)
                                            setShowMap(true)
                                        }}>
                                            <Text style={styles.dropPinText}>{StringConstants.DROP_PIN}</Text>
                                        </TouchableOpacity>
                                    </View>
                                }

                            </View>
                        )
                    }}

                />



                <CommonHeading headingText={StringConstants.SELECT_VEHICLE} outerStyles={{ marginTop: 20 }} />
                <Dropdown
                    itemContainerStyle={{ backgroundColor: Colors.WHITE }}
                    itemTextStyle={{ color: Colors.BLACK, fontFamily: Fonts.DM_SANS_SEMIBOLD }}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    style={styles.dropdownContainer}
                    data={vehichleTypes}
                    labelField="label"
                    valueField="value"
                    // dropdownPosition='top'
                    renderLeftIcon={() => (
                        <Image source={Images.IC_DRIVE} style={{ marginLeft: 10, tintColor: Colors.COLOR_GREY2 }} />
                    )}
                    placeholder={StringConstants.SELECT_VEHICLE}
                    value={selectedVehicle}
                    // onChange={(item: any) => onChangeVehicle(item?.value)}
                    onChange={(item: any) => setSelectedVehicle(item?.value)}
                />


                {/* <CommonHeading headingText={StringConstants.TIME_SLOT} outerStyles={{ marginTop: 20 }} />

                <TouchableOpacity style={[styles.locationButtonView, { marginBottom: 20, height: 45 }]} onPress={() => setShowTimePicker(true)}>
                    <Image source={Images.IC_WATCH} style={styles.locationIcon} />
                    <Text style={styles.selectLocation}>
                        {time
                            ? time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
                            : StringConstants.SELECT_PICKUP_TIME
                        }
                    </Text>
                </TouchableOpacity>

                {showTimePicker &&
                    <DatePicker
                        modal
                        open={showTimePicker}
                        date={date || new Date()}
                        onCancel={() => setShowTimePicker(false)}
                        onConfirm={(item) => {
                            setTime(item)
                            setShowTimePicker(false);
                        }}

                        mode='time'
                        minimumDate={new Date()}
                    />
                } */}

                <CommonHeading headingText={StringConstants.PRICE} outerStyles={{ marginTop: 20 }} />
                <TextField
                    containerStyle={styles.containerStyles}
                    placeholder={StringConstants.ENTER_PRICE}
                    placeholderTextColor={Colors.BUTTON_GREY}
                    // returnKeyType={'next'}
                    maxLength={10}
                    leftImage={Images.IC_POUND}
                    leftIconStyles={{ tintColor: Colors.COLOR_GREY2 }}
                    // fieldRef={priceRef}
                    keyboardType='numeric'
                    value={hotshotPriceResponse?.driver_amount}
                    editable={false}
                // value={price}
                // onChangeText={(val) => setPrice(val)}

                />


                <CommonHeading headingText={StringConstants.TIME_SLOT} outerStyles={{ marginTop: 20 }} />

                <TouchableOpacity style={[styles.locationButtonView, { marginBottom: 20, height: 45 }]} onPress={() => setShowTimePicker(true)}>
                    <Image source={Images.IC_WATCH} style={styles.locationIcon} />
                    <Text style={styles.selectLocation}>
                        {time
                            ? time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
                            : StringConstants.SELECT_PICKUP_TIME
                        }
                    </Text>
                </TouchableOpacity>

                {showTimePicker &&
                    <DatePicker
                        modal
                        open={showTimePicker}
                        date={date || new Date()}
                        onCancel={() => setShowTimePicker(false)}
                        onConfirm={(item) => {
                            setTime(item)
                            setShowTimePicker(false);
                        }}

                        mode='time'
                        minimumDate={new Date()}
                    />
                }


                {/* <CommonHeading headingText={StringConstants.SELECT_VEHICLE} outerStyles={{ marginTop: 20 }} />
                <Dropdown
                    itemContainerStyle={{ backgroundColor: Colors.WHITE }}
                    itemTextStyle={{ color: Colors.BLACK, fontFamily: Fonts.DM_SANS_SEMIBOLD }}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    style={styles.dropdownContainer}
                    data={vehichleTypes}
                    labelField="label"
                    valueField="value"
                    dropdownPosition='top'
                    renderLeftIcon={() => (
                        <Image source={Images.IC_DRIVE} style={{ marginLeft: 10, tintColor: Colors.COLOR_GREY2 }} />
                    )}
                    placeholder={StringConstants.SELECT_VEHICLE}
                    value={selectedVehicle}
                    onChange={(item: any) => setSelectedVehicle(item?.value)}
                /> */}
                <Button primaryTitle={StringConstants.SAVE}
                    // onPress={() => navigation.navigate(AppConstants.screens.HOTSHOT_SCREEN, { addHotshot: true })}
                    onPress={tapOnSave}
                    containerStyles={{ backgroundColor: Colors.ORANGE }}
                />

            </KeyboardAwareScrollView>
        </View>
    )
}

