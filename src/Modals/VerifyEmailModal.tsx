import React, { useState } from "react";
import { GestureResponderEvent, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors } from "../Theme/Colors";
import { Fonts } from "../Theme/Fonts";
import { StringConstants } from "../Theme/StringConstants";
import { Images } from "../Assets";


interface VerifyEmailModalProps {
    showModal: boolean;
    hideModal: () => void;
    tapOnConfirm: (event: GestureResponderEvent) => void;
    title?: string;
    description?: string;
}

const VerifyEmailModal: React.FC<VerifyEmailModalProps> = ({
    showModal,
    hideModal,
    tapOnConfirm,
    title,
    description
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

                    <Image source={Images.IC_EMAIL_VERIFY} style={styles.emailIcon} />
                    <Text style={styles.textLogoutWarning}>{title ? title : StringConstants.VERIFY_YOUR_EMAIL_ADDRESS}</Text> 
                    <Text style={styles.textLogout}>{description ? description : StringConstants.EMAIL_VERIFY_MESSAGE}</Text>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={tapOnConfirm} style={styles.touchButtonSubmit}>
                            <Text style={styles.textLogoutButton}>{StringConstants.YES}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={hideModal} style={styles.touchButtonCancel}>
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
        // alignItems: 'center'
    },
    modalView: {
        width: '100%',
        paddingVertical: 35,
        backgroundColor: Colors.WHITE,
        // borderRadius: 22,
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
export default VerifyEmailModal