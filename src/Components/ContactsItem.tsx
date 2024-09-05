import React, { FC, useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    View,
    Pressable,
} from 'react-native';
import { Colors } from '../Theme/Colors';
import { Images } from '../Assets';
import { Fonts } from '../Theme/Fonts';
import { StringConstants } from '../Theme/StringConstants';
import { capitalizeFirstLetter } from '../Theme/Helper';

interface ContactsItemProps {
    item?: any;
    tapOnEditContact?: () => void;
    tapOnDeleteContact?: () => void;
    isFromChooseContact?: boolean;
    setShowSubmitButton?: any;
    tapOnItem?: () => void;
    selectedContact?: boolean
}

const ContactsItem: FC<ContactsItemProps> = ({
    item,
    tapOnEditContact,
    tapOnDeleteContact,
    isFromChooseContact,
    tapOnItem,
    selectedContact,

}) => {

    const getAddress = () => {
        // console.log('item in getAddress', item);
        if (item?.location !== "") {
            return `${item?.location}`
        } else {
            return `${item?.addressLine1} ${item?.addressLine2} ${item?.city} ${item?.state} ${item?.zip_code}`
        }
    }
    return (
        <Pressable style={[styles.detailsView, { borderColor: selectedContact ? Colors.GREEN : Colors.LIGHT_GREY }]}
            onPress={isFromChooseContact ? tapOnItem : null}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15, marginTop: 13 }}>
                <Text style={styles.name}>{capitalizeFirstLetter(item?.name)}</Text>
                {isFromChooseContact === false &&
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={tapOnEditContact}>
                            <Image source={Images.IC_EDIT_CONTACT} style={[styles.editIcon, { marginRight: 10 }]} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={tapOnDeleteContact}>
                            <Image source={Images.IC_DELETE} style={styles.editIcon} />
                        </TouchableOpacity>
                    </View>}
                {selectedContact &&
                    <View>
                        <Image source={Images.IC_TICK} style={styles.editIcon} />
                    </View>
                }
            </View>
            <View style={[styles.horizontalLine, { backgroundColor: selectedContact ? Colors.GREEN : Colors.LIGHT_GREY }]} />
            <Text style={styles.addressText}>{StringConstants.ADDRESS2}</Text>
            <Text style={styles.addressOfContact}>{getAddress()}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    detailsView: {
        width: '90%',
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 15,
        borderColor: Colors.LIGHT_GREY,
        borderWidth: .5
    },
    name: {
        fontSize: 16,
        fontFamily: Fonts.DM_SANS_MEDIUM,
        color: Colors.BLACK,
        width: '80%'
    },
    editIcon: {
        height: 20,
        width: 20
    },
    horizontalLine: {
        height: 1,
        width: '95%',
        backgroundColor: Colors.LIGHT_GREY,
        alignSelf: 'center',
        marginTop: 12
    },
    addressText: {
        fontSize: 14,
        fontFamily: Fonts.DM_SANS_MEDIUM,
        marginLeft: 15,
        marginTop: 5,
        marginBottom: 5,
        color: Colors.BLACK
    },
    addressOfContact: {
        fontSize: 14,
        fontFamily: Fonts.DM_SANS_REGULAR,
        marginLeft: 15,
        marginRight: 60,
        marginBottom: 24,
        color: Colors.BLACK
    }

});

export default ContactsItem;
