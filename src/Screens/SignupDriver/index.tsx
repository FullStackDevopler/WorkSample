import React, { useCallback, useEffect, useRef, useState } from "react";
import { Image, Keyboard, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { styles } from "./styles";
import { Images } from '../../Assets/index'
import { StringConstants } from "../../Theme/StringConstants";
import TextField from "../../Components/TextField";
import Button from "../../Components/Button";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import { AppConstants } from "../../Theme/AppConstants";
import { DimensionsValue } from "../../Theme/DimensionsValue";
import { Colors } from "../../Theme/Colors";
import VerifyEmailModal from "../../Modals/VerifyEmailModal";
import ValidationModal from "../../Modals/ValidationModal";
import { alphaNumericRegex, alphabetRegex, emojiRegex, numberRegex, validation, zeroRegex } from "../../Theme/validation";
import DatePicker from "react-native-date-picker";
import UploadDocuments from "../../Components/UploadDocuments"
import { signUpAction } from "../../Redux/Actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import DocumentPicker, { types } from 'react-native-document-picker';
import LoaderModal from "../../Modals/LoaderModal";
import { deleteSignInResponse } from "../../Redux/Reducers/userInfoSlice";
import moment from "moment";
import DropPinModal from "../../Modals/DropPinModal";
import FindAddressModal from "../../Modals/FindAddressModal";
import { checkInternetConnection } from "../../Components/InternetConnection";
import { AppLogger } from "../../Theme/utils";
import TermsModal from "../../Modals/TermsModal";
import { ApiConstants } from "../../Theme/ApiConstants";



export default function SignupDriver({ navigation, route }: any): React.JSX.Element {
    const dispatch = useDispatch()
    const signUpResponse = useSelector((state: any) => state?.persistedReducer.userData.signUpResponse);
    const errorMessage = useSelector((state: any) => state?.persistedReducer.userData.error)
    const isLoading = useSelector((state: any) => state?.persistedReducer.userData.isLoading)
    console.log("errorMessage in sign up screen==>>>", errorMessage);

    const [isConnected, setIsConnected] = useState<boolean>(true);
    const [showLocationModal, setShowLocationModal] = useState<boolean>(false)
    const [showMap, setShowMap] = useState<boolean>(false);
    const [showEmailVerifyModal, setShowEmailVerifyModal] = useState<boolean>(false)

    const [showPassword, setShowPassword] = React.useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] = React.useState<boolean>(false)
    const [showValidationModal, setShowValidationModal] = useState<boolean>(false)
    const [alertTitle, setAlertTitle] = useState<string>('')
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false)
    const [date, setDate] = useState<any>()
   
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
    const [showTermsModal, setShowTermsModal] = useState<boolean>(false)
    const [selectedIndex, setSelectedIndex] = useState<any>(null)
    const [termsEnabled, setTermsEnabled] = React.useState([true, true, true]); // Initialize all as enabled
   const [errorEmpty, setErrorEmpty] = useState<boolean>(false)
   const [webUrl, setWebUrl] = useState<string>('')
    const termsData = ["Service agreement", "Privacy and Data protection", "Additional clauses"]


    

    interface FormData {
        fullname: string,
        email: string;
        phoneNumber: string;
        addressLine1: string;
        addressLine2: string;
        city: string;
        state: string;
        zipCode: string;
        password: string;
        confirmPassword: string;
        findAddress: boolean;
        location: string;
        latitude: number,
        longitude: number,
        placeId: string
    }

    const [formData, setFormData] = useState<FormData>({
        fullname: '',
        email: '',
        phoneNumber: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zipCode: '',
        password: '',
        confirmPassword: '',
        findAddress: true,
        location: '',
        latitude: 0,
        longitude: 0,
        placeId: '',

    });

    const fullnameRef = useRef<TextInput>(null);
    const emailRef = useRef<TextInput>(null);
    const phoneNumberRef = useRef<TextInput>(null);
    const address1Ref = useRef<TextInput>(null);
    const address2Ref = useRef<TextInput>(null);
    const cityRef = useRef<TextInput>(null);
    const stateRef = useRef<TextInput>(null);
    const zipCodeRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);
    const confirmPasswordRef = useRef<TextInput>(null);


    useEffect(() => {
        if (!isLoading && signUpResponse?.email) {
            setAlertTitle("Profile created successfully")
            setShowValidationModal(true)
        }

    }, [signUpResponse])

    useEffect(() => {
        // Clear the error message when the component mounts
        console.log("in useeffect of deleteSignInResponse ");
        
        dispatch(deleteSignInResponse('error'));
        setErrorEmpty(true)
      }, [dispatch]);

  

    useEffect(() => {
        console.log("errorMessage in useeffect ", errorMessage, errorEmpty);

         if (errorMessage != null && !isLoading && errorEmpty) {
            console.log("errorEmpty errorEmpty", errorEmpty);
            
             setShowValidationModal(true)
            setAlertTitle(`${errorMessage}`)
        };
    }, [errorMessage, isLoading, errorEmpty]);
    
    // useEffect(() => {
    //     console.log("isLoading in signupdriver useeffect", isLoading);
    // }, [isLoading])


    useEffect(() => {
        const fetchData = async () => {
            dispatch(deleteSignInResponse('error'))
            try {
                const isConnected = await checkInternetConnection();

                setIsConnected(isConnected);

                if (!isConnected) {
                    setAlertTitle(StringConstants.PLEASE_CHECK_YOUR_INTERNET_CONNECTION);
                    setShowValidationModal(true);
                }
            } catch (error) {
                AppLogger('Error checking internet connection:', error);
            }
        };

        fetchData();

       
    }, []);


    useEffect(() => {
        // Effect logic goes here

        return () => {
            console.log("i am called in useeffect return in signupscreen");
            
            dispatch(deleteSignInResponse('error'))
        }
      }, []);

    const tapOnEye = () => {
        setShowPassword(prev => !prev);
    }
    const tapOnSecondEye = () => {
        setShowConfirmPassword(prev => !prev);
    }

    const tapOnUploadFront = useCallback(async () => {
        try {
            const response = await DocumentPicker.pick({
                presentationStyle: 'fullScreen',
                // type: [types.images],
                // type: [DocumentPicker.types.allFiles],
                type: [types.images, types.doc, types.docx, types.pdf],
                allowMultiSelection: false,
            });

            AppLogger('Selected front DL image:', response);

            const selectedFile = response[0];

            if (selectedFile !== undefined) {
                const fileSize = selectedFile?.size ?? 0; // Use 0 if size is undefined or null
                const fileSizeInMB = fileSize / (1024 * 1024)

                const maxSizeInBytes = 25 * 1024 * 1024; // 25 MB in bytes

                // if (fileSize <= maxSizeInBytes) {
                //     setFrontImage(selectedFile);
                //     setFrontImageSize(fileSizeInMB.toFixed(2))
                // } 
                if (fileSize <= maxSizeInBytes) {


                    if (Platform.OS == 'android') {
                        setFrontImage(selectedFile);
                        setFrontImageSize(fileSizeInMB.toFixed(2))
                    } else {
                        // Check if 'file://' is present and remove it
                        const filePathWithoutPrefix = selectedFile.uri.startsWith('file://')
                            ? selectedFile.uri.replace('file://', '')
                            : selectedFile.uri;

                        const updatedFile = {
                            ...selectedFile,
                            uri: filePathWithoutPrefix
                        };

                        setFrontImage(updatedFile);
                        setFrontImageSize(fileSizeInMB.toFixed(2));
                    }

                }

                else {
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
                // type: [types.images],
                // type: [DocumentPicker.types.allFiles],
                type: [types.images, types.doc, types.docx, types.pdf],
                allowMultiSelection: false,
            });

            AppLogger('Selected back DL image:', response);

            const selectedFile = response[0];

            if (selectedFile !== undefined) {
                const fileSize = selectedFile?.size ?? 0; // Use 0 if size is undefined or null
                const fileSizeInMB = fileSize / (1024 * 1024)

                const maxSizeInBytes = 25 * 1024 * 1024; // 25 MB in bytes

                // if (fileSize <= maxSizeInBytes) {
                //     setBackImage(selectedFile);
                //     setBackImageSize(fileSizeInMB.toFixed(2))
                // }

                if (fileSize <= maxSizeInBytes) {
                    if (Platform.OS == 'android') {
                        setBackImage(selectedFile);
                        setBackImageSize(fileSizeInMB.toFixed(2))
                    } else {
                        // Check if 'file://' is present and remove it
                        const filePathWithoutPrefix = selectedFile.uri.startsWith('file://')
                            ? selectedFile.uri.replace('file://', '')
                            : selectedFile.uri;

                        const updatedFile = {
                            ...selectedFile,
                            uri: filePathWithoutPrefix
                        };

                        setBackImage(updatedFile);
                        setBackImageSize(fileSizeInMB.toFixed(2));
                    }
                }

                else {
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
                // type: [types.images],
                // type: [DocumentPicker.types.allFiles],
                type: [types.images, types.doc, types.docx, types.pdf],
                allowMultiSelection: false,
            });

            AppLogger('Selected first insurance image:', response);

            const selectedFile = response[0];

            if (selectedFile !== undefined) {
                const fileSize = selectedFile?.size ?? 0; // Use 0 if size is undefined or null
                const fileSizeInMB = fileSize / (1024 * 1024)

                const maxSizeInBytes = 25 * 1024 * 1024; // 25 MB in bytes

                // if (fileSize <= maxSizeInBytes) {
                //     setFirstInsuranceImage(selectedFile);
                //     setFirstInsuranceImageSize(fileSizeInMB.toFixed(2))
                // } 

                if (fileSize <= maxSizeInBytes) {
                    if (Platform.OS == 'android') {
                        setFirstInsuranceImage(selectedFile);
                        setFirstInsuranceImageSize(fileSizeInMB.toFixed(2))
                    } else {
                        // Check if 'file://' is present and remove it
                        const filePathWithoutPrefix = selectedFile.uri.startsWith('file://')
                            ? selectedFile.uri.replace('file://', '')
                            : selectedFile.uri;

                        const updatedFile = {
                            ...selectedFile,
                            uri: filePathWithoutPrefix
                        };

                        setFirstInsuranceImage(updatedFile);
                        setFirstInsuranceImageSize(fileSizeInMB.toFixed(2));
                    }
                }

                else {
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
                // type: [types.images],
                type: [types.images, types.doc, types.docx, types.pdf],
                // type: [DocumentPicker.types.allFiles],
                allowMultiSelection: false,
            });

            AppLogger('Selected second insurance image:', response);

            const selectedFile = response[0];

            if (selectedFile !== undefined) {
                const fileSize = selectedFile?.size ?? 0; // Use 0 if size is undefined or null
                const fileSizeInMB = fileSize / (1024 * 1024)

                const maxSizeInBytes = 25 * 1024 * 1024; // 25 MB in bytes

                // if (fileSize <= maxSizeInBytes) {
                //     setSecondInsuranceImage(selectedFile);
                //     setSecondInsuranceImageSize(fileSizeInMB.toFixed(2))
                // } 
                if (fileSize <= maxSizeInBytes) {
                    if (Platform.OS == 'android') {
                        setSecondInsuranceImage(selectedFile);
                        setSecondInsuranceImageSize(fileSizeInMB.toFixed(2))
                    } else {
                        // Check if 'file://' is present and remove it
                        const filePathWithoutPrefix = selectedFile.uri.startsWith('file://')
                            ? selectedFile.uri.replace('file://', '')
                            : selectedFile.uri;

                        const updatedFile = {
                            ...selectedFile,
                            uri: filePathWithoutPrefix
                        };

                        setSecondInsuranceImage(updatedFile);
                        setSecondInsuranceImageSize(fileSizeInMB.toFixed(2));
                    }
                }

                else {
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
                // type: [types.images],
                // type: [DocumentPicker.types.allFiles],
                type: [types.images, types.doc, types.docx, types.pdf],
                allowMultiSelection: false,
            });

            AppLogger('Selected third insurance image:', response);

            const selectedFile = response[0];

            if (selectedFile !== undefined) {
                const fileSize = selectedFile?.size ?? 0; // Use 0 if size is undefined or null
                const fileSizeInMB = fileSize / (1024 * 1024)

                const maxSizeInBytes = 25 * 1024 * 1024; // 25 MB in bytes

                // if (fileSize <= maxSizeInBytes) {
                //     setThirdInsuranceImage(selectedFile);
                //     setThirdInsuranceImageSize(fileSizeInMB.toFixed(2))
                // } 

                if (fileSize <= maxSizeInBytes) {
                    if (Platform.OS == 'android') {
                        setThirdInsuranceImage(selectedFile);
                        setThirdInsuranceImageSize(fileSizeInMB.toFixed(2))
                    } else {
                        // Check if 'file://' is present and remove it
                        const filePathWithoutPrefix = selectedFile.uri.startsWith('file://')
                            ? selectedFile.uri.replace('file://', '')
                            : selectedFile.uri;

                        const updatedFile = {
                            ...selectedFile,
                            uri: filePathWithoutPrefix
                        };

                        setThirdInsuranceImage(updatedFile);
                        setThirdInsuranceImageSize(fileSizeInMB.toFixed(2));
                    }
                }

                else {
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

    

    const isDateSmallerThan18th = (date: any) => {
        const years = moment().diff(date, 'years');
        console.log("age in years", years);
        if (years >= 18) return true
        else return false
    }

    const tapOnSignup = async () => {

        Keyboard.dismiss()
        const { fullname, email, phoneNumber, addressLine1, addressLine2, city, state, zipCode, password, confirmPassword,
            location, findAddress, longitude, latitude } = formData
        const allTermsAccepted = termsEnabled.every(term => !term)
        let valid = true

        if (fullname.length == 0) {
            valid = false
            setShowValidationModal(true)
            setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_FULLNAME)
            return
        }
        else if (fullname.length < 3) {
            valid = false
            setShowValidationModal(true)
            setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_CORRECT_FULL_NAME)
            return
        }
        else if (!alphabetRegex.test(fullname) || emojiRegex.test(fullname)) {
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
        else if (zeroRegex.test(phoneNumber) || !numberRegex.test(phoneNumber) || emojiRegex.test(phoneNumber)) {
            valid = false
            setShowValidationModal(true)
            setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_CORRECT_PHONE_NUMBER)
            return
        }
        else if (!date) {
            valid = false
            setShowValidationModal(true)
            setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_DOB)
            return
        }
        else if (!isDateSmallerThan18th(date)) {
            valid = false
            setShowValidationModal(true)
            setAlertTitle(StringConstants.AGE_MUST_BE_GREATER_THAN_18)
            return
        }



        if (findAddress === true) {
            if (location.length == 0) {
                valid = false
                setShowValidationModal(true)
                setAlertTitle(StringConstants.PLEASE_SELECT_THE_LOCATION)
                return
            }
        } else {
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
            else if (zipCode.length < 5 || alphabetRegex.test(zipCode) || numberRegex.test(zipCode) || emojiRegex.test(zipCode) || !alphaNumericRegex.test(zipCode)) {
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
        }



        if (password.length == 0) {
            valid = false
            setShowValidationModal(true)
            setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_PASSWORD)
            return
        }
        else if (!validation(password, 'password')) {
            valid = false
            setShowValidationModal(true)
            setAlertTitle(StringConstants.PASSWORD_VALIDATION)
            return
        }
        else if (emojiRegex.test(password)) {
            valid = false
            setShowValidationModal(true)
            setAlertTitle(StringConstants.EMOJI_NOT_ALLOWED_IN_PASSWORD)
            return
        }
        else if (confirmPassword.length == 0) {
            valid = false
            setShowValidationModal(true)
            setAlertTitle(StringConstants.PLEASE_CONFIRM_YOUR_PASSWORD)
            return
        }
        else if (password !== confirmPassword) {
            valid = false
            setShowValidationModal(true)
            setAlertTitle(StringConstants.PASSWORD_DOES_NOT_MATCH)
            return
        }
        else if (!frontImage) {
            valid = false
            setShowValidationModal(true)
            setAlertTitle(StringConstants.PLEASE_UPLOAD_YOUR_DRIVING_LICENCE_FRONT_PAGE)
            return
        }
        else if (!backImage) {
            valid = false
            setShowValidationModal(true)
            setAlertTitle(StringConstants.PLEASE_UPLOAD_YOUR_DRIVING_LICENCE_BACK_PAGE)
            return
        }
        else if (!firstInsuranceImage && !secondInsuranceImage && !thirdInsuranceImage) {
            console.log("insurance case");
            
            valid = false
            setShowValidationModal(true)
            setAlertTitle(StringConstants.PLEASE_UPLOAD_INSURANCE_CERTIFICATE)
            return
        }
        // else if (!secondInsuranceImage) {
        //     valid = false
        //     setShowValidationModal(true)
        //     setAlertTitle(StringConstants.PLEASE_UPLOAD_SECOND_INSURANCE_CERTIFICATE)
        //     return
        // }
        // else if (!thirdInsuranceImage) {
        //     valid = false
        //     setShowValidationModal(true)
        //     setAlertTitle(StringConstants.PLEASE_UPLOAD_THIRD_INSURANCE_CERTIFICATE)
        //     return
        // }

        else if (!allTermsAccepted) {
            valid = false
            setShowValidationModal(true)
            setAlertTitle(StringConstants.PLEASE_ACCEPT_ALL_THE_TERMS)
            return
        }
        else {
            valid = true
            callSignUpAction()
        }
    }

    const callSignUpAction = async () => {
        const { fullname, email, phoneNumber, addressLine1, addressLine2, city, state, zipCode, password,
            location, longitude, latitude, placeId } = formData


        if (isConnected) {     
            const modifiedBirthDate = new Date(date).toLocaleDateString('en-GB')   
            let myFormData = new FormData()
            myFormData.append('full_name', fullname);
            myFormData.append('email', email);
            myFormData.append('phone', phoneNumber);
            myFormData.append('dob', modifiedBirthDate);
            myFormData.append('address1', addressLine1)
            myFormData.append('address2', addressLine2);
            myFormData.append('city', city);
            myFormData.append('state', state);
            myFormData.append('zipcode', zipCode);
            myFormData.append('password', password);
            myFormData.append('location', location);
            myFormData.append('latitude', latitude);
            myFormData.append('longitude', longitude);
            myFormData.append('placeId', placeId);

            if (frontImage?.uri !== null) {
                myFormData.append('drivingLicence_1', {
                    uri: frontImage?.uri,
                    name: frontImage.name ? frontImage.name : null,
                    type: frontImage.type ? frontImage.type : 'image/jpeg'
                })
            }

            if (backImage?.uri !== null) {
                myFormData.append('drivingLicence_2', {
                    uri: backImage?.uri,
                    name: backImage?.name ? backImage.name : null,
                    type: backImage.type ? backImage.type : 'image/jpeg'
                })
            }

            if (firstInsuranceImage?.uri !== undefined) {
                myFormData.append('insuranceCertificate_1', {
                    uri: firstInsuranceImage?.uri,
                    name: firstInsuranceImage?.name ? firstInsuranceImage?.name : null,
                    type: firstInsuranceImage?.type ? firstInsuranceImage?.type : 'image/jpeg'
                })
            }

            if (secondInsuranceImage?.uri !== undefined) {
                myFormData.append('insuranceCertificate_2', {
                    uri: secondInsuranceImage?.uri,
                    name: secondInsuranceImage?.name ? secondInsuranceImage?.name : null,
                    type: secondInsuranceImage?.type ? secondInsuranceImage?.type : 'image/jpeg'
                })
            }

            if (thirdInsuranceImage?.uri !== undefined) {
                myFormData.append('insuranceCertificate_3', {
                    uri: thirdInsuranceImage?.uri,
                    name: thirdInsuranceImage?.name ? thirdInsuranceImage?.name : null,
                    type: thirdInsuranceImage?.type ? thirdInsuranceImage?.type : 'image/jpeg'
                })
            }


            console.log("myFormData in signup driver", JSON.stringify(myFormData));

            await dispatch(signUpAction(myFormData))

        } else {
            setAlertTitle(StringConstants.PLEASE_CHECK_YOUR_INTERNET_CONNECTION)
            setShowValidationModal(true)
        }
    }


    const tapOnSelectLocation = () => {
        const { findAddress } = formData

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

    const handleTextChange = (text: string, input: string) => {
        setFormData(prevState => ({ ...prevState, [input]: text }))
    }

    const hideEmailVerifyModal = () => {
        dispatch(deleteSignInResponse('signUpResponse'))
        setShowEmailVerifyModal(false)
    }



    const tapOnTerms = (index: number) => {
        let url;
        console.log("index", index);
        if (index == 0) {            //service agreement
            url = ApiConstants.WEBVIEW_BASE_URL + ApiConstants.SERVICE_AGREEMENT
            setWebUrl(url)
        } else if (index == 1) {    //privacy and data
            url = ApiConstants.WEBVIEW_BASE_URL + ApiConstants.PRIVACY_DATA_PROTECTION
            setWebUrl(url)
        } else {                     //additional clause
            url = ApiConstants.WEBVIEW_BASE_URL + ApiConstants.ADDITIONAL_CLAUSES
            setWebUrl(url)
        }

        setSelectedIndex(index);
        setShowTermsModal(true);
    }

    const tapOnAcceptTerms = (index: number) => {
        setShowTermsModal(false);
        const updatedTermsEnabled = [...termsEnabled];
        updatedTermsEnabled[index] = false;
        setTermsEnabled(updatedTermsEnabled);
    }



    return (
        <View style={styles.rootContainer}>
            {showTermsModal &&
                <TermsModal
                    showModal={showTermsModal}
                    hideModal={() => setShowTermsModal(false)}
                    tapOnAccept={tapOnAcceptTerms}
                    index={selectedIndex}
                    url ={webUrl}
                />

            }

            {showEmailVerifyModal &&
                <VerifyEmailModal
                    showModal={showEmailVerifyModal}
                    hideModal={hideEmailVerifyModal}
                    tapOnConfirm={() => {
                        console.log("errormessage in tapOnConfirm",);
                        dispatch(deleteSignInResponse('signUpResponse'))
                        setShowEmailVerifyModal(false)
                        navigation.navigate(AppConstants.screens.OTP_VERIFICATION, {
                            email: signUpResponse?.email, otp: signUpResponse?.otp, userId: signUpResponse?.user_id
                        })
                    }}
                />
            }

            {showValidationModal &&
                <ValidationModal
                    showModal={showValidationModal}
                    hideModal={() => {
                        if (alertTitle == "Profile created successfully") {
                            setShowValidationModal(false)
                            setAlertTitle('')
                            dispatch(deleteSignInResponse('signUpResponse'))
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
                    date={date || new Date()}
                    onCancel={() => setShowDatePicker(false)}
                    onConfirm={(item) => {
                        setDate(item)
                        setShowDatePicker(false);
                    }}
                    maximumDate={new Date()}
                    mode='date'

                />
            }

            {isLoading &&
                <LoaderModal showModal={isLoading} />
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
                        setFormData({ ...formData, longitude: data.longitude, latitude: data.latitude })
                        setShowMap(false)

                    }}
                />
            }
            <KeyboardAwareScrollView
                onScrollBeginDrag={() => Keyboard.dismiss()}
                bounces={false}
                showsVerticalScrollIndicator={false}>
                <Image source={Images.BG_LOGIN_DRIVER} style={styles.imageBG}
                />



                <View style={{}}>
                    <Text style={styles.textWelcome}>{StringConstants.WELCOME}</Text>
                    <Text style={styles.textLogin}>{StringConstants.PLEASE_CREATE_ACCOUNT}</Text>
                    <TextField
                        placeholder={StringConstants.DRIVER_NAME}
                        leftImage={Images.IC_USER}
                        value={formData.fullname}
                        autoCapitalize="words"
                        maxLength={40}
                        onChangeText={val => handleTextChange(val, 'fullname')}
                        returnKeyType={'next'}
                        fieldRef={fullnameRef}
                        onSubmitEditing={() => {
                            if (emailRef && emailRef.current) {
                                emailRef.current.focus();
                            }
                        }}
                    />
                    <TextField
                        placeholder={StringConstants.EMAIL}
                        leftImage={Images.IC_MAIL}
                        value={formData.email}
                        onChangeText={val => handleTextChange(val, 'email')}
                        returnKeyType={'next'}
                        keyboardType={'email-address'}
                        fieldRef={emailRef}
                        onSubmitEditing={() => {
                            if (phoneNumberRef && phoneNumberRef.current) {
                                phoneNumberRef.current.focus();
                            }
                        }}
                    />

                    <TextField
                        placeholder={StringConstants.PHONE_NO}
                        leftImage={Images.IC_PHONE}
                        value={formData.phoneNumber}
                        maxLength={15}
                        keyboardType={'numeric'}
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
                        <Text style={[styles.selectLocation, { color: date ? Colors.BLACK : Colors.FIELD_BORDER }]}>
                            {date ? new Date(date).toLocaleDateString('en-GB') : StringConstants.SELECT_DOB}
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
                                        <Image source={Images.IC_GENDER} style={{ height: 18, width: 18, tintColor: Colors.FIELD_BORDER }} />
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

                    {!formData.findAddress &&

                        <View>
                            <TextField
                                placeholder={StringConstants.ADDRESS_LINE_1}
                                value={formData.addressLine1}
                                onChangeText={val => handleTextChange(val, 'addressLine1')}
                                returnKeyType={'next'}
                                maxLength={50}
                                autoCapitalize="sentences"
                                fieldRef={address1Ref}
                                onSubmitEditing={() => {
                                    if (address2Ref && address2Ref.current) {
                                        address2Ref.current.focus();
                                    }
                                }}
                            />

                            <TextField
                                placeholder={StringConstants.ADDRESS_LINE_2}
                                returnKeyType={'next'}
                                value={formData.addressLine2}
                                fieldRef={address2Ref}
                                maxLength={50}
                                autoCapitalize="sentences"
                                onChangeText={val => handleTextChange(val, 'addressLine2')}
                                onSubmitEditing={() => {
                                    if (cityRef && cityRef.current) {
                                        cityRef.current.focus();
                                    }
                                }}
                            />
                            <TextField
                                placeholder={StringConstants.CITY}
                                returnKeyType={'next'}
                                value={formData.city}
                                fieldRef={cityRef}
                                autoCapitalize="words"
                                onChangeText={val => handleTextChange(val, 'city')}
                                maxLength={40}
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
                                    autoCapitalize="words"
                                    fieldRef={stateRef}
                                    maxLength={40}
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
                                    value={formData.zipCode}
                                    autoCapitalize='characters'
                                    maxLength={8}
                                    fieldRef={zipCodeRef}
                                    onChangeText={val => handleTextChange(val, 'zipCode')}
                                    onSubmitEditing={() => {
                                        if (passwordRef && passwordRef.current) {
                                            passwordRef.current.focus();
                                        }
                                    }}
                                />
                            </View>


                            <TouchableOpacity style={{ paddingVertical: 15 }} onPress={() => {
                                setShowMap(true)
                            }}>
                                <Text style={styles.dropPinText}>{StringConstants.DROP_PIN}</Text>
                            </TouchableOpacity>

                        </View>}


                    <TextField
                        placeholder={StringConstants.PASSWORD}
                        leftImage={Images.IC_KEY}
                        rightChild={
                            <TouchableOpacity onPress={tapOnEye} style={{
                                height: '100%',
                                justifyContent: 'center',
                                paddingEnd: 18
                            }}>
                                <Image source={showPassword ? Images.IC_EYE_VISIBLE : Images.IC_EYE_CROSS} style={{ height: 18, width: 18, resizeMode: 'contain' }} />
                            </TouchableOpacity>
                        }
                        fieldRef={passwordRef}
                        value={formData.password}
                        returnKeyType={'next'}
                        onChangeText={val => handleTextChange(val, 'password')}
                        secureTextEntry={!showPassword}
                        onSubmitEditing={() => {
                            if (confirmPasswordRef && confirmPasswordRef.current) {
                                confirmPasswordRef.current.focus();
                            }
                        }}
                    />

                    <TextField
                        placeholder={StringConstants.CONFIRM_PASSWORD}
                        leftImage={Images.IC_KEY}
                        rightChild={
                            <TouchableOpacity onPress={tapOnSecondEye} style={{
                                height: '100%',
                                justifyContent: 'center',
                                paddingEnd: 18
                            }}>
                                <Image source={showConfirmPassword ? Images.IC_EYE_VISIBLE : Images.IC_EYE_CROSS} style={{ height: 18, width: 18, resizeMode: 'contain' }} />
                            </TouchableOpacity>
                        }
                        value={formData.confirmPassword}
                        fieldRef={confirmPasswordRef}
                        onChangeText={val => handleTextChange(val, 'confirmPassword')}
                        secureTextEntry={!showConfirmPassword}
                        onSubmitEditing={() => {
                            tapOnSignup()
                        }}
                    />

                    <Text style={styles.uploadText}>{StringConstants.UPLOAD_DRIVING_LICENCE}</Text>

                    <UploadDocuments
                        topText={StringConstants.FRONT_DRIVING_LICENCE}
                        bottomText={frontImageSize ? frontImageSize + ' MB' : '' + StringConstants.UPLOAD_IMAGE}
                        uploaded={frontImage ? true : false}
                        onPress={tapOnUploadFront}
                        uriAvaiable={false}
                    />

                    <UploadDocuments
                        topText={StringConstants.BACK_DRIVING_LICENCE}
                        bottomText={backImageSize ? backImageSize + ' MB' : '' + StringConstants.UPLOAD_IMAGE}
                        uploaded={backImage ? true : false}
                        onPress={tapOnUploadBack}
                        uriAvaiable={false}

                    />

                    <Text style={styles.uploadText}>{StringConstants.UPLOAD_INSURANCE_CERTIFICATE}</Text>

                    <UploadDocuments
                        topText={"Certificate 1"}
                        bottomText={firstInsuranceImageSize ? firstInsuranceImageSize + ' MB' : '' + StringConstants.UPLOAD_IMAGE}
                        uploaded={firstInsuranceImage ? true : false}
                        onPress={tapOnUploadFirstInsurance}
                        uriAvaiable={false}
                    />

                    <UploadDocuments
                        topText={"Certificate 2"}
                        bottomText={secondInsuranceImageSize ? secondInsuranceImageSize + ' MB' : '' + StringConstants.UPLOAD_IMAGE}
                        uploaded={secondInsuranceImage ? true : false}
                        onPress={tapOnUploadSecondInsurance}
                        uriAvaiable={false}
                    />

                    <UploadDocuments
                        topText={"Certificate 3"}
                        bottomText={thirdInsuranceImageSize ? thirdInsuranceImageSize + ' MB' : '' + StringConstants.UPLOAD_IMAGE}
                        uploaded={thirdInsuranceImage ? true : false}
                        onPress={tapOnUploadThirdInsurance}
                        uriAvaiable={false}
                    />

                    <Text style={styles.uploadText}>{StringConstants.TERMS_AND_CONDITIONS}</Text>

                    <View style={styles.termsView}>
                        {termsData.map((item, index) => (
                            <TouchableOpacity onPress={() => tapOnTerms(index)} key={index}
                                disabled={!termsEnabled[index]}
                                style={[styles.termsBoxView, { backgroundColor: termsEnabled[index] ? Colors.ORANGE : Colors.LIGHT_GREY2, opacity: termsEnabled[index] ? 1 : 0.5 }]} >
                                <Text style={styles.termsText}>{item}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>



                    {/* <View style={styles.viewAcceptTerms}>
                            <TouchableOpacity style={styles.touchCheckBox} onPress={() => setTermsAccepted(!termsAccepted)}>
                                <Image source={termsAccepted ? Images.IC_TICK_CHECKBOX : Images.IC_UNTICK_CHECKBOX} style={{ height: 18, width: 18 }} />
                            </TouchableOpacity>

                            <Text style={styles.readAndAgreeText}>{StringConstants.I_HAVE_READ_AND_AGREE}
                                <Text style={styles.textTermsConditions}
                                    onPress={() => navigation.navigate(AppConstants.screens.WEB_VIEW_SCREENS,
                                        {
                                            title: StringConstants.TERMS_AND_CONDITIONS,
                                            url: 'https://www.termsfeed.com/blog/sample-terms-and-conditions-template/'
                                        })}>{StringConstants.TERMS_AND_CONDITIONS}</Text>
                            </Text>
                        </View> */}


                    <Button
                        primaryTitle={StringConstants.SIGNUP}
                        onPress={tapOnSignup} />

                    <View style={styles.viewDontHaveAccount}>
                        <Text style={styles.textDontHaveAccount}>{StringConstants.ALREADY_HAVE_ACCOUNT}</Text>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text style={styles.textSignUpNow}>{StringConstants.LOGIN_NOW}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}