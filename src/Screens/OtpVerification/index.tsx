import React, { useEffect, useRef, useState } from "react";
import {  Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { styles } from "./styles";
import { Images } from '../../Assets/index'
import { StringConstants } from "../../Theme/StringConstants";
import Button from "../../Components/Button";
import { Colors } from "../../Theme/Colors";
import { useToast } from "react-native-toast-notifications";
import BackgroundTimer from 'react-native-background-timer';
import { useDispatch, useSelector } from "react-redux";
import { resendOtp, verifyOtp } from "../../Redux/Actions/userActions";
import ValidationModal from "../../Modals/ValidationModal";
import { deleteSignInResponse } from "../../Redux/Reducers/userInfoSlice";
import LoaderModal from "../../Modals/LoaderModal";
import OTPTextView from 'react-native-otp-textinput';
import { checkInternetConnection } from "../../Components/InternetConnection";

export default function OtpVerification({ navigation, route }: any): React.JSX.Element {
    const otpInputRef = useRef<any>(null)
    const dispatch = useDispatch()
    const toast = useToast()

    const [otpInput, setOtpInput] = useState<string>('');
    const [otpTimer, setOtpTimer] = useState(120);      //total timer
    const [timerActive, setTimerActive] = useState(false);      //flag to check if timer is active or not
    const [showValidationModal, setShowValidationModal] = useState<boolean>(false)
    const [alertTitle, setAlertTitle] = useState<string>('')
    const [isConnected, setIsConnected] = useState(true);

    const isLoading = useSelector((state: any) => state?.persistedReducer.userData.isLoading);
    const verifyOtpResponse = useSelector((state: any) => state?.persistedReducer.userData.verifyOtpResponse);
    const errorMessage = useSelector((state: any) => state?.persistedReducer.userData.error);
    const resendOtpResponse = useSelector((state: any) => state?.persistedReducer.userData.resendOtpResponse);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const isConnected = await checkInternetConnection()
      
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
      }, [])

    useEffect(() => {
        if (!isLoading && resendOtpResponse?.email) {
            console.log("i am called in verify OTP screen useeffect ", JSON.stringify(verifyOtpResponse));
            toast.show("Verification code has been successfully sent to your email", {
                placement: "bottom",
                duration: 3000,
                animationType: "slide-in",
                type: 'warning'
            });
            dispatch(deleteSignInResponse('resendOtpResponse'));
        }
    }, [resendOtpResponse])

    useEffect(() => {
        if (errorMessage != null && !isLoading) {
            console.log("in error message useeffect of verifyotp", errorMessage);
            setShowValidationModal(true)
            setAlertTitle(`${errorMessage}`)
        }
    }, [errorMessage])

    useEffect(() => {
        startTimer()        //to start timer
        return () => {
            // Cleanup: Stop the background timer when the component is unmounted
            BackgroundTimer.stopBackgroundTimer();      //to stop timer in unount

        };
    }, [])

    const startTimer = () => {
        BackgroundTimer.runBackgroundTimer(() => {
            setOtpTimer((prevTimer) => {
                if (prevTimer > 0) {
                    return prevTimer - 1;
                } else {
                    // Timer reached 0, stop the timer
                    setTimerActive(false);
                    BackgroundTimer.stopBackgroundTimer();
                    if (otpInputRef.current) {
                        otpInputRef.current.clear();
                    }
                    return 0;
                }
            });
        }, 1000); // Interval is set to 1000 milliseconds (1 second)

        setTimerActive(true);
    };

    const stopTimer = () => {
        setTimerActive(false);
        BackgroundTimer.stopBackgroundTimer();
    };

    //format time to show from seconds to minute format
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    //    on enter otp changing setting values and changing tectinput focus 


    const tapOnVerify = async () => {


        if (otpInput.length < 6 && timerActive == true ) {
            setShowValidationModal(true);
            setAlertTitle("Please Enter the 6 Digit OTP");
            return
        }
        else {

            if (isConnected) {
                if (timerActive == false) {
                    setShowValidationModal(true);
                    setAlertTitle("Please re-send the OTP and try again");
                }
                else {
                    const { email, userId } = route.params
                    const verifyOtpDispatch = await dispatch(verifyOtp(email, otpInput, userId));
                }
            }
            else {

                setAlertTitle(StringConstants.PLEASE_CHECK_YOUR_INTERNET_CONNECTION)
                setShowValidationModal(true)

            }
        }
    }

    // tap on resend button to get the code and reset the timer 
    const tapOnResend = async () => {
        if (isConnected) {
            stopTimer()

            //hit api to send otp again 
            setTimeout(() => {
                setOtpTimer(120)
                startTimer()
                if(otpInputRef?.current){
                    otpInputRef?.current?.clear();
                }
            
                // otpInputRef.current.setValue("");
                // setOtpInput("") 
            }, 500);
            const { email, userId } = route.params
            dispatch(deleteSignInResponse('verifyOtpResponse'));
            dispatch(deleteSignInResponse('error'));
            const verifyOtpDispatch = await dispatch(resendOtp(email, userId));
        } else {
            setAlertTitle(StringConstants.PLEASE_CHECK_YOUR_INTERNET_CONNECTION)
            setShowValidationModal(true)
        }
    }

  

    const tapOnGoBack = async () => {
        await dispatch(deleteSignInResponse('error'));
        stopTimer()
        navigation.goBack()
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
            {isLoading &&
                <LoaderModal showModal={isLoading} />
            }



            <View style={styles.topView}>
                <TouchableOpacity onPress={tapOnGoBack} style={styles.touchBack}>
                    <Image source={Images.IC_ARROW_BACK} />
                </TouchableOpacity>
                <Text style={styles.jobDetailText}>{StringConstants.VERIFICATION}</Text>
            </View>


            <Text style={styles.verificationCodeLine}>{StringConstants.VERIFY_STATEMENT}</Text>

            <TextInput
              key={otpInput === '' ? 'empty' : 'filled'} // Forces re-render when empty

                style={[styles.roundedTextInput, {borderColor: otpInput ?  Colors.ORANGE : Colors.LIGHT_GREY}]}
                value={otpInput}
                onChangeText={setOtpInput}
                keyboardType="numeric"
                maxLength={6}
                autoFocus={true}
                placeholder="Enter OTP"
                placeholderTextColor={Colors.COLOR_GREY1}
            />
            {/* <OTPTextView
                containerStyle={styles.textInputContainer}
                textInputStyle={styles.roundedTextInput}
                inputCount={6}
                inputCellLength={1}
                tintColor={Colors.ORANGE}
                autoFocus={true}
                handleTextChange={setOtpInput}
                ref={otpInputRef}
                defaultValue={otpInput}

            /> */}

            {/* <View style={styles.otpContainer}>
                {inputValues.map((text, index) => { 
                    return(
                    <TextInput
                        autoFocus={index == 0}
                        key={index}
                        ref={inputRefs[index]}
                        style={styles.mainView}
                        maxLength={1}
                        keyboardType={"phone-pad"}
                        editable={timerActive == true && otpTimer > 0}
                        onChangeText={(text) => handleChange(index, text)}
                        value={text}
                    />
                )})}
            </View> */}

            <Text style={styles.timer}>{formatTime(otpTimer)}</Text>

            <Button containerStyles={{ backgroundColor: Colors.ORANGE }}
                primaryTitle={StringConstants.VERIFY}
                onPress={tapOnVerify} />

            <View style={styles.viewDontHaveAccount}>
                <Text style={styles.textDontHaveAccount}>{StringConstants.DID_NOT_RECEIVE_CODE}</Text>
                <TouchableOpacity onPress={tapOnResend} disabled={timerActive ? true : false}>
                    <Text style={styles.textSignUpNow}>{StringConstants.RESEND}</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}