import React, { useEffect, useState } from "react";
import { FlatList, GestureResponderEvent, Image, Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors } from "../Theme/Colors";
import { Fonts } from "../Theme/Fonts";
import { StringConstants } from "../Theme/StringConstants";
import { Images } from "../Assets";
import Sign from "../Components/Sign";
import { useDispatch, useSelector } from "react-redux";
import { contactListingAction } from "../Redux/Actions/contactsActions";
import LoaderModal from "./LoaderModal";
import Header from "../Components/Header";
import ContactsItem from "../Components/ContactsItem";
import Button from "../Components/Button";
import { useToast } from "react-native-toast-notifications";


interface ChooseContactModalProps {
    showModal: boolean;
    hideModal: () => void;
    tapOnConfirm: (param: any) => void;

}

const ChooseContactModal: React.FC<ChooseContactModalProps> = ({
    showModal,
    hideModal,
    tapOnConfirm,


}) => {

    const dispatch = useDispatch()
    const toast = useToast()

    const [selectedContactIndex, setSelectedContactIndex] = useState<number | null>(null);
    const [selectedAddress, setSelectedAddress] = useState<object>({})

    const accessToken = useSelector((state: any) => state?.persistedReducer.userData.userToken);
    const isLoading = useSelector((state: any) => state?.persistedReducer.contactListData.isLoading)
    const contactsList = useSelector((state: any) => state?.persistedReducer.contactListData.contactsList)
    const errorMessage = useSelector((state: any) => state?.persistedReducer.contactListData.error)

    useEffect(() => {
        getContactList()
    }, [])

    useEffect(() => {

        if (errorMessage != null && !isLoading) {
            toast.show(`${errorMessage}`, {
                placement: "bottom",
                duration: 2000,
                animationType: "slide-in",
                type: 'warning',
            })
        } 
    }, [errorMessage])


    const getContactList = async () => {
        await dispatch(contactListingAction(accessToken))
    }

    const tapOnItem = (item: any, index: number) => {
        if (index === selectedContactIndex) {
            setSelectedContactIndex(null);
        } else {
            setSelectedContactIndex(index);
            setSelectedAddress(item)
        }
    }

    return (
        <Modal transparent={true} animationType="fade" visible={showModal} >
            <View style={styles.rootContainer}>
                {isLoading &&
                    <LoaderModal showModal={isLoading} />
                }

                <Header tapOnBack={() => hideModal()}
                    headerText={StringConstants.CHOOSE_CONTACT}
                />

                {contactsList && contactsList.length > 0 ?
                    <FlatList 
                        data={contactsList}
                        extraData={contactsList}
                        keyExtractor={(item, index) => `${index}`}
                        bounces={false}
                        renderItem={({ item, index }) => {

                            return (
                                <ContactsItem item={item}
                                    isFromChooseContact={true}
                                    tapOnItem={() => tapOnItem(item, index)}
                                    selectedContact={index === selectedContactIndex}

                                />
                            )
                        }}
                    />
                    :
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.noDataFoundText}>No contacts found</Text>
                    </View>

                }

                {(selectedContactIndex !== null) &&
                    <Button primaryTitle={StringConstants.SUBMIT}
                        containerStyles={{ backgroundColor: Colors.ORANGE }}
                        onPress={() => tapOnConfirm(selectedAddress)}
                  
                    />}
            </View>


        </Modal>
    )
}


const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        marginTop: Platform.OS == 'ios' ? 30 : 0
    },
    plusIcon: {
        marginRight: 7
    },
    addContactButton: {
        flexDirection: 'row',
        backgroundColor: Colors.ORANGE,
        height: 35,
        width: 130,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        alignSelf: 'flex-end',
        marginRight: 20
    },
    addContactText: {
        color: Colors.WHITE,
        fontSize: 14,
        fontFamily: Fonts.DM_SANS_REGULAR
    },
    noDataFoundText: {
        fontSize: 16,
        fontFamily: Fonts.DM_SANS_REGULAR,
        color: Colors.LIGHT_GREY2,
        marginHorizontal: 28,
        textAlign: 'center',

    },





    // viewModalContainer: {
    //     flex: 1,
    //     backgroundColor: '#00000040',
    //     justifyContent: 'flex-end',

    // },
    // modalView: {
    //     width: '100%',
    //     paddingVertical: 35,
    //     backgroundColor: Colors.WHITE,
    //     borderTopLeftRadius: 22,
    //     borderTopRightRadius: 22,
    //     height: "90%"
    // },
    // crossIconView: {
    //     alignSelf: 'flex-end',
    //     marginTop: -30,
    //     marginRight: 15,
    //     padding: 10,
    // },
    // crossIcon: {
    //     height: 20,
    //     width: 20
    // },
    // emailIcon: {
    //     height: 60,
    //     width: 60,
    //     alignSelf: 'center',
    //     marginBottom: 20
    // },
    // textLogout: {
    //     fontSize: 14,
    //     fontFamily: Fonts.DM_SANS_REGULAR,
    //     color: Colors.BLACK,
    //     marginBottom: 27,
    //     textAlign: 'center',
    //     marginHorizontal: 30

    // },
    // textLogoutWarning: {
    //     fontSize: 18,
    //     lineHeight: 26,
    //     fontFamily: Fonts.DM_SANS_SEMIBOLD,
    //     color: Colors.BLACK,
    //     marginBottom: 15,
    //     textAlign: 'center',
    //     marginHorizontal: 50

    // },
    // buttonContainer: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-around',
    // },
    // touchButtonCancel: {
    //     height: 38,
    //     width: 140,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: Colors.BUTTON_GREY,
    //     borderRadius: 20,

    // },
    // textCancel: {
    //     fontFamily: Fonts.DM_SANS_REGULAR,
    //     fontSize: 14,
    //     color: Colors.WHITE
    // },
    // touchButtonSubmit: {
    //     height: 38,
    //     width: 140,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: Colors.ORANGE,
    //     borderRadius: 20,
    // },
    // textLogoutButton: {
    //     fontFamily: Fonts.DM_SANS_REGULAR,
    //     fontSize: 14,
    //     color: Colors.WHITE
    // },

})
export default ChooseContactModal