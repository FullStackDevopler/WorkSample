import { View, Text, Image, Pressable, Keyboard, Alert, TouchableOpacity, Linking, Platform, ScrollView } from 'react-native'
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
import { ApiConstants } from '../../Theme/ApiConstants';
import TextField from '../../Components/TextField';
import { addWeights, capitalizeFirstLetter, numberWithCommas } from '../../Theme/Helper';
import { AppConstants } from '../../Theme/AppConstants';
import JobDetailsList from '../../Components/JobDetailsList';

export default function JobRequestDetails({ navigation, route }: any): React.JSX.Element {
    const { item } = route.params
    console.log('item from params in JobRequestDetails', JSON.stringify(item));
    const getJobDetails = () => {
        return [
            { title: StringConstants.VEHICLE, value: capitalizeFirstLetter(item?.vehicle) },
            // { title: StringConstants.PHONE_NUMBER, value: item?.contactNumber },
            { title: StringConstants.DELIVERY_DATE, value: moment(item?.dates, 'YYYY-MM-DD').format('D MMM YYYY') },
            { title: StringConstants.PRICE, value: '£' + numberWithCommas(item?.driver_amount) },
            { title: StringConstants.TIME, value: item?.time_slot == 'ASAP' ? 'ASAP' : item?.start_time },
            { title: StringConstants.WEIGHT, value: item?.weight + ' kg' },
        ]
    }




    const getSMSDivider = () => {
        return Platform.OS === "ios" ? "&" : "?";
    }

    const openPdf = (docUrl: string) => {

        // let pdfUri
        // pdfUri = ApiConstants.DOC_BASE_URL + docUrl

        Linking.openURL(docUrl)
            .then(supported => {
                if (!supported) {
                    console.log('Opening PDF link in browser is not supported');
                }
            })
            .catch((error) => console.log('Error opening PDF link in JobdetailsUnassigned:', error));

    }

    const getProfileImage = () => {
        if (item?.createdBy?.photo !== null) {
            return { uri: item?.createdBy?.photo }
        } else {
            return Images.IC_PICKER
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


        return locationArray;

    }




    return (
        <View style={styles.rootContainer}>
            <Header tapOnBack={() => navigation.navigate(AppConstants.screens.HOME_SCREEN)}
                headerText={StringConstants.JOB_DETAIL}
            />

            <View style={styles.topUserView}>
                {/* user details  */}
                <View style={styles.userImageName}>
                    <Image source={getProfileImage()} style={styles.profileImage} />
                    <Text style={styles.driverName}>{capitalizeFirstLetter(item?.createdBy?.full_name)}</Text>
                </View>
            </View>

            <View style={styles.horizontalLine} />

            <KeyboardAwareScrollView bounces={false}
                onScrollBeginDrag={() => Keyboard.dismiss()}
                showsVerticalScrollIndicator={false} >
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

                {/* {item?.note && <View style={{marginBottom: 25}}> */}
                {item?.note && <View style={[styles.detailsView, { marginBottom: 5, marginTop: 25 }]}>
                    <View style={styles.topView}>
                        <Text style={styles.detailText}>{StringConstants.NOTES}</Text>
                    </View>
                </View>}
                {item?.note && <ScrollView nestedScrollEnabled style={styles.notesView} >
                    <Text style={styles.textNotes}>{item?.note}</Text>
                </ScrollView>}
                {/* </View>} */}

              

            </KeyboardAwareScrollView>

        </View>
    )
}