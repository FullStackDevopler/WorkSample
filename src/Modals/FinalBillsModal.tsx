import React, { useState } from "react";
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, Keyboard, Platform } from 'react-native'
import { Colors } from "../Theme/Colors";
import { Fonts } from "../Theme/Fonts";
import { StringConstants } from "../Theme/StringConstants";
import { Images } from "../Assets";
import Button from "../Components/Button";
import { DimensionsValue } from "../Theme/DimensionsValue";
import DatePicker from "react-native-date-picker";
import TextField from "../Components/TextField";

interface FinalBillsModalProps {
    showModal: boolean;
    hideModal: () => void;
    tapOnSubmit: () => void;
    additionalAmount?: string;
    setAdditionalAmount ?: any;
    note?: string;
    setNote ?: any;
    previousAmount ?: string
}

const FinalBillsModal: React.FC<FinalBillsModalProps> = ({
    showModal,
    hideModal,
    tapOnSubmit,
    setAdditionalAmount, 
    additionalAmount,
    setNote, 
    note,
    previousAmount

}) => {


    return (
        <Modal transparent={true} animationType="fade" visible={showModal}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <TouchableOpacity
                    style={styles.viewModalContainer}
                    onPress={hideModal}>

                    <TouchableOpacity activeOpacity={1} style={styles.modalView}>
                        <TouchableOpacity onPress={hideModal} style={styles.crossIconView}>
                            <Image source={Images.IC_CROSS} style={styles.crossIcon} />
                        </TouchableOpacity>
                        <Text style={styles.ratingReviewText}>{StringConstants.MAKE_FINAL_BILL}</Text>

                        <Text style={[styles.FieldLabel, { marginTop: 10 }]}>{StringConstants.AMOUNT}</Text>
                      
                        <TextField
                            containerStyle={styles.containerStyles}
                            placeholder={StringConstants.ENTER_AMOUNT}
                            value={previousAmount}
                            editable={false}
                        />
                        <Text style={[styles.FieldLabel, { marginTop: 10 }]}>{StringConstants.WANT_ADDITIONAL_AMOUNT}</Text>
                        <TextField
                            containerStyle={styles.containerStyles}
                            placeholder={StringConstants.ENTER_AMOUNT}
                            returnKeyType="next"
                            value={additionalAmount}
                            onChangeText={(val) => setAdditionalAmount(val)}
                            keyboardType='number-pad'
                        />
                        <Text style={[styles.FieldLabel, { marginTop: 10 }]}>{StringConstants.NOTES}</Text>
                        <TextField
                            containerStyle={styles.containerStyles}
                            placeholder={StringConstants.ADD_NOTE}
                            customHeight={70}
                            multiline
                            customStyles={{ paddingTop: 13 }}
                            returnKeyType="next"
                            value={note}
                            onChangeText={(val) => setNote(val)}
                        />


                        <Button primaryTitle={StringConstants.SUBMIT} onPress={tapOnSubmit}
                            containerStyles={{ backgroundColor: Colors.ORANGE, height: 45 }}
                        />
                    </TouchableOpacity>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </Modal>
    )
}


const styles = StyleSheet.create({
    viewModalContainer: {
        flex: 1,
        backgroundColor: '#00000040',
        justifyContent: 'flex-end',
    },
    modalView: {
        width: '100%',
        paddingVertical: 35,
        backgroundColor: Colors.WHITE,
        borderTopStartRadius:22,
        borderTopEndRadius:22,
        // borderRadius: 22,
        alignSelf: 'center'
    },
    FieldLabel: {
        fontSize: 14,
        fontFamily: Fonts.DM_SANS_SEMIBOLD,
        marginLeft: 30,
        marginBottom: 10,
        marginTop: 20,
        color: Colors.BLACK

    },
    locationIcon: {
        height: 20,
        width: 20,
        alignSelf: 'center',
        marginLeft: 20,
    },
    selectLocation: {
        fontSize: 14.5,
        fontFamily: Fonts.DM_SANS_REGULAR,
        alignSelf: 'center',
        marginLeft: 12,
        color: Colors.BUTTON_GREY,
    },
    locationButtonView: {
        flexDirection: 'row',
        backgroundColor: Colors.LIGHT_GREY3,
        height: 45,
        width: DimensionsValue.VALUE_346,
        alignSelf: 'center',
        borderRadius: 25
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
    textLogout: {
        fontSize: 14,
        fontFamily: Fonts.DM_SANS_REGULAR,
        color: Colors.BLACK,
        marginBottom: 7,
        textAlign: 'center'

    },
    ratingReviewText: {
        fontSize: 18,
        lineHeight: 26,
        fontFamily: Fonts.DM_SANS_SEMIBOLD,
        color: Colors.BLACK,
        marginBottom: 20,
        textAlign: 'center',
        marginHorizontal: 50

    },
    starIcon: {
        height: 44,
        width: 284,
        alignSelf: 'center',
        marginBottom: 20
    },
    containerStyles: {
        backgroundColor: Colors.LIGHT_GREY3,
        borderWidth: 0,
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
export default FinalBillsModal