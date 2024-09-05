import React, { useState } from "react";
import { GestureResponderEvent, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors } from "../Theme/Colors";
import { Fonts } from "../Theme/Fonts";
import { StringConstants } from "../Theme/StringConstants";
import { Images } from "../Assets";


interface ConfirmationModalProps {
    showModal: boolean;
    hideModal: () => void;
    tapOnConfirm: (event: GestureResponderEvent) => void;
    title?: string;
    tapOnNo ?: ()=>void
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    showModal,
    hideModal,
    tapOnConfirm,
    title,
    tapOnNo
}) => {
    return (
        <Modal transparent={true} animationType="fade" visible={showModal}>

            <TouchableOpacity
                style={styles.viewModalContainer}
                onPress={hideModal}>

                <TouchableOpacity activeOpacity={1} style={styles.modalView}>
                    <TouchableOpacity onPress={hideModal} style={styles.crossIconView}>
                        <Image source={Images.IC_CROSS} style={styles.crossIcon} />
                    </TouchableOpacity>
                    <Text style={styles.textLogoutWarning}>{title}</Text>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={tapOnConfirm} style={styles.touchButtonSubmit}>
                            <Text style={styles.textLogoutButton}>{StringConstants.YES}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={tapOnNo} style={styles.touchButtonCancel}>
                            <Text style={styles.textCancel}>{StringConstants.NO}</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>

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
        borderTopLeftRadius: 22,
        borderTopRightRadius: 22
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
    textLogoutWarning: {
        fontSize: 18,
        lineHeight: 26,
        fontFamily: Fonts.DM_SANS_REGULAR,
        color: Colors.BLACK,
        marginBottom: 36,
        textAlign: 'center',
        // paddingHorizontal: 15,
        // backgroundColor: 'red',
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
export default ConfirmationModal