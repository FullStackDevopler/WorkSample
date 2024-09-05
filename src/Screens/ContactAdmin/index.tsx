import { View, FlatList, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StringConstants } from '../../Theme/StringConstants'
import { styles } from './styles'
import Header from '../../Components/Header'
import TextField from '../../Components/TextField'
import { Colors } from '../../Theme/Colors'
import Button from '../../Components/Button'
import ValidationModal from '../../Modals/ValidationModal'
import { useDispatch, useSelector } from 'react-redux'
import { contactAdminAction } from '../../Redux/Actions/userActions'
import LoaderModal from '../../Modals/LoaderModal'
import { deleteSignInResponse } from '../../Redux/Reducers/userInfoSlice'
import { checkInternetConnection } from '../../Components/InternetConnection'
import { clearContactResponse } from '../../Redux/Reducers/contactsSlice'
import { alphabetRegex, emojiRegex } from '../../Theme/validation'

export default function ContactAdmin({ navigation, route }: any): React.JSX.Element {

    const dispatch = useDispatch()

    const accessToken = useSelector((state: any) => state?.persistedReducer.userData.userToken);
    const isLoading = useSelector((state: any) => state?.persistedReducer.userData.isLoading)
    const errorMessage = useSelector((state: any) => state?.persistedReducer.userData.error)
    const contactAdminResponse = useSelector((state: any) => state?.persistedReducer.userData.contactAdminResponse)

    const [showValidationModal, setShowValidationModal] = React.useState<boolean>(false)
    const [alertTitle, setAlertTitle] = React.useState<string>('')
    const [isConnected, setIsConnected] = React.useState(true);

    const [formData, setFormData] = useState({
        title: "",
        description: ""
    })

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

    useEffect(() => {
        if (!isLoading && contactAdminResponse) {
            setShowValidationModal(true)
            setAlertTitle(StringConstants.MESSAGE_SENT_SUCCESSFULLY)
        }

        // return()=>{dispatch(clearContactResponse('contactAdminResponse'))}

    }, [contactAdminResponse])

    useEffect(() => {
        if (errorMessage !== null && !isLoading) {
            setShowValidationModal(true)
            setAlertTitle(errorMessage)
        } else if (errorMessage == null) {
            setShowValidationModal(false)
            setAlertTitle('')
        }

        // return()=>{dispatch(clearContactResponse('error'))}

    }, [errorMessage])


    const tapOnSend = async () => {
        Keyboard.dismiss()
        const { title, description } = formData
        let valid = true
        const titleRegex = /^[a-zA-Z ]+$/;


        if (title.length == 0) {
            valid = false
            setShowValidationModal(true)
            setAlertTitle(StringConstants.PLEASE_ENTER_TITLE)
        }
        else if (title.length < 3) {
            valid = false
            setShowValidationModal(true)
            setAlertTitle(StringConstants.TITLE_SHOULD_BE_ATLEAST_3_CHARACTERS_LONG)
        }
        else if (!titleRegex.test(title) || emojiRegex.test(title) ) {
            valid = false
            setShowValidationModal(true)
            setAlertTitle(StringConstants.PLEASE_ENTER_A_VALID_TITLE)
        }
        else if (description.length == 0) {
            valid = false
            setShowValidationModal(true)
            setAlertTitle(StringConstants.PLEASE_ENTER_MESSAGE)
        }
        else if (description.length < 3) {
            valid = false
            setShowValidationModal(true)
            setAlertTitle(StringConstants.DESCRIPTION_SHOULD_BE_ATLEAST_3_CHARACTERS_LONG)
        }
        else if (!alphabetRegex.test(description) || emojiRegex.test(description) ) {
            valid = false
            setShowValidationModal(true)
            setAlertTitle(StringConstants.PLEASE_ENTER_A_VALID_DESCRIPTION)
        }

        else {
            if(isConnected){
      
                await dispatch(contactAdminAction(accessToken, formData))
            }else {
                setAlertTitle(StringConstants.PLEASE_CHECK_YOUR_INTERNET_CONNECTION)
                setShowValidationModal(true)
            }
 
        }
    }



    return (
        <View style={styles.rootContainer}>
            <Header tapOnBack={() => navigation.goBack()}
                headerText={StringConstants.CONTACT_ADMIN}
            />
            {showValidationModal &&
                <ValidationModal
                    showModal={showValidationModal}
                    hideModal={() => {
                        if (alertTitle == StringConstants.MESSAGE_SENT_SUCCESSFULLY) {
                            setShowValidationModal(false)
                            setAlertTitle('')
                            dispatch(deleteSignInResponse('contactAdminResponse'));
                            navigation.goBack()
                        } else {
                            setShowValidationModal(false)
                            setAlertTitle('')
                            dispatch(deleteSignInResponse('error'));
                        }

                    }}
                    title={alertTitle}
                />
            }

            {isLoading &&
                <LoaderModal showModal={isLoading} />
            }
            <TextField
                containerStyle={styles.containerStyles}
                placeholder={StringConstants.TITLE}
                placeholderTextColor={Colors.BUTTON_GREY}
                value={formData.title}
                maxLength={40}
                autoCapitalize="sentences"
                onChangeText={val => setFormData({ ...formData, title: val })}
          
            />
            <TextField
                containerStyle={styles.containerStyles}
                placeholder={StringConstants.TYPE_MESSAGE}
                placeholderTextColor={Colors.BUTTON_GREY}
                customHeight={240}
                multiline
                autoCapitalize="sentences"
                maxLength={150}
                customStyles={{ paddingTop: 20 }}
                value={formData.description}
                onChangeText={val => setFormData({ ...formData, description: val })}
                returnKeyType={'default'}
            />
            <Button primaryTitle={StringConstants.SEND}
                containerStyles={{ backgroundColor: Colors.ORANGE }}
                onPress={() => {
                    tapOnSend()

                }} />

        </View>
    )
}

