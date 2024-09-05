import React, { useEffect, useState } from "react";
import {  Image, Keyboard, Text, TouchableOpacity, View } from 'react-native'
import { styles } from "./styles";
import { Images } from '../../Assets/index'
import { StringConstants } from "../../Theme/StringConstants";
import TextField from "../../Components/TextField";
import Button from "../../Components/Button";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import { AppConstants } from "../../Theme/AppConstants";
import ValidationModal from "../../Modals/ValidationModal";
import VerifyEmailModal from "../../Modals/VerifyEmailModal";
import { validation } from "../../Theme/validation";
import { signInAction } from "../../Redux/Actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import LoaderModal from "../../Modals/LoaderModal";
import { deleteSignInResponse } from "../../Redux/Reducers/userInfoSlice";
import { checkInternetConnection } from "../../Components/InternetConnection";
import { useToast } from "react-native-toast-notifications";

export default function LoginDriver({ navigation, route }: any): React.JSX.Element {
    const dispatch = useDispatch()
    const toast = useToast()

    const [showValidationModal, setShowValidationModal] = useState<boolean>(false)
    const [alertTitle, setAlertTitle] = useState<string>('')
    const [showEmailVerifyModal, setShowEmailVerifyModal] = useState<boolean>(false)
    const [isConnected, setIsConnected] = useState<boolean>(true);


    interface LoginFormData {
        email: string;
        password: string;
    }

    const [showPassword, setShowPassword] = React.useState<boolean>(false)
    const [formData, setFormData] = useState<LoginFormData>({
        email:'',
        password: ''
      
        // email: 'james@yopmail.com',
        // email: 'robin@yopmail.com',
        // password: 'Driver@123'
 
    });

    const isLoading = useSelector((state: any) => state?.persistedReducer.userData.isLoading)
    const signInResponse = useSelector((state: any) => state?.persistedReducer.userData.signInResponse);
    const errorMessage = useSelector((state: any) => state?.persistedReducer.userData.error)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const isConnected = await checkInternetConnection();

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
        if (!isLoading && signInResponse?.email) {

            console.log("in useEffcet of signInResponse", signInResponse);
            
            // setShowEmailVerifyModal(true)
            navigation.navigate(AppConstants.screens.OTP_VERIFICATION,
                {
                    email: signInResponse?.email,
                    otp: signInResponse?.otp,
                    userId: signInResponse?.userId
                })
        }

        return ()=> {  dispatch(deleteSignInResponse('signInResponse'))}

    }, [signInResponse])


    useEffect(() => {
        if (errorMessage != null && !isLoading) {
            setShowValidationModal(true)
            setAlertTitle(`${errorMessage}`)

        }
    


        // return () => {
        //     dispatch(deleteSignInResponse('error'))
        // }

    }, [errorMessage])


    const tapOnEye = () => {
        setShowPassword(prev => !prev);
    }

    const tapOnLogin = async () => {
        Keyboard.dismiss()
        const { email, password } = formData
        let valid = true
        if (email.length == 0) {
            valid = false
            setShowValidationModal(true)
            setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_EMAIL_ID)
            return
        }
        else if (!validation(email, 'email')) {
            valid = false
            setShowValidationModal(true)
            setAlertTitle(StringConstants.PLEASE_ENTER_A_VALID_EMAIL_ID)
            return
        }
        else if (password.length == 0) {
            valid = false
            setShowValidationModal(true)
            setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_PASSWORD)
            return
        }
        else if (!validation(password, 'password')) {
            valid = false
            setShowValidationModal(true)
            setAlertTitle(StringConstants.PASSWORD_VALIDATION)
            return
        }

        else {
            if (isConnected) {
                valid = true

                let myFormData = new FormData();
                myFormData.append('email', email);
                myFormData.append('password', password);
                myFormData.append('fcmToken', route?.params?.generatedToken);
                myFormData.append('role', 'driver');
                
                await dispatch(signInAction(myFormData));
                return
            } else {
                setAlertTitle(StringConstants.PLEASE_CHECK_YOUR_INTERNET_CONNECTION)
                setShowValidationModal(true)
                return
            }
        }
    }


    const handleTextChange = (text: string, input: string) => {
        setFormData(prevState => ({ ...prevState, [input]: text }))
    }

    const hideEmailVerifyModal = () => {
        dispatch(deleteSignInResponse('signInResponse'));
        setShowEmailVerifyModal(false)
    }


    return (
        <View style={styles.rootContainer}>
            {showValidationModal &&
                <ValidationModal
                    showModal={showValidationModal}
                    hideModal={() => {
                        dispatch(deleteSignInResponse('error'));
                        setShowValidationModal(false)
                        setAlertTitle('')
                    }}
                    title={alertTitle}
                />
            }
            {showEmailVerifyModal &&
                <VerifyEmailModal
                    showModal={showEmailVerifyModal}
                    hideModal={hideEmailVerifyModal}
                    tapOnConfirm={() => {
                        dispatch(deleteSignInResponse('signInResponse'));
                        setShowEmailVerifyModal(false)
                        toast.show("OTP has been successfully sent to your email ID", {
                            placement: "bottom",
                            duration: 3000,
                            animationType: "slide-in",
                            type: 'warning'
                        });
                        navigation.navigate(AppConstants.screens.OTP_VERIFICATION,
                            {
                                email: signInResponse?.email,
                                otp: signInResponse?.otp,
                                userId: signInResponse?.userId
                            })
                    }}
                />
            }


            <KeyboardAwareScrollView
                onScrollBeginDrag={() => Keyboard.dismiss()}
                showsVerticalScrollIndicator={false}
                bounces={false}
                >

                {isLoading &&
                    <LoaderModal showModal={isLoading} />
                }
                <Image source={Images.BG_LOGIN_DRIVER} style={styles.imageBG}

                />
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.textWelcome}>{StringConstants.WELCOME_BACK}</Text>
                    <Text style={styles.textLogin}>{StringConstants.PLEASE_LOGIN}</Text>
                    <TextField
                        placeholder={StringConstants.EMAIL}
                        leftImage={Images.IC_MAIL}
                        value={formData.email}
                        keyboardType={'email-address'}
                        onChangeText={val => handleTextChange(val, 'email')}

                    />
                    <TextField
                        parentStyles={{ marginBottom: 0 }}
                        leftImage={Images.IC_KEY}
                        rightChild={
                            <TouchableOpacity onPress={tapOnEye} style={{
                                height: '100%',
                                justifyContent: 'center',
                                paddingEnd: 18
                            }}>
                                <Image source={showPassword ? Images.IC_EYE_VISIBLE : Images.IC_EYE_CROSS} style={{ height: 18, width: 18, resizeMode: 'contain' }} />
                            </TouchableOpacity>
                        }
                        placeholder={StringConstants.PASSWORD}
                        secureTextEntry={!showPassword}
                        value={formData.password}
                        onChangeText={val => {
                            handleTextChange(val, 'password')
                        }}
                        onSubmitEditing={() => tapOnLogin()}
                    />

                    <TouchableOpacity style={styles.touchForgotPassword} onPress={() => {
                        setFormData({ ...formData, email: '', password: '' })
                        navigation.navigate(AppConstants.screens.FORGET_PASSWORD_SCREEN)
                    }}>
                        <Text style={styles.forgetPasswordText}>{StringConstants.FORGET_PASSWORD}</Text>
                    </TouchableOpacity>

                    <Button
                        primaryTitle={StringConstants.LOGIN}
                        onPress={tapOnLogin} />

                    <View style={styles.viewDontHaveAccount}>
                        <Text style={styles.textDontHaveAccount}>{StringConstants.IF_YOU_DONT_HAVE_ACCOUNT}</Text>
                        <TouchableOpacity
                            onPress={() => {
                                setFormData({ ...formData, email: '', password: '' })
                                navigation.navigate(AppConstants.screens.SIGN_UP_DRIVER_SCREEN)
                            }}
                        >
                            <Text style={styles.textSignUpNow}>{StringConstants.SIGN_UP_NOW}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}