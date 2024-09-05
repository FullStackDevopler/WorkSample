import React, { useEffect } from "react";
import { Alert, Image, Keyboard, Text, TouchableOpacity, View } from 'react-native'
import { styles } from "./styles";
import { Images } from '../../Assets/index'
import { StringConstants } from "../../Theme/StringConstants";
import TextField from "../../Components/TextField";
import Button from "../../Components/Button";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import { AppConstants } from "../../Theme/AppConstants";
import { validation } from "../../Theme/validation";
import ValidationModal from "../../Modals/ValidationModal";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordAction } from "../../Redux/Actions/userActions";
import LoaderModal from "../../Modals/LoaderModal";
import { deleteForgetPasswordResponse } from "../../Redux/Reducers/userInfoSlice";
import { checkInternetConnection } from "../../Components/InternetConnection";



export default function ForgetPassword({ navigation, route }: any): React.JSX.Element {
    const dispatch = useDispatch()

    const isLoading = useSelector((state: any) => state?.persistedReducer.userData.isLoading)
    const forgotPasswordResponse = useSelector((state: any) => state?.persistedReducer.userData.forgotPasswordResponse);
    const errorMessage = useSelector((state: any) => state?.persistedReducer.userData.error)

    console.log('forgotPasswordResponse in ForgetPassword screen:-', forgotPasswordResponse);
    console.log('errorMessage in forgetpassword:', errorMessage);

    const [showValidationModal, setShowValidationModal] = React.useState<boolean>(false)
    const [alertTitle, setAlertTitle] = React.useState<string>('')
    const [isConnected, setIsConnected] = React.useState<boolean>(true);

    interface FormData {
        email: string;
    }

    const [formData, setFormData] = React.useState<FormData>({
        email: '',
    });

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
        if (!isLoading && forgotPasswordResponse) {
            console.log("forgotPasswordResponse",forgotPasswordResponse);
            setTimeout(() => {
                setShowValidationModal(true)
                setAlertTitle(forgotPasswordResponse)
            }, 1000);
        }
    }, [forgotPasswordResponse])


    useEffect(() => {
        console.log(" error message useEffect", errorMessage, isLoading);

        if (errorMessage != null && !isLoading) {
            console.log("errormessage is not null forgetpasswird", errorMessage);
            setShowValidationModal(true)
            setAlertTitle(`${errorMessage}`)

        }
        else if (errorMessage == null) {
            console.log("errormessage is  null forgetpasswird", errorMessage);
            setShowValidationModal(false)
            setAlertTitle('')
        }


    }, [errorMessage, isLoading])

    useEffect(() => {
    
      

        return () => {
            console.log("i am called in useeffect return in forgetpasword");
            
            dispatch(deleteForgetPasswordResponse('error'))
        }
      }, []);


    const tapOnSubmit = async () => {
        Keyboard.dismiss()
        const { email } = formData
        let valid = true

        if (email.length == 0) {
            valid = false
            setShowValidationModal(true)
            setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_EMAIL_ID)

        }
        else if (!validation(email, 'email')) {
            valid = false
            setShowValidationModal(true)
            setAlertTitle(StringConstants.PLEASE_ENTER_A_VALID_EMAIL_ID)

        }
        else {
            if (isConnected) {
                await dispatch(forgotPasswordAction(email))
            } else {
                setAlertTitle(StringConstants.PLEASE_CHECK_YOUR_INTERNET_CONNECTION)
                setShowValidationModal(true)
            }
        }

    }

    const handleTextChange = (text: string, input: string) => {
        setFormData(prevState => ({ ...prevState, [input]: text }))
    }


    return (
        <View style={styles.rootContainer}>
            {showValidationModal &&
                <ValidationModal
                    showModal={showValidationModal}
                    hideModal={() => {
                        if (alertTitle == forgotPasswordResponse) {
                            setShowValidationModal(false)
                            setAlertTitle('')
                            navigation.goBack()
                            dispatch(deleteForgetPasswordResponse('forgotPasswordResponse'));

                        } else {
                            setShowValidationModal(false)
                            setAlertTitle('')
                            dispatch(deleteForgetPasswordResponse('error'));
                        }

                    }}
                    title={alertTitle}
                />
            }

            {isLoading &&
                <LoaderModal showModal={isLoading} />
            }
            <KeyboardAwareScrollView
                onScrollBeginDrag={() => Keyboard.dismiss()}
                bounces={false}
                showsVerticalScrollIndicator={false}
            >
                <Image source={Images.BG_LOGIN_DRIVER} style={styles.imageBG}

                />
                <View style={{ alignItems: 'center' }}>

                    <Text style={styles.textWelcome}>{StringConstants.FORGET_PASSWORD}</Text>
                    <TextField
                        placeholder={StringConstants.EMAIL}
                        leftImage={Images.IC_MAIL}
                        value={formData.email}
                        keyboardType={'email-address'}
                        onChangeText={val => handleTextChange(val, 'email')}
                    />

                    <Button containerStyles={{ marginTop: 10 }}
                        primaryTitle={StringConstants.SUBMIT}
                        onPress={tapOnSubmit} />

                </View>
            </KeyboardAwareScrollView>
            <View style={styles.viewDontHaveAccount}>
                <Text style={styles.textDontHaveAccount}>{StringConstants.BACK_TO_LOGIN}</Text>
                <TouchableOpacity onPress={() => {
                    navigation.navigate(AppConstants.screens.LOGIN_DRIVER_SCREEN)
                    dispatch(deleteForgetPasswordResponse('error')
                );
                }}>
                    <Text style={styles.textSignUpNow}>{StringConstants.LOGIN_NOW}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}