import React, { useEffect, useRef, useState } from "react";
import {  Modal, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Keyboard } from 'react-native'
import { Colors } from "../Theme/Colors";
import { Fonts } from "../Theme/Fonts";
import { StringConstants } from "../Theme/StringConstants";
import { GooglePlacesAutocomplete, GooglePlacesAutocompleteRef } from "react-native-google-places-autocomplete";
import { DimensionsValue } from "../Theme/DimensionsValue";
import Header from "../Components/Header";


interface FindAddressModalProps {
    showModal: boolean;
    hideModal: () => void;
    tapOnConfirm: (data: any, details: any) => void;

}

const FindAddressModal: React.FC<FindAddressModalProps> = ({
    showModal,
    hideModal,
    tapOnConfirm,

}) => {

    useEffect(() =>{
        googlePlacesRef.current?.focus()
     
    },[])
    const googlePlacesRef = useRef<GooglePlacesAutocompleteRef>(null)

    const renderEmptyData =()=>{
        return(
            <Text style={{color: Colors.LIGHT_GREY2, marginTop: 20, fontFamily: Fonts.DM_SANS_LIGHT}}>No Results</Text>
        )
    }
    const customRenderRow = (rowData: any, highlighted: any) => {
        // console.log("rowData in customRenderRow", JSON.stringify(rowData));

        // Customize the appearance of each row here
        return (
            <View style={{
                // padding: 10,
                width: DimensionsValue.VALUE_346,
                marginStart: 15,
                alignSelf: 'center',
                // backgroundColor:'red',
                paddingHorizontal: 2
                // borderBottomWidth: 1,
                // borderBottomColor: '#ccc',
            }}>
                <Text style={
                    {
                        fontFamily: Fonts.DM_SANS_SEMIBOLD,
                        color: Colors.BLACK,
                        fontSize: 16
                    }} numberOfLines={1}>{rowData.structured_formatting.main_text}</Text>
                <Text style={
                    {
                        fontFamily: Fonts.DM_SANS_REGULAR,
                        color: Colors.BLACK,
                        fontSize: 12
                    }} numberOfLines={1}>{rowData.structured_formatting.secondary_text}</Text>
            </View>
        );
    };


    return (
        <Modal transparent={true} animationType="fade" visible={showModal}>
            <SafeAreaView style={styles.viewModalContainer}>
                {/* <TouchableOpacity style={styles.touchCross} onPress={hideModal}>
                    <Image source={Images.IC_CROSS} style={styles.crossIcon} />
                </TouchableOpacity> */}

                <Header  tapOnBack={hideModal}
                headerText={StringConstants.SELECT_LOCATION}/>

                <GooglePlacesAutocomplete
                    placeholder="Type a place"
                    textInputProps={{
                        placeholderTextColor: Colors.LIGHT_GREY2,
                        paddingLeft: 20,
                        autoFocus: true,
                    }}
                    onPress={(data, details = null) => {
                        // console.log("data in google places ", JSON.stringify(data));
                        // console.log("details in google places ", JSON.stringify(details));
                        tapOnConfirm(data, details)
                    }}
                    query={{
                        key: 'AIzaSyD18in84QdXIsB25ms_snw1C-xxTkQsDd8',
                        components: 'country:uk',
                        fields: 'address_components,formatted_address',
                    }}

                    enableHighAccuracyLocation={true}
                    ref={googlePlacesRef}
                    fetchDetails={true}
                    onFail={error => console.log(error)}
                    onNotFound={() => console.log('no results')}
                    numberOfLines={3}
                    listEmptyComponent={renderEmptyData}
                    renderRow={customRenderRow}
                    styles={{
                        container: {
                            flex: 1,
                            alignItems: 'center'
                        },
                        textInput: {
                            borderRadius: 30,
                            borderWidth: 0.5,
                            borderColor: Colors.FIELD_BORDER,
                            height: 50,
                            color: Colors.BLACK,
                        },

                        textInputContainer: {
                            width: DimensionsValue.VALUE_346,

                        },

                    }}
                // currentLocation={true}
                // currentLocationLabel="Your location!" // add a simple label
                />



            </SafeAreaView>



        </Modal>
    )
}


const styles = StyleSheet.create({
    viewModalContainer: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        // alignItems: 'center'
    },
    modalView: {
        width: '100%',
        paddingVertical: 35,
        backgroundColor: Colors.WHITE,
        borderRadius: 22,
    },
    touchCross: {
        alignSelf: 'flex-end',
        // marginTop: -30,
        marginRight: 15,
        padding: 10,
    },
    crossIconView: {
        alignSelf: 'flex-end',
        marginTop: -30,
        marginRight: 15,
        padding: 10,
    },
    crossIcon: {
        height: 20,
        width: 20
    },


    customRow: {

    },

    emailIcon: {
        height: 60,
        width: 60,
        alignSelf: 'center',
        marginBottom: 20
    },
    textLogout: {
        fontSize: 14,
        fontFamily: Fonts.DM_SANS_REGULAR,
        color: Colors.BLACK,
        marginBottom: 27,
        textAlign: 'center',
        marginHorizontal: 30

    },
    textLogoutWarning: {
        fontSize: 18,
        lineHeight: 26,
        fontFamily: Fonts.DM_SANS_SEMIBOLD,
        color: Colors.BLACK,
        marginBottom: 15,
        textAlign: 'center',
        marginHorizontal: 50

    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    touchButtonCancel: {
        height: 38,
        width: 140,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.BUTTON_GREY,
        borderRadius: 20,

    },
    textCancel: {
        fontFamily: Fonts.DM_SANS_REGULAR,
        fontSize: 14,
        color: Colors.WHITE
    },
    touchButtonSubmit: {
        height: 38,
        width: 140,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.ORANGE,
        borderRadius: 20,
    },
    textLogoutButton: {
        fontFamily: Fonts.DM_SANS_REGULAR,
        fontSize: 14,
        color: Colors.WHITE
    },

})
export default FindAddressModal;