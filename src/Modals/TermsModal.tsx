import React from "react";
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View, ScrollView, SafeAreaView } from 'react-native';
import { Colors } from "../Theme/Colors";
import { Fonts } from "../Theme/Fonts";
import { StringConstants } from "../Theme/StringConstants";
import { Images } from "../Assets";
import Button from "../Components/Button";
import WebView from "react-native-webview";

interface TermsModalProps {
    showModal: boolean;
    hideModal: () => void;
    tapOnAccept: (param: any) => void;
    index: any;
    url: string;
}

const TermsModal: React.FC<TermsModalProps> = ({
    showModal,
    hideModal,
    tapOnAccept,
    index,
    url
}) => {
    return (
        <Modal transparent={true} animationType="fade" visible={showModal}>
            <SafeAreaView style={{backgroundColor: 'white'}} />
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TouchableOpacity onPress={hideModal} style={styles.closeButton}>
                        <Image source={Images.IC_CROSS} style={styles.closeIcon} />
                    </TouchableOpacity>
                       
                    <View style={{ flex: 1 }}>
                            <WebView source={{ uri: url}}  />
                        </View>
                       
                        <Button
                        primaryTitle={StringConstants.ACCEPT}
                        onPress={() => tapOnAccept(index)}
                        containerStyles={styles.acceptButton}
                    />
                  
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: Colors.WHITE,
        width: '100%',
        height: '100%',
        padding: 20,
    },
    closeButton: {
        alignSelf: 'flex-end',
        padding: 10
    },
    closeIcon: {
        width: 20,
        height: 20,
    },
    scrollContainer: {
        flexGrow: 1,
    },
    termsTitle: {
        fontFamily: Fonts.DM_SANS_SEMIBOLD,
        fontSize: 18,
        marginBottom: 10,
        color: Colors.BLACK,
    },
    termsText: {
        fontFamily: Fonts.DM_SANS_REGULAR,
        fontSize: 16,
        marginBottom: 20,
    },
    acceptButton: {
        marginTop: 25,
        backgroundColor: Colors.ORANGE,
        height: 40
    },
})

export default TermsModal;
