import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StringConstants } from '../../Theme/StringConstants'
import { styles } from './styles'
import Header from '../../Components/Header'
import { Images } from '../../Assets'
import ContactsItem from '../../Components/ContactsItem'
import { AppConstants } from '../../Theme/AppConstants'
import ConfirmationModal from '../../Modals/ConfirmationModal'
import { useDispatch, useSelector } from 'react-redux'
import { contactListingAction, deleteContactAction } from '../../Redux/Actions/contactsActions'
import LoaderModal from '../../Modals/LoaderModal'
import ValidationModal from '../../Modals/ValidationModal'
import { clearContactResponse } from '../../Redux/Reducers/contactsSlice'
import { checkInternetConnection } from '../../Components/InternetConnection'

export default function SavedContact({ navigation, route }: any): React.JSX.Element {
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState<any>()
    const [showValidationModal, setShowValidationModal] = useState<boolean>(false)
    const [alertTitle, setAlertTitle] = useState<string>('')
    const [isConnected, setIsConnected] = React.useState(true);

    const accessToken = useSelector((state: any) => state?.persistedReducer.userData.userToken);
    const isLoading = useSelector((state: any) => state?.persistedReducer.contactListData.isLoading)
    const contactsList = useSelector((state: any) => state?.persistedReducer.contactListData.contactsList)
    const errorMessage = useSelector((state: any) => state?.persistedReducer.contactListData.error)
    const deleteContactResponse = useSelector((state: any) => state?.persistedReducer.contactListData.deleteContactResponse)

    console.log("errorMessage in savedcontact", errorMessage);
    const dispatch = useDispatch()

    useEffect(() => {
        getContactList()
    }, [])

    useEffect(() => {
        if (!isLoading && deleteContactResponse) {
            setAlertTitle(StringConstants.CONTACT_DELETED_SUCCESSFULLY)
            setShowValidationModal(true)

        }
    }, [deleteContactResponse])

    useEffect(() => {

        if (errorMessage != null && !isLoading) {
            setShowValidationModal(true)
            setAlertTitle(`${errorMessage}`)

        } else if (errorMessage == null) {
            setShowValidationModal(false)
            setAlertTitle('')
        }
    }, [errorMessage])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const isConnected = await checkInternetConnection();
                // console.log('isConnected in useEffect ==>>', isConnected);

                setIsConnected(isConnected);

                if (!isConnected) {
                    setAlertTitle(StringConstants.PLEASE_CHECK_YOUR_INTERNET_CONNECTION);
                    setShowValidationModal(true);
                }
            } catch (error) {
                console.error('Error checking internet connection:', error);
            }
        };

        fetchData();
    }, []);

    const getContactList = async () => {
        if (isConnected) {
            await dispatch(contactListingAction(accessToken))
        } else {
            setAlertTitle(StringConstants.PLEASE_CHECK_YOUR_INTERNET_CONNECTION);
            setShowValidationModal(true);
        }
    }

    const hideDeleteModal = () => {
        setShowDeleteModal(false)
    }

    const tapOnYesInDeleteModal = async () => {
        if (isConnected) {
            const id = selectedItem?._id
            console.log("is in taponyesmodal", id);

            await dispatch(deleteContactAction(accessToken, id))
            setShowDeleteModal(false)
            setSelectedItem({})

        } else {
            setShowDeleteModal(false)
            setAlertTitle(StringConstants.PLEASE_CHECK_YOUR_INTERNET_CONNECTION);
            setShowValidationModal(true);
        }
    }

   

    return (
        <View style={styles.rootContainer}>
            {showDeleteModal &&
                <ConfirmationModal
                    showModal={showDeleteModal}
                    hideModal={hideDeleteModal}
                    tapOnConfirm={tapOnYesInDeleteModal}
                    tapOnNo={hideDeleteModal}
                    title={StringConstants.DELETE_CONTACT_WARNING}
                />
            }
            {showValidationModal &&
                <ValidationModal
                    showModal={showValidationModal}
                    hideModal={() => {
                        if (alertTitle == StringConstants.CONTACT_DELETED_SUCCESSFULLY) {
                            setShowValidationModal(false)
                            setAlertTitle('')
                            dispatch(clearContactResponse('deleteContactResponse'))
                        } else {
                            setShowValidationModal(false)
                            setAlertTitle('')
                            dispatch(clearContactResponse('error'))
                        }

                    }}
                    title={alertTitle}
                />
            }
            {isLoading &&
                <LoaderModal showModal={isLoading} />
            }
            <Header tapOnBack={() => navigation.goBack()}
                headerText={StringConstants.SAVED_CONTACT}
            />
            <TouchableOpacity style={styles.addContactFloatButton}
                onPress={() => navigation.navigate(AppConstants.screens.ADD_NEW_CONTACT,
                    { fromEditContact: false })}
            >
                <Image source={Images.IC_ADD} style={styles.plusIcon} />
            </TouchableOpacity>

            {contactsList && contactsList.length !== 0 ?
                <FlatList  bounces={false}
                    data={contactsList}
                    extraData={contactsList}
                    keyExtractor={(item, index) => `${index}`}
                    renderItem={({ item, index }) => {
                        return (
                            <ContactsItem item={item}
                                tapOnEditContact={() => { navigation.navigate(AppConstants.screens.ADD_NEW_CONTACT, { fromEditContact: true, item }) }}
                                tapOnDeleteContact={() => {
                                    setSelectedItem(item)
                                    setShowDeleteModal(true)
                                }}
                                isFromChooseContact={false}
                            />
                        )
                    }}
                    ListFooterComponent={<View style={{ marginBottom: 50 }} />}
                /> :
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.noDataFoundText}>{StringConstants.NO_SAVED_CONTACTS}</Text>
                </View>
            }
        </View>
    )
}

