import { View, Text, TouchableOpacity, Image, FlatList, Pressable, RefreshControl } from 'react-native'
import React, { useEffect } from 'react'
import { styles } from './styles'
import { StringConstants } from '../../Theme/StringConstants'
import { Colors } from '../../Theme/Colors'
import JobsTab from '../../Components/JobsTab'
import { Images } from '../../Assets'
import UnAssignedJobItem from '../../Components/UnassignedJobItem'
import { AppConstants } from '../../Theme/AppConstants'
import FilterModal from '../../Modals/FilterModal'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile, updateFcmAction } from '../../Redux/Actions/userActions'
import {
  acceptJob, getInJobMyJobCount, getNewLoadsCount, getOutJobMyJobCount, getOutJobUnassignCount, jobDetailForNotificationAction,
  myInJobAction, myInPastJobAction, myInUnAssignedJobAction, myOutJobAction, myOutPastJobAction, myOutUnAssignedJobAction
} from '../../Redux/Actions/jobActions'
import LoaderModal from '../../Modals/LoaderModal'
import ValidationModal from '../../Modals/ValidationModal'
import { deleteSignInResponse } from '../../Redux/Reducers/userInfoSlice'
import { clearJobsResponse } from '../../Redux/Reducers/jobListSlice'
import { useFocusEffect } from '@react-navigation/native'
import moment from 'moment'
import { numberWithCommas } from '../../Theme/Helper'
import messaging from '@react-native-firebase/messaging';
import { hotshotDetailsForNotificationsAction } from '../../Redux/Actions/hotshotActions'
import { clearHotshotResponse } from '../../Redux/Reducers/hotshotSlice'
import { getFcmToken } from '../../Theme/notifications'

