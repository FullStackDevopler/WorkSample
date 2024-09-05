import { View, FlatList, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StringConstants } from '../../Theme/StringConstants'
import { styles } from './styles'
import Header from '../../Components/Header'
import ContactsItem from '../../Components/ContactsItem'
import { AppConstants } from '../../Theme/AppConstants'
import Button from '../../Components/Button'
import { Colors } from '../../Theme/Colors'
import { useDispatch, useSelector } from 'react-redux'
import { contactListingAction } from '../../Redux/Actions/contactsActions'
import ValidationModal from '../../Modals/ValidationModal'
import { clearContactResponse } from '../../Redux/Reducers/contactsSlice'
import LoaderModal from '../../Modals/LoaderModal'

export default function ChooseContact({ navigation, route }: any): React.JSX.Element {
    const dispatch = useDispatch()

    const [selectedContactIndex, setSelectedContactIndex] = useState<number | null>(null);
    const [showValidationModal, setShowValidationModal] = useState<boolean>(false)
    const [alertTitle, setAlertTitle] = useState<string>('')
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
            setShowValidationModal(true)
            setAlertTitle(`${errorMessage}`)

        } else if (errorMessage == null) {
            setShowValidationModal(false)
            setAlertTitle('')
        }
    }, [errorMessage])


    const getContactList = async () => {
        await dispatch(contactListingAction(accessToken))
    }

    const tapOnItem = (item: any, index: number) => {
        // console.log('item in tapOnItem', item);

        if (index === selectedContactIndex) {
            setSelectedContactIndex(null);
        } else {
            setSelectedContactIndex(index);
            setSelectedAddress(item)
        }
    }


    return (
        <View style={styles.rootContainer}>

            {showValidationModal &&
                <ValidationModal
                    showModal={showValidationModal}
                    hideModal={() => {
                        setShowValidationModal(false)
                        setAlertTitle('')
                        dispatch(clearContactResponse('error'))
                    }}
                    title={alertTitle}
                />
            }
            {isLoading &&
                <LoaderModal showModal={isLoading} />
            }

            <Header tapOnBack={() => navigation.goBack()}
                headerText={StringConstants.CHOOSE_CONTACT}
            />

            {contactsList && contactsList.length > 0 ?
                <FlatList  bounces={false}
                    data={contactsList}
                    extraData={contactsList}
                    keyExtractor={(item, index) => `${index}`}
                    renderItem={({ item, index }) => {

                        return (
                            <ContactsItem item={item}
                                isFromChooseContact={route?.params?.isFromChooseContact}
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
                    onPress={() => {
                        if (route?.params?.fromCreateJob) {
                            navigation.navigate(AppConstants.screens.CREATE_JOB_SCREEN, { selectedAddress, isPickUpAddress: route?.params?.pickUpAddress })
                            // navigation.navigate(AppConstants.screens.CREATE_JOB_SCREEN, { selectedAddress })  //Code for Old UI of create job
                        } else {
                            navigation.navigate(AppConstants.screens.ADD_HOTSHOT, { selectedAddress })
                        }

                    }}
                />}
        </View>
    )
}

