import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import HotshotData from '../../Components/HotshotData'
import { Images } from '../../Assets';
import { AppConstants } from '../../Theme/AppConstants';
import { StringConstants } from '../../Theme/StringConstants';
import Button from '../../Components/Button';
import { Colors } from '../../Theme/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { getHotshotListAction, getPastHotshotListAction } from '../../Redux/Actions/hotshotActions';
import ValidationModal from '../../Modals/ValidationModal';
import LoaderModal from '../../Modals/LoaderModal';
import { clearHotshotResponse } from '../../Redux/Reducers/hotshotSlice';
import { useFocusEffect } from '@react-navigation/native';

const DATA = [
  {
    "_id": "6656f07cc434415afe022974",
    "hiredBy": null,
    "createdBy": "664db7227cf13235c376f778",
    "isPaid": false,
    "hotsot_code": "#HT75094",
    "pickup_location": "Hinckley, UK",
    "pickup_address_1": "",
    "pickup_address_2": "",
    "pickup_city": "",
    "pickup_state": "",
    "pickup_zip": "",
    "dopoff_location": "20 Sherwood St, London W1F 7ED, UK",
    "dopoff_address_1": "",
    "dopoff_address_2": "",
    "dopoff_city": "",
    "dopoff_state": "",
    "dopoff_zip": "",
    "totalDistance": null,
    "totalTime": null,
    "time": "2:38 PM",
    "vehicle": "Luton Van",
    "distanceType": null,
    "isHired": false,
    "createrType": "driver",
    "is_active": true,
    "is_finished": true,
    "is_canceled": false,
    "phone_number": "9464646944",
    "amount": "99",
    "finishedAt": null,
    "total_time": "2 hours 14 minutes",
    "total_distence": "158.2",
    "pick_up_latitude": "52.5454549",
    "pick_up_longitude": "-1.37667",
    "drop_off_latitude": "51.5105561",
    "drop_off_longitude": "-0.1355974",
    "pickup_startTime": null,
    "pickup_estimateReachTime": null,
    "pickup_en_route": null,
    "dopoff_startTime": null,
    "dopoff_estimateReachTime": null,
    "dopoff_en_route": null,
    "createdAt": "2024-05-29T09:08:12.360Z",
    "__v": 0,
    "userHotSot": ['1213'],
    "users": [
      {
        "_id": "664db7227cf13235c376f778",
        "full_name": "james",
        "photo": "https://kindra-1.s3.amazonaws.com/1716372789034_Image_mobile_phone.png"
      }
    ]
  },
  {
    "_id": "665586bb25dc830ffa9a2678",
    "hiredBy": null,
    "createdBy": "664dbcef649d777afeb1551c",
    "hotsot_code": "#HT77753",
    "pickup_location": "Manchester M90 1QX, UK",
    "pickup_address_1": "",
    "pickup_address_2": "",
    "pickup_city": "",
    "pickup_state": "",
    "pickup_zip": "",
    "dopoff_location": "Manchester M60 1AY, UK",
    "dopoff_address_1": "",
    "dopoff_address_2": "",
    "dopoff_city": "",
    "dopoff_state": "",
    "dopoff_zip": "",
    "totalDistance": null,
    "totalTime": null,
    "time": "12:54 PM",
    "vehicle": "12T Truck",
    "distanceType": null,
    "isHired": false,
    "createrType": "driver",
    "is_active": true,
    "is_finished": true,
    "is_canceled": false,
    "phone_number": "3538386868",
    "amount": "606",
    "finishedAt": null,
    "total_time": "32 minutes",
    "total_distence": "17.6",
    "pick_up_latitude": "53.3553569",
    "pick_up_longitude": "-2.277162",
    "drop_off_latitude": "53.4809634",
    "drop_off_longitude": "-2.2369427",
    "pickup_startTime": null,
    "pickup_estimateReachTime": null,
    "pickup_en_route": null,
    "dopoff_startTime": null,
    "dopoff_estimateReachTime": null,
    "dopoff_en_route": null,
    "createdAt": "2024-05-28T07:24:43.255Z",
    "__v": 0,
    "userHotSot": ['234'],
    "users": [
      {
        "_id": "664dbcef649d777afeb1551c",
        "full_name": "robin",
        "photo": "https://kindra-1.s3.amazonaws.com/1716370717697_earth_1920.jpg"
      }
    ]
  },
  {
    "_id": "665586bb25dc830ffa9a2678",
    "hiredBy": null,
    "createdBy": "664dbcef649d777afeb1551c",
    "hotsot_code": "#HT77753",
    "pickup_location": "20 Sherwood St, London W1F 7ED, UK",
    "pickup_address_1": "",
    "pickup_address_2": "",
    "pickup_city": "",
    "pickup_state": "",
    "pickup_zip": "",
    "dopoff_location": "London, UK",
    "dopoff_address_1": "",
    "dopoff_address_2": "",
    "dopoff_city": "",
    "dopoff_state": "",
    "dopoff_zip": "",
    "totalDistance": null,
    "totalTime": null,
    "time": "12:54 PM",
    "vehicle": "12T Truck",
    "distanceType": null,
    "isHired": false,
    "createrType": "driver",
    "is_active": true,
    "is_finished": true,
    "is_canceled": false,
    "phone_number": "3538386868",
    "amount": "100",
    "finishedAt": null,
    "total_time": "32 minutes",
    "total_distence": "17.6",
    "pick_up_latitude": "53.3553569",
    "pick_up_longitude": "-2.277162",
    "drop_off_latitude": "53.4809634",
    "drop_off_longitude": "-2.2369427",
    "pickup_startTime": null,
    "pickup_estimateReachTime": null,
    "pickup_en_route": null,
    "dopoff_startTime": null,
    "dopoff_estimateReachTime": null,
    "dopoff_en_route": null,
    "createdAt": "2024-05-28T07:24:43.255Z",
    "__v": 0,
    "userHotSot": ['234'],
    "users": [
      {
        "_id": "664dbcef649d777afeb1551c",
        "full_name": "robin",
        "photo": "https://kindra-1.s3.amazonaws.com/1716370717697_earth_1920.jpg"
      }
    ]
  }
]

