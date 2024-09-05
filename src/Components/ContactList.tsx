import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Images } from '../Assets';
import { ApiConstants } from '../Theme/ApiConstants';
import { Colors } from '../Theme/Colors';
import { Fonts } from '../Theme/Fonts';


interface ContactListProps {
    containerStyle?: any;
    tapOnItem: () => void;
    item: any;
    isSelected: boolean

}

const ContactList: React.FC<ContactListProps> = ({ containerStyle, tapOnItem, item, isSelected }) => {
 

    return (
        <TouchableOpacity
            style={[styles.rootContainer, containerStyle]}
            onPress={tapOnItem}
        >
            {(item?.thumbnailPath) ? (
                <Image source={{ uri: item?.thumbnailPath }} style={styles.imageUser} />
            ) :  (
                <Image source={Images.IC_PICKER} style={styles.imageUser} />
            )}

            <View style={{ flex: 1 }}>
                <View style={styles.viewDetail}>
                    <View style={{ marginBottom: 10, marginLeft: 10, alignSelf: 'center' }}>
                        <Text style={styles.textName}>{item?.givenName} {item?.familyName}</Text>
                        {(item?.phoneNumbers) 
                            ? <Text style={styles.textDescription}>{item?.phoneNumbers[0]?.number}</Text>
                            : (item?.phone_number) 
                            ? <Text style={styles.textDescription}>{item?.phone_number}</Text> 
                            : null
                        }
                    </View>
                    {isSelected == true && (
                        <Image
                            source={Images.IC_TICK}
                            style={styles.tickIcon}
                        />
                    )}
                </View>
                <View style={styles.bottomLine} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    rootContainer: {
        backgroundColor: Colors.WHITE,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginHorizontal: 15,
        paddingBottom: 15,
        paddingStart: 15,
    },
    imageUser: {
        height: 60,
        width: 60,
        borderRadius: 30,
    },
    viewDetail: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textName: {
        fontSize: 14,
        fontFamily: Fonts.DM_SANS_SEMIBOLD,
        color: Colors.BLACK,
        paddingStart: 10,
        marginBottom: 5,
    },
    textDescription: {
        fontSize: 12,
        fontFamily: Fonts.DM_SANS_REGULAR,
        color: Colors.COLOR_GREY2,
        paddingStart: 10,
    },
    bottomLine: {
        height: 0.5,
        backgroundColor: Colors.DARK_GREY,
    },
    tickIcon: { 
        alignSelf: 'center', 
        height: 18, 
        width: 18, 
        marginRight: 10 ,
        tintColor: Colors.ORANGE
    }
});

export default ContactList;
