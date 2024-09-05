import React, { FC } from "react"
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { Fonts } from "../Theme/Fonts"
import { DimensionsValue } from "../Theme/DimensionsValue"
import { Colors } from "../Theme/Colors"
import { useToast } from "react-native-toast-notifications"
import { Images } from "../Assets"
import { StringConstants } from "../Theme/StringConstants"

interface JobDetailsInterface {
    data: any;
    title: any;
    showItemDetails?: boolean
}

const JobDetailsList: FC<JobDetailsInterface> = ({ data, title, showItemDetails }) => {
    // console.log('data in job details list', data);
    const toast = useToast()
    const tapOnLocationInfo = (item: any) => {
        toast.show(item?.note, {
            placement: "bottom",
            duration: 1000,
            animationType: "slide-in",
            type: 'warning',
        })
    }
    return (
        <View style={styles.detailsView}>
            <View style={styles.topView}>
                <Text style={styles.detailText}>{title}</Text>
            </View>
            {data?.map((item: any, index: number) => {                
        
                return (
                    <View key={index} style={[styles.detailsRow, index % 2 == 1 && { backgroundColor: Colors.LIGHT_GREY, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }]}>
                        <Text style={styles.textsOfDetails}>{item.title}</Text>
                        {showItemDetails ?

                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                                {index == 0
                                    ?
                                    <Text style={[styles.itemValues]}>{data[0].value}</Text> //ITEM_WEIGHT
                                    :
                                    item.value !== undefined && <Text style={styles.itemValues}>
                                        {item.value}
                                    </Text>}

                                {item?.showIcon &&
                                    <Pressable style={styles.iIconView}
                                        onPress={() => tapOnLocationInfo(item)}>
                                        <Image source={Images.IC_I_ICON} style={styles.iIconImage} />
                                    </Pressable>}
                            </View>
                            :
                            <Text style={[styles.textsOfDetails, { flex: 0.75 }]}>{item.value}</Text>
                        }
                    </View>
                )
            })}
        </View>
    )
}

export default JobDetailsList;

const styles = StyleSheet.create({
    detailsView: {
        width: DimensionsValue.VALUE_348,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 25,
        borderColor: Colors.LIGHT_GREY,
        borderWidth: .5,
    },
    topView: {
        height: 36,
        backgroundColor: Colors.ORANGE,
        justifyContent: 'center',
        paddingLeft: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    detailText: {
        color: Colors.WHITE,
        fontSize: 16,
        fontFamily: Fonts.DM_SANS_BOLD
    },
    textsOfDetails: {
        fontSize: 14,
        fontFamily: Fonts.DM_SANS_REGULAR,
        color: Colors.BLACK_3,
        flex: 1,
        alignSelf: 'center'
    },
    detailsRow: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingTop: 8,
        paddingBottom: 12,
    },
    itemValues: {
        flex: 0.7,
        alignSelf: 'center',
        fontSize: 14,
        fontFamily: Fonts.DM_SANS_REGULAR,
        color: Colors.BLACK_3,
        paddingRight: 7
    },
    notesStyles: {
        backgroundColor: Colors.LIGHT_GREY3,
        borderWidth: 0,
    },
    iIconView: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        paddingVertical: 10,
    },
    iIconImage: {
        height: 15,
        width: 15,
        paddingLeft: 10
    }
})