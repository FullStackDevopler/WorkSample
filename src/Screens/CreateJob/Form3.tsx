import { View, Text, TouchableOpacity, Image, Keyboard, TextInput, FlatList, LogBox, Alert } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { styles } from './styles'
import { StringConstants } from '../../Theme/StringConstants'
import { Images } from '../../Assets'
import TextField from '../../Components/TextField'
import { Colors } from '../../Theme/Colors'
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view'
import { AppConstants } from '../../Theme/AppConstants'
import { Dropdown } from 'react-native-element-dropdown';
import UploadDocuments from '../../Components/UploadDocuments'
import Button from '../../Components/Button'
import DatePicker from "react-native-date-picker";
import DocumentPicker, { types } from 'react-native-document-picker';
import { getJobPriceAction, vehichleListAction } from '../../Redux/Actions/jobActions'
import { useDispatch, useSelector } from 'react-redux'
import LoaderModal from '../../Modals/LoaderModal'
import ValidationModal from '../../Modals/ValidationModal'
import { timeSlots, timeSlots2 } from '../../Theme/Helper'
import { calculateTimeDurationAndDistance, calculateTimeDurationAndDistance2 } from '../../Theme/GoogleApi'
import { emojiRegex, numberRegex, weightRegexx, zeroRegex } from '../../Theme/validation'
import { checkInternetConnection } from '../../Components/InternetConnection'
import CommonHeading from '../../Components/CommonHeading'
import { Fonts } from '../../Theme/Fonts'
import { AppLogger } from '../../Theme/utils'
import { clearJobsResponse } from '../../Redux/Reducers/jobListSlice'