export default function Home({ navigation, route }: any): React.JSX.Element {
  const dispatch = useDispatch()

  const [selectedFilterInTab, setSelectedFilterInTab] = React.useState<number>(0);
  const [selectedFilterOutTab, setSelectedFilterOutTab] = React.useState<number>(0);
  const [isInJobsTab, setIsInJobsTab] = React.useState<boolean>(true);
  const [showFilterModal, setShowFilterModal] = React.useState<boolean>(false)
  const [showValidationModal, setShowValidationModal] = React.useState<boolean>(false)
  const [alertTitle, setAlertTitle] = React.useState<string>('')
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  // const [fcmToken, setFcmToken] = React.useState<any>()

  const accessToken = useSelector((state: any) => state?.persistedReducer.userData.userToken);
  const isLoading = useSelector((state: any) => state?.persistedReducer.jobListData.isLoading)
  const acceptJobData = useSelector((state: any) => state?.persistedReducer.jobListData.acceptJobData)
  const errorMessage = useSelector((state: any) => state?.persistedReducer.jobListData.error)
  // const fcmTokenResponse = useSelector((state: any) => state?.persistedReducer.userData.fcmTokenResponse);


  //all jobs
  const myInJobs = useSelector((state: any) => state?.persistedReducer.jobListData.myInJobs)
  const myOutJobs = useSelector((state: any) => state?.persistedReducer.jobListData.myOutJobs)
  const myInPastJobs = useSelector((state: any) => state?.persistedReducer.jobListData.myInPastJobs)
  const myOutPastJobs = useSelector((state: any) => state?.persistedReducer.jobListData.myOutPastJobs)
  const myInUnAssignedJobs = useSelector((state: any) => state?.persistedReducer.jobListData.myInUnAssignedJobs)
  const myOutUnAssignedJobs = useSelector((state: any) => state?.persistedReducer.jobListData.myOutUnAssignedJobs)


  //count for all jobs
  const inJobMyJobCount = useSelector((state: any) => state?.persistedReducer.jobListData.inJobMyJobCount)
  const newLoadsCount = useSelector((state: any) => state?.persistedReducer.jobListData.newLoadsCount)
  const outMyJobCount = useSelector((state: any) => state?.persistedReducer.jobListData.outMyJobCount)
  const outUnassignJobCount = useSelector((state: any) => state?.persistedReducer.jobListData.outUnassignJobCount)

  const jobDetails = useSelector((state: any) => state?.persistedReducer.jobListData.allJobDetails)
  const hotshotDetailsResponse = useSelector((state: any) => state?.persistedReducer.hotshotListData.hotshotDetailsResponse)




  useEffect(()=>{
    const checkPermission = async () => {
      const hasPermissions = await messaging().hasPermission();
      console.log("hasPermissions in useEffect:", hasPermissions);

      if (hasPermissions) {
        let token = await getFcmToken();
        console.log("token in fcm in useEffect home->", token);
        if(token){
        updateFcmToken(token);
        }
      } else {
        console.log('Permission denied');
      }
    }

    checkPermission();
  },[])

  const updateFcmToken = async (fcmToken: any) => {
    let body = {
      fcm: fcmToken
    }

    await dispatch(updateFcmAction(accessToken, body))
  }


  useEffect(() => {
// console.log("jobDetails jobDetails in useeffect",jobDetails);

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
    // Fetch profile details when the screen mounts

    const getUserProfile = async () => {
      if (accessToken)
        await dispatch(getProfile(accessToken));
    }

    getUserProfile()

  }, [])

  useFocusEffect(
    React.useCallback(() => {
      getJobListing()
      getInJobCounts()
      getOutJobCounts()
    }, [isInJobsTab, selectedFilterInTab, selectedFilterOutTab])
  );

  useFocusEffect(
    React.useCallback(() => {
      // console.log('route?.params?.isOutTab...', route?.params?.isOutTab);
      if (route?.params?.isOutTab === true) {
        setIsInJobsTab(false)
        setSelectedFilterOutTab(2)
      }

    }, [route?.params?.isOutTab, setIsInJobsTab, setSelectedFilterOutTab])
  );


  useEffect(() => {

    if (!isLoading && acceptJobData?.acknowledged == true) {
      setAlertTitle(StringConstants.JOB_REQUEST_ACCEPT_SUCCESSFULLY)
      setShowValidationModal(true)
    }

  }, [acceptJobData])

  useEffect(() => {
    if (errorMessage != null && !isLoading) {
      setShowValidationModal(true)
      setAlertTitle(`${errorMessage}`)
    }

    return () => {
      dispatch(deleteSignInResponse('error'))
    }
  }, [errorMessage])


  useEffect(() => {

    if (route?.params?.fromNotification === true) {
      let body = {}
      if (route?.params?.selectedFilterInTab == 0 && route?.params?.isInJobsTab === false) {
        setSelectedFilterInTab(0)
        setIsInJobsTab(false)
        dispatch(getOutJobUnassignCount(accessToken, body))
      }
    }

  }, [route?.params?.fromNotification])

  useEffect(() => {
    messaging().onNotificationOpenedApp(async remoteMessage => {
      
      console.log("remoteMessage onNotificationOpenedApp", remoteMessage);
      if (remoteMessage?.data) {
        handleNotificationsData(remoteMessage.data)
      }


    })

    messaging().getInitialNotification().then(remoteMessage => {
      console.log("remoteMessage getInitialNotification", remoteMessage);

      if (remoteMessage?.data) {
        handleNotificationsData(remoteMessage.data)
      }
    })

  }, [])

  useEffect(() => {

    if (hotshotDetailsResponse && hotshotDetailsResponse?._id && !isLoading) {
      navigation.navigate(AppConstants.screens.JOB_DETAILS, { item: hotshotDetailsResponse })
    }

    setTimeout(() => {
      dispatch(clearHotshotResponse('hotshotDetailsResponse'))
    }, 2000);

  }, [hotshotDetailsResponse])

  const handleNotificationsData = (notificationItem: any) => {
    console.log('item in handleNotificationsData in home screen==>>', notificationItem);

    switch (notificationItem.type) {
      case 'accept_job':
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

      case 'user_send_proposal':
        // case 'user_accept_hotshot':
        if (notificationItem?.isHotshot == "true") {
          hotshotDetailFunc(notificationItem.job_id)
        } else {
          jobDetailsFunc(notificationItem.job_id)
        }
        break;

      case 'new_job_created':
        jobDetailsFunc(notificationItem.job_id)
        break;

      default:
        navigation.navigate(AppConstants.screens.NOTIFICATIONS_SCREEN)
        break;
    }
  }

  const jobDetailsFunc = (jobId: string) => {
    dispatch(jobDetailForNotificationAction(accessToken, jobId))
  }

  const hotshotDetailFunc = (hotsot_id: string) => {
    console.log("hotsot_id in hotshotDetailFunc", hotsot_id);

    let body = { hotsot_id }
    dispatch(hotshotDetailsForNotificationsAction(accessToken, body))
  }

  const tapOnSearchInPastJob = (startDate: string, endDate: string) => {
    const formattedStartDate = moment(startDate).format('YYYY-MM-DD');
    const formattedEndDate = moment(endDate).format('YYYY-MM-DD');

    let body = {
      date_from: formattedStartDate,
      date_to: formattedEndDate
    }

    setShowFilterModal(false)
    setIsInJobsTab(true)
    setSelectedFilterInTab(1)
    dispatch(myInPastJobAction(accessToken, body))
  }

  const tapOnSearchOutPastJob = (startDate: string, endDate: string) => {
    const formattedStartDate = moment(startDate).format('YYYY-MM-DD');
    const formattedEndDate = moment(endDate).format('YYYY-MM-DD');

    let body = {
      date_from: formattedStartDate,
      date_to: formattedEndDate
    }

    setShowFilterModal(false)
    setIsInJobsTab(false)
    setSelectedFilterOutTab(1)
    dispatch(myOutPastJobAction(accessToken, body))
  }

  const getInJobCounts = () => {
    let body = {}
    dispatch(getInJobMyJobCount(accessToken, body))
    dispatch(getNewLoadsCount(accessToken, body))
  }

  const getOutJobCounts = () => {
    let body = {}
    dispatch(getOutJobMyJobCount(accessToken, body))
    dispatch(getOutJobUnassignCount(accessToken, body))
  }

  const getJobListing = async () => {
    let body = {
      date_from: "",
      date_to: ""
    }
    if (isInJobsTab) {
      switch (selectedFilterInTab) {
        case 1:
          await dispatch(myInPastJobAction(accessToken, body))
          break;
        case 2:
          await dispatch(myInUnAssignedJobAction(accessToken))
          break;
        default:
          await dispatch(myInJobAction(accessToken))
          break;
      }
    } else {
      switch (selectedFilterOutTab) {
        case 1:
          await dispatch(myOutPastJobAction(accessToken, body))
          break;
        case 2:
          getOutUnassignedJobs()
          break;
        default:
          await dispatch(myOutJobAction(accessToken))
          break;
      }

    }
  }

  const getOutUnassignedJobs = async () => {
    await dispatch(myOutUnAssignedJobAction(accessToken))
  }

  const renderTabsData = () => {
    if (isInJobsTab == true) {
      switch (selectedFilterInTab) {
        case 0:
          if (myInJobs.length == 0) {
            return (
              <View style={{ flex: 1 }}>
                <Image source={Images.IC_HOME_NO_DATA} style={styles.homeIcon} />
                <Text style={styles.noJobText}>Currently, you don't have any jobs yet</Text>
              </View>
            )
          }
          else {
            return (
              <View>
                <FlatList
                  data={myInJobs}
                  extraData={myInJobs}
                  renderItem={({ item, index }) => {
                    return (
                      <UnAssignedJobItem item={item} index={index}
                        tapOnViewDetails={(item) => {
                          navigation.navigate(AppConstants.screens.MY_IN_JOBS, { item })
                        }}
                        jobType='InJobsMyJobs'
                      />
                    )
                  }}

                />
              </View>
            )
          }
        case 1:
          if (myInPastJobs?.length == 0) {
            return (

              <View style={{ flex: 1 }}>
                {showFilterModal &&
                  <FilterModal
                    showModal={showFilterModal}
                    hideModal={() => setShowFilterModal(false)}
                    onPress={(startDate: string, endDate: string) => tapOnSearchInPastJob(startDate, endDate)}
                  />
                }
                <View style={styles.filterView}>
                  <Pressable style={styles.touchFilter} onPress={() => setShowFilterModal(true)}>
                    <Text style={styles.textFilter}>{StringConstants.FILTER}</Text>
                    <Image source={Images.IC_FILTER} style={styles.imageFilter} />
                  </Pressable>
                </View>

                <View style={{ flex: 1, alignSelf: 'center', justifyContent: 'center' }}>
                  <Text style={styles.noDataFoundText}>No jobs found</Text>
                </View>
              </View>
            )
          }
          else {
            const totalAmount = myInPastJobs.reduce((acc: any, obj: any) => acc + parseFloat(obj.driver_amount), 0);

            return (

              <View>
                {showFilterModal &&
                  <FilterModal
                    showModal={showFilterModal}
                    hideModal={() => setShowFilterModal(false)}
                    onPress={(startDate: string, endDate: string) => tapOnSearchInPastJob(startDate, endDate)}
                  />
                }
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginHorizontal: 28,
                  marginBottom: 10
                }}>
                  <Text><Text style={styles.textTotalAmount}>{StringConstants.TOTAL_AMOUNT}  </Text>
                    <Text style={styles.textTotalAmountValue}>£{numberWithCommas(totalAmount.toFixed(2))}</Text>
                  </Text>
                  <Pressable style={styles.touchFilter} onPress={() => setShowFilterModal(true)}>
                    <Text style={styles.textFilter}>{StringConstants.FILTER}</Text>
                    <Image source={Images.IC_FILTER} style={styles.imageFilter} />
                  </Pressable>
                </View>
                <FlatList
                  data={myInPastJobs}
                  extraData={myInPastJobs}
                  renderItem={({ item, index }) => {
                    return (
                      <UnAssignedJobItem item={item}
                        index={index}
                        tapOnViewDetails={(item) =>
                          navigation.navigate(AppConstants.screens.MY_PAST_JOBS, { item, jobType: 'myInPastJobs' })
                        }
                        jobType='Past'
                      />
                    )
                  }}
                  ListFooterComponent={<View style={{ marginBottom: 30 }} />}
                  bounces={false}

                />
              </View>
            )
          }

        case 2:
          if (myInUnAssignedJobs?.length == 0) {
            return (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.noDataFoundText}>No jobs found</Text>
              </View>
            )
          }
          else {
            return (
              <View>
                <FlatList
                  data={myInUnAssignedJobs}
                  extraData={myInUnAssignedJobs}
                  renderItem={({ item, index }) => {
                    return (
                      <UnAssignedJobItem item={item}
                        index={index}
                        tapOnViewDetails={(item) => {
                          navigation.navigate(AppConstants.screens.JOB_REQUEST_DETAILS, { item })
                        }}
                        jobType='JobRequest'
                        tapOnAcceptJob={(jobId: string) => tapOnAcceptJob(jobId)}
                      />
                    )
                  }}
                />
              </View>

            )
          }
      }
    } else {
      switch (selectedFilterOutTab) {

        case 0:
          if (myOutJobs?.length == 0) {
            return (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.noDataFoundText}>No jobs found</Text>
              </View>
            )
          }
          else {
            return (
              <View>
                <FlatList
                  data={myOutJobs}
                  extraData={myOutJobs}
                  renderItem={({ item, index }) => {
                    return (
                      <UnAssignedJobItem item={item}
                        index={index}
                        tapOnViewDetails={(item) => {
                          navigation.navigate(AppConstants.screens.MY_OUT_JOBS, { item })
                        }}
                        jobType='OutJobsMyJobs'
                      />
                    )
                  }}
                />
              </View>
            )
          }

        case 1:
          if (myOutPastJobs?.length == 0) {
            return (
              <View style={{ flex: 1 }}>
                {showFilterModal &&
                  <FilterModal
                    showModal={showFilterModal}
                    hideModal={() => setShowFilterModal(false)}
                    onPress={(startDate: string, endDate: string) => tapOnSearchOutPastJob(startDate, endDate)}
                  />
                }
                <View style={styles.filterView}>
                  <Pressable style={styles.touchFilter} onPress={() => setShowFilterModal(true)}>
                    <Text style={styles.textFilter}>{StringConstants.FILTER}</Text>
                    <Image source={Images.IC_FILTER} style={styles.imageFilter} />
                  </Pressable>
                </View>


                <View style={{ flex: 1, alignSelf: 'center', justifyContent: 'center' }}>
                  <Text style={styles.noDataFoundText}>No jobs found</Text>
                </View>
              </View>
            )
          }
          else {
            const totalAmount = myOutPastJobs.reduce((acc: any, obj: any) => acc + parseFloat(obj.amount), 0);

            return (
              <View>
                {showFilterModal &&
                  <FilterModal
                    showModal={showFilterModal}
                    hideModal={() => setShowFilterModal(false)}
                    onPress={(startDate: string, endDate: string) => tapOnSearchOutPastJob(startDate, endDate)}
                  />
                }
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginHorizontal: 28,
                  marginBottom: 10
                }}>
                  <Text><Text style={styles.textTotalAmount}>{StringConstants.TOTAL_AMOUNT}  </Text>
                    <Text style={styles.textTotalAmountValue}>£{numberWithCommas(totalAmount.toFixed(2))}</Text>
                  </Text>
                  <Pressable style={styles.touchFilter} onPress={() => setShowFilterModal(true)}>
                    <Text style={styles.textFilter}>Filter</Text>
                    <Image source={Images.IC_FILTER} style={styles.imageFilter} />
                  </Pressable>
                </View>
                <FlatList
                  data={myOutPastJobs}
                  extraData={myOutPastJobs}
                  renderItem={({ item, index }) => {
                    return (
                      <UnAssignedJobItem item={item}
                        index={index}
                        tapOnViewDetails={(item) =>
                          navigation.navigate(AppConstants.screens.MY_PAST_JOBS, { item, jobType: 'OutJobsPast' })
                        }
                        jobType='OutJobsPast'
                      />
                    )
                  }}
                  ListFooterComponent={<View style={{ marginBottom: 40 }} />}
                />
              </View>
            )
          }

        case 2:
          if (myOutUnAssignedJobs?.length == 0) {
            return (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.noDataFoundText}>No jobs found</Text>
              </View>
            )
          }
          else {
            return (
              <View>
                <FlatList
                  data={myOutUnAssignedJobs}
                  extraData={myOutUnAssignedJobs}
                  renderItem={({ item, index }) => {
                    return (
                      <UnAssignedJobItem item={item}
                        index={index}
                        tapOnViewDetails={(item) => navigation.navigate(AppConstants.screens.UNASSIGNED_JOB_DETAILS, { item })}
                        jobType='UnAssigned'
                      />

                    )
                  }}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={() => {
                        getOutUnassignedJobs()
                        setRefreshing(false);
                      }}
                    />
                  }
                  showsVerticalScrollIndicator={false}
                />
              </View>

            )
          }
      }

    }



  };

  const setSelectedFilterTabValue = (val: number) => {
    if (isInJobsTab) setSelectedFilterInTab(val)
    else setSelectedFilterOutTab(val)
  }

  const tapOnAcceptJob = (jobId: string) => {
    let body = {
      job_id: jobId
    }


    dispatch(acceptJob(accessToken, body))
    getInJobCounts()
  }


  return (
    <View style={styles.rootContainer}>

      {isLoading &&
        <LoaderModal showModal={isLoading} />
      }
      {showValidationModal &&
        <ValidationModal
          showModal={showValidationModal}
          hideModal={() => {
            if (alertTitle == StringConstants.JOB_REQUEST_ACCEPT_SUCCESSFULLY) {
              dispatch(myInUnAssignedJobAction(accessToken))
              dispatch(clearJobsResponse('acceptJobData'));
              setShowValidationModal(false)
              setAlertTitle('')
            } else {

              dispatch(deleteSignInResponse('error'));
              setShowValidationModal(false)
              setAlertTitle('')
            }
          }}
          title={alertTitle}
        />
      }
      <Text style={styles.myJobsText}>{StringConstants.MY_JOBS}</Text>
      <RenderTabs
        tapOnTab={(val: boolean) => setIsInJobsTab(val)}
        selectedTab={isInJobsTab}
        tapOnFilterTab={(val: number) => setSelectedFilterTabValue(val)}
        selectedFilterTab={isInJobsTab ? selectedFilterInTab : selectedFilterOutTab}
        inJobMyJobCount={inJobMyJobCount}
        newLoadsCount={newLoadsCount}
        outMyJobCount={outMyJobCount}
        outUnassignJobCount={outUnassignJobCount}

      />
      <View style={{ flex: 1, marginTop: 20 }}>
        {renderTabsData()}

      </View>
    </View>
  )
}



