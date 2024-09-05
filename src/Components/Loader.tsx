import React, { PropsWithChildren, forwardRef, useImperativeHandle, useState } from 'react';
import {
    ActivityIndicator,
    Modal,
    StyleSheet,
    View,
} from 'react-native';
import { Colors } from '../Theme/colors';
import { Fonts } from '../Theme/fonts';
import AppButton from './AppButton';
import { DataManager } from '../Manager/DataManager';

type LoaderProps = PropsWithChildren<{
}>;
const Loader = forwardRef(({ }: LoaderProps, ref): JSX.Element => {
    const [modalVisible, setModalVisible] = useState(false)

    useImperativeHandle(ref, () => ({

        showLoader() {
            setModalVisible(true)
        },
        hideLoader() {
            setModalVisible(false)
        }

    }));

    return (
        <Modal
            // animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        </Modal>
    );
})

export default Loader;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        // marginTop: 22,
        backgroundColor: '#00000040'
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