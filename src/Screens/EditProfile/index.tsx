import { View, Text, Image, TouchableOpacity, TextInput, Keyboard, Alert, Linking } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { styles } from './styles'
import { StringConstants } from '../../Theme/StringConstants'
import { Images } from '../../Assets'
import Header from '../../Components/Header'
import TextField from '../../Components/TextField'
import { Colors } from '../../Theme/Colors'
import Button from '../../Components/Button'
import { DimensionsValue } from '../../Theme/DimensionsValue'
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view'
import ValidationModal from '../../Modals/ValidationModal'
import { alphaNumericRegex, alphabetRegex, emojiRegex, numberRegex, validation, zeroRegex } from '../../Theme/validation'
import ImagePicker from 'react-native-image-crop-picker';
import DatePicker from 'react-native-date-picker'
import UploadDocuments from '../../Components/UploadDocuments'
import { useDispatch, useSelector } from 'react-redux'
import { editProfileAction, editProfileImageAction, getProfile } from '../../Redux/Actions/userActions'
import DocumentPicker, { types } from 'react-native-document-picker';
import LoaderModal from '../../Modals/LoaderModal'
import moment from 'moment'
import { deleteSignInResponse } from '../../Redux/Reducers/userInfoSlice'
import DropPinModal from '../../Modals/DropPinModal'
import FindAddressModal from '../../Modals/FindAddressModal'
import { checkInternetConnection } from '../../Components/InternetConnection'
import { capitalizeFirstLetter } from '../../Theme/Helper'
import { AppLogger } from '../../Theme/utils'
import validator from 'validator'

interface FormData {
    username: string,
    email: string;
    phoneNumber: string;
    dob: any;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zipCode: string;
    note: string;
    findAddress: boolean;
    location: string;
    latitude: number,
    longitude: number,
    placeId: string,
    document?: any
}

