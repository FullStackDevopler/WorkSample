import { View, Text, Image, Keyboard, Linking, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import { Images } from '../../Assets';
import { StringConstants } from '../../Theme/StringConstants';
import Header from '../../Components/Header';
import { Colors } from '../../Theme/Colors';
import Button from '../../Components/Button';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import UploadDocuments from '../../Components/UploadDocuments';
import ReasonModal from '../../Modals/ReasonModal';
import { useToast } from 'react-native-toast-notifications';
import { useDispatch, useSelector } from 'react-redux';
import { emojiRegex } from '../../Theme/validation';
import { cancelJobAction } from '../../Redux/Actions/jobActions';
import LoaderModal from '../../Modals/LoaderModal';
import ValidationModal from '../../Modals/ValidationModal';
import { clearJobsResponse } from '../../Redux/Reducers/jobListSlice';
import moment from 'moment';
import { capitalizeFirstLetter, numberWithCommas } from '../../Theme/Helper';
import JobDetailsList from '../../Components/JobDetailsList';

export default function UnAssignedJobDetails({ navigation, route }: any): React.JSX.Element {
    const toast = useToast()
    const dispatch = useDispatch()

    const [showReasonModal, setShowReasonModal] = useState<boolean>(false)
    const [reason, setReason] = useState<any>()
    const [showValidationModal, setShowValidationModal] = useState<boolean>(false)
    const [alertTitle, setAlertTitle] = useState<string>('')

    const accessToken = useSelector((state: any) => state?.persistedReducer.userData.userToken);
    const isLoading = useSelector((state: any) => state?.persistedReducer.jobListData.isLoading)
    const errorMessage = useSelector((state: any) => state.persistedReducer.jobListData.error);
    const cancelJob = useSelector((state: any) => state.persistedReducer.jobListData.cancelJob);
    const profileDetails = useSelector((state: any) => state?.persistedReducer.userData.profileDetails);


    const { item } = route?.params
    // console.log('item from paraams in UnAssignedJobDetails==>', item);

    useEffect(() => {
        if (!isLoading && cancelJob?.deleteId) {
            setShowReasonModal(false)
            setTimeout(() => {
                setShowValidationModal(true)
                setAlertTitle(StringConstants.JOB_CANCELLED_SUCCESSFULLY)
            }, 100);
        }
    }, [cancelJob])


    useEffect(() => {

        if (errorMessage != null && !isLoading) {
            setShowReasonModal(false)
            setShowValidationModal(true)
            setAlertTitle(`${errorMessage}`)

        } else if (errorMessage == null) {
            setShowReasonModal(false)
            setShowValidationModal(false)
            setAlertTitle('')
        }
    }, [errorMessage])


    const tapOnButton = () => {
        setShowReasonModal(true)
    }

    const getJobDetails = () => {
        return [
            { title: StringConstants.VEHICLE, value: capitalizeFirstLetter(item?.vehicle) },
            { title: StringConstants.PHONE_NUMBER, value: item?.contactNumber },
            { title: StringConstants.DELIVERY_DATE, value: moment(item?.dates, 'YYYY-MM-DD').format('D MMM YYYY') },
            { title: StringConstants.PRICE, value: '£' + numberWithCommas(item?.amount) },
            { title: StringConstants.TIME, value: item?.time_slot == 'ASAP' ? 'ASAP' : item?.start_time },
            { title: StringConstants.WEIGHT, value: item?.weight + ' kg' },
        ]
    }


    const tapOnCancelJob = () => {
        if (reason == undefined) {
            toast.show(StringConstants.PLEASE_ENTER_REASON, {
                placement: "top",
                duration: 1000,
                animationType: "slide-in",
            });
        }
        else if (emojiRegex.test(reason)) {
            toast.show(StringConstants.EMOJI_IS_NOT_ALLOWED_IN_THIS_FIELD, {
                placement: "top",
                duration: 1000,
                animationType: "slide-in",
            });
        }
        else {
            dispatch(cancelJobAction(accessToken, reason, item?._id, profileDetails?.full_name))
        }
    }

    const openPdf = (docUrl: string) => {

        Linking.openURL(docUrl)
            .then(supported => {
                if (!supported) {
                    console.log('Opening PDF link in browser is not supported');
                }
            })
            .catch((error) => console.log('Error opening PDF link in JobdetailsUnassigned:', error));

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

        return locationArray;

    }

    return (
        <View style={styles.rootContainer}>


            {showReasonModal &&
                <ReasonModal
                    showModal={showReasonModal}
                    hideModal={() => setShowReasonModal(false)}
                    tapOnCancelJob={tapOnCancelJob}
                    reason={reason}
                    setReason={setReason}
                />
            }

            {isLoading &&
                <LoaderModal showModal={isLoading} />
            }
            {showValidationModal &&
                <ValidationModal
                    showModal={showValidationModal}
                    hideModal={() => {
                        if (alertTitle == StringConstants.JOB_CANCELLED_SUCCESSFULLY) {
                            dispatch(clearJobsResponse('cancelJob'));
                            setShowValidationModal(false)
                            setAlertTitle('')
                            navigation.goBack()
                        } else {
                            setShowValidationModal(false)
                            setAlertTitle('')
                            dispatch(clearJobsResponse('error'));
                        }

                    }}
                    title={alertTitle}
                />
            }

            <Header tapOnBack={() => navigation.goBack()}
                headerText={StringConstants.JOB_DETAIL}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                <View style={{ flexDirection: 'row' }}>
                    <Image source={Images.IC_PICKER} style={styles.profileImage} />
                    <Text style={styles.driverName}>{StringConstants.SEARCHING_DRIVER_NEAR_BY}</Text>
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

                {item?.note && <View>
                    <View style={[styles.detailsView, {marginBottom: 5, marginTop: 25 }]}>
                        <View style={styles.topView}>
                            <Text style={styles.detailText}>{StringConstants.NOTES}</Text>
                        </View>
                    </View>
                    <ScrollView nestedScrollEnabled style={styles.notesView} >
                        <Text style={styles.textNotes}>{item?.note}</Text>
                    </ScrollView>
                </View>}

                <Button primaryTitle={StringConstants.CANCEL_JOB}
                    containerStyles={{ backgroundColor: Colors.ORANGE, height: 43 }}
                    onPress={tapOnButton} />

            </KeyboardAwareScrollView>

        </View>
    )
}