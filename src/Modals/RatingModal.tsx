import React, { useState } from "react";
import { Image, KeyboardAvoidingView, Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors } from "../Theme/Colors";
import { Fonts } from "../Theme/Fonts";
import { StringConstants } from "../Theme/StringConstants";
import { Images } from "../Assets";
import TextField from "../Components/TextField";
import Button from "../Components/Button";


interface RatingModalProps {
    showModal: boolean;
    hideModal: () => void;
    onPress: () => void
    comment: string;
    setComment: any;
    rating : number;
    setRating : any
}

const RatingModal: React.FC<RatingModalProps> = ({
    showModal,
    hideModal,
    onPress,
    comment,
    setComment,
    rating,
    setRating
}) => {

    const tapOnStar = (value: number) => {
        console.log('valuee==>>>', value);
        
        setRating(value);
    };

    return (
        <Modal transparent={true} animationType="fade" visible={showModal}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <TouchableOpacity
                    style={styles.viewModalContainer}
                    onPress={hideModal}>

                    <TouchableOpacity activeOpacity={1} style={styles.modalView}>
                        <TouchableOpacity onPress={hideModal} style={styles.crossIconView}>
                            <Image source={Images.IC_CROSS} style={styles.crossIcon} />
                        </TouchableOpacity>
                        <Text style={styles.ratingReviewText}>{StringConstants.REVIEW_AND_RATING}</Text>
                        <View style={{ flexDirection: 'row',alignSelf:'center' }}>
                            {[1, 2, 3, 4, 5].map((value: number) => (
                                <TouchableOpacity key={value} onPress={() => tapOnStar(value)}>
                                    <Image source={(value <= rating) ? Images.IC_STAR : Images.IC_STAR_GREY} style={styles.starIcon} />
                                </TouchableOpacity>
                            ))}

                        </View>

                        <TextField
                            containerStyle={styles.containerStyles}
                            placeholder={StringConstants.COMMENT_HERE}
                            placeholderTextColor={Colors.BUTTON_GREY}
                            customHeight={150}
                            multiline
                            customStyles={{ paddingTop: 13 }}
                            value={comment}
                            onChangeText={(val) => setComment(val) }
                            onSubmitEditing={() => { }}
                        />
                        <Button primaryTitle={StringConstants.SUBMIT} onPress={onPress}
                            containerStyles={{ backgroundColor: Colors.ORANGE, height: 38 }}
                        />
                    </TouchableOpacity>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </Modal>
    )
}


const styles = StyleSheet.create({
    viewModalContainer: {
        flex: 1,
        backgroundColor: '#00000040',
        justifyContent: 'flex-end'

    },
    modalView: {
        width: '100%',
        paddingTop: 35,
        paddingBottom: Platform.OS == 'android' ? 0 : 30,
        backgroundColor: Colors.WHITE,
        borderTopLeftRadius: 22,
        borderTopRightRadius: 22
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
    // starIcon: {
    //     height: 44,
    //     width: 284,
    //     alignSelf: 'center',
    //     marginBottom: 20
    // },
    starIcon: {
        height: 25,
        width: 25,
        marginHorizontal: 5,
        marginBottom: 20,
        // alignSelf: 'center',
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
export default RatingModal