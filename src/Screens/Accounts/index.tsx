import { View, Text, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import { StringConstants } from '../../Theme/StringConstants'
import { Images } from '../../Assets'
import { AppConstants } from '../../Theme/AppConstants'
import AccountsItem from '../../Components/AccountsItem'
import ConfirmationModal from '../../Modals/ConfirmationModal'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAccountAction, getProfile, logoutUser } from '../../Redux/Actions/userActions'
import { useToast } from 'react-native-toast-notifications'
import { ApiConstants } from '../../Theme/ApiConstants'
import ValidationModal from '../../Modals/ValidationModal'
import LoaderModal from '../../Modals/LoaderModal'
import { deleteSignInResponse } from '../../Redux/Reducers/userInfoSlice'
import { reset } from '../../Router/RootNavigation'
import { capitalizeFirstLetter } from '../../Theme/Helper'
import { checkInternetConnection } from '../../Components/InternetConnection'

export default function Accounts({ navigation, route }: any): React.JSX.Element {
  const [navigationData, setNavigationData] = useState(AppConstants.PROFILE_DATA)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [showValidationModal, setShowValidationModal] = useState<boolean>(false)
  const [alertTitle, setAlertTitle] = useState<string>('')
  const [isConnected, setIsConnected] = React.useState(true);
  const dispatch = useDispatch()
  const toast = useToast()

  const isLoading = useSelector((state: any) => state?.persistedReducer.userData.isLoading)
  const errorMessage = useSelector((state: any) => state?.persistedReducer.userData.error)
  const accessToken = useSelector((state: any) => state?.persistedReducer.userData.userToken);
  console.log('accessToken in Accounts:', accessToken);

  const profileDetails = useSelector((state: any) => state?.persistedReducer.userData.profileDetails);
  // console.log('profileDetails in Accounts:', profileDetails);




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
    // Fetch profile details when the screen mounts

    const getUserProfile = async () => {
      if (accessToken)
        await dispatch(getProfile(accessToken));
    }
    console.log("accessToken in accounts useeffect", accessToken);

    getUserProfile()
  }, [])


  useEffect(() => {
    if (errorMessage != null && !isLoading) {
      setShowValidationModal(true)
      setAlertTitle(`${errorMessage}`)

    } else if (errorMessage == null) {
      setShowValidationModal(false)
      setAlertTitle('')
    }

    // return()=>{dispatch(deleteSignInResponse('error'))}
  }, [errorMessage])

  const hideLogoutModal = () => {
    setShowModal(false)
    dispatch(deleteSignInResponse('error'))

  }

  const hideDeleteModal = () => {
    setShowDeleteModal(false)
    dispatch(deleteSignInResponse('error'))
  }


  const tapOnYes = async () => {
    setShowModal(false)
    if (isConnected) {
      await dispatch(logoutUser(accessToken))
    } else {
      setAlertTitle(StringConstants.PLEASE_CHECK_YOUR_INTERNET_CONNECTION);
      setShowValidationModal(true);
    }
  }


  const tapOnYesInDeleteModal = async () => {
    setShowDeleteModal(false)
    if (isConnected) {
      const id = profileDetails?.userId
      await dispatch(deleteAccountAction(accessToken, id))
    } else {
      setAlertTitle(StringConstants.PLEASE_CHECK_YOUR_INTERNET_CONNECTION);
      setShowValidationModal(true);
    }
  }


  const tapOnItem = (item: any) => {
    console.log('buttonText:', item);

    if (item.title == StringConstants.LOGOUT) {
        // tapOnLogout()

        setShowModal(true)

    } else if (item.title == StringConstants.DELETE_ACCOUNT) {
        // tapOnDeleteAccount()
        setShowDeleteModal(true)
    } else {
        console.log("item.screenname", item);
        if (item.url != undefined) {
            console.log("url", item.url);
            navigation.navigate(item.screenName, {
                url: item.url,
                title: item.title
            })
        } else navigation.navigate(item.screenName)
    }
}

  return (
    <View style={styles.rootContainer}>
      {showModal &&
        <ConfirmationModal
          showModal={showModal}
          hideModal={hideLogoutModal}
          tapOnConfirm={tapOnYes}
          title={StringConstants.LOGOUT_WARNING}
          tapOnNo={() => setShowModal(false)}
        />
      }
      {showDeleteModal &&
        <ConfirmationModal
          showModal={showDeleteModal}
          hideModal={hideDeleteModal}
          tapOnConfirm={tapOnYesInDeleteModal}
          title={StringConstants.DELETE_ACCOUNT_WARNING}
          tapOnNo={() => setShowDeleteModal(false)}
        />
      }
      {showValidationModal &&
        <ValidationModal
          showModal={showValidationModal}
          hideModal={() => {
            setShowValidationModal(false)
            setAlertTitle('')
          }}
          title={alertTitle}
        />
      }
      {isLoading &&
        <LoaderModal showModal={isLoading}
        />
      }

      <Text style={styles.myProfileText}>{StringConstants.MY_PROFILE}</Text>

      <View style={styles.topView}>
        <View style={{ flex: 1, alignSelf: 'center' }}>
          <Text style={styles.userNameText}>{capitalizeFirstLetter(profileDetails?.full_name)}</Text>
          <Text style={styles.emailText}>{profileDetails?.email}</Text>
        </View>
        <Image style={styles.profileImage}
          source={profileDetails?.photo ? { uri:profileDetails?.photo }
            : Images.IC_PICKER} />
      </View>

      <View style={styles.horizontalLine} />

      <FlatList bounces={false}
        style={{ paddingTop: 15 }}
        data={navigationData}
        extraData={navigationData}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item, index }) => {
          return <AccountsItem
            index={index}
            buttonText={item.title}
            sourceIcon={item.icon}
            tapOnLogout={() => setShowModal(true)}
            tapOnDeleteAccount={() => setShowDeleteModal(true)}
            navigation={navigation}
            item={item}
            tapOnItem={() => tapOnItem(item)}
          />
        }}
        ListFooterComponent={<View style={{paddingBottom: 20}}/>}
      />
    </View>
  )
}