const RenderTabs = ({ tapOnTab, selectedTab, tapOnFilterTab, selectedFilterTab, inJobMyJobCount, newLoadsCount, outMyJobCount, outUnassignJobCount }: any) => {

  return (
    <View>
      <View style={styles.mainWrapper}>
        <TouchableOpacity onPress={() => tapOnTab(true)}
          style={[styles.assignedButton, { backgroundColor: selectedTab ? Colors.ORANGE : Colors.COLOR_GREY3 }]} >
          <Text style={[styles.tabText, { color: selectedTab ? Colors.WHITE : Colors.PLACEHOLDER_TEXT }]}>{StringConstants.IN_JOBS}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => tapOnTab(false)}
          style={[styles.unassignedButton, { backgroundColor: !selectedTab ? Colors.ORANGE : Colors.COLOR_GREY3 }]}>
          <Text style={[styles.tabText, { color: !selectedTab ? Colors.WHITE : Colors.PLACEHOLDER_TEXT }]}>{StringConstants.OUT_JOBS}</Text>
        </TouchableOpacity>
      </View>

      {selectedTab ? <JobsTab
        leftTitle={StringConstants.MY_JOBS}
        middleTitle={StringConstants.PAST_JOBS}
        rightTitle={StringConstants.NEW_LOADS}
        tapOnFilterTab={(val) => tapOnFilterTab(val)}
        selectedFilterTab={selectedFilterTab}
        inJobMyJobCount={inJobMyJobCount !== undefined ? inJobMyJobCount[1]?.counts?.myJob : 0}
        newLoadsCount={newLoadsCount !== undefined ? newLoadsCount[1]?.counts?.newLoad : 0}
        selectedTab={selectedTab}

      />
        :
        <JobsTab
          leftTitle={StringConstants.MY_JOBS}
          middleTitle={StringConstants.PAST_JOBS}
          rightTitle={StringConstants.UNASSIGNED}
          tapOnFilterTab={(val) => tapOnFilterTab(val)}
          selectedFilterTab={selectedFilterTab}
          outJobMyJobCount={outMyJobCount !== undefined ? outMyJobCount[0]?.counts?.myJob : 0}
          unassignedJobCount={outUnassignJobCount !== undefined ? outUnassignJobCount[0]?.counts?.unAssigned : 0}
          selectedTab={selectedTab}
        />

      }

    </View>
  )
}
