import React, { FC } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    View,
} from 'react-native';
import { Colors } from '../Theme/Colors';
import { Fonts } from '../Theme/Fonts';
import { StringConstants } from '../Theme/StringConstants';

interface AccountsItemProps {
    buttonText: string,
    sourceIcon: any,
    tapOnLogout: () => void;
    tapOnDeleteAccount: () => void;
    item: any;
    index: number
    navigation: any;
    tapOnItem: () => void;
}

const AccountsItem: FC<AccountsItemProps> = ({
    buttonText,
    sourceIcon,
    tapOnLogout,
    tapOnDeleteAccount,
    item,
    index,
    navigation,
    tapOnItem
}) => {

    // const tapOnItem = (item: any) => {
    //     console.log('buttonText:', item);

    //     if (item.title == StringConstants.LOGOUT) {
    //         tapOnLogout()
    //     } else if (item.title == StringConstants.DELETE_ACCOUNT) {
    //         tapOnDeleteAccount()
    //     } else {
    //         console.log("item.screenname", item);
    //         if (item.url != undefined) {
    //             console.log("url", item.url);
    //             navigation.navigate(item.screenName, {
    //                 url: item.url,
    //                 title: item.title
    //             })
    //         } else navigation.navigate(item.screenName)
    //     }
    // }
    return (
        <TouchableOpacity style={{
            padding: 15
        }} onPress={tapOnItem}>
            <View style={{ flexDirection: 'row' }}>
                <Image source={sourceIcon} style={styles.icon} />
                <Text style={styles.buttonText}>{buttonText}</Text>
            </View>
            <View style={styles.horizontalLine} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    horizontalLine: {
        height: 1,
        width: '90%',
        backgroundColor: Colors.LIGHT_GREY,
        alignSelf: 'center',
        position: 'absolute',
        zIndex: 999,
        bottom: 0
   
    },
    icon: {
        height: 18,
        width: 18,
        alignSelf: 'center',
        marginLeft: 27
    },
    buttonText: {
        fontSize: 15,
        fontFamily: Fonts.DM_SANS_REGULAR,
        marginLeft: 10,
        color: Colors.BLACK
    }

});

export default AccountsItem;
