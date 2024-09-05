import React, { useState } from "react";
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, Keyboard, Platform } from 'react-native'
import { Colors } from "../Theme/Colors";
import { Fonts } from "../Theme/Fonts";
import { StringConstants } from "../Theme/StringConstants";
import { Images } from "../Assets";
import Button from "../Components/Button";
import { DimensionsValue } from "../Theme/DimensionsValue";
import DatePicker from "react-native-date-picker";
import { useToast } from "react-native-toast-notifications";

interface FilterModalProps {
    showModal: boolean;
    hideModal: () => void;
    onPress: (startDate: string, endDate: string) => void
}

const FilterModal: React.FC<FilterModalProps> = ({
    showModal,
    hideModal,
    onPress,
}) => {
    const toast = useToast()
    const [showStartTimePicker, setShowStartTimePicker] = useState<any>(null)
    const [showEndTimePicker, setShowEndTimePicker] = useState<any>(null)
    const [startDate, setStartDate] = useState<any>(null)
    const [endDate, setEndDate] = useState<any>(null)

    const tapOnSearch = ()=>{
        if(!startDate){
            toast.show("Please select the start date", {
                placement: "top",
                duration: 1000,
                animationType: "slide-in",
                type: 'warning',
            }); 
        } else if(!endDate) {
            toast.show("Please select the end date", {
                placement: "top",
                duration: 1000,
                animationType: "slide-in",
                type: 'warning',
            }); 
        } else {
            onPress(startDate, endDate)
        }
    }

    return (
        <Modal transparent={true} animationType="fade" visible={showModal}>
            {showStartTimePicker &&
                <DatePicker
                    modal
                    open={showStartTimePicker}
                    date={startDate || new Date()}
                    onCancel={() => setShowStartTimePicker(false)}
                    onConfirm={(item) => {
                        console.log('item in start time:', item);
                        setStartDate(item)
                        setShowStartTimePicker(false);
                    }}
                    mode='date'
                />
            }

            {showEndTimePicker &&
                <DatePicker
                    modal
                    open={showEndTimePicker}
                    date={endDate || new Date()}
                    onCancel={() => setShowEndTimePicker(false)}
                    onConfirm={(item) => {
                        if (startDate && item < startDate) {
                            toast.show("End date cannot be smaller than the start date", {
                                placement: "top",
                                duration: 2000,
                                animationType: "slide-in",
                                type: 'warning',
                            });
                        } else {
                            setEndDate(item);
                        }
                        setShowEndTimePicker(false);
                    }}
                    // onConfirm={(item) => {
                    //     setEndDate(item)
                    //     setShowEndTimePicker(false);
                    // }}
                    mode='date'
                />
            }
            <TouchableOpacity
                style={styles.viewModalContainer}
                onPress={hideModal}>

                <TouchableOpacity activeOpacity={1} style={styles.modalView}>
                    <TouchableOpacity onPress={hideModal} style={styles.crossIconView}>
                        <Image source={Images.IC_CROSS} style={styles.crossIcon} />
                    </TouchableOpacity>
                    <Text style={styles.ratingReviewText}>{StringConstants.FILTER}</Text>

                    <TouchableOpacity style={[styles.locationButtonView, { marginBottom: 18 }]} onPress={() => setShowStartTimePicker(true)}>
                        <Image source={Images.IC_CALENDER} style={styles.locationIcon} />
                        <Text style={styles.selectLocation}>  {startDate
                            ? new Date(startDate).toLocaleDateString('en-GB')
                            : StringConstants.START_DATE
                        }</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.locationButtonView} onPress={() => setShowEndTimePicker(true)}>
                        <Image source={Images.IC_CALENDER} style={styles.locationIcon} />
                        <Text style={[styles.selectLocation, {paddingLeft: 7}]}>{endDate
                            ? new Date(endDate).toLocaleDateString('en-GB')
                            : StringConstants.END_DATE
                        }</Text>
                    </TouchableOpacity>

                    <Button primaryTitle={StringConstants.SEARCH} onPress={tapOnSearch}
                        containerStyles={{ backgroundColor: Colors.ORANGE, height: 40 }}
                    />
                </TouchableOpacity>
            </TouchableOpacity>

        </Modal>
    )
}


const styles = StyleSheet.create({
    viewModalContainer: {
        flex: 1,
        backgroundColor: '#00000040',
        justifyContent: 'flex-end',
    },
    modalView: {
        width: '100%',
        paddingVertical: 35,
        backgroundColor: Colors.WHITE,
        // borderRadius: 22,
        borderTopEndRadius: 22,
        borderTopLeftRadius: 22,
        alignSelf: 'center'
    },
    locationIcon: {
        height: 20,
        width: 20,
        alignSelf: 'center',
        marginLeft: 20,
    },
    selectLocation: {
        fontSize: 14.5,
        fontFamily: Fonts.DM_SANS_REGULAR,
        alignSelf: 'center',
        marginLeft: 12,
        color: Colors.BUTTON_GREY,
    },
    locationButtonView: {
        flexDirection: 'row',
        backgroundColor: Colors.LIGHT_GREY3,
        height: 45,
        width: DimensionsValue.VALUE_346,
        alignSelf: 'center',
        borderRadius: 25
    },
    crossIconView: {
        alignSelf: 'flex-end',
        marginTop: -30,
        marginRight: 15,
        padding: 10,
    },
    crossIcon: {
        height: 20,
        width: 20
    },
    textLogout: {
        fontSize: 14,
        fontFamily: Fonts.DM_SANS_REGULAR,
        color: Colors.BLACK,
        marginBottom: 7,
        textAlign: 'center'

    },
    ratingReviewText: {
        fontSize: 18,
        lineHeight: 26,
        fontFamily: Fonts.DM_SANS_SEMIBOLD,
        color: Colors.BLACK,
        marginBottom: 20,
        textAlign: 'center',
        marginHorizontal: 50

    },
    starIcon: {
        height: 44,
        width: 284,
        alignSelf: 'center',
        marginBottom: 20
    },
    containerStyles: {
        backgroundColor: Colors.LIGHT_GREY3,
        borderWidth: 0,
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    touchButtonCancel: {
        height: 38,
        width: 140,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.BUTTON_GREY,
        borderRadius: 20,

    },
    textCancel: {
        fontFamily: Fonts.DM_SANS_REGULAR,
        fontSize: 14,
        color: Colors.WHITE
    },
    touchButtonSubmit: {
        height: 38,
        width: 140,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.ORANGE,
        borderRadius: 20,
    },
    textLogoutButton: {
        fontFamily: Fonts.DM_SANS_REGULAR,
        fontSize: 14,
        color: Colors.WHITE
    },

})
export default FilterModal