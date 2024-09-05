import React from "react";
import { Image, Modal, StyleSheet, View } from 'react-native'
import { Images } from "../Assets";


interface LoaderModalProps {
    showModal ?: boolean;
    // screenName?:string
}

const LoaderModal: React.FC<LoaderModalProps> = ({
    showModal,
    // screenName
}) => {    
    return (
        // <Modal transparent={true} animationType="fade" visible={showModal}>
            <View style={styles.viewModalContainer} >
                <Image source={Images.IC_LOADER} style={{ height: 75, width: 75 }} />
            </View>
        // </Modal>
    )
}


const styles = StyleSheet.create({
    viewModalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        position: 'absolute',
        zIndex: 999,
    }


})

export default LoaderModal;