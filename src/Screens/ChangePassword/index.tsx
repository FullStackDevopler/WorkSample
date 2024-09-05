import { View, Image, TouchableOpacity, Keyboard, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { styles } from './styles'
import { StringConstants } from '../../Theme/StringConstants'
import { Images } from '../../Assets'
import Header from '../../Components/Header'
import TextField from '../../Components/TextField'
import { Colors } from '../../Theme/Colors'
import Button from '../../Components/Button'
import { DimensionsValue } from '../../Theme/DimensionsValue'
import ValidationModal from '../../Modals/ValidationModal'
import { emojiRegex, validation } from '../../Theme/validation'
import { useDispatch, useSelector } from 'react-redux'
import { changePasswordAction } from '../../Redux/Actions/userActions'
import { deleteSignInResponse } from '../../Redux/Reducers/userInfoSlice'
import LoaderModal from '../../Modals/LoaderModal'
import { checkInternetConnection } from '../../Components/InternetConnection'

interface FormData {
    oldPassword: string;
    password: string;
    confirmPassword: string;
}

export default function ChangePassword({ navigation, route }: any): React.JSX.Element {
    const dispatch = useDispatch()
    const [showValidationModal, setShowValidationModal] = useState<boolean>(false)
    const [alertTitle, setAlertTitle] = useState<string>('')
    const [showOldPassword, setShowOldPassword] = React.useState<boolean>(false)
    const [showPassword, setShowPassword] = React.useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] = React.useState<boolean>(false)
    const [isConnected, setIsConnected] = React.useState(true);
    const [formData, setFormData] = useState<FormData>({
        oldPassword: '',
        password: '',
        confirmPassword: '',
    });

    const isLoading = useSelector((state: any) => state?.persistedReducer.userData.isLoading)
    const errorMessage = useSelector((state: any) => state.persistedReducer.userData.error);
    const accessToken = useSelector((state: any) => state?.persistedReducer.userData.userToken);
    const profileDetails = useSelector((state: any) => state?.persistedReducer.userData.profileDetails);
    const changePasswordResponse = useSelector((state: any) => state?.persistedReducer.userData.changePasswordResponse);
    console.log('errorMessage in ChangePassword:', errorMessage);

    // const emailRef = useRef<TextInput>(null);
    const oldPasswordRef = useRef<TextInput>(null);
    const newPasswordRef = useRef<TextInput>(null);
    const confirmPasswordRef = useRef<TextInput>(null);

    const tapOnOldPasswordEye =()=>{
        setShowOldPassword(prev => !prev);
    }
    const tapOnEye = () => {
        setShowPassword(prev => !prev);
    }
    const tapOnSecondEye = () => {
        setShowConfirmPassword(prev => !prev);
    }
 

    const handleTextChange = (text: string, input: string) => {
        setFormData(prevState => ({ ...prevState, [input]: text }))
    }


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
        if (!isLoading && changePasswordResponse) {
            setShowValidationModal(true)
            setAlertTitle("Password changed successfully")
        }
    }, [changePasswordResponse])

    useEffect(() => {
        if (errorMessage !== null && !isLoading) {
            setShowValidationModal(true)
            setAlertTitle(errorMessage)
        } else if (errorMessage == null) {
            setShowValidationModal(false)
            setAlertTitle('')
        }

    }, [errorMessage])

    const tapOnUpdate = async () => {
        Keyboard.dismiss()
        const {  oldPassword, password, confirmPassword } = formData
        let valid = true

        // if (email.length == 0) {
        //     valid = false
        //     setShowValidationModal(true)
        //     setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_EMAIL_ID)
        // }
        // else if (!validation(email, 'email')) {
        //     valid = false
        //     setShowValidationModal(true)
        //     setAlertTitle(StringConstants.PLEASE_ENTER_A_VALID_EMAIL_ID)
        // }
        // else if (email !== profileDetails?.email) {
        //     valid = false
        //     setShowValidationModal(true)
        //     setAlertTitle(StringConstants.THE_ENTERED_EMAIL_ID_IS_INCORRECT)
        // }
         if (oldPassword.length == 0) {
            valid = false
            setShowValidationModal(true)
            setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_OLD_PASSWORD)
        }
        else if (password.length == 0) {
            valid = false
            setShowValidationModal(true)
            setAlertTitle(StringConstants.PLEASE_ENTER_YOUR_NEW_PASSWORD)
        }
        else if (!validation(password, 'password')) {
            valid = false
            setShowValidationModal(true)
            setAlertTitle(StringConstants.PASSWORD_VALIDATION)
        }
        else if (emojiRegex.test(password)) {
            valid = false
            setShowValidationModal(true)
            setAlertTitle(StringConstants.EMOJI_NOT_ALLOWED_IN_PASSWORD)
        }
        else if (confirmPassword.length == 0) {
            valid = false
            setShowValidationModal(true)
            setAlertTitle(StringConstants.PLEASE_CONFIRM_YOUR_PASSWORD)
        }
        else if (password !== confirmPassword) {
            valid = false
            setShowValidationModal(true)
            setAlertTitle(StringConstants.PASSWORD_DOES_NOT_MATCH)
        }

        else {
            valid = true
            if (isConnected) {
                await dispatch(changePasswordAction(profileDetails?.email, oldPassword, password, accessToken))
            } else {
                setAlertTitle(StringConstants.PLEASE_CHECK_YOUR_INTERNET_CONNECTION)
                setShowValidationModal(true)
            }
        }
    }



    return (
        <View style={styles.rootContainer}>
            {showValidationModal &&
                <ValidationModal
                    showModal={showValidationModal}
                    hideModal={() => {
                        if(alertTitle== "Password changed successfully"){
                            setShowValidationModal(false)
                            setAlertTitle('')
                            dispatch(deleteSignInResponse('changePasswordResponse'))
                            navigation.goBack()
                        } else {
                            setShowValidationModal(false)
                            setAlertTitle('')
                            dispatch(deleteSignInResponse('error'))
                        }
                    }}
                    title={alertTitle}
                />
            }
            {isLoading && <LoaderModal showModal={isLoading} />}

            <Header tapOnBack={() => navigation.goBack()}
                headerText={StringConstants.CHANGE_PASSWORD}
            />

            {/* <TextField
                containerStyle={styles.containerStyles}
                placeholder={StringConstants.ENTER_EMAIL}
                leftImage={Images.IC_MAIL}
                value={formData.email}
                editable={true}
                onChangeText={val => handleTextChange(val, 'email')}
                returnKeyType={'next'}
                fieldRef={emailRef}
                onSubmitEditing={() => {
                    if (oldPasswordRef && oldPasswordRef.current) {
                        oldPasswordRef.current.focus();
                    }
                }}

            /> */}

            <TextField
                containerStyle={styles.containerStyles}
                placeholder={StringConstants.ENTER_OLD_PASSWORD}
                leftImage={Images.IC_KEY}
                secureTextEntry={!showOldPassword ? true : false}
                value={formData.oldPassword}
                onChangeText={val => handleTextChange(val, 'oldPassword')}
                returnKeyType={'next'}
                fieldRef={oldPasswordRef}
                onSubmitEditing={() => {
                    if (newPasswordRef && newPasswordRef.current) {
                        newPasswordRef.current.focus();
                    }
                }}
                rightChild={
                    <TouchableOpacity onPress={tapOnOldPasswordEye} style={{
                        height: '100%',
                        justifyContent: 'center',
                        paddingEnd: 18
                    }}>
                        <Image source={!showOldPassword ? Images.IC_EYE_CROSS : Images.IC_EYE_VISIBLE} style={{ height: 18, width: 18, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                }

            />

            <TextField
                containerStyle={styles.containerStyles}
                placeholder={StringConstants.ENTER_NEW_PASSWORD}
                leftImage={Images.IC_KEY}
                secureTextEntry={!showPassword ? true : false}
                value={formData.password}
                onChangeText={val => handleTextChange(val, 'password')}
                returnKeyType={'next'}
                fieldRef={newPasswordRef}
                onSubmitEditing={() => {
                    if (confirmPasswordRef && confirmPasswordRef.current) {
                        confirmPasswordRef.current.focus();
                    }
                }}
                rightChild={
                    <TouchableOpacity onPress={tapOnEye} style={{
                        height: '100%',
                        justifyContent: 'center',
                        paddingEnd: 18
                    }}>
                        <Image source={!showPassword ? Images.IC_EYE_CROSS : Images.IC_EYE_VISIBLE} style={{ height: 18, width: 18, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                }

            />


            <TextField
                containerStyle={styles.containerStyles}
                placeholder={StringConstants.CONFIRM_NEW_PASSWORD}
                leftImage={Images.IC_KEY}
                secureTextEntry={!showConfirmPassword ? true : false}
                value={formData.confirmPassword}
                onChangeText={val => handleTextChange(val, 'confirmPassword')}
                returnKeyType={'done'}
                fieldRef={confirmPasswordRef}
                onSubmitEditing={() => 
                    tapOnUpdate()
                }
                rightChild={
                    <TouchableOpacity onPress={tapOnSecondEye} style={{
                        height: '100%',
                        justifyContent: 'center',
                        paddingEnd: 18
                    }}>
                        <Image source={!showConfirmPassword ? Images.IC_EYE_CROSS : Images.IC_EYE_VISIBLE} style={{ height: 18, width: 18, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                }
            />


            <Button onPress={tapOnUpdate}
                primaryTitle={StringConstants.UPDATE}
                containerStyles={{ backgroundColor: Colors.ORANGE, height: 45 }}

            />
        </View>
    )
}

