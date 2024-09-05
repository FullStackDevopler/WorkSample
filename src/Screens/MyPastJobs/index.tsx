import { View, Text, Image, Pressable, Keyboard, Linking, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import { Images } from '../../Assets';
import { StringConstants } from '../../Theme/StringConstants';
import Header from '../../Components/Header';
import { Colors } from '../../Theme/Colors';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import UploadDocuments from '../../Components/UploadDocuments';
import { useToast } from 'react-native-toast-notifications';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getRatingAction } from '../../Redux/Actions/jobActions';
import { clearJobsResponse } from '../../Redux/Reducers/jobListSlice';
import ValidationModal from '../../Modals/ValidationModal';
import { capitalizeFirstLetter, numberWithCommas } from '../../Theme/Helper';
import { AppConstants } from '../../Theme/AppConstants';
import JobDetailsList from '../../Components/JobDetailsList';
import { DimensionsValue } from '../../Theme/DimensionsValue';
import ImageModal from '../../Modals/ImageModal';
import { Fonts } from '../../Theme/Fonts';

export default function MyPastJobs({ navigation, route }: any): React.JSX.Element {
    const toast = useToast()
    const dispatch = useDispatch()
    const [showValidationModal, setShowValidationModal] = useState<boolean>(false)
    const [alertTitle, setAlertTitle] = useState<string>('')
    const [rating, setRating] = useState<any>()
    const [imageUrl, setImageUrl] = useState<any>()
    const [locationData, setLocationData] = useState<any[]>([])     // merged both pick and drop array to show the bottom route status
    const [showImageModal, setShowImageModal] = useState<boolean>(false)
    const [signature, setSignature] = useState<any>()
    const { item } = route?.params
    // console.log('item from paraams in MyPastJobs==>', item);

    const accessToken = useSelector((state: any) => state?.persistedReducer.userData.userToken);
    const isLoading = useSelector((state: any) => state?.persistedReducer.jobListData.isLoading)
    const errorMessage = useSelector((state: any) => state.persistedReducer.jobListData.error);
    const profileDetails = useSelector((state: any) => state?.persistedReducer.userData.profileDetails);
    const ratingData = useSelector((state: any) => state.persistedReducer.jobListData.ratingData);

    const signImageName = item?.signature?.split('/').pop();

    useEffect(() => {
        if (item?._id) {
            setLocationData([...item?.locations, ...item?.dropAddress])
        }
    }, [item])

    useEffect(() => {
        const getRating = async () => {
            await dispatch(getRatingAction(accessToken, profileDetails?.userId))
        }

        getRating()
    }, [])

    useEffect(() => {
        if (!isLoading && ratingData?.overAllRating) {
            const review = ratingData.ratingFind.find((job: any, index: number) => job?.job_id === item._id)

            if (review) {
                setRating(review)
            } else {
                setRating({})
            }


        }

        return () => { dispatch(clearJobsResponse('ratingData')) }
    }, [ratingData])

    useEffect(() => {
        if (errorMessage !== null && !isLoading) {
            setShowValidationModal(true)
            setAlertTitle(errorMessage)
        } else if (errorMessage == null) {
            setShowValidationModal(false)
            setAlertTitle('')
        }

        return () => { dispatch(clearJobsResponse('error')) }
    }, [errorMessage])

    const getJobDetails = () => {
        return [
            { title: StringConstants.VEHICLE, value: capitalizeFirstLetter(item?.vehicle) },
            { title: StringConstants.PHONE_NUMBER, value: item?.contactNumber },
            { title: StringConstants.DELIVERY_DATE, value: moment(item?.dates, 'YYYY-MM-DD').format('D MMM YYYY') },
            { title: StringConstants.PRICE, value: route?.params?.jobType == 'OutJobsPast' ?  '£' + numberWithCommas(item?.amount) :  '£' + numberWithCommas(item?.driver_amount) },
            { title: StringConstants.ADDITIONAL_AMOUNT, value: item?.additional_amount ? '£' + item?.additional_amount : '£' + 0 },
            { title: StringConstants.TIME, value: item?.time_slot == 'ASAP' ? 'ASAP' : item?.start_time },
            { title: StringConstants.WEIGHT, value: item?.weight ? item?.weight + ' kg' : "" },
        ]
    }


    // const tapOnIIcon = (index: number) => {

    //     item.locations.forEach((location: any, index2: number) => {
    //         if (location.collected && index === index2) {
    //             if (location.pickup_count !== null && location.drop_off_count === null) {
    //                 toast.show(`Collected courier`, {
    //                     placement: "bottom",
    //                     duration: 500,
    //                     animationType: "slide-in",
    //                 });
    //             }
    //             else if (location.pickup_count === null && location.drop_off_count !== null) {
    //                 toast.show(`Dropped off courier`, {
    //                     placement: "bottom",
    //                     duration: 500,
    //                     animationType: "slide-in",
    //                 });
    //             }
    //         }


    //     });
    // }

    const tapOnIIcon = (item: any, index: number) => {
        console.log("item in i icon->", item);

        if (item?.pickup) {
            toast.show(`Goods collected`, {
                placement: "bottom",
                duration: 500,
                animationType: "slide-in",
            });
        } else {
            toast.show(`Goods dropped off`, {
                placement: "bottom",
                duration: 500,
                animationType: "slide-in",
            });
        }


    }


    const openPdf = (docUrl: string) => {


        Linking.openURL(docUrl)
            .then(supported => {
                if (!supported) {
                    console.log('Opening PDF link in browser is not supported');
                }
            })
            .catch((error) => console.log('Error opening PDF link in MyPastJobs:', error));

    }

    const tapOnSignature = (url: any) => {
        let imageUri = url
        setImageUrl(imageUri)
        setShowImageModal(true)
    }

    const getStarRating = (rating: any) => {
        let stars = rating || 0
        console.log('stars rating', stars);

        switch (stars) {
            case 1:
                return Images.IC_ONE_STAR_RATING
            case 2:
                return Images.IC_TWO_STAR_RATING
            case 3:
                return Images.IC_THREE_STAR_RATING
            case 4:
                return Images.IC_FOUR_STAR_RATING
            case 5:
                return Images.IC_FIVE_STAR_RATING
            default:
                return Images.IC_ZERO_STAR_RATING;
        }
    }

    const getProfileImage = () => {
        if (route?.params?.jobType == 'OutJobsPast' || route.params.isFromNotification == true) {
            if (item?.assignedDriver?.photo !== null) {
                return { uri: item?.assignedDriver?.photo }
            } else {
                return Images.IC_PICKER
            }
        }
        else {
            if (item?.createdByUser?.photo !== null) {
                return { uri: item?.createdByUser?.photo }
            } else {
                return Images.IC_PICKER
            }
        }

    }

    const getUserName = () => {
        if (route?.params?.jobType == 'OutJobsPast' || route.params.isFromNotification == true) {
            return capitalizeFirstLetter(item?.assignedDriver?.full_name)
        }
        else {
            return capitalizeFirstLetter(item?.createdByUser?.full_name)
        }
    }

    const getPickUpData = () => {
        let locationArray = item?.locations
            .filter((item: any) => item?.pickup_count !== null)
            .map((item: any) => {
                let pickupDetails = '';
                for (let i = 0; i < item.pickup_count.length; i++) {
                    pickupDetails += `${item.pickup_count[i]} ${item.pickup[i]}`;
                    if (i !== item.pickup_count.length - 1) {
                        pickupDetails += ', ';
                    }
                }
                return {
                    title: item.pickup_count && item.location !== '' ? item.location : item.addressLine1 + ' ' + item.addressLine2 + ' ' + item.city + ' ' + item.state,
                    value: pickupDetails,
                    showIcon: item.pickup_count && (item.pick_drop_note ? true : false),
                    note: item.pickup_count && item.pick_drop_note
                };
            });

        // locationArray.unshift({
        //     title: StringConstants.ADDRESS,
        //     value: StringConstants.ITEM,
        // });

        return locationArray;
    }

    const getDropData = () => {

        let locationArray = item?.dropAddress
            .filter((item: any) => item.dropup_count !== null)
            .map((item: any) => {
                let dropupDetails = '';
                for (let i = 0; i < item.dropup_count.length; i++) {
                    dropupDetails += `${item.dropup_count[i]} ${item.dropup[i]}`;
                    if (i !== item.dropup_count.length - 1) {
                        dropupDetails += ', ';
                    }
                }
                return {
                    title: item.dropup_count && item.drop_off_location !== '' ? item.drop_off_location : item.addressLine1 + ' ' + item.addressLine2 + ' ' + item.city + ' ' + item.state,
                    value: dropupDetails,
                    showIcon: item.dropup_count && (item.pick_drop_note ? true : false),
                    note: item.dropup_count && item.pick_drop_note
                };
            });

        // locationArray.unshift({
        //     title: StringConstants.ADDRESS,
        //     value: StringConstants.ITEM,
        // },)


        // console.log("locationArray after edditing", locationArray);
        return locationArray;

    }


    const totalItems = (item: any) => {
        let combinedArray
        if (item.pickup) {
            combinedArray = item?.pickup.map((items: any, index: number) => `${item?.pickup_count[index]} ${items}`);
        } else {
            combinedArray = item?.dropup?.map((items: any, index: number) => `${item?.dropup_count[index]} ${items}`);
        }
        return combinedArray.join(", ");
    };


    const getAddress = (item: any) => {
        let currentLocationText
        const { addressLine1, addressLine2, city, state } = item
        if (item.pickup) {
            currentLocationText = item?.location ? item?.location : `${addressLine1} ${addressLine2} ${city} ${state}`
        } else {
            currentLocationText = item?.drop_off_location ? item?.drop_off_location : `${addressLine1} ${addressLine2} ${city} ${state}`
        }
        return currentLocationText
    }

    const tapOnViewSignature = (index: number) => {

        setShowImageModal(true)
        setSignature(locationData[index].signature)
    }

    const formattedDate =(date: any)=>{
        const dates = moment(date).format("hh:mm a DD/MM/YYYY")
        return dates
     }
console.log("route?.params?.jobType",route?.params?.jobType);


    return (
        <View style={styles.rootContainer}>
            {showValidationModal &&
                <ValidationModal
                    showModal={showValidationModal}
                    hideModal={() => {
                        setShowValidationModal(false)
                        setAlertTitle('')
                        dispatch(clearJobsResponse('error'))

                    }}
                    title={alertTitle}
                />
            }

            {showImageModal &&
                <ImageModal
                    image={signature}
                    showModal={showImageModal}
                    hideModal={() => {
                        setShowImageModal(false)
                        setSignature("")
                    }}
                />
            }
            <Header
                // tapOnBack={() => navigation.goBack()}
                tapOnBack={() => { navigation.navigate(AppConstants.screens.HOME_SCREEN) }}
                headerText={StringConstants.JOB_DETAIL}
            />


            {item?.isCancelled == true && <View>
                {route?.params?.jobType == 'myInPastJobs' ?
                    <Text style={styles.cancelledJobText}>This job has been cancelled</Text> :
                    <Text style={styles.cancelledJobText}>You have Cancelled the job</Text>
                }

                {item?.reason  &&
                    <ScrollView style={{ maxHeight: 100, marginHorizontal: DimensionsValue.VALUE_26 }}
                        showsVerticalScrollIndicator={false}>
                    
                         <Text style={{ alignSelf: 'center' }}>
                            <Text style={styles.reasonText}>{'Reason:'} </Text>
                            <Text style={styles.reasonForCancel}>{item?.reason}</Text>
                        </Text>
                    </ScrollView>
                }


                <View style={[styles.horizontalLine, { marginBottom: 15 }]} />
            </View>}


            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                {/* user details  */}
                <View style={{ flexDirection: 'row' }}>
                    <Image source={getProfileImage()} style={styles.profileImage} />
                    <Text style={styles.driverName}>{getUserName()}</Text>
                </View>
            </View>

            <View style={styles.horizontalLine} />

            <KeyboardAwareScrollView
                onScrollBeginDrag={() => Keyboard.dismiss()}
                showsVerticalScrollIndicator={false}
                bounces={false}
            >



                <JobDetailsList title={StringConstants.JOB_DETAIL} data={getJobDetails()} />
                <JobDetailsList title={StringConstants.PICKUP_INFORMATION} data={getPickUpData()} showItemDetails={true} />
                <JobDetailsList title={StringConstants.DROP_OFF_INFORMATION} data={getDropData()} showItemDetails={true} />


                <View>
                    {item?.document?.length > 0 &&
                        <View style={[styles.detailsView, { marginBottom: 5 }]}>
                            <View style={styles.topView}>
                                <Text style={styles.detailText}>
                                    {item?.document?.length == 1 ? StringConstants.DOCUMENT : StringConstants.DOCUMENTS}
                                </Text>
                            </View>
                        </View>}
                    {item?.document?.length > 0 && item?.document?.map((item: string, i: number) => {
                        const pdfName = item.split('/').pop();

                        return (
                            <UploadDocuments key={i}
                                topText={pdfName || 'document.pdf'}
                                bottomText={StringConstants.TAP_TO_VIEW_DOCUMENT}
                                uploaded={false}
                                onPress={() => {
                                    openPdf(item)
                                }}
                                uriAvaiable={false}
                            />
                        )
                    })}
                </View>


                {item?.signature &&
                    <View>
                        <View style={[styles.detailsView, { marginBottom: 5 }]}>
                            <View style={styles.topView}>
                                <Text style={styles.detailText}>{StringConstants.CUSTOMER_SIGNATURE}</Text>
                            </View>
                        </View>
                        <UploadDocuments
                            bottomText={'Tap to View the Signature'}
                            topText={signImageName || 'Signature.png'}
                            uploaded={false}
                            uriAvaiable={false}
                            onPress={() => {
                                tapOnSignature(item?.signature)
                            }}
                        />
                    </View>}

                    {item?.note && <View style={[styles.detailsView, { marginBottom: 5, marginTop: 25 }]}>
                        <View style={styles.topView}>
                            <Text style={styles.detailText}>{StringConstants.NOTES}</Text>
                        </View>
                    </View>}
                    
                    {item?.note && <ScrollView nestedScrollEnabled style={styles.notesView} >
                        <Text style={styles.textNotes}>{item?.note}</Text>
                    </ScrollView>}

                {item?.bill_notes &&
                    <View>
                        <View style={[styles.detailsView, { marginBottom: 5, marginTop: 25 }]}>
                            <View style={styles.topView}>
                                <Text style={styles.detailText}>{StringConstants.BILL_NOTES}</Text>
                            </View>
                        </View>
                        <ScrollView nestedScrollEnabled style={styles.notesView} >
                            <Text style={styles.textNotes}>{item?.bill_notes}</Text>

                        </ScrollView>
                    </View>}


                <View>
                    <Text style={[styles.routeStatusText, { marginBottom: 25 }]}>{StringConstants.ROUTE_STATUS}</Text>

                    <FlatList
                        data={locationData}
                        extraData={locationData}
                        keyExtractor={(_, index) => `${index}`}
                        renderItem={({ item, index }) => {
                            return (
                                <View key={index}>
                                    {index == 0 &&
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={styles.circleLineView}>
                                                <Image style={styles.circleLeftIcon}
                                                    source={item?.startTime ? Images.IC_GREEN_CIRCLE : Images.IC_GREY_CIRCLE}
                                                />
                                                <View style={styles.dottedLineView}>
                                                    <Image source={Images.IC_DOT_LINE} style={
                                                        { tintColor: item?.startTime ? Colors.GREEN : Colors.DARK_GREY, alignSelf: 'center' }} />
                                                </View>
                                            </View>

                                            <View style={{ flex: 1 }}>
                                                <Text style={[styles.textInsideBlack, { marginLeft: 5, color: item?.startTime ? Colors.GREEN : Colors.BLACK }]}>
                                                    {`Job Started at ${formattedDate(item?.startTime) || ''}`}
                                                </Text>
                                            </View>
                                        </View>
                                    }



                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={styles.circleLineView}>
                                            <Image style={styles.circleLeftIcon}
                                                source={item?.startTime ? Images.IC_GREEN_CIRCLE : Images.IC_GREY_CIRCLE}
                                            />
                                            <View style={styles.dottedLineView}>
                                                <Image source={Images.IC_DOT_LINE} style={[styles.verticalDotLine,
                                                { tintColor: item?.startTime ? Colors.GREEN : Colors.DARK_GREY }]} />
                                            </View>
                                        </View>

                                        <View style={{ flex: 1 }}>
                                            <Text style={[styles.textInsideBlack, { marginLeft: 5, color: item?.startTime ? Colors.GREEN : Colors.BLACK }]}>
                                                {`On Route to ${item.pickup ? 'Pickup' : 'Drop-Off'} location `}<Text style={{ fontFamily: Fonts.DM_SANS_SEMIBOLD }}> {getAddress(item)}</Text>
                                            </Text>
                                            <Text style={[styles.textAdress, { marginStart: 6 }]}>{item.startTime ? `At: ${formattedDate(item.startTime)}` : ""}</Text>
                                        </View>
                                    </View>





                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={styles.circleLineView}>
                                            <Image style={styles.circleLeftIcon}
                                                source={item.reached_at_location ? Images.IC_GREEN_CIRCLE : Images.IC_GREY_CIRCLE}
                                            />
                                            <View style={styles.dottedLineView}>
                                                <Image source={Images.IC_DOT_LINE} style={[styles.verticalDotLine,
                                                { tintColor: item.reached_at_location ? Colors.GREEN : Colors.DARK_GREY }]} />
                                            </View>
                                        </View>

                                        <View style={{ flex: 1 }}>
                                            <Text style={[styles.textInsideBlack, { marginLeft: 5, color: item.reached_at_location ? Colors.GREEN : Colors.BLACK }]}>
                                                {`Arrived at ${item.pickup ? 'Pickup' : 'Drop-off'} location`} <Text style={{ fontFamily: Fonts.DM_SANS_SEMIBOLD }}> {getAddress(item)}</Text>
                                            </Text>
                                            <Text style={[styles.textAdress, { marginStart: 6 }]}>{item.reachTime ? `At: ${formattedDate(item.reachTime)}` : item.estimateReachTime ? `ETA: ${item.estimateReachTime}` : ""}</Text>
                                        </View>
                                    </View>



                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={styles.circleLineView}>
                                            <Image style={styles.circleLeftIcon}
                                                source={item.collected || item.delivered_time ? Images.IC_GREEN_CIRCLE : Images.IC_GREY_CIRCLE}
                                            />
                                        </View>

                                        <View style={{ flex: 1 }}>
                                            <Text style={[styles.textInsideBlack, { marginLeft: 5, color: item.collected || item.delivered_time ? Colors.GREEN : Colors.BLACK }]}>
                                                {`Goods ${item.pickup ? 'Collected from' : 'Dropped at'} `}<Text style={{ fontFamily: Fonts.DM_SANS_SEMIBOLD }}>{getAddress(item)}</Text>
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                        <Text style={styles.itemsCount}>{totalItems(item)}</Text>
                                        <Pressable style={{ justifyContent: 'center' }} onPress={() => tapOnIIcon(item, index)}>
                                            <Image source={Images.IC_I_ICON} style={{ height: 20, width: 20 }} />
                                        </Pressable>
                                    </View>
                                    <Text style={[styles.textAdress, { marginStart: 45, marginTop: -2 }]}> {item.collectedTime ? `At: ${formattedDate(item.collectedTime)}` :  item.delivered_time ? `At: ${formattedDate(item.delivered_time)}` : ""}</Text>

                                    {item?.signature !== null &&
                                        <TouchableOpacity style={styles.viewSignature} onPress={() => tapOnViewSignature(index)}>
                                            <Text style={styles.viewSignatureText}>{StringConstants.VIEW_SIGNATURE}</Text>
                                        </TouchableOpacity>}

                                    <View style={[styles.horizontalBottomLine]} />
                                </View>
                            )

                        }}
                    />
                </View>

               

                <View style={styles.completedJobView}>
                    {item?.isCancelled == false &&
                        <Image source={Images.IC_GREEN_TICK} style={{ height: 18, width: 18 }} />}

                    <Text style={[styles.completedJobText, { color: item?.isCancelled == true ? Colors.RED : Colors.GREEN }]}>
                        {item?.isCancelled == true ? StringConstants.CANCELLED_JOB : StringConstants.COMPLETED_JOB}
                    </Text>
                </View>


                {route?.params?.jobType !== 'OutJobsPast' && item?.status !== "Cancelled" && rating?.review &&
                    <View>
                        <View style={[styles.detailsView, { marginBottom: 5, marginTop: 5 }]}>
                            <View style={styles.topView}>
                                <Text style={styles.detailText}>{'Rating & Reviews'}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 8 }}>
                            <Text style={styles.ratingText}>Rating ({rating?.review}):</Text>
                            <Image source={getStarRating(rating?.review)} style={styles.ratingIcon} />
                        </View>

                        <View>
                            <Text style={styles.reviewsText}>Reviews:</Text>
                            {rating?.comment &&
                                <ScrollView nestedScrollEnabled style={styles.notesView} >
                                    <Text style={styles.textNotes}>{rating?.comment}</Text>
                                </ScrollView>

                            }
                        </View>
                    </View>}

            </KeyboardAwareScrollView>

        </View>
    )
}