export default function EditProfile({ navigation, route }: any): React.JSX.Element {
    const dispatch = useDispatch()

    const isLoading = useSelector((state: any) => state?.persistedReducer.userData.isLoading)
    const errorMessage = useSelector((state: any) => state.persistedReducer.userData.error);
    const accessToken = useSelector((state: any) => state?.persistedReducer.userData.userToken);
    const profileDetails = useSelector((state: any) => state?.persistedReducer.userData.profileDetails);
    const editedProfileResponse = useSelector((state: any) => state.persistedReducer.userData.editedProfileResponse);


    const [showValidationModal, setShowValidationModal] = useState<boolean>(false)
    const [alertTitle, setAlertTitle] = useState<string>('')
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false)
    // const [firstPdf, setFirstPdf] = useState<any>()
    // const [firstPdfSize, setFirstPdfSize] = useState<any>()
    const [showLocationModal, setShowLocationModal] = useState<boolean>(false)
    const [showMap, setShowMap] = useState<boolean>(false);
    const [isConnected, setIsConnected] = useState<boolean>(true);
    const [userImage, setUserImage] = useState<string>('');
    // const [selectedGender, setSelectedGender] = useState<string>(profileDetails?.gender ? profileDetails?.gender : '')
    const [formData, setFormData] = useState<FormData>({
        username: profileDetails?.full_name ? profileDetails?.full_name : '',
        email: profileDetails?.email ? profileDetails?.email : '',
        phoneNumber: profileDetails?.phone ? profileDetails?.phone : '',
        dob: profileDetails?.dob ? profileDetails?.dob : '',
        addressLine1: profileDetails?.userMeta ? profileDetails.userMeta?.address1 : '',
        addressLine2: profileDetails?.userMeta ? profileDetails.userMeta?.address2 : '',
        city: profileDetails?.userMeta ? profileDetails.userMeta?.city : '',
        state: profileDetails?.userMeta ? profileDetails.userMeta?.state : '',
        zipCode: profileDetails?.userMeta ? profileDetails.userMeta?.zipcode : '',
        note: profileDetails?.userMeta ? profileDetails.userMeta?.note : '',
        findAddress: true,
        location: profileDetails?.userMeta ? profileDetails.userMeta?.location : '',
        latitude: profileDetails?.userMeta ? profileDetails.userMeta?.latitude : '',
        longitude: profileDetails?.userMeta ? profileDetails.userMeta?.longitude : '',
        placeId: profileDetails?.userMeta ? profileDetails.userMeta?.placeId : '',
    });
    const [frontImage, setFrontImage] = useState<any>(null)
    const [frontImageSize, setFrontImageSize] = useState<any>()
    const [backImage, setBackImage] = useState<any>(null)
    const [backImageSize, setBackImageSize] = useState<any>()
    const [firstInsuranceImage, setFirstInsuranceImage] = useState<any>(null)
    const [firstInsuranceImageSize, setFirstInsuranceImageSize] = useState<any>()
    const [secondInsuranceImage, setSecondInsuranceImage] = useState<any>(null)
    const [secondInsuranceImageSize, setSecondInsuranceImageSize] = useState<any>()
    const [thirdInsuranceImage, setThirdInsuranceImage] = useState<any>(null)
    const [thirdInsuranceImageSize, setThirdInsuranceImageSize] = useState<any>()




    useEffect(() => {
        const fetchData = async () => {
            try {
                const isConnected = await checkInternetConnection();

                setIsConnected(isConnected);

                if (!isConnected) {
                    setAlertTitle(StringConstants.PLEASE_CHECK_YOUR_INTERNET_CONNECTION);
                    setShowValidationModal(true);
                }
            } catch (error) {
                console.error('Error checking internet connection:', error);
            }
        };

        fetchData();

        return () => {
            dispatch(deleteSignInResponse('error'))
        }
    }, []);

    useEffect(() => {
        if (!isLoading && editedProfileResponse?.userId) {
            setShowValidationModal(true)
            setAlertTitle(StringConstants.PROFILE_UPDATED_SUCCESSFULLY)
        }


    }, [editedProfileResponse])

    useEffect(() => {
        if (errorMessage !== null) {
            setShowValidationModal(true)
            setAlertTitle(errorMessage)
        }
        else if (errorMessage == null) {
            setShowValidationModal(false)
            setAlertTitle('')
        }



    }, [errorMessage])



    useEffect(() => {
        if (profileDetails?.userMeta?.address1) {
            setFormData({ ...formData, findAddress: false })
        }
    }, [profileDetails])



    const usernameRef = useRef<TextInput>(null);
    const emailRef = useRef<TextInput>(null);
    const phoneNumberRef = useRef<TextInput>(null);
    const address1Ref = useRef<TextInput>(null);
    const address2Ref = useRef<TextInput>(null);
    const cityRef = useRef<TextInput>(null);
    const stateRef = useRef<TextInput>(null);
    const zipCodeRef = useRef<TextInput>(null);
    const noteRef = useRef<TextInput>(null);

    const handleTextChange = (text: any, input: string) => {
        setFormData(prevState => ({ ...prevState, [input]: text }))
    }
    // const gender = [
    //     { label: 'Male', value: 'Male' },
    //     { label: 'Female', value: 'Female' },
    // ]

    const tapOnUpdate = async () => {

        Keyboard.dismiss()
        const { username, email, phoneNumber, dob, addressLine1, addressLine2, city, state,
            zipCode, findAddress, location, latitude, longitude } = formData
        let valid = true


        if (username.length == 0) {
            valid = false
            setShowValidationModal(true)
            setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_USERNAME)
            return

        }
        else if (username.length < 3) {
            valid = false
            setShowValidationModal(true)
            setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_CORRECT_FULL_NAME)
            return
        }
        else if (!alphabetRegex.test(username) || emojiRegex.test(username)) {
            valid = false
            setShowValidationModal(true)
            setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_CORRECT_USERNAME)
            return
        }
        else if (email.length == 0) {
            valid = false
            setShowValidationModal(true)
            setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_EMAIL_ID)
            return
        }
        else if (!validation(email, 'email')) {
            valid = false
            setShowValidationModal(true)
            setAlertTitle(StringConstants.PLEASE_ENTER_A_VALID_EMAIL_ID)
            return

        }
        else if (emojiRegex.test(email)) {
            valid = false
            setShowValidationModal(true)
            setAlertTitle(StringConstants.PLEASE_ENTER_A_VALID_EMAIL_ID)
            return
        }
        else if (phoneNumber.length == 0) {
            valid = false
            setShowValidationModal(true)
            setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_PHONE_NUMBER)
            return

        }
        // else if (phoneNumber.length < 15) {
        //     valid = false
        //     setShowValidationModal(true)
        //     setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_CORRECT_PHONE_NUMBER)
        //     return
        // }
        else if (emojiRegex.test(phoneNumber) || zeroRegex.test(phoneNumber)|| !numberRegex.test(phoneNumber)) {
            valid = false
            setShowValidationModal(true)
            setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_CORRECT_PHONE_NUMBER)
            return
        }

        else if (!dob) {
            valid = false
            setShowValidationModal(true)
            setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_DOB)
            return
        }
        // else if (selectedGender.length == 0) {
        //     valid = false
        //     setShowValidationModal(true)
        //     setAlertTitle(StringConstants.PLEASE_SELECT_YOUR_GENDER)
        //     return
        // }

        if (findAddress === true) {
            if (location.length == 0) {
                valid = false
                setShowValidationModal(true)
                setAlertTitle(StringConstants.PLEASE_SELECT_THE_LOCATION)
                return
            } else {
                valid = true;
                if (isConnected) {
                    callEditProfileAction()
                } else {
                    setAlertTitle(StringConstants.PLEASE_CHECK_YOUR_INTERNET_CONNECTION);
                    setShowValidationModal(true);
                }

            }
        }


        else {
            if (addressLine1.length == 0) {
                valid = false
                setShowValidationModal(true)
                setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_ADDRESS_LINE_1)
                return
            }
            else if (emojiRegex.test(addressLine1)) {
                valid = false
                setShowValidationModal(true)
                setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_CORRECT_ADDRESS_LINE_1)
                return
            }
            else if (addressLine2.length == 0) {
                valid = false
                setShowValidationModal(true)
                setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_ADDRESS_LINE_2)
                return
            }
            else if (emojiRegex.test(addressLine2)) {
                valid = false
                setShowValidationModal(true)
                setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_CORRECT_ADDRESS_LINE_2)
                return
            }
            else if (city.length == 0) {
                valid = false
                setShowValidationModal(true)
                setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_CITY)
                return
            }
            else if (city.length < 3) {
                valid = false
                setShowValidationModal(true)
                setAlertTitle(StringConstants.CITY_SHOULD_BE_ATLEAST_3_CHARACTERS_LONG)
                return
            }
            else if (!alphabetRegex.test(city) || emojiRegex.test(city)) {
                valid = false
                setShowValidationModal(true)
                setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_CORRECT_CITY)
                return
            }
            else if (state.length == 0) {
                valid = false
                setShowValidationModal(true)
                setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_STATE)
                return
            }
            else if (state.length < 3) {
                valid = false
                setShowValidationModal(true)
                setAlertTitle(StringConstants.STATE_SHOULD_BE_ATLEAST_3_CHARACTERS_LONG)
                return
            }
            else if (!alphabetRegex.test(state) || emojiRegex.test(state)) {
                valid = false
                setShowValidationModal(true)
                setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_CORRECT_STATE)
                return
            }
            else if (zipCode.length == 0) {
                valid = false
                setShowValidationModal(true)
                setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_ZIP_CODE)
                return
            }
            else if (zipCode.length < 5 || alphabetRegex.test(zipCode) || numberRegex.test(zipCode) || !alphaNumericRegex.test(zipCode) || emojiRegex.test(zipCode)) {
                valid = false
                setShowValidationModal(true)
                setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_CORRECT_ZIP_CODE)
                return
            }
            else if (latitude === 0 && longitude === 0) {
                valid = false
                setShowValidationModal(true)
                setAlertTitle(StringConstants.PLEASE_SELECT_THE_LOCATION_ON_MAP_USING_DROP_PIN)
                return
            }
            else {
                valid = true;
                if (isConnected) {
                    callEditProfileAction()
                } else {
                    setAlertTitle(StringConstants.PLEASE_CHECK_YOUR_INTERNET_CONNECTION);
                    setShowValidationModal(true);
                }
            }
        }
    }

    const callEditProfileAction = async () => {

        const { username, email, phoneNumber, dob, addressLine1, addressLine2, city, state,
            zipCode, location, latitude, longitude, placeId } = formData


        // let docUrl = firstPdf?.uri ? firstPdf?.uri : profileDetails?.userDocument?.docurl
        // let docName = firstPdf?.name ? firstPdf?.name : ''
        // let isValidUrl

        // if (docUrl != undefined && validator.isURL(docUrl)) {
        //     // console.log('Valid URL', docUrl);
        //     isValidUrl = true
        // } else {
        //     // console.log('Invalid URL', docUrl);
        //     isValidUrl = false
        // }
        // let doc = isValidUrl ? "" : docUrl
 

        let frontDocUrl = frontImage?.uri ? frontImage?.uri : profileDetails?.userDocument[0]?.docurl || ''
        let backDocUrl = backImage?.uri ? backImage?.uri : profileDetails?.userDocument[1]?.docurl || ''
        let firstInsuranceDocUrl = firstInsuranceImage?.uri ? firstInsuranceImage?.uri : profileDetails?.userDocument[2]?.docurl || ''
        let secondInsuranceDocUrl = secondInsuranceImage?.uri ? secondInsuranceImage?.uri : profileDetails?.userDocument[3]?.docurl || ''
        let thirdInsuranceDocUrl = thirdInsuranceImage?.uri ? thirdInsuranceImage?.uri : profileDetails?.userDocument[4]?.docurl || ''

        let isValidUrl = (url: any) => url !== undefined && validator.isURL(url);

        let frontDoc = isValidUrl(frontDocUrl) ? "" : frontDocUrl;
        let backDoc = isValidUrl(backDocUrl) ? "" : backDocUrl;
        let firstInsuranceDoc = isValidUrl(firstInsuranceDocUrl) ? "" : firstInsuranceDocUrl;
        let secondInsuranceDoc = isValidUrl(secondInsuranceDocUrl) ? "" : secondInsuranceDocUrl;
        let thirdInsuranceDoc = isValidUrl(thirdInsuranceDocUrl) ? "" : thirdInsuranceDocUrl;

        if (userImage !== "") {
            await dispatch(editProfileImageAction(userImage, accessToken));
        }

        let myFormData = new FormData();
        myFormData.append('full_name', username);
        myFormData.append('email', email);
        myFormData.append('phone', JSON.parse(phoneNumber));
        myFormData.append('dob', dob);
        // myFormData.append('gender', selectedGender);
        myFormData.append('address1', addressLine1);
        myFormData.append('address2', addressLine2);
        myFormData.append('city', city);
        myFormData.append('state', state);
        myFormData.append('zipcode', zipCode);
        myFormData.append('location', location);
        myFormData.append('latitude', latitude);
        myFormData.append('longitude', longitude);
        myFormData.append('placeId', placeId);

        if (frontDoc !== "" && frontDoc != undefined) {
            myFormData.append('drivingLicence_1', {
                uri: frontDoc,
                name: frontImage?.name ? frontImage?.name : 'drivingLicence_1',
                type: frontImage?.type ? frontImage?.type : 'image/jpeg'
            })
        }

        if (backDoc !== "" && backDoc != undefined) {
            myFormData.append('drivingLicence_2', {
                uri: backDoc,
                name: backImage?.name ? backImage?.name : 'drivingLicence_2',
                type: backImage?.type ? backImage?.type : 'image/jpeg'
            })
        }

        if (firstInsuranceDoc !== "" && firstInsuranceDoc != undefined) {
            myFormData.append('insuranceCertificate_1', {
                uri: firstInsuranceDoc,
                name: firstInsuranceImage?.name ? firstInsuranceImage?.name : 'insuranceCertificate_1',
                type: firstInsuranceImage?.type ? firstInsuranceImage?.type : 'image/jpeg'
            })
        }

        if (secondInsuranceDoc !== "" && secondInsuranceDoc != undefined) {
            myFormData.append('insuranceCertificate_2', {
                uri: secondInsuranceDoc,
                name: secondInsuranceImage?.name ? secondInsuranceImage?.name : 'insuranceCertificate_2',
                type: secondInsuranceImage?.type ? secondInsuranceImage?.type : 'image/jpeg'
            })
        }

        if (thirdInsuranceDoc !== "" && thirdInsuranceDoc != undefined) {
            myFormData.append('insuranceCertificate_3', {
                uri: thirdInsuranceDoc,
                name: thirdInsuranceImage?.name ? thirdInsuranceImage?.name : 'insuranceCertificate_3',
                type: thirdInsuranceImage?.type ? thirdInsuranceImage?.type : 'image/jpeg'
            })
        }



        console.log("myformdataa in edit profile=>", JSON.stringify(myFormData));
        dispatch(editProfileAction(myFormData, accessToken))
    }



    const openPicker = () => {
        Alert.alert('Choose Image From', 'Camera or Gallery', [
            { text: 'Camera', onPress: () => _tapOnCamera() },
            { text: 'Gallery', onPress: () => _tapOnGallery() },
            { text: 'Cancel', onPress: () => { } },
        ]);
    };

    const _tapOnCamera = () => {

        ImagePicker.openCamera({
            cropping: true,
            width: 500,
            height: 500,
            enableRotationGesture: true, //to enable rotating the image by hand gesture in android only
            cropperCircleOverlay: true,  //Enable circular cropping
        })
            .then((image) => {
                console.log('image from openCamera =>', image);
                setUserImage(image.path);
            })
            .catch((error: any) => {
                if (error && error.toString().includes('User did not grant camera permission')) {
                    console.log('User did not grant camera permission');
                } else if (error && error.message === 'User cancelled image selection') {
                    console.log('Image selection cancelled by the user');
                } else {
                    console.log('Error in uploading from the camera:', error);
                }
            });

    };

    const _tapOnGallery = () => {
        ImagePicker.openPicker({
            width: 500,
            height: 500,
            cropping: true,
            enableRotationGesture: true,
            cropperCircleOverlay: true,
        })
            .then((image) => {
                console.log('image from openGallery =>', image);
                setUserImage(image.path);
            })
            .catch((error: any) => {
                if (error && error.toString().includes('Required permission missing')) {
                    console.log('Required permission missing');
                } else if (error && error.toString().includes('User did not grant library permission.')) {
                    console.log('user did not grant library permission.');
                } else if (error && error.message === 'User cancelled image selection') {
                    console.log('Image selection cancelled by the user');
                } else {
                    console.log('Error in uploading from the gallery:', error);
                }
            });

    };

    // const tapOnUploadPdf = useCallback(async () => {
    //     try {
    //         const response = await DocumentPicker.pick({
    //             presentationStyle: 'fullScreen',
    //             type: [types.pdf],
    //             allowMultiSelection: false,
    //         });

    //         console.log('Selected first pdf:', response);

    //         const selectedFile = response[0];

    //         if (selectedFile !== undefined) {
    //             const fileSize = selectedFile?.size ?? 0; // Use 0 if size is undefined or null
    //             console.log('file size in bytes: ', fileSize);
    //             const fileSizeInMB = fileSize / (1024 * 1024)
    //             console.log('file Size In MB', fileSizeInMB.toFixed(2));

    //             // setFirstPdfSize(fileSizeInMB.toFixed(2))

    //             const maxSizeInBytes = 25 * 1024 * 1024; // 25 MB in bytes
    //             // setFirstPdf(selectedFile);

    //             if (fileSize <= maxSizeInBytes) {
    //                 setFirstPdf(selectedFile);
    //                 setFirstPdfSize(fileSizeInMB.toFixed(2))
    //             } else {
    //                 setAlertTitle("File size must be less than 25 MB.")
    //                 setShowValidationModal(true)
    //             }
    //         } else {
    //             console.log('No file selected');
    //         }

    //     } catch (err) {
    //         console.log("err in uploading pdf", err);
    //     }
    // }, []);

    const tapOnUploadFront = useCallback(async () => {
        try {
            const response = await DocumentPicker.pick({
                presentationStyle: 'fullScreen',
                type: [types.images],
                allowMultiSelection: false,
            });

            AppLogger('Selected front DL image:', response);

            const selectedFile = response[0];

            if (selectedFile !== undefined) {
                const fileSize = selectedFile?.size ?? 0; // Use 0 if size is undefined or null
                const fileSizeInMB = fileSize / (1024 * 1024)

                const maxSizeInBytes = 25 * 1024 * 1024; // 25 MB in bytes

                if (fileSize <= maxSizeInBytes) {
                    setFrontImage(selectedFile);
                    setFrontImageSize(fileSizeInMB.toFixed(2))
                } else {
                    setAlertTitle("Image size must be less than 25 MB.")
                    setShowValidationModal(true)
                }
            } else {
                AppLogger('No Image selected');
            }

        } catch (err: any) {
            AppLogger("err in front dl image", err);
        }
    }, []);


    const tapOnUploadBack = useCallback(async () => {
        try {
            const response = await DocumentPicker.pick({
                presentationStyle: 'fullScreen',
                type: [types.images],
                allowMultiSelection: false,
            });

            AppLogger('Selected back DL image:', response);

            const selectedFile = response[0];

            if (selectedFile !== undefined) {
                const fileSize = selectedFile?.size ?? 0; // Use 0 if size is undefined or null
                const fileSizeInMB = fileSize / (1024 * 1024)

                const maxSizeInBytes = 25 * 1024 * 1024; // 25 MB in bytes

                if (fileSize <= maxSizeInBytes) {
                    setBackImage(selectedFile);
                    setBackImageSize(fileSizeInMB.toFixed(2))
                } else {
                    setAlertTitle("Image size must be less than 25 MB.")
                    setShowValidationModal(true)
                }
            } else {
                AppLogger('No Image selected');
            }

        } catch (err: any) {
            AppLogger("err in back dl image", err);
        }
    }, []);

    const tapOnUploadFirstInsurance = useCallback(async () => {
        try {
            const response = await DocumentPicker.pick({
                presentationStyle: 'fullScreen',
                type: [types.images],
                allowMultiSelection: false,
            });

            AppLogger('Selected first insurance image:', response);

            const selectedFile = response[0];

            if (selectedFile !== undefined) {
                const fileSize = selectedFile?.size ?? 0; // Use 0 if size is undefined or null
                const fileSizeInMB = fileSize / (1024 * 1024)

                const maxSizeInBytes = 25 * 1024 * 1024; // 25 MB in bytes

                if (fileSize <= maxSizeInBytes) {
                    setFirstInsuranceImage(selectedFile);
                    setFirstInsuranceImageSize(fileSizeInMB.toFixed(2))
                } else {
                    setAlertTitle("Image size must be less than 25 MB.")
                    setShowValidationModal(true)
                }
            } else {
                AppLogger('No Image selected');
            }

        } catch (err: any) {
            AppLogger("err in first insurance image", err);
        }
    }, []);

    const tapOnUploadSecondInsurance = useCallback(async () => {
        try {
            const response = await DocumentPicker.pick({
                presentationStyle: 'fullScreen',
                type: [types.images],
                allowMultiSelection: false,
            });

            AppLogger('Selected second insurance image:', response);

            const selectedFile = response[0];

            if (selectedFile !== undefined) {
                const fileSize = selectedFile?.size ?? 0; // Use 0 if size is undefined or null
                const fileSizeInMB = fileSize / (1024 * 1024)

                const maxSizeInBytes = 25 * 1024 * 1024; // 25 MB in bytes

                if (fileSize <= maxSizeInBytes) {
                    setSecondInsuranceImage(selectedFile);
                    setSecondInsuranceImageSize(fileSizeInMB.toFixed(2))
                } else {
                    setAlertTitle("Image size must be less than 25 MB.")
                    setShowValidationModal(true)
                }
            } else {
                AppLogger('No Image selected');
            }

        } catch (err: any) {
            AppLogger("err in second insurance image", err);
        }
    }, []);

    const tapOnUploadThirdInsurance = useCallback(async () => {
        try {
            const response = await DocumentPicker.pick({
                presentationStyle: 'fullScreen',
                type: [types.images],
                allowMultiSelection: false,
            });

            AppLogger('Selected third insurance image:', response);

            const selectedFile = response[0];

            if (selectedFile !== undefined) {
                const fileSize = selectedFile?.size ?? 0; // Use 0 if size is undefined or null
                const fileSizeInMB = fileSize / (1024 * 1024)

                const maxSizeInBytes = 25 * 1024 * 1024; // 25 MB in bytes

                if (fileSize <= maxSizeInBytes) {
                    setThirdInsuranceImage(selectedFile);
                    setThirdInsuranceImageSize(fileSizeInMB.toFixed(2))
                } else {
                    setAlertTitle("Image size must be less than 25 MB.")
                    setShowValidationModal(true)
                }
            } else {
                AppLogger('No Image selected');
            }

        } catch (err: any) {
            AppLogger("err in  third insurance image", err);
        }
    }, []);


    // const openPdf = () => {
    //     checkAndRequestPermissions()
    // };


    // const checkAndRequestPermissions = async () => {
    //     const permissionStatus = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);

    //     if (permissionStatus === RESULTS.GRANTED) {
    //         console.log('already granted permission ');
    //         openPdfFunc()
    //     } else {
    //         const requestResult = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);

    //         if (requestResult === RESULTS.GRANTED) {
    //             console.log('granted permission ');
    //             openPdfFunc()
    //         } else {
    //             console.log('user denied the permission');
    //             setAlertTitle('You denied the permission of accessing storage so you are not able to see the pdf file')
    //             setShowValidationModal(true)
    //         }
    //     }
    // };




    // const openPdf = () => {
    //     let pdfUri
    //     // if (firstPdf?.uri) pdfUri = `${firstPdf?.uri}`
    //     pdfUri = ApiConstants.DOC_BASE_URL + profileDetails?.userDocument?.docurl
    //     console.log('pdf uri:', pdfUri);

    //     Linking.openURL(pdfUri)
    //         .then(supported => {
    //             if (!supported) {
    //                 console.log('Opening PDF link in browser is not supported');
    //             }
    //         })
    //         .catch(error => console.log('Error opening PDF link:', error));

    // }

    const openPdf = (index: number) => {
        let pdfUri = profileDetails?.userDocument[index]?.docurl
        console.log('pdf uri:', pdfUri);

        Linking.openURL(pdfUri)
            .then(supported => {
                if (!supported) {
                    console.log('Opening PDF link in browser is not supported');
                }
            })
            .catch(error => console.log('Error opening PDF link:', error));

    }


    const getProfileImage = () => {

        if (userImage !== "") {
            return { uri: userImage }
        }
        else if (profileDetails?.photo) {
            return { uri: profileDetails?.photo }
        } else return Images.IC_PICKER

    }

    const minimumDate = () => {
        var date = new Date();
        date.setFullYear(date.getFullYear() - 100);
        return date
    }

    const ageLimit = () => {
        var date = new Date();
        date.setFullYear(date.getFullYear() - 18);
        return date
    }


    const tapOnSelectLocation = () => {
        const { findAddress } = formData
        console.log('findAddress in tapOnSelectLocation', findAddress);

        let tempObj = {
            latitude: 0,
            longitude: 0,
            placeId: '',
            location: '',
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            zipCode: '',
        }
        if (findAddress) {
            setFormData({ ...formData, ...tempObj, findAddress: false })
        } else {
            setFormData({ ...formData, ...tempObj, findAddress: true })
        }
    }

    const handlePlaceSelect = (data: any, details: any) => {


        const updateAddress = {
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            zip_code: '',
            longitude: details.geometry.location.lng,
            latitude: details.geometry.location.lat,
            location: details.formatted_address,
            placeId: details.place_id
        };
        setFormData({ ...formData, ...updateAddress });
    }




    return (
        <View style={styles.rootContainer}>

            {showValidationModal &&
                <ValidationModal
                    showModal={showValidationModal}
                    hideModal={() => {
                        if (alertTitle == StringConstants.PROFILE_UPDATED_SUCCESSFULLY) {
                            dispatch(deleteSignInResponse('editedProfileResponse'))
                            setShowValidationModal(false)
                            setAlertTitle('')
                            dispatch(getProfile(accessToken));
                            navigation.goBack()
                        } else {
                            dispatch(deleteSignInResponse('error'))
                            setShowValidationModal(false)
                            setAlertTitle('')
                        }
                    }}
                    title={alertTitle}
                />
            }
            {showDatePicker &&
                <DatePicker
                    modal
                    open={showDatePicker}
                    date={formData.dob ? moment(formData.dob, 'DD-MM-YYYY').toDate() : new Date()}
                    onCancel={() => setShowDatePicker(false)}
                    onConfirm={(item) => {
                        let newDate = moment(item).format('DD/MM/yyyy')
                        handleTextChange(newDate, 'dob')
                        setShowDatePicker(false);
                    }}
                    maximumDate={ageLimit()}
                    minimumDate={minimumDate()}
                    mode='date'
                />
            }
            {isLoading && <LoaderModal showModal={isLoading} />}

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
                        setFormData({ ...formData, longitude: data.longitude, latitude: data.latitude })
                        setShowMap(false)

                    }}
                />
            }

            <Header tapOnBack={() => navigation.goBack()}
                headerText={StringConstants.EDIT_PROFILE}
            />

            <TouchableOpacity style={styles.touchImage} onPress={openPicker}>
                <Image style={styles.profileImage}
                    source={getProfileImage()}

                />
                <Image source={Images.IC_CAMERA} style={styles.cameraIcon} />
            </TouchableOpacity>
            <KeyboardAwareScrollView
                automaticallyAdjustKeyboardInsets={true}
                onScrollBeginDrag={() => Keyboard.dismiss()}
                enableAutomaticScroll={false}
                showsVerticalScrollIndicator={false}
                bounces={false}
            >

                <TextField
                    containerStyle={styles.containerStyles}
                    placeholder={StringConstants.USERNAME}
                    leftImage={Images.IC_USER}
                    value={capitalizeFirstLetter(formData.username)}
                    maxLength={40}
                    autoCapitalize={'words'}
                    editable={true}
                    onChangeText={val => handleTextChange(val, 'username')}
                    returnKeyType={'next'}
                    fieldRef={usernameRef}
                    onSubmitEditing={() => {
                        if (emailRef && emailRef.current) {
                            emailRef.current.focus();
                        }
                    }}
                />

                <TextField
                    containerStyle={styles.containerStyles}
                    placeholder={StringConstants.EMAIL}
                    leftImage={Images.IC_MAIL}
                    value={formData.email}
                    editable={false}
                    onChangeText={val => handleTextChange(val, 'email')}
                    returnKeyType={'next'}
                    fieldRef={emailRef}
                    onSubmitEditing={() => {
                        if (phoneNumberRef && phoneNumberRef.current) {
                            phoneNumberRef.current.focus();
                        }
                    }}
                />

                <TextField
                    containerStyle={styles.containerStyles}
                    placeholder={StringConstants.PHONE_NO}
                    leftImage={Images.IC_PHONE}
                    value={formData.phoneNumber}
                    maxLength={15}
                    editable={true}
                    onChangeText={val => handleTextChange(val, 'phoneNumber')}
                    returnKeyType={'next'}
                    fieldRef={phoneNumberRef}
                    onSubmitEditing={() => {
                        if (address1Ref && address1Ref.current) {
                            address1Ref.current.focus();
                        }
                    }}
                />

                <TouchableOpacity style={styles.locationButtonView} onPress={() => setShowDatePicker(true)}>
                    <Image source={Images.IC_CALENDER} style={styles.locationIcon} />
                    <Text style={[styles.selectLocation, { color: (formData.dob) ? Colors.BLACK : Colors.FIELD_BORDER }]}>
                        {formData.dob}
                    </Text>
                </TouchableOpacity>

                {/* <Dropdown
                    itemContainerStyle={{ backgroundColor: Colors.WHITE }}
                    itemTextStyle={{ color: Colors.BLACK }}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    style={styles.dropdownContainer}
                    data={gender}
                    labelField="label"
                    valueField="value"
                    placeholder={StringConstants.SELECT_GENDER}
                    value={selectedGender}
                    onChange={(item) => setSelectedGender(item?.value)}
                    renderLeftIcon={() => {
                        return (
                            <View style={{ marginLeft: 10 }}>
                                <Image source={Images.IC_GENDER} style={styles.genderIcon} />
                            </View>
                        )
                    }}
                /> */}

                <TouchableOpacity style={styles.locationButtonView}
                    disabled={!formData.findAddress}
                    onPress={() => setShowLocationModal(true)}>
                    <Image source={Images.IC_LOCATION} style={styles.locationIcon} />
                    <Text
                        numberOfLines={1}
                        style={[styles.selectLocation, { flex: 0.95 }, !formData.location && { color: Colors.FIELD_BORDER }]}>
                        {formData.location ? formData.location : StringConstants.SELECT_LOCATION}
                    </Text>
                </TouchableOpacity>



                <TouchableOpacity style={{ alignSelf: 'flex-end', marginRight: 30 }} onPress={() => {
                    tapOnSelectLocation()
                }}>
                    <Text style={styles.findAddressText}>
                        {formData.findAddress ? StringConstants.DID_NOT_FIND_ADDRESS : StringConstants.SELECT_LOCATION}
                    </Text>
                </TouchableOpacity>

                {!formData.findAddress && <View>
                    <TextField
                        containerStyle={styles.containerStyles}
                        placeholder={StringConstants.ADDRESS_LINE_1}
                        value={formData.addressLine1}
                        returnKeyType={'next'}
                        fieldRef={address1Ref}
                        maxLength={50}
                        autoCapitalize='sentences'
                        editable={true}
                        onChangeText={val => handleTextChange(val, 'addressLine1')}
                        onSubmitEditing={() => {
                            if (address2Ref && address2Ref.current) {
                                address2Ref.current.focus();
                            }
                        }}
                    />
                    <TextField
                        containerStyle={styles.containerStyles}
                        placeholder={StringConstants.ADDRESS_LINE_2}
                        returnKeyType={'next'}
                        value={formData.addressLine2}
                        maxLength={50}
                        autoCapitalize='sentences'
                        fieldRef={address2Ref}
                        editable={true}
                        onChangeText={val => handleTextChange(val, 'addressLine2')}
                        onSubmitEditing={() => {
                            if (cityRef && cityRef.current) {
                                cityRef.current.focus();
                            }
                        }}
                    />
                    <TextField
                        containerStyle={styles.containerStyles}
                        placeholder={StringConstants.CITY}
                        returnKeyType={'next'}
                        value={formData.city}
                        maxLength={40}
                        autoCapitalize='words'
                        fieldRef={cityRef}
                        editable={true}
                        onChangeText={val => handleTextChange(val, 'city')}
                        onSubmitEditing={() => {
                            if (stateRef && stateRef.current) {
                                stateRef.current.focus();
                            }
                        }}
                    />

                    <View style={styles.inputFieldView}>
                        <TextField
                            containerStyle={{ width: DimensionsValue.VALUE_160, borderWidth: 0 }}
                            parentStyles={styles.parentStyles}
                            placeholder={StringConstants.STATE}
                            returnKeyType={'next'}
                            value={formData.state}
                            fieldRef={stateRef}
                            maxLength={40}
                            autoCapitalize='words'
                            editable={true}
                            onChangeText={val => handleTextChange(val, 'state')}
                            onSubmitEditing={() => {
                                if (zipCodeRef && zipCodeRef.current) {
                                    zipCodeRef.current.focus();
                                }
                            }}
                        />
                        <TextField
                            containerStyle={{ width: DimensionsValue.VALUE_160, borderWidth: 0 }}
                            parentStyles={styles.parentStyles}
                            placeholder={StringConstants.ZIP_CODE}
                            returnKeyType={'next'}
                            maxLength={8}
                            autoCapitalize='characters'
                            value={formData.zipCode}
                            fieldRef={zipCodeRef}
                            editable={true}
                            onChangeText={val => handleTextChange(val, 'zipCode')}

                        />
                    </View>
                    <TouchableOpacity style={{ paddingVertical: 15 }} onPress={() => {
                        setShowMap(true)
                    }}>
                        <Text style={styles.dropPinText}>{StringConstants.DROP_PIN}</Text>
                    </TouchableOpacity>
                </View>}

                <Text style={styles.uploadText}>{StringConstants.UPLOAD_DRIVING_LICENCE}</Text>

                <UploadDocuments
                    topText={StringConstants.FRONT_DRIVING_LICENCE}
                    bottomText={frontImageSize ? frontImageSize + ' MB' : profileDetails?.userDocument[0]?.docurl ? StringConstants.UPLOADED : StringConstants.UPLOAD_IMAGE}
                    uploaded={true}
                    onPress={tapOnUploadFront}
                    uriAvaiable={!!profileDetails?.userDocument[0]?.docurl && !frontImage}
                    onPressEye={() => openPdf(0)}


                />

                <UploadDocuments
                    topText={StringConstants.BACK_DRIVING_LICENCE}
                    bottomText={backImageSize ? backImageSize + ' MB' : profileDetails?.userDocument[1]?.docurl ? StringConstants.UPLOADED : StringConstants.UPLOAD_IMAGE}
                    uploaded={true}
                    onPress={tapOnUploadBack}
                    uriAvaiable={!!profileDetails?.userDocument[1]?.docurl && !backImage}
                    onPressEye={() => openPdf(1)}

                />

                <Text style={styles.uploadText}>{StringConstants.UPLOAD_INSURANCE_CERTIFICATE}</Text>

                <UploadDocuments
                    topText={"Certificate 1"}
                    bottomText={firstInsuranceImageSize ? firstInsuranceImageSize + ' MB' : profileDetails?.userDocument[2]?.docurl ? StringConstants.UPLOADED : StringConstants.UPLOAD_IMAGE}
                    uploaded={true}
                    onPress={tapOnUploadFirstInsurance}
                    uriAvaiable={!!profileDetails?.userDocument[2]?.docurl && !firstInsuranceImage}
                    onPressEye={() => openPdf(2)}
                />

                <UploadDocuments
                    topText={"Certificate 2"}
                    bottomText={secondInsuranceImageSize ? secondInsuranceImageSize + ' MB' : profileDetails?.userDocument[3]?.docurl ? StringConstants.UPLOADED : StringConstants.UPLOAD_IMAGE}
                    uploaded={true}
                    onPress={tapOnUploadSecondInsurance}
                    uriAvaiable={!!profileDetails?.userDocument[3]?.docurl && !secondInsuranceImage}
                    onPressEye={() => openPdf(3)}
                />

                <UploadDocuments
                    topText={"Certificate 3"}
                    bottomText={thirdInsuranceImageSize ? thirdInsuranceImageSize + ' MB' : profileDetails?.userDocument[4]?.docurl ? StringConstants.UPLOADED : StringConstants.UPLOAD_IMAGE}
                    uploaded={true}
                    onPress={tapOnUploadThirdInsurance}
                    uriAvaiable={!!profileDetails?.userDocument[4]?.docurl && !thirdInsuranceImage}
                    onPressEye={() => openPdf(4)}
                />

                {/* <UploadDocuments
                    topText={'Pdf'}
                    bottomText={firstPdfSize ? firstPdfSize + ' MB' : '(Max. File size: 25 MB)'}
                    // uploaded= {formData.document ? true : false}   
                    uploaded={(profileDetails?.userDocument?.docurl || firstPdf?.uri) ? true : false}
                    // uploaded={firstPdf || profileDetails?.userDocument !== null && !isEmpty(profileDetails?.userDocument) ? true : false}
                    onPress={tapOnUploadPdf}
                    onPressEye={openPdf}
                    uriAvaiable={firstPdf?.uri ? false : true}
                /> */}

                <Button onPress={tapOnUpdate}
                    primaryTitle={StringConstants.UPDATE}
                    containerStyles={{ backgroundColor: Colors.ORANGE }}
                    isLoading={isLoading}
                />
            </KeyboardAwareScrollView>
        </View>
    )
}

