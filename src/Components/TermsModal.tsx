import React, { PropsWithChildren, forwardRef, useImperativeHandle, useState } from 'react';
import {
    Image,
    ImageResizeMode,
    Linking,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Colors } from '../Theme/colors';
import { Fonts } from '../Theme/fonts';
import AppButton from './AppButton';
import { DataManager } from '../Manager/DataManager';

type TermsModalProps = PropsWithChildren<{

}>;
const TermsModal = forwardRef(({ }: TermsModalProps, ref): JSX.Element => {
    const [modalVisible, setModalVisible] = useState(false)

    useImperativeHandle(ref, () => ({

        showTermsModal() {
            setModalVisible(true)
        },
        hideTermsModal() {
            setModalVisible(false)
        }

    }));

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                // alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View
                        style={[styles.button, styles.buttonClose]}>
                        <Text style={styles.hyperLinkText}>
                            {'DoggyWords cares about your\nprivacy. By using this app, you\nacknowledge that you have read and\nagree to the '}
                            <Text style={{ textDecorationLine: 'underline', color: '#2386E0' }} onPress={() => { Linking.openURL('https://studydoctor.org/terms') }}>{'terms and conditions'} </Text>{'\nand '}
                            <Text onPress={() => { Linking.openURL('https://studydoctor.org/privacy-policy') }} style={{ textDecorationLine: 'underline', color: '#2386E0' }}>{'privacy policy'}</Text>
                        </Text>
                    </View>
                    <AppButton buttonStyle={{ width: '100%', height: 50, marginTop: 30 }} onPress={() => {
                        setModalVisible(!modalVisible)
                        DataManager.setTermsStatus(true)
                    }} title='I Agree' />
                </View>
            </View>
        </Modal>
    );
})

export default TermsModal;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    hyperLinkText: {
        fontFamily: Fonts.Livvic_Italic,
        fontSize: 15,
        textAlign: 'center',
        lineHeight: 20,
        fontWeight: '500'
    },
})