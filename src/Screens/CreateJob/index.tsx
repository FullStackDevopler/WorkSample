import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { styles } from './styles'
import { StringConstants } from '../../Theme/StringConstants'
import { Images } from '../../Assets'
import { capitalizeFirstLetter } from '../../Theme/Helper'
import Form1 from './Form1'
import Form2 from './Form2'
import Form3 from './Form3'
import { useDispatch, useSelector } from 'react-redux'
import CreateJobStatusHeader from '../../Components/CreateJobStatusHeader'
import { createdJobAction, vehichleListAction } from '../../Redux/Actions/jobActions'
import ValidationModal from '../../Modals/ValidationModal'
import { clearJobsResponse } from '../../Redux/Reducers/jobListSlice'
import { AppConstants } from '../../Theme/AppConstants'
import LoaderModal from '../../Modals/LoaderModal'

export default function CreateJob({ navigation, route }: any): React.JSX.Element {
  const dispatch = useDispatch()
  const [showValidationModal, setShowValidationModal] = useState<boolean>(false)
  const [alertTitle, setAlertTitle] = useState<string>('')
  const [selectedTab, setSelectedTab] = useState(0)
  const [transformedArray, setTransformedArray] = useState<any[]>([]);  //Array made by selecting pick ups
  const [pickupLocations, setPickupLocations] = useState<any[]>([
    {
      location: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zip_code: '',
      pickUpItems: [{
        item: "",
        count: 0
      }],
      dropOffItems: [],
      note: '',
      findAddress: true,
      latitude: 0,
      longitude: 0,
      placeId: '',
    }
  ]);
  const [dropOffLocations, setDropOffLocations] = useState<any[]>([
    {
      location: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zip_code: '',
      pickUpItems: [],
      dropOffItems: [{
        item: "",
        count: 0,
      }],
      note: '',
      findAddress: true,
      latitude: 0,
      longitude: 0,
      placeId: '',
    }
  ]);
  const profileDetails = useSelector((state: any) => state?.persistedReducer.userData.profileDetails);
  const accessToken = useSelector((state: any) => state?.persistedReducer.userData.userToken);
  const isLoading = useSelector((state: any) => state?.persistedReducer.jobListData.isLoading)
  const errorMessage = useSelector((state: any) => state.persistedReducer.jobListData.error);
  const jobDetails = useSelector((state: any) => state?.persistedReducer.jobListData.jobDetails);



  const tapOnBack = (data?: any) => {
    if (selectedTab == 1) {

      setDropOffLocations([{
        location: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zip_code: '',
        pickUpItems: [],
        dropOffItems: [{
          item: "",
          count: 0,
        }],
        note: '',
        findAddress: true,
        latitude: 0,
        longitude: 0,
        placeId: '',
      }])

    }
    setSelectedTab(prev => prev - 1)
  }

  // useEffect(() => {
  //   const getVehicleList = async () => {
  //     await dispatch(vehichleListAction(accessToken))

  //   }

  //   getVehicleList()
  // }, [])

  const navigateToThirdForm = (data: any) => {
    if (data) {
      setDropOffLocations(data)
    }
    setSelectedTab(prev => prev + 1)

  }


  const navigateToSecondForm = (data: any, pickupLocations: any) => {
    if (data) {
      setTransformedArray(data);
      setPickupLocations(pickupLocations)
    }
    setSelectedTab(prev => prev + 1)

  }


  const renderData = () => {
    switch (selectedTab) {
      case 1:
        return <Form2
          tapOnNext={(data: any) => navigateToThirdForm(data)}
          transformedArray={transformedArray}
          dropOffLocationsArray={dropOffLocations}
          setTansformedArray={(data: any) => setTransformedArray(data)}
          navigation={navigation}
          pickupLocations={pickupLocations}
      

        />
      case 2:
        return <Form3
          tapOnSubmit={(myFormData: any) => tapOnSubmit(myFormData)}
          navigation={navigation}
          route={route}
          pickupLocations={pickupLocations}
          dropOffLocations={dropOffLocations}

        />
      default:
        return <Form1
          tapOnNext={(data: any, pickupLocations: any) => navigateToSecondForm(data, pickupLocations)}
          pickupLocationsArray={pickupLocations}
          navigation={navigation}

        />

    }

  }


  useEffect(() => {
    if (!isLoading && jobDetails?.data !== null) {
      emptyPickUpLocations()
      setShowValidationModal(true)
      setAlertTitle(StringConstants.JOB_CREATED_SUCCESSFULLY)
    }

    return () => { dispatch(clearJobsResponse('jobDetails')) }
  }, [jobDetails])

  useEffect(() => {
    if (errorMessage !== null && !isLoading) {
      setShowValidationModal(true)
      setAlertTitle(errorMessage)
      dispatch(clearJobsResponse('error'))
    } else if (errorMessage == null) {
      setShowValidationModal(false)
      setAlertTitle('')
    }

    return () => { dispatch(clearJobsResponse('error')) }
  }, [errorMessage])

  const tapOnSubmit = (myFormData: any) => {
    console.log("myFormData", JSON.stringify(myFormData));

    dispatch(createdJobAction(myFormData, accessToken))

  }

  const emptyPickUpLocations = () => {

    setPickupLocations([
      {
        location: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zip_code: '',
        pickUpItems: [{
          item: "",
          count: 0
        }],
        dropOffItems: [],
        note: '',
        findAddress: true,
        latitude: 0,
        longitude: 0,
        placeId: '',
      }
    ])
    setDropOffLocations([
      {
        location: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zip_code: '',
        pickUpItems: [],
        dropOffItems: [{
          item: "",
          count: 0
        }],
        note: '',
        findAddress: true,
        latitude: 0,
        longitude: 0,
        placeId: '',
      }
    ])
    setSelectedTab(0)
  }

  return (
    <View style={styles.rootContainer}>
      {showValidationModal &&
        <ValidationModal
          showModal={showValidationModal}
          hideModal={() => {
            if (alertTitle == StringConstants.JOB_CREATED_SUCCESSFULLY) {
              setShowValidationModal(false)
              setAlertTitle('')

              setTimeout(() => {
                dispatch(clearJobsResponse('jobDetails'))
                navigation.navigate(AppConstants.screens.HOME_SCREEN, { isOutTab: true })
              }, 200);
            } else {
              setShowValidationModal(false)
              setAlertTitle('')
              dispatch(clearJobsResponse('error'))
            }

          }}
          title={alertTitle}
        />
      }
        {isLoading && <LoaderModal showModal={isLoading} />}
      <View style={[{
        flexDirection: 'row',
        marginLeft: 25,
        marginTop: 30,
        alignItems: 'center',
        marginBottom: 20
      }, selectedTab !== 0 && {
        marginLeft: 5,

      }]}>
        {selectedTab !== 0 &&
          <TouchableOpacity onPress={tapOnBack} style={styles.touchBack}>
            <Image source={Images.IC_ARROW_BACK} />
          </TouchableOpacity>
        }
        <View>

          <Text style={styles.welcomeText}>{StringConstants.WELCOME}</Text>
          <Text style={styles.userName}>{capitalizeFirstLetter(profileDetails?.full_name)}</Text>
        </View>
      </View>

      <CreateJobStatusHeader
        selectedTab={selectedTab}
      />

      {renderData()}

    </View>
  )
}

