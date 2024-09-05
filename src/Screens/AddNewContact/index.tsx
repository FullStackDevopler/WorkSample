import { View, Text, Image, TouchableOpacity, Keyboard, Alert, TextInput, PanResponder, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { StringConstants } from '../../Theme/StringConstants'
import { styles } from './styles'
import Header from '../../Components/Header'
import { Images } from '../../Assets'
import TextField from '../../Components/TextField'
import { Colors } from '../../Theme/Colors'
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view'
import Button from '../../Components/Button'
import ValidationModal from '../../Modals/ValidationModal'
import { useDispatch, useSelector } from 'react-redux'
import { addContactAction, updateContactAction } from '../../Redux/Actions/contactsActions'
import LoaderModal from '../../Modals/LoaderModal'
import { clearContactResponse } from '../../Redux/Reducers/contactsSlice'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import FindAddressModal from '../../Modals/FindAddressModal'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import DropPinModal from '../../Modals/DropPinModal'
import { Fonts } from '../../Theme/Fonts'
import { capitalizeFirstLetter } from '../../Theme/Helper'
import { alphaNumericRegex, alphabetRegex, emojiRegex } from '../../Theme/validation'
import { checkInternetConnection } from '../../Components/InternetConnection'

export default function AddNewContact({ navigation, route }: any): React.JSX.Element {

    const { fromEditContact, item } = route?.params
    const [isConnected, setIsConnected] = React.useState(true);

    interface FormData {
        name: string;
        location: string;
        addressLine1: string;
        addressLine2: string;
        city: string;
        state: string;
        zip_code: string;
        findAddress: boolean;
        latitude: number,
        longitude: number,
        placeId?: string
    }
    const dispatch = useDispatch()


    const [formData, setFormData] = useState<FormData>({
        // name: 'James',
        // location: 'Cambridge',
        // addressLine1: 'Gunnersbury House , 133',
        // addressLine2: 'Chapel Hill',
        // city: 'London',
        // state: 'United Kingdom',
        // zip_code: '127943',
        latitude: 0,
        longitude: 0,
        placeId: '',
        name: '',
        location: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zip_code: '',
        findAddress: true
    });


    const [showValidationModal, setShowValidationModal] = useState<boolean>(false)
    const [showLocationModal, setShowLocationModal] = useState<boolean>(false)
    const [alertTitle, setAlertTitle] = useState<string>('')
    const [showMap, setShowMap] = useState<boolean>(false);
    const accessToken = useSelector((state: any) => state?.persistedReducer.userData.userToken);
    const isLoading = useSelector((state: any) => state?.persistedReducer.contactListData.isLoading)
    const addContactResponse = useSelector((state: any) => state?.persistedReducer.contactListData.addContactResponse)
    const updatedContactResponse = useSelector((state: any) => state?.persistedReducer.contactListData.updatedContactResponse)
    const errorMessage = useSelector((state: any) => state?.persistedReducer.contactListData.error)

    //field refs
    const address1Ref = useRef<TextInput>(null);
    const address2Ref = useRef<TextInput>(null);
    const cityRef = useRef<TextInput>(null);
    const stateRef = useRef<TextInput>(null);
    const zipCodeRef = useRef<TextInput>(null);

    useEffect(() => {
        if (item) {
            setAddress()
        }
    }, [route?.params])

    useEffect(() => {
        if (!isLoading && addContactResponse) {
            setAlertTitle(StringConstants.CONTACT_ADDED_SUCCESSFULLY)
            setShowValidationModal(true)

        }
    }, [addContactResponse])

    useEffect(() => {
        if (!isLoading && updatedContactResponse) {
            setAlertTitle(StringConstants.CONTACT_UPDATED_SUCCESSFULLY)
            setShowValidationModal(true)

        }
    }, [updatedContactResponse])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const isConnected = await checkInternetConnection();
                // console.log('isConnected in useEffect ==>>', isConnected);

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
    }, []);

    useEffect(() => {

        if (errorMessage != null && !isLoading) {
            console.log("errormessage is not null", errorMessage);
            setShowValidationModal(true)
            setAlertTitle(`${errorMessage}`)

        } else if (errorMessage == null) {
            console.log("errormessage is  null", errorMessage);
            setShowValidationModal(false)
            setAlertTitle('')
        }
    }, [errorMessage])

    const setAddress = () => {
        console.log("in setAddress function", item);


        let temoObj = {
            id: item._id ? item._id : '',
            name: item.name ? item.name : '',
            location: item?.location ? item.location : '',
            addressLine1: item.addressLine1 ? item.addressLine1 : '',
            addressLine2: item.addressLine2 ? item.addressLine2 : '',
            city: item.city ? item.city : '',
            state: item.state ? item.state : '',
            zip_code: item.zip_code ? item.zip_code : '',
            //to be added in APIs too
            latitude: item?.latitude ? item?.latitude : 0,
            longitude: item?.longitude ? item?.longitude : 0,
            placeId: item?.placeId ? item?.placeId : '',
            findAddress: item?.location == "" ? false : true
        }

        setFormData({ ...formData, ...temoObj })
    }

    // console.log('route.params.fromEditContact', fromEditContact, item);

    const handleTextChange = (text: string, input: string) => {
        setFormData(prevState => ({ ...prevState, [input]: text }))
    }


    const tapOnSave = async () => {
        Keyboard.dismiss()
        const { name, location, addressLine1, addressLine2, city, state, zip_code, findAddress, latitude, longitude } = formData
        let valid = true
        const numberRegex = /^[0-9]+$/;

        if (name.length == 0) {
            valid = false
            setShowValidationModal(true)
            setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_CONTACT_NAME)
        }
        else if (name.length < 3) {
            valid = false
            setShowValidationModal(true)
            setAlertTitle(StringConstants.CONTACT_NAME_SHOULD_BE_ATLEAST_3_CHARACTERS_LONG)
        }
        else if (!alphabetRegex.test(name) || emojiRegex.test(name)) {
            valid = false
            setShowValidationModal(true)
            setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_CORRECT_CONTACT_NAME)
        }
        else if (findAddress) {
            if (location.length == 0) {
                valid = false
                setShowValidationModal(true)
                setAlertTitle(StringConstants.PLEASE_SELECT_THE_LOCATION)
            } else {
                valid = true
                if (isConnected) {
                    if (item) {
                        // console.log('formdataa in tapOnSave-->>>', formData);
                        await dispatch(updateContactAction(accessToken, formData))
                    } else {
                        await dispatch(addContactAction(accessToken, formData))
                    }
                    return
                } else {
                    setAlertTitle(StringConstants.PLEASE_CHECK_YOUR_INTERNET_CONNECTION);
                    setShowValidationModal(true);
                }
            }
        } else {
            if (addressLine1.length == 0) {
                valid = false
                setShowValidationModal(true)
                setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_ADDRESS_LINE_1)
            }
            else if (emojiRegex.test(addressLine1)) {
                valid = false
                setShowValidationModal(true)
                setAlertTitle(StringConstants.EMOJI_NOT_ALLOWED_IN_ADDRESS)
            }
            else if (addressLine2.length == 0) {
                valid = false
                setShowValidationModal(true)
                setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_ADDRESS_LINE_2)
            }
            else if (emojiRegex.test(addressLine2)) {
                valid = false
                setShowValidationModal(true)
                setAlertTitle(StringConstants.EMOJI_NOT_ALLOWED_IN_ADDRESS)
            }
            else if (city.length == 0) {
                valid = false
                setShowValidationModal(true)
                setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_CITY)
            }
            else if (city.length < 3) {
                valid = false
                setShowValidationModal(true)
                setAlertTitle(StringConstants.CITY_SHOULD_BE_ATLEAST_3_CHARACTERS_LONG)
            }
            else if (!alphabetRegex.test(city) || emojiRegex.test(city)) {
                valid = false
                setShowValidationModal(true)
                setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_CORRECT_CITY)
            }
            else if (state.length == 0) {
                valid = false
                setShowValidationModal(true)
                setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_STATE)
            }
            else if (state.length < 3) {
                valid = false
                setShowValidationModal(true)
                setAlertTitle(StringConstants.STATE_SHOULD_BE_ATLEAST_3_CHARACTERS_LONG)
            }
            else if (!alphabetRegex.test(state) || emojiRegex.test(state)) {
                valid = false
                setShowValidationModal(true)
                setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_CORRECT_STATE)
            }
            else if (zip_code.length == 0) {
                valid = false
                setShowValidationModal(true)
                setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_ZIP_CODE)
            }
            else if (zip_code.length < 5) {
                valid = false
                setShowValidationModal(true)
                setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_CORRECT_ZIP_CODE)
            }
            else if (alphabetRegex.test(zip_code)) {
                valid = false
                setShowValidationModal(true)
                setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_CORRECT_ZIP_CODE)
            }
            else if (numberRegex.test(zip_code)) {
                valid = false
                setShowValidationModal(true)
                setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_CORRECT_ZIP_CODE)
            }
            else if (!alphaNumericRegex.test(zip_code)) {
                valid = false;
                setShowValidationModal(true);
                setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_CORRECT_ZIP_CODE);
            }
            else if (emojiRegex.test(zip_code)) {
                valid = false
                setShowValidationModal(true)
                setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_CORRECT_ZIP_CODE)
            }
            else if (latitude === 0 && longitude === 0) {
                valid = false
                setShowValidationModal(true)
                setAlertTitle(StringConstants.PLEASE_SELECT_THE_LOCATION_ON_MAP_USING_DROP_PIN)
            }
            else {
                valid = true
                if (isConnected) {
                    if (item) {
                        await dispatch(updateContactAction(accessToken, formData))
                    } else {
                        await dispatch(addContactAction(accessToken, formData))
                    }

                } else {
                    setAlertTitle(StringConstants.PLEASE_CHECK_YOUR_INTERNET_CONNECTION);
                    setShowValidationModal(true);
                }
            }
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
        let newData = { ...formData, ...updateAddress }
        console.log("newData newData n handlePlaceSelect", newData);

        setFormData({ ...formData, ...updateAddress });

    };

    const tapOnSelectLocation = () => {
        const { findAddress } = formData
        // console.log('findAddress in tapOnSelectLocation', findAddress);


        let tempObj = {
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
        let newData = { ...formData, ...tempObj, }
        console.log("newData in tapOnSelectLocation", newData);

        if (findAddress) {
            setFormData({ ...formData, ...tempObj, findAddress: false, })
        } else {
            setFormData({ ...formData, ...tempObj, findAddress: true, })
        }
    }


    return (
        <View style={styles.rootContainer}>
            {showValidationModal &&
                <ValidationModal
                    showModal={showValidationModal}
                    hideModal={() => {
                        if (alertTitle == StringConstants.CONTACT_ADDED_SUCCESSFULLY ||
                            alertTitle == StringConstants.CONTACT_UPDATED_SUCCESSFULLY) {
                            setShowValidationModal(false)
                            setAlertTitle('')
                            dispatch(clearContactResponse('addContactResponse'))
                            dispatch(clearContactResponse('updatedContactResponse'))
                            navigation.goBack()
                        } else {
                            setShowValidationModal(false)
                            setAlertTitle('')
                            dispatch(clearContactResponse('error'))
                        }
                    }}
                    title={alertTitle}
                />
            }
            <Header tapOnBack={() => navigation.goBack()}
                headerText={fromEditContact ? StringConstants.EDIT_CONTACT : StringConstants.NEW_CONTACT}
            />
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
                    tapOnConfirm={(data) => {
                        setFormData({ ...formData, longitude: data.longitude, latitude: data.latitude })
                        // handlePlaceSelect(data, details)
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
                <Text style={styles.locationText}>{StringConstants.SELECT_LOCATION}</Text>
                <TextField
                    containerStyle={styles.containerStyles}
                    placeholder={StringConstants.ENTER_CONTACT_NAME}
                    leftImage={Images.IC_CONTACT_NAME}
                    maxLength={40}
                    autoCapitalize='words'
                    value={capitalizeFirstLetter(formData.name)}
                    placeholderTextColor={Colors.COLOR_GREY1}
                    onChangeText={val => handleTextChange(val, 'name')}
                    fontFamily={Fonts.DM_SANS_REGULAR}

                />
                
                <TouchableOpacity style={[styles.locationButtonView]}
                    disabled={!formData.findAddress}
                    onPress={() => setShowLocationModal(true)}>
                    <Image source={Images.IC_LOCATION} style={[styles.locationIcon, !formData.findAddress && { tintColor: Colors.COLOR_GREY1 }]} />
                    <Text
                        numberOfLines={1}
                        style={[styles.selectLocation, { flex: 0.9 }, !formData.location && { color: Colors.COLOR_GREY1 }]}>
                        {formData.location ? formData.location : StringConstants.SELECT_LOCATION}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    tapOnSelectLocation()
                }}>
                    <Text style={styles.findAddressText}>
                        {formData.findAddress ? StringConstants.DID_NOT_FIND_ADDRESS : StringConstants.SELECT_LOCATION}
                    </Text>
                </TouchableOpacity>


                {
                    !formData.findAddress &&
                    <View>
                        <TextField
                            containerStyle={styles.containerStyles}
                            placeholder={StringConstants.ADDRESS_LINE_1}
                            placeholderTextColor={Colors.COLOR_GREY1}
                            value={formData.addressLine1}
                            autoCapitalize='sentences'
                            maxLength={50}
                            returnKeyType={'next'}
                            fieldRef={address1Ref}
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
                            placeholderTextColor={Colors.COLOR_GREY1}
                            value={formData.addressLine2}
                            autoCapitalize='sentences'
                            maxLength={50}
                            returnKeyType={'next'}
                            fieldRef={address2Ref}
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
                            placeholderTextColor={Colors.COLOR_GREY1}
                            value={formData.city}
                            autoCapitalize='words'
                            returnKeyType={'next'}
                            maxLength={40}
                            fieldRef={cityRef}
                            onChangeText={val => handleTextChange(val, 'city')}
                            onSubmitEditing={() => {
                                if (stateRef && stateRef.current) {
                                    stateRef.current.focus();
                                }
                            }}
                        />

                        <View style={styles.inputFieldView}>
                            <TextField
                                containerStyle={{ width: 140, borderWidth: 0 }}
                                parentStyles={styles.parentStyles}
                                placeholder={StringConstants.STATE}
                                placeholderTextColor={Colors.COLOR_GREY1}
                                value={formData.state}
                                autoCapitalize='words'
                                maxLength={40}
                                returnKeyType={'next'}
                                fieldRef={stateRef}
                                onChangeText={val => handleTextChange(val, 'state')}
                                onSubmitEditing={() => {
                                    if (zipCodeRef && zipCodeRef.current) {
                                        zipCodeRef.current.focus();
                                    }
                                }}
                            />
                            <TextField
                                containerStyle={{ width: 140, borderWidth: 0 }}
                                parentStyles={styles.parentStyles}
                                placeholder={StringConstants.ZIP_CODE}
                                placeholderTextColor={Colors.BUTTON_GREY}
                                value={formData.zip_code}
                                maxLength={8}
                                autoCapitalize='characters'
                                returnKeyType={'done'}
                                fieldRef={zipCodeRef}
                                onChangeText={val => handleTextChange(val, 'zip_code')}
                            />
                        </View>

                        <TouchableOpacity onPress={() => {
                            setShowMap(true)
                        }}>
                            <Text style={styles.dropPinText}>{StringConstants.DROP_PIN}</Text>
                        </TouchableOpacity>

                    </View>}
                <Button primaryTitle={StringConstants.SAVE}
                    containerStyles={{ backgroundColor: Colors.ORANGE }}
                    onPress={tapOnSave}
                />

            </KeyboardAwareScrollView>
        </View>
    )
}

