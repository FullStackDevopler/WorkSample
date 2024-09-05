import { View, Text, TouchableOpacity, Image, TextInput, FlatList, Alert, Keyboard } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { styles } from './styles'
import { StringConstants } from '../../Theme/StringConstants'
import { Images } from '../../Assets'
import TextField from '../../Components/TextField'
import { Colors } from '../../Theme/Colors'
import { AppConstants } from '../../Theme/AppConstants'

import Button from '../../Components/Button'
import { DimensionsValue } from '../../Theme/DimensionsValue'
import { useDispatch, useSelector } from 'react-redux'
import LoaderModal from '../../Modals/LoaderModal'
import ValidationModal from '../../Modals/ValidationModal'
import FindAddressModal from '../../Modals/FindAddressModal'
import DropPinModal from '../../Modals/DropPinModal'
import CommonHeading from '../../Components/CommonHeading'
import ConfirmationModal from '../../Modals/ConfirmationModal'
import DropOffListModal from '../../Modals/DropOffListModal'
import { alphaNumericRegex, alphabetRegex, emojiRegex, numberRegex } from '../../Theme/validation'
import ChooseContactModal from '../../Modals/ChooseContactModal'
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view'

export default function Form2({ navigation,
    route, tapOnNext,
    transformedArray,
    dropOffLocationsArray,
    setTansformedArray,
    pickupLocations,
}: any): React.JSX.Element {

    interface DropOffInterface {
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
    const maxAddressLimit = 25
    const address1Ref = useRef<TextInput>(null);
    const address2Ref = useRef<TextInput>(null);
    const cityRef = useRef<TextInput>(null);
    const stateRef = useRef<TextInput>(null);
    const zipCodeRef = useRef<TextInput>(null);
    const isLoading = useSelector((state: any) => state?.persistedReducer.jobListData.isLoading)


    const [showValidationModal, setShowValidationModal] = useState<boolean>(false)
    const [alertTitle, setAlertTitle] = useState<string>('')
    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    const [showDeleteLocationModal, setShowDeleteLocationModal] = useState<boolean>(false)
    // const [maxAddressLimit, setMaxAddressLimit] = useState<number>(25);
    const [showDropLocationModal, setShowDropLocationModal] = useState<boolean>(false)
    const [showDropMap, setShowDropMap] = useState<boolean>(false);
    const [showDropOffModal, setShowDropOffModal] = useState<boolean>(false);
    const [currentDropOffSelected, setCurrentDropOffSelected] = useState<any>({
        dropOff: null,
        dropOffItemIndex: null
    })    //this consist  indexes to update the dropoff item
    const [showChooseContactModal, setShowChooseContactModal] = useState<boolean>(false)

    const [locationToBeDeleted, setlocationToBeDeleted] = useState<any>(null)      // to delete a certain location 
    const [dropDownItems, setDropDownItems] = useState<any[]>([])                   // this consist list of items that can be selected it dropoffitem
    const [dropOffLocations, setDropOffLocations] = useState<Array<DropOffInterface>>([
        {
            location: '',
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            zip_code: '',
            pickUpItems: [],
            dropOffItems: [{
                item: "",
                count: 0,
            }],
            note: '',
            findAddress: true,
            latitude: 0,
            longitude: 0,
            placeId: '',
        }
    ]);

    useEffect(() => {
        console.log("dropOffLocationsArray in useEffect=>",JSON.stringify(dropOffLocationsArray));
        if (dropOffLocationsArray) {

            setDropOffLocations(dropOffLocationsArray)
        }

        if (dropOffLocationsArray.length == 1 && dropOffLocationsArray[0]?.dropOffItems[0]?.count == 0) {
            console.log("transformedArray in useEffect=>", transformedArray);
            setDropDownItems(transformedArray)
        }

    }, [])

 



    




    const tapOnNextButton = () => {
        tapOnNext(dropOffLocations)
        setDropOffLocations([
            {
                location: '',
                addressLine1: '',
                addressLine2: '',
                city: '',
                state: '',
                zip_code: '',
                pickUpItems: [],
                dropOffItems: [{
                    item: "",
                    count: 0,
                }],
                note: '',
                findAddress: true,
                latitude: 0,
                longitude: 0,
                placeId: '',
            }
        ])
    }

    const checkValidations = () => {
        Keyboard.dismiss()
        let valid = true
        let totalPickupItemCount = 0;
        let totalDropOffItemCount = 0;


        for (let i in dropOffLocations) {
            if (dropOffLocations[i]?.findAddress == true) {
                if (dropOffLocations[i]?.location?.length === 0) {
                    valid = false;
                    setShowValidationModal(true);
                    setAlertTitle(StringConstants.PLEASE_SELECT_THE_DROP_OFF_LOCATION);
                    return
                }
            } else {
                //check for address lines when findAddress is false in drop off loop

                if (dropOffLocations[i]?.addressLine1.length === 0) {
                    valid = false;
                    setShowValidationModal(true);
                    setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_DROP_OFF_ADDRESS_LINE_1);
                    return
                }
                else if (dropOffLocations[i]?.addressLine2.length === 0) {
                    valid = false;
                    setShowValidationModal(true);
                    setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_DROP_OFF_ADDRESS_LINE_2);
                    return
                }
                else if (dropOffLocations[i]?.city.length === 0) {
                    valid = false;
                    setShowValidationModal(true);
                    setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_DROP_OFF_CITY);
                    return
                }
                else if (dropOffLocations[i].city.length < 3) {
                    valid = false
                    setShowValidationModal(true)
                    setAlertTitle(StringConstants.DROP_OFF_CITY_SHOULD_BE_ATLEAST_3_CHARACTERS_LONG)
                    return
                }
                else if (!alphabetRegex.test(dropOffLocations[i].city)) {
                    valid = false
                    setShowValidationModal(true)
                    setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_CORRECT_DROP_OFF_CITY_REGEX)
                    return
                }
                else if (dropOffLocations[i]?.state.length === 0) {
                    valid = false;
                    setShowValidationModal(true);
                    setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_DROP_OFF_STATE);
                    return
                }
                else if (dropOffLocations[i].state.length < 3) {
                    valid = false
                    setShowValidationModal(true)
                    setAlertTitle(StringConstants.DROP_OFF_STATE_SHOULD_BE_ATLEAST_3_CHARACTERS_LONG)
                    return
                }
                else if (!alphabetRegex.test(dropOffLocations[i].state)) {
                    valid = false
                    setShowValidationModal(true)
                    setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_CORRECT_DROP_OFF_STATE_REGEX)
                    return
                }
                else if (dropOffLocations[i]?.zip_code.length === 0) {
                    valid = false;
                    setShowValidationModal(true);
                    setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_DROP_OFF_ZIP_CODE);
                    return
                }
                else if (dropOffLocations[i].zip_code.length < 5 || alphabetRegex.test(dropOffLocations[i].zip_code) || numberRegex.test(dropOffLocations[i].zip_code) || !alphaNumericRegex.test(dropOffLocations[i].zip_code) || emojiRegex.test(dropOffLocations[i].zip_code)) {
                    valid = false
                    setShowValidationModal(true)
                    setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_CORRECT_DROP_OFF_ZIP_CODE)
                    return
                }
                else if (dropOffLocations[i].latitude === 0 && dropOffLocations[i].longitude === 0) {
                    valid = false
                    setShowValidationModal(true)
                    setAlertTitle(StringConstants.PLEASE_SELECT_THE_DROP_OFF_LOCATION_ON_MAP_USING_DROP_PIN)
                    return
                }
            }

            //loop for checking dropOffItems array validation
            for (let j in dropOffLocations[i].dropOffItems) {

                const dropItem = dropOffLocations[i].dropOffItems[j];

                if (dropItem.item === "") {
                    valid = false;
                    setShowValidationModal(true);
                    setAlertTitle(StringConstants.PLEASE_SELECT_DROP_OFF_ITEM);
                    return;
                }
            }

        }

        // Calculate total count of pickup items
        pickupLocations.forEach((location: any) => {
            totalPickupItemCount += location.pickUpItems.length;
        });

        // Calculate total count of drop off items
        dropOffLocations.forEach((location: any) => {
            totalDropOffItemCount += location.dropOffItems.length;
        });

        // Check if counts are equal
        if (totalPickupItemCount !== totalDropOffItemCount) {
            valid = false;
            setShowValidationModal(true);
            setAlertTitle(StringConstants.PLEASE_SELECT_ANOTHER_DROP_OFF_LOCATION);
            return;
        }


        if (valid == true) {
            tapOnNextButton()
        }

    }

    // Function to update dropOffLocations when dropdown item is changed
    const handleOnChangeOfDropOff = (selectedItem: any) => {

        const { dropOff, dropOffItemIndex } = currentDropOffSelected    //to get the current selected indexes

        // Update the state when the dropdown item is changed
        let transformedItemIndex = -1
        let alreadyBooked: any

        setDropOffLocations((prevLocations) => {
            const updatedLocations = [...prevLocations];
            transformedItemIndex = dropDownItems.findIndex((item: any) => item.uniqueId === selectedItem.uniqueId);
            if (transformedItemIndex > -1) {

                if (updatedLocations[dropOff].dropOffItems[dropOffItemIndex].uniqueId) {
                    alreadyBooked = updatedLocations[dropOff].dropOffItems[dropOffItemIndex]
                }
                updatedLocations[dropOff].dropOffItems[dropOffItemIndex] = dropDownItems[transformedItemIndex]
            }
            return updatedLocations;
        });

        console.log("dropDownItems in handleOnChangeOfDropOff", dropDownItems);

        let tempArray = [...dropDownItems]
        if (alreadyBooked?.count) {
            tempArray.splice(transformedItemIndex, 1)
            tempArray.splice(transformedItemIndex, 1, alreadyBooked);
        } else tempArray.splice(transformedItemIndex, 1)

        console.log("tempArray in handleOnChangeOfDropOff", tempArray);

        setDropDownItems(tempArray)

    };

    //to remove a dropoff location
    const removeLocation = () => {


        // Copy the dropOffLocations array
        const updatedDropOffLocations = [...dropOffLocations];

        // Get the dropOffItems of the location to be deleted
        const dropOffItemsToRestore = updatedDropOffLocations[locationToBeDeleted].dropOffItems.filter((item: any) => item.item !== "");

        // Add the dropOffItems of the location to be deleted back to the dropDownItems array
        setDropDownItems((prevDropDownItems) => [...prevDropDownItems, ...dropOffItemsToRestore]);

        // Remove the location from dropOffLocations array
        updatedDropOffLocations.splice(locationToBeDeleted, 1);

        // Update dropOffLocations state
        setDropOffLocations(updatedDropOffLocations);

        // Hide the delete location modal and reset locationToBeDeleted state
        setShowDeleteLocationModal(false);
        setlocationToBeDeleted(null);
    }

    // to add another dropoff item 
    const tapOnAddDropOffItem = (index: number) => {
        console.log("dropDownItems in tapOnAddDropOffItem=>", dropDownItems);

        if (dropDownItems.length > 0) {
            // Continue adding a new drop-off field
            setDropOffLocations(prevLocations => {
                const updatedLocations = [...prevLocations];
                const lastItem = updatedLocations[index].dropOffItems[updatedLocations[index]?.dropOffItems?.length - 1];

                if (lastItem && lastItem.item !== "") {
                    updatedLocations[index]?.dropOffItems?.push({
                        item: "",
                        count: 0
                    });
                }

                return updatedLocations;
            });
        } else {
            setAlertTitle("No item left")
            setShowValidationModal(true)
        }
    }

    // to add a new item in dropOffLcations array
    const tapOnAddNewDropOff = () => {
        if (dropOffLocations.length < maxAddressLimit) {
            setDropOffLocations(prevAddress => [...prevAddress, {
                location: '',
                addressLine1: '',
                addressLine2: '',
                city: '',
                state: '',
                zip_code: '',
                pickUpItems: [],
                dropOffItems: [{
                    item: "",
                    count: 0
                }],

                weight: '0',
                note: '',
                findAddress: true,
                latitude: 0,
                longitude: 0,
                placeId: '',
            }])
        }
    }

    // to remove a dropoff item  dropOffLcations array
    const tapOnRemoveDropOffItems = (item: any, index: number, i: number) => {


        if (item.item == "") {

        } else {
            setDropDownItems(prev => {
                const updateItems = [...prev];
                updateItems.push(item)
                return updateItems
            })


        }


        setDropOffLocations(prevLocations => {
            const updatedLocations = [...prevLocations];
            updatedLocations[index].dropOffItems.splice(i, 1)
            return updatedLocations;
        });


    }

    // to remove a dropoff address 
    const tapOnRemoveDropOffAddress = (item: any, index: number) => {

        setlocationToBeDeleted(index)
        setShowDeleteLocationModal(true)
    }

    //to remove the dropoff item in 
    const hideDeleteConfirmationModal = () => {
        setShowDeleteLocationModal(false)

        setlocationToBeDeleted(null)
    }

    // to find google address from FindAddressModal modal 
    const handleDropOffPlaceSelect = (data: any, details: any) => {
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


        const updatedLocation = [...dropOffLocations];
        updatedLocation[selectedIndex] = { ...updatedLocation[selectedIndex], ...updateAddress };

        setDropOffLocations(updatedLocation);
    };

    // from Tap on Did not find address 
    const tapOnSelectDropLocation = (index: number) => {
        const { findAddress } = dropOffLocations[index]

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



        let updatedAddress = [...dropOffLocations];
        if (findAddress) {
            updatedAddress[index] = { ...updatedAddress[index], ...tempObj, findAddress: false };
        } else {
            updatedAddress[index] = { ...updatedAddress[index], ...tempObj, findAddress: true };
        }


        setDropOffLocations(updatedAddress);

    }

    const tapOnShowDropOffList = (i: number, index: number) => {
        if (dropDownItems.length > 0) {

            setCurrentDropOffSelected({
                dropOff: index,
                dropOffItemIndex: i
            })
            setShowDropOffModal(true)
        } else {
            setAlertTitle("No item left")
            setShowValidationModal(true)
        }
    }

    const setContactValues = (contactInfo: any) => {
        console.log("contactInfo contactInfo", contactInfo);

        let tempData = [...dropOffLocations]
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
        setDropOffLocations([...tempData]);

        setShowChooseContactModal(false)
    }


    return (
        <View style={styles.rootContainer}>
            {isLoading && <LoaderModal showModal={isLoading} />}

            {showChooseContactModal &&
                <ChooseContactModal
                    showModal={showChooseContactModal}
                    hideModal={() => setShowChooseContactModal(false)}
                    tapOnConfirm={setContactValues}
                />
            }

            {showDropOffModal &&

                <DropOffListModal
                    showModal={showDropOffModal}
                    hideModal={() => {
                        setShowDropOffModal(false)
                    }}
                    tapOnConfirm={(item: any) => {
                        handleOnChangeOfDropOff(item)
                        setShowDropOffModal(false)
                    }}

                    dropOffList={dropDownItems}

                />}
            {
                showDeleteLocationModal &&

                <ConfirmationModal
                    title={"Are you sure you want to remove this Drop Off location?"}
                    hideModal={() =>
                        hideDeleteConfirmationModal()
                    }
                    showModal={showDeleteLocationModal}
                    tapOnConfirm={() => { removeLocation() }}
                    tapOnNo={() => { hideDeleteConfirmationModal() }}
                />}

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

            {showDropLocationModal &&
                <FindAddressModal
                    showModal={showDropLocationModal}
                    hideModal={() => {
                        setShowDropLocationModal(false)
                    }}
                    tapOnConfirm={(data, details) => {
                        handleDropOffPlaceSelect(data, details)
                        setShowDropLocationModal(false)

                    }}
                />
            }

            {showDropMap &&
                <DropPinModal
                    showModal={showDropMap}
                    hideModal={() => {
                        setShowDropMap(false)
                    }}
                    tapOnConfirm={(data: any) => {

                        let tempData = [...dropOffLocations]
                        tempData[selectedIndex].longitude = data.longitude
                        tempData[selectedIndex].latitude = data.latitude

                        setDropOffLocations(tempData)
                        setShowDropMap(false)
                    }}
                />
            }

            <KeyboardAwareScrollView
                automaticallyAdjustKeyboardInsets={true}
                onScrollBeginDrag={() => Keyboard.dismiss()}
                enableAutomaticScroll={false}
                showsVerticalScrollIndicator={false}
                bounces={false}

            >



            <FlatList
                data={dropOffLocations}
                extraData={dropOffLocations}
                keyExtractor={(item, index) => `${index}`}
                renderItem={({ item, index }) => {

                    return (
                        <View>
                            {(index > 0) &&
                                <TouchableOpacity style={[styles.touchCrossDrop, { marginBottom: 15 }]} onPress={() => tapOnRemoveDropOffAddress(item, index)}>
                                    <Image source={Images.IC_CROSS} style={{ height: 20, width: 20, backgroundColor: Colors.LIGHT_GREY }} />
                                </TouchableOpacity>
                            }
                            <CommonHeading headingText={StringConstants.DROP_OFF_INFORMATION}
                            />
                            <TouchableOpacity style={[styles.locationButtonView]}
                                disabled={!item.findAddress}
                                onPress={() => {
                                    setSelectedIndex(index)
                                    setShowDropLocationModal(true)
                                }}>
                                <Image source={Images.IC_LOCATION} style={[styles.locationIcon, !item.findAddress && { tintColor: Colors.COLOR_GREY1 }]} />
                                <Text
                                    numberOfLines={1}
                                    style={[styles.selectLocation, { flex: 0.9 }, !item.findAddress && { color: Colors.COLOR_GREY1 }]}>
                                    {dropOffLocations[index]?.location ? dropOffLocations[index]?.location : StringConstants.SELECT_LOCATION}
                                </Text>
                            </TouchableOpacity>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TouchableOpacity onPress={() => {
                                    setSelectedIndex(index)
                                    setShowChooseContactModal(true)
                                    // navigation.navigate(AppConstants.screens.CHOOSE_CONTACT, { isFromChooseContact: true, fromCreateJob: true, pickUpAddress: false })
                                }}>
                                    <Text style={[styles.findAddressText, { marginLeft: 28 }]}>{StringConstants.CHOOSE_CONTACT}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    setSelectedIndex(index)
                                    tapOnSelectDropLocation(index)
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
                                            let tempData = [...dropOffLocations]
                                            tempData[index].addressLine1 = item
                                            setDropOffLocations(tempData)
                                        }}
                                        defaultValue={dropOffLocations[index].addressLine1}

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
                                            let tempData = [...dropOffLocations]
                                            tempData[index].addressLine2 = item
                                            setDropOffLocations(tempData)
                                        }}
                                        defaultValue={dropOffLocations[index].addressLine2}

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
                                            let tempData = [...dropOffLocations]
                                            tempData[index].city = item
                                            setDropOffLocations(tempData)
                                        }}
                                        defaultValue={dropOffLocations[index].city}

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
                                                let tempData = [...dropOffLocations]
                                                tempData[index].state = item
                                                setDropOffLocations(tempData)
                                            }}
                                            defaultValue={dropOffLocations[index].state}
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
                                                let tempData = [...dropOffLocations]
                                                tempData[index].zip_code = item
                                                setDropOffLocations(tempData)
                                            }}
                                            defaultValue={dropOffLocations[index].zip_code}
                                        />
                                    </View>
                                    <TouchableOpacity onPress={() => {
                                        setSelectedIndex(index)
                                        setShowDropMap(true)
                                    }}>
                                        <Text style={styles.dropPinText}>{StringConstants.DROP_PIN}</Text>
                                    </TouchableOpacity>
                                </View>
                            }

                            { item?.dropOffItems.map((dropOff: any, i: number) => {
                                console.log("dropOff", dropOff);

                                return (
                                    <View>
                                        {(i > 0) &&
                                            <TouchableOpacity style={[styles.touchCross, { end: 10, marginBottom: 0 }]} onPress={() => tapOnRemoveDropOffItems(dropOff, index, i)}>
                                                <Image source={Images.IC_CROSS} style={{ height: 15, width: 15, backgroundColor: Colors.LIGHT_GREY }} />
                                            </TouchableOpacity>
                                        }
                                        <View style={[styles.inputFieldView, { marginBottom: 0 }]}>


                                            <TouchableOpacity style={styles.dropdownContainer} onPress={() => tapOnShowDropOffList(i, index)}>

                                                {
                                                    dropOff.item ?
                                                        <>
                                                            <Text style={styles.selectedTextStyle}>{`${dropOff.count} ${dropOff.item}`}</Text>
                                                            <Text numberOfLines={1} style={styles.selectedTextStyle}>{dropOff.location}</Text>
                                                        </>
                                                        :
                                                        <Text style={[styles.placeholderStyle]}>Select Drop off item</Text>

                                                }
                                            </TouchableOpacity>

                                        </View>


                                    </View>
                                )
                            })}

                            <TouchableOpacity style={[styles.addContactButton,
                            ]}
                                onPress={() => tapOnAddDropOffItem(index)}
                            >
                                <Image source={Images.IC_ADD} style={styles.plusIcon} />
                                <Text style={styles.addContactText}>{StringConstants.ADD_MORE_DROP_OFF_ITEM}</Text>
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
                                    let tempData = [...dropOffLocations]
                                    tempData[index].note = item
                                    setDropOffLocations(tempData)
                                }}
                            />
                        </View>
                    )
                }}

            />
            <TouchableOpacity style={[styles.addContactButton,
            ]}
                onPress={tapOnAddNewDropOff}
            >
                <Image source={Images.IC_ADD} style={styles.plusIcon} />
                <Text style={styles.addContactText}>{StringConstants.ADD_MORE_DROP_OFF_LOCATION}</Text>
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