export default function Hotshot({ navigation, route }: any): React.JSX.Element {
  const dispatch = useDispatch()
  const [showValidationModal, setShowValidationModal] = useState<boolean>(false)
  const [alertTitle, setAlertTitle] = useState<string>('')
  const [isNewHotshotTab, setIsNewHotshotTab] = useState<boolean>(true)

  const isLoading = useSelector((state: any) => state?.persistedReducer.hotshotListData.isLoading)
  const errorMessage = useSelector((state: any) => state.persistedReducer.hotshotListData.error);
  const accessToken = useSelector((state: any) => state?.persistedReducer.userData.userToken);
  const hotshotList = useSelector((state: any) => state.persistedReducer.hotshotListData.hotshotList);
  const pastHotshotList = useSelector((state: any) => state.persistedReducer.hotshotListData.pastHotshotList);
  // console.log('hotshotList in hosthots', JSON.stringify(hotshotList));
  // console.log('pastHotshotList in hosthots', JSON.stringify(pastHotshotList));


  useEffect(() => {
    if (route?.params?.addHotshot == true) {
      getHotshotList()
    }

  }, [route?.params])


  useFocusEffect(
    React.useCallback(() => {
      getHotshotList()
    }, [])
  );

  const getHotshotList = async () => {
    await dispatch(getHotshotListAction(accessToken))
  }

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
    if (isNewHotshotTab == false) {
      dispatch(getPastHotshotListAction(accessToken))
    } else {
      getHotshotList()
    }

  }, [isNewHotshotTab])


  const renderTabsData = () => {
    if (isNewHotshotTab == true) {
      return <View style={{ flex: 1 }}>
        {hotshotList && hotshotList.length > 0 ?
          <FlatList
            data={hotshotList}
            extraData={hotshotList}
            keyExtractor={(item, index) => `${index}`}
            bounces={false}
            renderItem={({ item, index }) => {
              const hotshotIndex = item?.userHotSot?.findIndex((userHotshot: any) => userHotshot.isAccept === true);


              return (
                <HotshotData item={item}
                  hiredUser={hotshotIndex > -1 ? true : false}
                  onPress={() => navigation.navigate(AppConstants.screens.JOB_DETAILS, { item })} />
              )
            }}
            ListFooterComponent={<View style={{ marginBottom: 20 }} />}
          />
          :
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.noDataFoundText}>{"No Hotshots available"}</Text>
          </View>}
      </View>
    }


    else {
      return <View style={{ flex: 1 }}>
        {pastHotshotList && pastHotshotList.length > 0 ?
          <FlatList
            data={pastHotshotList}
            extraData={pastHotshotList}
            keyExtractor={(item, index) => `${index}`}
            bounces={false}
            renderItem={({ item, index }) => {

              return (
                <HotshotData item={item}
                  onPress={() => navigation.navigate(AppConstants.screens.PAST_JOB_DETAILS, { item })} />
              )
            }}
            ListFooterComponent={<View style={{ marginBottom: 20 }} />}
          />
          :
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.noDataFoundText}>{"No Past Hotshots available"}</Text>
          </View>
        }
      </View>
    }
  }


  return (
    <View style={styles.rootContainer}>
      {showValidationModal &&
        <ValidationModal
          showModal={showValidationModal}
          hideModal={() => {
            setShowValidationModal(false)
            setAlertTitle('')
            dispatch(clearHotshotResponse('error'))
          }}
          title={alertTitle}
        />
      }
      {isLoading &&
        <LoaderModal showModal={isLoading} />
      }
      <Text style={styles.hotshotText}>{StringConstants.HOTSHOT}</Text>


      <TouchableOpacity style={styles.addContactButton}
        onPress={() => navigation.navigate(AppConstants.screens.ADD_HOTSHOT, { fromHotshot: true })}
      >
        <Image source={Images.IC_ADD} style={styles.plusIcon} />
        <Text style={styles.addContactText}>{StringConstants.ADD_HOTSHOT}</Text>
      </TouchableOpacity>

      <RenderTabs
        tapOnTab={(val: boolean) => setIsNewHotshotTab(val)}
        selectedTab={isNewHotshotTab}
      />



      <View style={{ flex: 1 }}>
        {renderTabsData()}
      </View>

      {/* {hotshotList && hotshotList?.length > 0 ? 
      <View >
        <TouchableOpacity style={styles.addContactButton}
          onPress={() => navigation.navigate(AppConstants.screens.ADD_HOTSHOT, { fromHotshot: true })}
        >
          <Image source={Images.IC_ADD} style={styles.plusIcon} />
          <Text style={styles.addContactText}>{StringConstants.ADD_HOTSHOT}</Text>
        </TouchableOpacity>

        <FlatList
          data={hotshotList}
          extraData={hotshotList}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item, index }) => {
            return (
              <HotshotData item={item}
                onPress={() => navigation.navigate(AppConstants.screens.JOB_DETAILS, { item })} />
            )
          }}
          ListFooterComponent={<View style={{ marginBottom: 150 }} />}
        />
      </View> :
        <View>
          <Image source={Images.IMG_NO_HOTSHOT} style={styles.image} />
          <Text style={styles.bottomText}>{StringConstants.NO_HOTSHOT}</Text>
          <Button primaryTitle={StringConstants.CREATE_NEW_HOTSHOT}
            containerStyles={{ backgroundColor: Colors.ORANGE, height: 45, width: 200 }}
            onPress={() => navigation.navigate(AppConstants.screens.ADD_HOTSHOT, { fromHotshot: true })}
          />
        </View>
      } */}

    </View>
  )
}




const RenderTabs = ({ tapOnTab, selectedTab }: any) => {
  return (
    <View>
      <View style={styles.mainWrapper}>
        <TouchableOpacity onPress={() => tapOnTab(true)}
          style={[styles.assignedButton, { backgroundColor: selectedTab ? Colors.ORANGE : Colors.COLOR_GREY3 }]} >
          <Text style={[styles.tabText, { color: selectedTab ? Colors.WHITE : Colors.PLACEHOLDER_TEXT }]}>{StringConstants.NEW_HOTSHOTS}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { tapOnTab(false) }}
          style={[styles.unassignedButton, { backgroundColor: !selectedTab ? Colors.ORANGE : Colors.COLOR_GREY3 }]}>
          <Text style={[styles.tabText, { color: !selectedTab ? Colors.WHITE : Colors.PLACEHOLDER_TEXT }]}>{StringConstants.PAST_HOTSHOTS}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