export default function Form3({ navigation, route, tapOnSubmit, pickupLocations, dropOffLocations }: any): React.JSX.Element {
    const dispatch = useDispatch()
    const [isConnected, setIsConnected] = useState<boolean>(true)
    const [showValidationModal, setShowValidationModal] = useState<boolean>(false)
    const [alertTitle, setAlertTitle] = useState<string>('')
    const [selectedSlot, setSelectedSlot] = useState<string>('')
    const [selectedVehicle, setSelectedVehicle] = useState<string>('')
    const [notes, setNotes] = useState<string>('')
    const [weight, setWeight] = useState<string>('')
    const [contactNumber, setContactNumber] = useState<string>('')
    const [vehichleTypes, setVehichleTypes] = useState([])
    const [selectedVans, setSelectedVans] = useState<string>('')

    const [showDatePicker, setShowDatePicker] = useState<boolean>(false)
    const [showTimePicker, setShowTimePicker] = useState<any>(null)
    const [showStartTimePicker, setShowStartTimePicker] = useState<any>(null)
    const [showEndTimePicker, setShowEndTimePicker] = useState<any>(null)
    const [date, setDate] = useState<any>(null)
    const [time, setTime] = useState<any>(null)
    const [startTime, setStartTime] = useState<any>(null)
    const [endTime, setEndTime] = useState<any>(null)

    const [firstPdf, setFirstPdf] = useState<any>(null)
    const [secondPdf, setSecondPdf] = useState<any>(null)
    const [thirdPdf, setThirdPdf] = useState<any>(null)
    const [fourthPdf, setFourthPdf] = useState<any>(null)
    const [fifthPdf, setFifthPdf] = useState<any>(null)
    const [firstPdfSize, setFirstPdfSize] = useState<any>()
    const [secondPdfSize, setSecondPdfSize] = useState<any>()
    const [thirdPdfSize, setThirdPdfSize] = useState<any>()
    const [fourthPdfSize, setFourthPdfSize] = useState<any>()
    const [fifthPdfSize, setFifthPdfSize] = useState<any>()
    const [isLoaderShown, setIsLoaderShown] = useState<boolean>(false)

    const [totalDistanceInMile, setTotalDistance] = useState<string>('')
    const [totalTimeTaken, setTotalTimeTaken] = useState<string>('')

    const weightRef = useRef<TextInput>(null);
    const contactNumberRef = useRef<TextInput>(null);
    const noteSecondRef = useRef<TextInput>(null);

    const accessToken = useSelector((state: any) => state?.persistedReducer.userData.userToken);
    const vehicleList = useSelector((state: any) => state.persistedReducer.jobListData.vehicleList);
    const jobPriceResponse = useSelector((state: any) => state?.persistedReducer.jobListData.jobPriceResponse)
    let pdfs = [firstPdf, secondPdf, thirdPdf, fourthPdf, fifthPdf]

    useEffect(() => {
        if (jobPriceResponse?.amount && jobPriceResponse?.amount !== '') {
            callActionForCreateJob(jobPriceResponse?.amount, jobPriceResponse?.driver_amount)
        }

        return () => {
            dispatch(clearJobsResponse('jobPriceResponse'))
        }

    }, [jobPriceResponse])



    useEffect(() => {

        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])

        const fetchData = async () => {
            try {
                const isConnected = await checkInternetConnection();

                setIsConnected(isConnected);

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
        console.log("types in useeffect vechile", JSON.stringify(types));

        setVehichleTypes(types);
    }, [vehicleList])

    const checkValidations = () => {

        Keyboard.dismiss()
        let valid = true

        if (!date) {
            valid = false;
            setShowValidationModal(true);
            setAlertTitle(StringConstants.PLEASE_SELECT_THE_DELIEVERY_DATE);
            return
        }
        else if (selectedSlot.length === 0) {
            valid = false;
            setShowValidationModal(true);
            setAlertTitle(StringConstants.PLEASE_SELECT_THE_SLOT_FOR_DELIEVERY);
            return
        }
        else if (selectedSlot == 'Between') {
            if (!startTime) {
                valid = false;
                setShowValidationModal(true);
                setAlertTitle(StringConstants.PLEASE_SELECT_THE_START_TIME_FOR_DELIEVERY);
                return
            } else if (!endTime) {
                valid = false;
                setShowValidationModal(true);
                setAlertTitle(StringConstants.PLEASE_SELECT_THE_END_TIME_FOR_DELIEVERY);
                return
            }
        }
        else if (selectedSlot == 'Before') {
            if (!time) {
                valid = false;
                setShowValidationModal(true);
                setAlertTitle(StringConstants.PLEASE_SELECT_THE_TIME_FOR_DELIEVERY);
                return
            }
        }

        if (selectedVehicle.length === 0) {
            valid = false;
            setShowValidationModal(true);
            setAlertTitle(StringConstants.PLEASE_SELECT_THE_VEHICLE);
            return
        }
        // if (weight.length === 0) {
        //     valid = false;
        //     setShowValidationModal(true);
        //     setAlertTitle(StringConstants.PLEASE_ENTER_THE_WEIGHT);
        //     return
        // }
        // else if (zeroRegex.test(weight)) {
        //     valid = false;
        //     setShowValidationModal(true);
        //     setAlertTitle(StringConstants.WEIGHT_MUST_NOT_BE_ZERO);
        //     return;
        // }
        // else if (!weightRegexx.test(weight)) {
        //     valid = false;
        //     setShowValidationModal(true);
        //     setAlertTitle(StringConstants.PLEASE_ENTER_VALID_FORMAT);
        //     return;
        // }
        // else if (emojiRegex.test(weight)) {
        //     valid = false
        //     setShowValidationModal(true)
        //     setAlertTitle(StringConstants.EMOJI_IS_NOT_ALLOWED_IN_WEIGHT)
        //     return
        // }
        else if (contactNumber.length === 0 && route.params?.selectedPhoneNumber?.length == undefined) {
            valid = false;
            setShowValidationModal(true);
            setAlertTitle(StringConstants.PLEASE_ENTER_THE_CONTACT_NUMBER);
            return
        }
        else if (contactNumber == '0000000000') {
            valid = false;
            setShowValidationModal(true);
            setAlertTitle(StringConstants.PLEASE_ENTER_THE_CORRECT_CONTACT_NUMBER);
            return
        }
        else if (!numberRegex.test(contactNumber) && !numberRegex.test(route.params?.selectedPhoneNumber)) {
            valid = false;
            setShowValidationModal(true);
            setAlertTitle(StringConstants.PLEASE_ENTER_THE_CORRECT_CONTACT_NUMBER);
            return
        }
        else {
            valid = true;
            calculateDistanceApi()
        }
    }



    const calculateDistanceApi = async () => {
        setIsLoaderShown(true)

        // Merge pickUpLocations and dropOffLocations into noOfAddress
        const noOfAddress = [...pickupLocations, ...dropOffLocations];
        const locations = noOfAddress.map(item => item?.location || (item?.addressLine1 + item?.addressLine2 + item?.city + item?.state));
        let totalDuration = 0;
        let totalDistance = 0;
        let totalTime

        for (let i = 0; i < locations.length - 1; i++) {
            // const origin = locations[i];
            // const destination = locations[i + 1];

            const { latitude: originLat, longitude: originLng } = noOfAddress[i];
            const { latitude: destinationLat, longitude: destinationLng } = noOfAddress[i + 1];

            const { duration, distance } = await calculateTimeDurationAndDistance2(originLat, originLng, destinationLat, destinationLng);
            // const { duration, distance } = await calculateTimeDurationAndDistance(origin, destination);
            totalDuration += duration;
            totalDistance += distance;
        }

        console.log("totalDistance in form 3=>>>", totalDistance); //meters

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



        setIsLoaderShown(false)

        if ((distanceInMiles == '0' || distanceInMiles == '0.0') && minutes === 0) {
            setShowValidationModal(true)
            setAlertTitle(StringConstants.PLEASE_SELECT_ANY_OTHER_LOCATION)
        } else {

            let body = {
                vehicle: selectedVans,
                totalDistance: distanceInMiles
            }

            console.log("body in get price API", body);
            dispatch(getJobPriceAction(accessToken, body))
        }
    };


    const callActionForCreateJob = (amount: string, driver_amount: any) => {
        const modifiedDate = new Date(date).toISOString().split('T')[0];

        const modifiedStartTime = startTime ? startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) : '';
        const modifiedEndTime = endTime ? endTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) : '';
        const modifiedTime = time ? time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) : '';
        let phoneNumber = contactNumber || route?.params?.selectedPhoneNumber

        const start_time = modifiedStartTime ? modifiedStartTime : modifiedTime ? modifiedTime : ""
        const end_time = modifiedEndTime ? modifiedEndTime : ""

        const filteredDocuments = pdfs.filter((doc: any) => doc !== null && doc !== undefined);

        const locations = pickupLocations.map((item: any, index: number) => {
            return {
                location: item.location,
                addressLine1: item.addressLine1,
                addressLine2: item.addressLine2,
                city: item.city,
                state: item.state,
                zipcode: item.zip_code,
                latitude: item.latitude,
                longitude: item.longitude,
                placeId: item.placeId,
                selectPickupItemArray: item.pickUpItems.map((pickupItem: any) => ({
                    pickup: pickupItem.item,
                    pickup_count: pickupItem.count
                })),
                pick_drop_note: item.note,
            }
        })

        const drop_off = dropOffLocations.map((item: any, index: number) => {
            return {
                drop_off_location: item.location,
                addressLine1: item.addressLine1,
                addressLine2: item.addressLine2,
                city: item.city,
                state: item.state,
                zipcode: item.zip_code,
                latitude: item.latitude,
                longitude: item.longitude,
                placeId: item.placeId,
                selectdropItemArray: item.dropOffItems.map((dropItem: any) => {

                    return {
                        dropup: dropItem.item,
                        dropup_count: dropItem.count
                    };
                }),
                pick_drop_note: item.note,
            }
        })

        let myFormData = new FormData();



        locations.forEach((item: any, index: number) => {
            Object.entries(item).forEach(([key, value]: [string, any]) => {

                if (key === 'selectPickupItemArray' || key === 'selectdropItemArray') {
                    value.forEach((pickupItem: any, subIndex: number) => {

                        // Append each property of the pickupItem 
                        Object.entries(pickupItem).forEach(([subKey, subValue]) => {
                            myFormData.append(`locations[${index}][${key}][${subIndex}][${subKey}]`, subValue);
                        });
                    });
                } else {
                    myFormData.append(`locations[${index}][${key}]`, value);
                }
            });
        });

        drop_off.forEach((item: any, index: number) => {
            Object.entries(item).forEach(([key, value]: [string, any]) => {

                if (key === 'selectdropItemArray' || key === 'selectPickupItemArray') {
                    value.forEach((dropItem: any, subIndex: number) => {

                        // Append each property of the dropItem
                        Object.entries(dropItem).forEach(([subKey, subValue]) => {
                            myFormData.append(`drop_off[${index}][${key}][${subIndex}][${subKey}]`, subValue);
                        });
                    });
                } else {
                    myFormData.append(`drop_off[${index}][${key}]`, value);
                }
            });
        });
        myFormData.append('vehicle', selectedVans);
        myFormData.append('weight', weight);
        myFormData.append('contactNumber', phoneNumber);
        myFormData.append('note', notes);
        myFormData.append('dates', modifiedDate);
        myFormData.append('time_slot', selectedSlot);
        myFormData.append('start_time', start_time);
        myFormData.append('end_time', end_time);
        myFormData.append('totalTime', totalTimeTaken);
        myFormData.append('totalDistance', totalDistanceInMile);
        myFormData.append('distanceType', 'Miles');
        myFormData.append('amount', amount);
        myFormData.append('driver_amount', driver_amount);

        if (filteredDocuments.length > 0) {
            filteredDocuments.forEach((item: any, index: number) => {
                myFormData.append(`documents[${index}]`, {
                    uri: item.uri,
                    name: item.name,
                    type: 'application/pdf',
                });
            });
        }


        tapOnSubmit(myFormData)
        dispatch(clearJobsResponse('jobPriceResponse'))

    }



    const tapOnUploadFirstPdf = useCallback(async () => {
        try {
            const response = await DocumentPicker.pick({
                presentationStyle: 'fullScreen',
                type: [types.pdf],
                allowMultiSelection: false,
            });


            const selectedFile = response[0];

            if (selectedFile !== undefined) {
                const fileSize = selectedFile?.size ?? 0; // Use 0 if size is undefined or null
                const fileSizeInMB = fileSize / (1024 * 1024)

                // setFirstPdfSize(fileSize)

                const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB in bytes
                // setFirstPdf(selectedFile);

                if (fileSize <= maxSizeInBytes) {
                    setFirstPdf(selectedFile);
                    setFirstPdfSize(fileSizeInMB.toFixed(2))

                } else {
                    setAlertTitle("File size must be less than 5 MB.")
                    setShowValidationModal(true)
                }
            } else {
                AppLogger('No file selected');
            }

        } catch (err) {
            AppLogger("err in first pdf", err);
        }
    }, []);

    const tapOnUploadSecondPdf = useCallback(async () => {
        try {
            const response = await DocumentPicker.pick({
                presentationStyle: 'fullScreen',
                type: [types.pdf],
                allowMultiSelection: false,
            });


            const selectedFile = response[0];

            if (selectedFile !== undefined) {
                const fileSize = selectedFile.size ?? 0; // Use 0 if size is undefined
                const fileSizeInMB = fileSize / (1024 * 1024)

                // setSecondPdfSize(fileSize)

                const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB in bytes
                // setSecondPdf(selectedFile);

                if (fileSize <= maxSizeInBytes) {
                    setSecondPdf(selectedFile);
                    setSecondPdfSize(fileSizeInMB.toFixed(2))

                } else {
                    setAlertTitle("File size must be less than 5 MB.")
                    setShowValidationModal(true)
                }
            } else {
                AppLogger('No file selected');
            }

        } catch (err) {
            AppLogger("err in first pdf", err);
        }
    }, []);

    const tapOnUploadThirdPdf = useCallback(async () => {
        try {
            const response = await DocumentPicker.pick({
                presentationStyle: 'fullScreen',
                type: [types.pdf],
                allowMultiSelection: false,
            });


            const selectedFile = response[0];

            if (selectedFile !== undefined) {
                const fileSize = selectedFile?.size ?? 0; // Use 0 if size is undefined;
                const fileSizeInMB = fileSize / (1024 * 1024)


                const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB in bytes
                // setThirdPdf(selectedFile);

                if (fileSize <= maxSizeInBytes) {
                    setThirdPdf(selectedFile);
                    setThirdPdfSize(fileSizeInMB.toFixed(2))

                } else {
                    setAlertTitle("File size must be less than 5 MB.")
                    setShowValidationModal(true)
                }
            } else {
                AppLogger('No file selected');
            }

        } catch (err) {
            AppLogger("err in first pdf", err);
        }
    }, []);

    const tapOnUploadFourthPdf = useCallback(async () => {
        try {
            const response = await DocumentPicker.pick({
                presentationStyle: 'fullScreen',
                type: [types.pdf],
                allowMultiSelection: false,
            });

            AppLogger('Selected first pdf:', response);

            const selectedFile = response[0];

            if (selectedFile !== undefined) {
                const fileSize = selectedFile?.size ?? 0; // Use 0 if size is undefined;
                AppLogger('file size: ', fileSize);
                const fileSizeInMB = fileSize / (1024 * 1024)
                AppLogger('file Size In MB', fileSizeInMB.toFixed(2));


                const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB in bytes
                // setFourthPdf(selectedFile);

                if (fileSize <= maxSizeInBytes) {
                    setFourthPdf(selectedFile);
                    setFourthPdfSize(fileSizeInMB.toFixed(2))

                } else {
                    setAlertTitle("File size must be less than 5 MB.")
                    setShowValidationModal(true)
                }
            } else {
                AppLogger('No file selected');
            }

        } catch (err) {
            AppLogger("err in first pdf", err);
        }
    }, []);

    const tapOnUploadFifthPdf = useCallback(async () => {
        try {
            const response = await DocumentPicker.pick({
                presentationStyle: 'fullScreen',
                type: [types.pdf],
                allowMultiSelection: false,
            });


            const selectedFile = response[0];

            if (selectedFile !== undefined) {
                const fileSize = selectedFile?.size ?? 0; // Use 0 if size is undefined;
                const fileSizeInMB = fileSize / (1024 * 1024)

                const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB in bytes
                // const maxSizeInBytes = 25 * 1024 * 1024; // 25 MB in bytes
                // setFifthPdf(selectedFile);

                if (fileSize <= maxSizeInBytes) {
                    setFifthPdf(selectedFile);
                    setFifthPdfSize(fileSizeInMB.toFixed(2))

                } else {
                    setAlertTitle("File size must be less than 5 MB.")
                    setShowValidationModal(true)
                }
            } else {
                AppLogger('No file selected');
            }

        } catch (err) {
            AppLogger("err in first pdf", err);
        }
    }, []);

    const tapOnAddNumber = () => {
        navigation.navigate(AppConstants.screens.SELECT_CONTACT, { fromCreateJob: true })
    }

    //to check the date whether it is today date or not
    const isToday = (date: any) => {
        const today = new Date();
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
    };

    return (
        <KeyboardAwareScrollView automaticallyAdjustKeyboardInsets={true}
            onScrollBeginDrag={() => Keyboard.dismiss()}
            enableAutomaticScroll={false}
            showsVerticalScrollIndicator={false}
            bounces={false}>

            {(isLoaderShown) && <LoaderModal showModal={isLoaderShown} />}
            {showValidationModal &&
                <ValidationModal
                    showModal={showValidationModal}
                    hideModal={() => {
                        setShowValidationModal(false)
                        setAlertTitle('')
                    }}
                    title={alertTitle}
                />
            }
            <CommonHeading headingText={StringConstants.DATE_AND_TIME_SLOT} />

            <TouchableOpacity style={[styles.locationButtonView, { marginBottom: 20, height: 45 }]} onPress={() => setShowDatePicker(true)}>
                <Image source={Images.IC_CALENDER} style={styles.locationIcon} />
                <Text style={styles.selectLocation}>  {date ? new Date(date).toLocaleDateString('en-GB') : StringConstants.SELECT_DATE}</Text>
            </TouchableOpacity>

            {showDatePicker &&
                <DatePicker
                    modal
                    open={showDatePicker}
                    date={new Date()}
                    // date={date || new Date()}
                    onCancel={() => setShowDatePicker(false)}
                    onConfirm={(item) => {
                        setDate(item)
                        setShowDatePicker(false);
                    }}
                    mode='date'
                    minimumDate={new Date()}

                />
            }
            <Dropdown
                itemContainerStyle={{ backgroundColor: Colors.WHITE }}
                itemTextStyle={{ color: Colors.BLACK, fontFamily: Fonts.DM_SANS_SEMIBOLD }}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                style={styles.dropdownContainer}
                data={date && isToday(date) ? timeSlots : timeSlots2}
                labelField="label"
                valueField="value"
                placeholder={StringConstants.SELECT_DELIVERY_TIME_SLOT}
                value={selectedSlot}
                onChange={(item) => setSelectedSlot(item?.value)}
            />

            {
                selectedSlot == 'Between' &&
                <View style={styles.inputFieldView}>
                    <TouchableOpacity style={[styles.locationButtonView, { marginBottom: 20, height: 45, width: 140 }]}
                        onPress={() => setShowStartTimePicker(true)}>
                        <Image source={Images.IC_CLOCK} style={[styles.locationIcon, { height: 17 }]} />
                        <Text style={styles.selectLocation}>
                            {startTime
                                ? startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
                                : StringConstants.START_TIME
                            }
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.locationButtonView, { marginBottom: 20, height: 45, width: 140 }]}
                        onPress={() => startTime !== null && setShowEndTimePicker(true)}>
                        <Image source={Images.IC_CLOCK} style={[styles.locationIcon, { height: 17 }]} />
                        <Text style={styles.selectLocation}>
                            {endTime
                                ? endTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
                                : StringConstants.END_TIME
                            }
                        </Text>
                    </TouchableOpacity>
                </View>

            }


            {showStartTimePicker &&
                <DatePicker
                    modal
                    open={showStartTimePicker}
                    minimumDate={new Date(Date.now() + 60000)} // Set minimum time to current time + 1 minute
                    date={date || new Date()}
                    onCancel={() => setShowStartTimePicker(false)}
                    onConfirm={(item) => {
                        setStartTime(item)
                        setShowStartTimePicker(false);
                    }}
                    mode='time'
                />
            }

            {showEndTimePicker &&
                <DatePicker
                    modal
                    open={showEndTimePicker}
                    date={startTime || new Date()}
                    minimumDate={startTime ? new Date(startTime.getTime() + 60000) : new Date()} // Set minimum time to start time + 1 minute
                    onCancel={() => setShowEndTimePicker(false)}
                    onConfirm={(item) => {
                        setEndTime(item)
                        setShowEndTimePicker(false);
                    }}
                    mode='time'
                />
            }

            {
                selectedSlot == 'Before' &&
                <TouchableOpacity style={[styles.locationButtonView, { marginBottom: 20, height: 45 }]} onPress={() => setShowTimePicker(true)}>
                    <Image source={Images.IC_CLOCK} style={[styles.locationIcon, { height: 17 }]} />
                    <Text style={styles.selectLocation}>
                        {time
                            ? time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
                            : StringConstants.SELECT_TIME
                        }
                    </Text>
                </TouchableOpacity>
            }

            {showTimePicker &&
                <DatePicker
                    modal
                    open={showTimePicker}
                    date={date || new Date()}
                    minimumDate={new Date(Date.now() + 60000)} // Set minimum time to current time + 1 minute
                    onCancel={() => setShowTimePicker(false)}
                    onConfirm={(item) => {
                        setTime(item)
                        setShowTimePicker(false);
                    }}
                    mode='time'
                />
            }

            <CommonHeading headingText={StringConstants.SELECT_VEHICLE} outerStyles={{ marginTop: 25 }} />
            <Dropdown
                itemContainerStyle={{ backgroundColor: Colors.WHITE }}
                itemTextStyle={{ color: Colors.BLACK, fontFamily: Fonts.DM_SANS_SEMIBOLD }}
                renderLeftIcon={() => (
                    <Image source={Images.IC_DRIVE} style={{ marginLeft: 10, tintColor: Colors.COLOR_GREY2 }} />
                )}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                style={styles.dropdownContainer}
                data={vehichleTypes}
                labelField="label"
                valueField="label"
                placeholder={StringConstants.SELECT_VEHICLE}
                value={selectedVehicle}
                onChange={(item: any) => {          

                    setSelectedVehicle(item?.label)
                    setSelectedVans(item?.value)
                }
                }
            />


            <CommonHeading headingText={StringConstants.WEIGHT} outerStyles={{ marginTop: 25 }} />
            <TextField
                containerStyle={styles.containerStyles}
                placeholder={StringConstants.ENTER_WEIGHT}
                placeholderTextColor={Colors.BUTTON_GREY}
                value={weight}
                leftImage={Images.IC_WEIGHT}
                leftIconStyles={{ tintColor: Colors.COLOR_GREY2 }}
                maxLength={10}
                onChangeText={(text) => setWeight(text)}
                keyboardType={'decimal-pad'}
                returnKeyType={'done'}
                fieldRef={weightRef}
            />


            <CommonHeading headingText={StringConstants.CONTACT_NUMBER} outerStyles={{ marginTop: 25 }} />
            <TextField
                containerStyle={styles.containerStyles}
                placeholder={StringConstants.ENTER_CONTACT_NUMBER}
                placeholderTextColor={Colors.BUTTON_GREY}
                leftImage={Images.IC_PHONE}
                leftIconStyles={{ tintColor: Colors.COLOR_GREY2 }}
                defaultValue={route?.params?.selectedPhoneNumber ? route?.params?.selectedPhoneNumber : contactNumber}
                maxLength={18}
                onChangeText={(text) => setContactNumber(text)}
                returnKeyType={'next'}
                fieldRef={contactNumberRef}
                keyboardType='numeric'
                onSubmitEditing={() => {
                    if (noteSecondRef && noteSecondRef.current) {
                        noteSecondRef.current.focus();
                    }
                }}
            />

            <TouchableOpacity style={[styles.addContactButton, { width: 130 }]}
                onPress={tapOnAddNumber}
            >
                <Image source={Images.IC_ADD} style={styles.plusIcon} />
                <Text style={styles.addContactText}>{StringConstants.ADD_NUMBER}</Text>
            </TouchableOpacity>

            <CommonHeading headingText={StringConstants.NOTES} outerStyles={{ marginTop: 25 }} />
            <TextField
                containerStyle={styles.containerStyles}
                placeholder={StringConstants.NOTES2}
                placeholderTextColor={Colors.BUTTON_GREY}
                value={notes}
                maxLength={300}
                onChangeText={(text) => setNotes(text)}
                customHeight={120}
                multiline
                autoCapitalize='sentences'
                customStyles={{ paddingTop: 13 }}
                returnKeyType={'done'}
                fieldRef={noteSecondRef}
                onSubmitEditing={() => { }}
            />

            <CommonHeading headingText={StringConstants.UPLOAD_DOCUMENTS} outerStyles={{ marginTop: 25 }} />
            <UploadDocuments
                topText={firstPdfSize ? 'Pdf' : StringConstants.CLICK_TO_UPLOAD}
                bottomText={firstPdfSize ? firstPdfSize + ' MB' : '' + '(Max. File size: 5 MB)'}
                uploaded={firstPdfSize ? true : false}
                onPress={tapOnUploadFirstPdf}
                uriAvaiable={false}
            />
            <UploadDocuments
                topText={secondPdfSize ? 'Pdf' : StringConstants.CLICK_TO_UPLOAD}
                bottomText={secondPdfSize ? secondPdfSize + ' MB' : '' + '(Max. File size: 5 MB)'}
                uploaded={secondPdfSize ? true : false}
                onPress={tapOnUploadSecondPdf}
                uriAvaiable={false}

            />
            <UploadDocuments
                topText={thirdPdfSize ? 'Pdf' : StringConstants.CLICK_TO_UPLOAD}
                bottomText={thirdPdfSize ? thirdPdfSize + ' MB' : '' + '(Max. File size: 5 MB)'}
                uploaded={thirdPdfSize ? true : false}
                onPress={tapOnUploadThirdPdf}
                uriAvaiable={false}

            />
            <UploadDocuments
                topText={fourthPdfSize ? 'Pdf' : StringConstants.CLICK_TO_UPLOAD}
                bottomText={fourthPdfSize ? fourthPdfSize + ' MB' : '' + '(Max. File size: 5 MB)'}
                uploaded={fourthPdfSize ? true : false}
                onPress={tapOnUploadFourthPdf}
                uriAvaiable={false}

            />
            <UploadDocuments
                topText={fifthPdfSize ? 'Pdf' : StringConstants.CLICK_TO_UPLOAD}
                bottomText={fifthPdfSize ? fifthPdfSize + ' MB' : '' + '(Max. File size: 5 MB)'}
                uploaded={fifthPdfSize ? true : false}
                onPress={tapOnUploadFifthPdf}
                uriAvaiable={false}

            />

            <Button
                isLoading={isLoaderShown}
                primaryTitle={StringConstants.CREATE_JOB}
                onPress={() => checkValidations()}
                containerStyles={{ backgroundColor: Colors.ORANGE }}
            />
        </KeyboardAwareScrollView>
    )
}