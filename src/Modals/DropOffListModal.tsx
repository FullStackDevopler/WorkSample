import React from "react";
import { Modal, StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, Pressable } from 'react-native'
import { Colors } from "../Theme/Colors";
import { Fonts } from "../Theme/Fonts";



interface DropOffListModalProps {
    showModal: boolean;
    hideModal: () => void;
    tapOnConfirm: (data: any) => void;
    dropOffList: any

}

const DropOffListModal: React.FC<DropOffListModalProps> = ({
    showModal,
    hideModal,
    tapOnConfirm,
    dropOffList

}) => {
    // const [noResults, setNoResults] = useState(false);


    return (
        <Modal transparent={true} animationType="fade" visible={showModal}>
            <Pressable style={styles.viewModalContainer} onPress={hideModal}>

                <Pressable style={styles.modalView}>

                    <View style={styles.viewLine} />

                    <FlatList
                        data={dropOffList}
                        extraData={dropOffList}
                        keyExtractor={(_, i) => `${i}`}
                        renderItem={({ item, index }) => {

                            return (

                                <TouchableOpacity style={styles.listItem} onPress={() => tapOnConfirm(item)}>
                                    {/* <Text style={styles.textLabel}>{item.label}</Text> */}
                                    <Text style={styles.textLabel}>{`${item.count} ${item.item}`}</Text>
                                    <Text numberOfLines={1} style={styles.textLabel}>{item.location}</Text>
                                </TouchableOpacity>
                            )


                        }}

                    />
                </Pressable>
            </Pressable>


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
        backgroundColor: 'white', maxHeight: 250, paddingTop: 22,
        paddingBottom: 45,
        paddingHorizontal: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },

    viewLine: {
        height: 6, width: 60, backgroundColor: Colors.LIGHT_GREY, alignSelf: 'center',
        marginBottom: 25,
        borderRadius: 20
    },
    listItem: { 
        backgroundColor: Colors.LIGHT_GREY,
        borderRadius: 5,
        marginBottom: 10,
        paddingVertical: 8,
        paddingHorizontal: 12

    },
    textLabel: {
        fontSize: 14,
        fontFamily: Fonts.DM_SANS_MEDIUM,
        color: Colors.BLACK_3,

    },


})
export default DropOffListModal;