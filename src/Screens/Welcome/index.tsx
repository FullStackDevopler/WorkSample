import React, { useEffect } from "react";
import { Alert, Image, Keyboard, LogBox, Platform, Text, TouchableOpacity, View } from 'react-native'
import { styles } from "./styles";
import { Images } from '../../Assets/index'
import { StringConstants } from "../../Theme/StringConstants";
import TextField from "../../Components/TextField";
import Button from "../../Components/Button";
import { Colors } from '../../Theme/Colors';
import { AppConstants } from "../../Theme/AppConstants";
import { deleteForgetPasswordResponse, deleteSignInResponse, loadingUserState } from "../../Redux/Reducers/userInfoSlice";
import { useToast } from "react-native-toast-notifications";
import { useDispatch, useSelector } from "react-redux";
import LoaderModal from "../../Modals/LoaderModal";
import { loadingJobsState } from "../../Redux/Reducers/jobListSlice";
import { loadingContactsState } from "../../Redux/Reducers/contactsSlice";
import { loadingHotshotState } from "../../Redux/Reducers/hotshotSlice";
import { AppLogger } from "../../Theme/utils";
import { requestPermissionAndroid, requestPermissionIOS } from "../../Theme/notifications";



export default function Welcome({ navigation }: any): React.JSX.Element {

  const toast = useToast()
  const dispatch = useDispatch()

  const isLoading = useSelector((state: any) => state?.persistedReducer.userData.isLoading)
  const logoutResponse = useSelector((state: any) => state?.persistedReducer.userData.logoutResponse)
  const deleteAccountResponse = useSelector((state: any) => state?.persistedReducer.userData.deleteAccountResponse)
  const errorMessage = useSelector((state: any) => state?.persistedReducer.userData.error)

  const [generatedToken, setGeneratedToken] = React.useState<string>('')

  useEffect(() => {
    const requestPermissions = async () => {
      let token;
      if (Platform.OS === 'android') {
        token = await requestPermissionAndroid();
      } else {
        token = await requestPermissionIOS();
      }
      // console.log('FCM Token:', token);
      if (token) {
        setGeneratedToken(token);
      }
    };

    requestPermissions();
  }, []);


  useEffect(() => {

    console.log("isLoading isLoading", isLoading);
  }, [isLoading])

  useEffect(() => {


    Promise.all([
       // dispatch(loadingUserState()),
      dispatch(deleteSignInResponse('error')),
      dispatch(deleteForgetPasswordResponse('error')),
      dispatch(loadingJobsState()),
      dispatch(loadingContactsState()),
      dispatch(loadingHotshotState())
    ]).then(() => {
      AppLogger("All dispatch calls completed");
    }).catch(err => {
      AppLogger("Error in dispatch calls:", err);
    });
  }, [])


  useEffect(() => {
    if (!isLoading && logoutResponse !== null) {
      toast.show(`User logout successfully`, {
        placement: "bottom",
        duration: 1000,
        animationType: "slide-in",
        type: 'success'
      });
      dispatch(deleteSignInResponse('logoutResponse'));
    }

  }, [logoutResponse])

  useEffect(() => {
    if (!isLoading && deleteAccountResponse) {
      toast.show(`Account deleted successfully`, {
        placement: "bottom",
        duration: 1000,
        animationType: "slide-in",
        type: 'success'
      });
      dispatch(deleteSignInResponse('deleteAccountResponse'));
    }

  }, [deleteAccountResponse])

  useEffect(() => {
    LogBox.ignoreLogs(['new NativeEventEmitter']);
  }, [])

  const tapOnLogin = () => {
    navigation.navigate(AppConstants.screens.LOGIN_DRIVER_SCREEN, { generatedToken })
    // navigation.navigate('DummyLoginScreen')  //using formik validations in this  screen
  }

  const tapOnSignUp = () => {

    console.log("errormessage in taponsignup welcome=>>>", errorMessage);

    setTimeout(() => {
      console.log("errormessage in settimeout welcome==>>>", errorMessage);
      navigation.navigate(AppConstants.screens.SIGN_UP_DRIVER_SCREEN)
    }, 1000);
  }

  return (
    <View style={styles.rootContainer}>
      {/* {isLoading && <LoaderModal showModal={isLoading} />} */}

      <Image source={Images.BG_LOGIN_DRIVER} style={styles.imageBG} />
      <View style={{ alignItems: 'center' }}>

        <Text><Text style={styles.textWelcome}>{StringConstants.WELCOME_TO}</Text>
          <Text style={styles.textKindra}>{StringConstants.KINDRA}</Text></Text>

        <Button
          primaryTitle={StringConstants.LOGIN}
          onPress={tapOnLogin} />

        <Button
          containerStyles={{ marginTop: 0, backgroundColor: Colors.ORANGE }}
          primaryTitle={StringConstants.SIGNUP}
          onPress={tapOnSignUp} />


      </View>
    </View>







  )
}
