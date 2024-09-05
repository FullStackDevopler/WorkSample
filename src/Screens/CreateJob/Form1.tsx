import { View, Text, TouchableOpacity, Image, Keyboard, TextInput, FlatList } from 'react-native'
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
import { DimensionsValue } from '../../Theme/DimensionsValue'
import { useDispatch, useSelector } from 'react-redux'
import LoaderModal from '../../Modals/LoaderModal'
import ValidationModal from '../../Modals/ValidationModal'
import { clearJobsResponse } from '../../Redux/Reducers/jobListSlice'
import FindAddressModal from '../../Modals/FindAddressModal'
import DropPinModal from '../../Modals/DropPinModal'
import { pickupItems } from '../../Theme/Helper'
import CommonHeading from '../../Components/CommonHeading'
import { Fonts } from '../../Theme/Fonts'
import ConfirmationModal from '../../Modals/ConfirmationModal'
import uuid from 'react-native-uuid';
import { alphaNumericRegex, alphabetRegex, emojiRegex, numberRegex, zeroRegex } from '../../Theme/validation'
import ChooseContactModal from '../../Modals/ChooseContactModal'

export default function Form1({ navigation, route, tapOnNext, pickupLocationsArray, }: any): React.JSX.Element {
    const dispatch = useDispatch()

    const [showValidationModal, setShowValidationModal] = useState<boolean>(false)
    const [alertTitle, setAlertTitle] = useState<string>('')
    const [showPickLocationModal, setShowPickLocationModal] = useState<boolean>(false)
    const [showPickMap, setShowPickMap] = useState<boolean>(false);
    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    const [showDeleteLocationModal, setShowDeleteLocationModal] = useState<boolean>(false)
    // const [maxAddressLimit, setMaxAddressLimit] = useState<number>(25);
    const [locationToBeDeleted, setlocationToBeDeleted] = useState<any>({
        index: null,
        isPickUp: null
    })
    const [showChooseContactModal, setShowChooseContactModal] = useState<boolean>(false)

    const address1Ref = useRef<TextInput>(null);
    const address2Ref = useRef<TextInput>(null);
    const cityRef = useRef<TextInput>(null);
    const stateRef = useRef<TextInput>(null);
    const zipCodeRef = useRef<TextInput>(null);
    const maxAddressLimit = 25

    interface PickUpInterface {
        location: string;
        addressLine1: string;
        addressLine2: string;
        city: string;
        state: string;
        zip_code: string;
        pickUpItems: any;
        dropOffItems: any;
        note: string;
        findAddress: boolean;
        latitude: number;
        longitude: number;
        placeId?: string;
    }

    const [pickupLocations, setPickupLocations] = useState<Array<PickUpInterface>>([
        {
            location: '',
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            zip_code: '',
            pickUpItems: [{
                item: "",
                count: 0
            }],
            dropOffItems: [],
            note: '',
            findAddress: true,
            latitude: 0,
            longitude: 0,
            placeId: '',
        }

    ]);

    const isLoading = useSelector((state: any) => state?.persistedReducer.jobListData.isLoading)

    useEffect(() => {
        console.log("pickup location in useeffect",pickupLocationsArray);

        if (pickupLocationsArray.length > 0) {
            setPickupLocations(pickupLocationsArray)
        }
    }, [])

     
    // to find google address from FindAddressModal modal 

    const handlePickupPlaceSelect = (data: any, details: any) => {

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


        const updatedLocation = [...pickupLocations];
        updatedLocation[selectedIndex] = { ...updatedLocation[selectedIndex], ...updateAddress };

        setPickupLocations(updatedLocation);
    };

    const tapOnNextButton = () => {

        const allPickUpItems = pickupLocations
            .filter(location => location.pickUpItems.every((item: any) => item.item !== "" && item.count !== 0)) // Filter out locations with empty or incomplete items
            .flatMap(location => {
                let belowLocation = location?.location ? location?.location : location?.addressLine1 ? `${location?.addressLine1} ${location?.addressLine2} ${location?.city} ${location?.state} ${location?.zip_code}` : " "
                return location.pickUpItems.map((item: any) => ({
                    ...item,
                    location: belowLocation
                }));
            });

        if (allPickUpItems?.length > 0) {

            const updatedTransformedArray = allPickUpItems.map((item: any, index: number) => ({

                ...item,
                uniqueId: uuid.v4()
            }));
            tapOnNext(updatedTransformedArray, pickupLocations)

            setPickupLocations([
                {
                    location: '',
                    addressLine1: '',
                    addressLine2: '',
                    city: '',
                    state: '',
                    zip_code: '',
                    pickUpItems: [{
                        item: "",
                        count: 0
                    }],
                    dropOffItems: [],

                    note: '',
                    findAddress: true,
                    latitude: 0,
                    longitude: 0,
                    placeId: '',
                }
            ])


        }
    }

    const checkValidations = () => {
        Keyboard.dismiss()
        let valid = true

        for (let i in pickupLocations) {
            if (pickupLocations[i]?.findAddress == true) {
                if (pickupLocations[i]?.location?.length === 0) {
                    valid = false;
                    setShowValidationModal(true);
                    setAlertTitle(StringConstants.PLEASE_SELECT_THE_PICKUP_LOCATION);
                    return
                }
            } else {
                //check for address lines when findAddress is false in pick up loop

                if (pickupLocations[i]?.addressLine1.length === 0) {
                    valid = false;
                    setShowValidationModal(true);
                    setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_PICKUP_ADDRESS_LINE_1);
                    return
                }
                else if (pickupLocations[i]?.addressLine2.length === 0) {
                    valid = false;
                    setShowValidationModal(true);
                    setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_PICKUP_ADDRESS_LINE_2);
                    return
                }
                else if (pickupLocations[i]?.city.length === 0) {
                    valid = false;
                    setShowValidationModal(true);
                    setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_PICKUP_CITY);
                    return
                }
                else if (pickupLocations[i].city.length < 3) {
                    valid = false
                    setShowValidationModal(true)
                    setAlertTitle(StringConstants.PICKUP_CITY_SHOULD_BE_ATLEAST_3_CHARACTERS_LONG)
                    return
                }
                else if (!alphabetRegex.test(pickupLocations[i].city)) {
                    valid = false
                    setShowValidationModal(true)
                    setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_CORRECT_PICKUP_CITY_REGEX)
                    return
                }
                else if (pickupLocations[i]?.state.length === 0) {
                    valid = false;
                    setShowValidationModal(true);
                    setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_PICKUP_STATE);
                    return
                }
                else if (pickupLocations[i].state.length < 3) {
                    valid = false
                    setShowValidationModal(true)
                    setAlertTitle(StringConstants.PICKUP_STATE_SHOULD_BE_ATLEAST_3_CHARACTERS_LONG)
                    return
                }
                else if (!alphabetRegex.test(pickupLocations[i].state)) {
                    valid = false
                    setShowValidationModal(true)
                    setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_CORRECT_PICKUP_STATE_REGEX)
                    return
                }
                else if (pickupLocations[i]?.zip_code.length === 0) {
                    valid = false;
                    setShowValidationModal(true);
                    setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_PICKUP_ZIP_CODE);
                    return
                }
                else if (pickupLocations[i].zip_code.length < 5 || alphabetRegex.test(pickupLocations[i].zip_code) || numberRegex.test(pickupLocations[i].zip_code) || !alphaNumericRegex.test(pickupLocations[i].zip_code) || emojiRegex.test(pickupLocations[i].zip_code)) {
                    valid = false
                    setShowValidationModal(true)
                    setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_CORRECT_PICKUP_ZIP_CODE)
                    return
                }
                else if (pickupLocations[i].latitude === 0 && pickupLocations[i].longitude === 0) {
                    valid = false
                    setShowValidationModal(true)
                    setAlertTitle(StringConstants.PLEASE_SELECT_THE_PICKUP_LOCATION_ON_MAP_USING_DROP_PIN)
                    return
                }
            }

            //loop for checking pickUpItems array
            for (let j in pickupLocations[i].pickUpItems) {

                const pickItem = pickupLocations[i].pickUpItems[j];

                if (pickItem.item === "") {
                    valid = false;
                    setShowValidationModal(true);
                    setAlertTitle(StringConstants.PLEASE_SELECT_PICKUP_ITEM);
                    return;
                }
                else if (pickItem.count == "") {
                    valid = false;
                    setShowValidationModal(true);
                    setAlertTitle(StringConstants.PLEASE_ENTER_PICKUP_ITEM_COUNT);
                    return;
                }
                else if (zeroRegex.test(pickItem.count)) {
                    valid = false;
                    setShowValidationModal(true);
                    setAlertTitle(StringConstants.PICKUP_CANNOT_ZERO);
                    return;
                }
                else if (!numberRegex.test(pickItem.count)) {
                    valid = false;
                    setShowValidationModal(true);
                    setAlertTitle(StringConstants.PLEASE_ENTER_CORRECT_PICKUP_ITEM_COUNT);
                    return;
                }
            }
        }

        if (valid == true) {
            tapOnNextButton()
        }
    }

    //to remove a pickup location
    const removeLocation = () => {
        const { isPickUp, index } = locationToBeDeleted
        if (isPickUp) {
            setPickupLocations(prevAddress => {
                const newAddress = [...prevAddress];
                newAddress.splice(index, 1);
                return newAddress;
            });
        }
        setShowDeleteLocationModal(false)
        setlocationToBeDeleted({})
    }

    const hideDeleteConfirmationModal = () => {
        setShowDeleteLocationModal(false)

        setlocationToBeDeleted({
            index: null,
            isPickUp: null
        })
    }

    const tapOnAddNewPickUp = () => {
        if (pickupLocations.length < maxAddressLimit) {
            setPickupLocations(prevAddress => [...prevAddress, {
                location: '',
                addressLine1: '',
                addressLine2: '',
                city: '',
                state: '',
                zip_code: '',
                pickUpItems: [{
                    item: "",
                    count: 0
                }],
                dropOffItems: [],
                note: '',
                findAddress: true,
                latitude: 0,
                longitude: 0,
                placeId: '',
            }])
        }
    }
    // from Tap on Did not find address 
    const tapOnSelectPickLocation = (index: number) => {
        const { findAddress } = pickupLocations[index]

        let tempObj = {}
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



        let updatedAddress = [...pickupLocations];
        if (findAddress) {
            updatedAddress[index] = { ...updatedAddress[index], ...tempObj, findAddress: false };
        } else {
            updatedAddress[index] = { ...updatedAddress[index], ...tempObj, findAddress: true };
        }


        setPickupLocations(updatedAddress);

    }
    // to add another pickup item 
    const tapOnAddPickUpItem = (index: number) => {
        setPickupLocations(prevLocations => {
            const updatedLocations = [...prevLocations]; // Create a copy of the previous state
            const pickUpItemsLength = updatedLocations[index].pickUpItems?.length
            console.log(" pickUpItemsLength pickUpItemsLength",pickUpItemsLength);
            if(pickUpItemsLength > 0){
            const lastItem = updatedLocations[index].pickUpItems[pickUpItemsLength - 1];

            // Check if the last item's `item` and `count` properties are not empty
            if (lastItem && lastItem.item !== "" && lastItem.count !== 0) {
                updatedLocations[index].pickUpItems.push({ // Push a new object only if the last item's properties are not empty
                    item: "",
                    count: 0
                });


            }
        }
        console.log("updatedLocation in taponaddpickupItem",updatedLocations);
        
            return updatedLocations; // Return the updated state
        });
    }
    // to remove a pickup address 
    const tapOnRemovePickupAddress = (item: any, index: number) => {
        setlocationToBeDeleted({
            index: index,
            isPickUp: true
        })
        setShowDeleteLocationModal(true)
     
    }
    // to remove a pickup item 
    const tapOnRemovePickupItems = (index: number, i: number) => {
        setPickupLocations(prevLocations => {
            const updatedLocations = [...prevLocations];
            updatedLocations[index].pickUpItems.splice(i, 1)
            return updatedLocations;
        });
    }

    const setContactValues = (contactInfo: any) => {
             let tempData = [...pickupLocations]
        let tempAddressObj = tempData[selectedIndex]

        if (contactInfo?.location) {
            tempAddressObj = {
                ...tempAddressObj,

                location: contactInfo?.location,
                addressLine1: '',
                addressLine2: '',
                city: '',
                state: '',
                zip_code: '',
                findAddress: true,
                longitude: contactInfo?.longitude,
                latitude: contactInfo?.latitude,
                placeId: contactInfo?.placeId

            }
        }
        else if (contactInfo?.addressLine1) {
            tempAddressObj = {
                ...tempAddressObj,
                location: '',
                addressLine1: contactInfo?.addressLine1,
                addressLine2: contactInfo?.addressLine2,
                city: contactInfo?.city,
                state: contactInfo?.state,
                zip_code: contactInfo?.zip_code,
                findAddress: false,
                longitude: contactInfo?.longitude,
                latitude: contactInfo?.latitude,
                placeId: contactInfo?.placeId
            };
        }

        tempData.splice(selectedIndex, 1, tempAddressObj)
        setPickupLocations([...tempData]);

        setShowChooseContactModal(false)
    }




    return (
        <View style={styles.rootContainer}>

            {showPickLocationModal &&
                <FindAddressModal
                    showModal={showPickLocationModal}
                    hideModal={() => {
                        setShowPickLocationModal(false)
                    }}

                    tapOnConfirm={(data, details) => {
                        handlePickupPlaceSelect(data, details)
                        setShowPickLocationModal(false)

                    }}
                />
            }


            {showChooseContactModal &&
                <ChooseContactModal
                    showModal={showChooseContactModal}
                    hideModal={() => setShowChooseContactModal(false)}
                    tapOnConfirm={setContactValues}
                />
            }

            {isLoading && <LoaderModal showModal={isLoading} />}
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

            {
                showDeleteLocationModal &&
                <ConfirmationModal
                    title={locationToBeDeleted.isPickUp ? "Are you sure you want to remove this Pickup location?" :
                        "Are you sure you want to remove this Drop Off location?"}
                    hideModal={() =>

                        hideDeleteConfirmationModal()
                    }
                    showModal={showDeleteLocationModal}
                    tapOnConfirm={() => { removeLocation() }}


                />}
            {showPickMap &&
                <DropPinModal
                    showModal={showPickMap}
                    hideModal={() => {
                        setShowPickMap(false)
                    }}
                    tapOnConfirm={(data: any) => {

                        let tempData = [...pickupLocations]
                        tempData[selectedIndex].longitude = data.longitude
                        tempData[selectedIndex].latitude = data.latitude

                        setPickupLocations(tempData)
                        setShowPickMap(false)
                    }}
                />
            }

            {/* <Text style={styles.welcomeText}>{StringConstants.WELCOME}</Text>
            <Text style={styles.userName}>{capitalizeFirstLetter(profileDetails?.full_name)}</Text> */}

            <KeyboardAwareScrollView
                automaticallyAdjustKeyboardInsets={true}
                onScrollBeginDrag={() => Keyboard.dismiss()}
                enableAutomaticScroll={false}
                showsVerticalScrollIndicator={false}
                bounces={false}

            >



                <FlatList
                    data={pickupLocations}
                    extraData={pickupLocations}
                    keyExtractor={(item, index) => `${index}`}
                    renderItem={({ item, index }) => {


                        return (
                            <View>
                                {(index > 0) &&
                                    <TouchableOpacity style={styles.touchCross} onPress={() => tapOnRemovePickupAddress(item, index)}>
                                        <Image source={Images.IC_CROSS} style={{ height: 20, width: 20, backgroundColor: Colors.LIGHT_GREY }} />
                                    </TouchableOpacity>
                                }
                                <CommonHeading headingText={StringConstants.PICKUP_INFORMATION} />
                                <TouchableOpacity style={[styles.locationButtonView]}
                                    disabled={!item.findAddress}
                                    onPress={() => {
                                        setSelectedIndex(index)
                                        setShowPickLocationModal(true)
                                    }}>
                                    <Image source={Images.IC_LOCATION} style={[styles.locationIcon, !item.findAddress && { tintColor: Colors.COLOR_GREY1 }]} />
                                    <Text
                                        numberOfLines={1}
                                        style={[styles.selectLocation, { flex: 0.9 }, !item.findAddress && { color: Colors.COLOR_GREY1 }]}>
                                        {pickupLocations[index]?.location ? pickupLocations[index]?.location : StringConstants.SELECT_LOCATION}
                                    </Text>
                                </TouchableOpacity>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <TouchableOpacity onPress={() => {
                                        setSelectedIndex(index)
                                        setShowChooseContactModal(true)
                                        // navigation.navigate(AppConstants.screens.CHOOSE_CONTACT, { isFromChooseContact: true, fromCreateJob: true, pickUpAddress: true })
                                    }}>
                                        <Text style={[styles.findAddressText, { marginLeft: 28 }]}>{StringConstants.CHOOSE_CONTACT}</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => {
                                        setSelectedIndex(index)
                                        tapOnSelectPickLocation(index)
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
                                            maxLength={50}
                                            returnKeyType={'next'}
                                            fieldRef={address1Ref}
                                            autoCapitalize='sentences'
                                            onSubmitEditing={() => {
                                                if (address2Ref && address2Ref.current) {
                                                    address2Ref.current.focus();
                                                }
                                            }}
                                            onChangeText={(item) => {
                                                let tempData = [...pickupLocations]
                                                tempData[index].addressLine1 = item
                                                setPickupLocations(tempData)
                                            }}
                                            defaultValue={pickupLocations[index].addressLine1}

                                        />
                                        <TextField
                                            containerStyle={styles.containerStyles}
                                            placeholder={StringConstants.ADDRESS_LINE_2}
                                            placeholderTextColor={Colors.BUTTON_GREY}
                                            returnKeyType={'next'}
                                            maxLength={50}
                                            autoCapitalize='sentences'
                                            fieldRef={address2Ref}
                                            onSubmitEditing={() => {
                                                if (cityRef && cityRef.current) {
                                                    cityRef.current.focus();
                                                }
                                            }}
                                            onChangeText={(item) => {
                                                let tempData = [...pickupLocations]
                                                tempData[index].addressLine2 = item
                                                setPickupLocations(tempData)
                                            }}
                                            defaultValue={pickupLocations[index].addressLine2}

                                        />
                                        <TextField
                                            containerStyle={styles.containerStyles}
                                            placeholder={StringConstants.CITY}
                                            placeholderTextColor={Colors.BUTTON_GREY}
                                            returnKeyType={'next'}
                                            maxLength={40}
                                            autoCapitalize='words'
                                            fieldRef={cityRef}
                                            onSubmitEditing={() => {
                                                if (stateRef && stateRef.current) {
                                                    stateRef.current.focus();
                                                }
                                            }}
                                            onChangeText={(item) => {
                                                let tempData = [...pickupLocations]
                                                tempData[index].city = item
                                                setPickupLocations(tempData)
                                            }}
                                            defaultValue={pickupLocations[index].city}

                                        />

                                        <View style={styles.inputFieldView}>
                                            <TextField
                                                containerStyle={{ width: DimensionsValue.VALUE_160, borderWidth: 0 }}
                                                parentStyles={styles.parentStyles}
                                                placeholder={StringConstants.STATE}
                                                maxLength={40}
                                                placeholderTextColor={Colors.BUTTON_GREY}
                                                returnKeyType={'next'}
                                                autoCapitalize='words'
                                                fieldRef={stateRef}
                                                onSubmitEditing={() => {
                                                    if (zipCodeRef && zipCodeRef.current) {
                                                        zipCodeRef.current.focus();
                                                    }
                                                }}
                                                onChangeText={(item) => {
                                                    let tempData = [...pickupLocations]
                                                    tempData[index].state = item
                                                    setPickupLocations(tempData)
                                                }}
                                                defaultValue={pickupLocations[index].state}
                                            />
                                            <TextField
                                                containerStyle={{ width: DimensionsValue.VALUE_160, borderWidth: 0 }}
                                                parentStyles={styles.parentStyles}
                                                placeholder={StringConstants.ZIP_CODE}
                                                placeholderTextColor={Colors.BUTTON_GREY}
                                                returnKeyType={'next'}
                                                maxLength={8}
                                                autoCapitalize='characters'
                                                fieldRef={zipCodeRef}
                                                onSubmitEditing={() => {
                                                }}
                                                onChangeText={(item) => {
                                                    let tempData = [...pickupLocations]
                                                    tempData[index].zip_code = item
                                                    setPickupLocations(tempData)
                                                }}
                                                defaultValue={pickupLocations[index].zip_code}
                                            />
                                        </View>
                                        <TouchableOpacity onPress={() => {
                                            setSelectedIndex(index)
                                            setShowPickMap(true)
                                        }}>
                                            <Text style={styles.dropPinText}>{StringConstants.DROP_PIN}</Text>
                                        </TouchableOpacity>
                                    </View>
                                }

                                {  item.pickUpItems.map((pickup: any, i: number) => {

                                    return (
                                        <View>
                                            {(i > 0) &&
                                                <TouchableOpacity style={[styles.touchCross, { end: 10, marginBottom: 0 }]} onPress={() => tapOnRemovePickupItems(index, i)}>
                                                    <Image source={Images.IC_CROSS} style={{ height: 15, width: 15, backgroundColor: Colors.LIGHT_GREY }} />
                                                </TouchableOpacity>
                                            }
                                            <View style={[styles.inputFieldView, { marginBottom: 0 }]}>
                                                <Dropdown
                                                    itemContainerStyle={{ backgroundColor: Colors.WHITE }}
                                                    itemTextStyle={{ color: Colors.BLACK, fontFamily: Fonts.DM_SANS_SEMIBOLD }}
                                                    placeholderStyle={styles.placeholderStyle}
                                                    selectedTextStyle={styles.selectedTextStyle}
                                                    style={[styles.dropdownContainer, { width: 140 }]}
                                                    data={pickupItems}
                                                    labelField="label"
                                                    valueField="value"
                                                    value={pickup.item}
                                                    onChange={(selectedItem) => { // Use a more descriptive name for the selected item
                                                        // Update the state when the dropdown item is changed
                                                        setPickupLocations(prevLocations => {
                                                            const updatedLocations = [...prevLocations];
                                                            updatedLocations[index].pickUpItems[i].item = selectedItem?.value;
                                                            return updatedLocations;
                                                        });
                                                    }}
                                                />
                                                <TextField
                                                    containerStyle={{ width: 140, borderWidth: 0 }}
                                                    parentStyles={styles.parentStyles}
                                                    placeholder={StringConstants.ITEM_COUNT}
                                                    placeholderTextColor={Colors.BUTTON_GREY}
                                                    keyboardType={'numeric'}
                                                    maxLength={5}
                                                    value={pickup.count}
                                                    onChangeText={(item) => {
                                                        setPickupLocations(prevLocations => {
                                                            const updatedLocations = [...prevLocations];
                                                            updatedLocations[index].pickUpItems[i].count = item;
                                                            return updatedLocations;
                                                        });
                                                    }}
                                                />
                                            </View>
                                        </View>
                                    )
                                })}

                                <TouchableOpacity style={styles.addContactButton}
                                    onPress={() => tapOnAddPickUpItem(index)}
                                    disabled={pickupLocations[index]?.pickUpItems?.length >= maxAddressLimit}
                                >
                                    <Image source={Images.IC_ADD} style={styles.plusIcon} />
                                    <Text style={styles.addContactText}>{StringConstants.ADD_MORE_PICKUP_ITEM}</Text>
                                </TouchableOpacity>



                                <TextField
                                    containerStyle={styles.containerStyles}
                                    placeholder={StringConstants.PLEASE_ADD_INSTRUCTIONS_MESSAGE}
                                    placeholderTextColor={Colors.BUTTON_GREY}
                                    customHeight={120}
                                    multiline
                                    customStyles={{ paddingTop: 13 }}
                                    value={item.note}
                                    maxLength={300}
                                    onChangeText={(item) => {
                                        let tempData = [...pickupLocations]
                                        tempData[index].note = item
                                        setPickupLocations(tempData)
                                    }}
                                />
                            </View>
                        )
                    }}
                />


                <TouchableOpacity style={[styles.addContactButton,
                {
                    backgroundColor: pickupLocations.length >= maxAddressLimit
                        ? Colors.LIGHT_GREY2 : Colors.BUTTON_GREY
                }
                ]}
                    onPress={tapOnAddNewPickUp}
                    disabled={pickupLocations.length >= maxAddressLimit}
                >
                    <Image source={Images.IC_ADD} style={styles.plusIcon} />
                    <Text style={styles.addContactText}>{StringConstants.ADD_MORE_PICKUP_LOCATION}</Text>
                </TouchableOpacity>

                <Button
                    primaryTitle={"Next"}
                    onPress={() => checkValidations()}
                    containerStyles={{ backgroundColor: Colors.ORANGE }}
                />
            </KeyboardAwareScrollView>


        </View>


    )
}