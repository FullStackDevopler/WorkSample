import { View, Text, Image, FlatList, TouchableOpacity, RefreshControl } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { styles } from './styles'
import { StringConstants } from '../../Theme/StringConstants'
import NotificationItem from '../../Components/NotificationItem'
import { SwipeListView } from 'react-native-swipe-list-view'
import { Images } from '../../Assets'
import { deleteNotificationAction, getNotificationAction, readNotificationAction } from '../../Redux/Actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import LoaderModal from '../../Modals/LoaderModal'
import ValidationModal from '../../Modals/ValidationModal'
import { deleteSignInResponse } from '../../Redux/Reducers/userInfoSlice'
import { checkInternetConnection } from '../../Components/InternetConnection'
import { AppConstants } from '../../Theme/AppConstants'
import { jobDetailForNotificationAction } from '../../Redux/Actions/jobActions'
import { clearJobsResponse } from '../../Redux/Reducers/jobListSlice'
import { useFocusEffect } from '@react-navigation/native'
import { hotshotDetailsForNotificationsAction } from '../../Redux/Actions/hotshotActions'
import { clearHotshotResponse } from '../../Redux/Reducers/hotshotSlice'

export default function Notifications({ navigation, route }: any): React.JSX.Element {
  const dispatch = useDispatch()
  const swipeListViewRef = useRef(null);

  const [showValidationModal, setShowValidationModal] = useState<boolean>(false)
  const [alertTitle, setAlertTitle] = useState<string>('')
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [refreshing, setRefreshing] = React.useState<boolean>(false);

  const isLoading = useSelector((state: any) => state.persistedReducer.userData.isLoading)
  const accessToken = useSelector((state: any) => state?.persistedReducer.userData.userToken);
  const errorMessage = useSelector((state: any) => state?.persistedReducer.userData.error)
  const notificationsList = useSelector((state: any) => state?.persistedReducer.userData.notificationData)
  const jobDetails = useSelector((state: any) => state?.persistedReducer.jobListData.allJobDetails)
  const hotshotDetailsResponse = useSelector((state: any) => state?.persistedReducer.hotshotListData.hotshotDetailsResponse)
  console.log("jobDetails in Notifications", JSON.stringify(jobDetails));
  // console.log('jobDetails.status',jobDetails.status);
  

  useEffect(() => {
    if (jobDetails && jobDetails?._id && !isLoading) {
      if (jobDetails.status == 'InProgress') {
        navigation.navigate(AppConstants.screens.MY_OUT_JOBS, { item: jobDetails })
      }
      else if (jobDetails.status == 'Completed' || jobDetails.status == 'Cancelled') {
        navigation.navigate(AppConstants.screens.MY_PAST_JOBS, { item: jobDetails, isFromNotification: true })
      }
      else if (jobDetails.status == 'Pending') {
        navigation.navigate(AppConstants.screens.JOB_REQUEST_DETAILS, { item: jobDetails })
      }


      setTimeout(() => {
        dispatch(clearJobsResponse('allJobDetails'))
      }, 5000);
    }
  }, [jobDetails])



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
        setIsConnected(isConnected);

        if (isConnected) {
          getNotificationList()
        } else {
          setAlertTitle(StringConstants.PLEASE_CHECK_YOUR_INTERNET_CONNECTION);
          setShowValidationModal(true);
        }
      } catch (error) {
        console.error('Error checking internet connection:', error);
      }
    };

    fetchData();

    return () => { dispatch(deleteSignInResponse('error')) }
  }, []);



  useFocusEffect(
    React.useCallback(() => {
      isConnected && getNotificationList()
    }, [])
  );

  const getNotificationList = async () => {
    await dispatch(getNotificationAction(accessToken));
  }

  const tapOnRead = (item: any, index: number) => {
    if (swipeListViewRef.current) {
      swipeListViewRef.current.safeCloseOpenRow();
    }

    // if (item[index]) {
    //   item[index].closeRow();
    // }

    let notificationId = item._id
    dispatch(readNotificationAction(accessToken, notificationId))
  };

  const tapOnDelete = (item: any, index: number) => {
    if (swipeListViewRef.current) {
      swipeListViewRef.current.safeCloseOpenRow();
    }

    let notificationId = item._id
    dispatch(deleteNotificationAction(accessToken, notificationId))
  }



  const renderHiddenItem = (data: any, rowMap: any) => {


    return (
      <View style={styles.hiddenListView} key={data?.index}>
        <TouchableOpacity style={styles.touchRead} onPress={() => {
          tapOnRead(data?.item, data?.index)
        }}>
          <Image source={Images.IC_EMAIL} style={styles.imageEmail} />
          <Text style={styles.textRead}>{StringConstants.READ}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.touchArchive}
          onPress={() => { tapOnDelete(data?.item, data?.index) }} >
          <Image source={Images.IC_DELETE} style={styles.imageArchive} />
          <Text style={styles.textRead}>{StringConstants.DELETE}</Text>
        </TouchableOpacity>
      </View>
    );
  }


  useEffect(() => {

    if (hotshotDetailsResponse && hotshotDetailsResponse?._id && !isLoading) {
      navigation.navigate(AppConstants.screens.JOB_DETAILS, { item: hotshotDetailsResponse })
    }

    setTimeout(() => {
      dispatch(clearHotshotResponse('hotshotDetailsResponse'))
    }, 2000);

  }, [hotshotDetailsResponse])

  const tapOnItem = (notificationItem: any) => {
    console.log('item in tapOnItem in notifications==>>', notificationItem);

    switch (notificationItem.type) {
      case 'job_accepted':
        jobDetailsFunc(notificationItem.job_id)
        break;

      case 'en_route':
        jobDetailsFunc(notificationItem.job_id)
        break;

      case 'reached_at_location':
        jobDetailsFunc(notificationItem.job_id)
        break;

      case 'collected':
        jobDetailsFunc(notificationItem.job_id)
        break;

      case 'deliverd':
        jobDetailsFunc(notificationItem.job_id)
        break;

      case 'job_Completed':
        jobDetailsFunc(notificationItem.job_id)
        break;

      case 'job_Cancelled':
        jobDetailsFunc(notificationItem.job_id)
        break;

      case 'new_job_create':
        jobDetailsFunc(notificationItem.job_id)
        break;

      case 'user_accept_hotshot':
        if (notificationItem?.isHotshot === true) {
          hotshotDetailFunc(notificationItem.job_id)
        } else {
          jobDetailsFunc(notificationItem.job_id)
        }
        break;
    }
  }

  const jobDetailsFunc = (jobId: string) => {
    dispatch(jobDetailForNotificationAction(accessToken, jobId))
  }


  const hotshotDetailFunc = (hotsot_id: string) => {
    let body = { hotsot_id }
    dispatch(hotshotDetailsForNotificationsAction(accessToken, body))
  }

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.notificationText}>{StringConstants.NOTIFICATIN}</Text>
      {isLoading && <LoaderModal showModal={isLoading} />}
      {showValidationModal &&
        <ValidationModal
          showModal={showValidationModal}
          hideModal={() => {
            setShowValidationModal(false)
            setAlertTitle('')
            dispatch(deleteSignInResponse('error'))
          }}
          title={alertTitle}
        />
      }
      {notificationsList?.length > 0 ?
        <SwipeListView
          ref={swipeListViewRef}
          showsVerticalScrollIndicator={false}
          data={notificationsList}
          extraData={notificationsList}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item, index }) => {
            return <NotificationItem item={item} index={index}
              tapOnItem={() => tapOnItem(item)}
            />
          }}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={75}
          rightOpenValue={-75}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                getNotificationList()
                setRefreshing(false);
              }}
            />
          }

        /> :
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.noDataFoundText}>{StringConstants.YOU_DONT_HAVE_NOTIFICATION}</Text>
        </View>
      }
    </View>
  )
}

