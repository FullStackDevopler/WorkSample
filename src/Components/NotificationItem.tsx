import React, { FC } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    Pressable,
    TouchableHighlight,
} from 'react-native';
import { Colors } from '../Theme/Colors';
import { Images } from '../Assets';
import { Fonts } from '../Theme/Fonts';
import moment from 'moment';
import { capitalizeFirstLetter } from '../Theme/Helper';
import { ApiConstants } from '../Theme/ApiConstants';

interface NotificationItemProps {
    item: any,
    index: number,
    tapOnItem?: () => void;
}

const formatDate = (dateTimeString: any) => {
    const date = moment(dateTimeString);
    const today = moment().startOf('day');
    const yesterday = moment().subtract(1, 'days').startOf('day');

    if (date.isSame(today, 'day')) {
        return `Today at ${date.format('h:mm a')}`;
    } else if (date.isSame(yesterday, 'day')) {
        return `Yesterday at ${date.format('h:mm a')}`;
    } else {
        return `${date.format('MMM DD, YYYY')} at ${date.format('h:mm a')}`;
    }
};


const NotificationItem: FC<NotificationItemProps> = ({ item, index, tapOnItem }) => {
    // console.log("item in notificationitem",item);

    const getProfileImage = () => {
        if (item?.sendById?.photo !== null) {
            return { uri: item?.sendById?.photo }
        } else {
            return Images.IC_PICKER
        }
    }

    return (
        <TouchableHighlight underlayColor={Colors.LIGHT_GREY} style={styles.mainCard} onPress={tapOnItem}>
            <View>
                <View style={styles.notificationItem}>
                    {item.isRead == false &&
                        <View style={styles.unReadDot} />
                    }
                    <Image source={getProfileImage()} style={styles.profileImage} />
                    <Text style={styles.notificationMessage}><Text style={styles.notificationMessage}>{''}</Text><Text style={styles.textMessage}>{item.message}</Text>
                    </Text>
                </View>

                <Text style={styles.time}>{formatDate(item?.createdAt)}</Text>
                <View style={styles.horizontalLine} />
            </View>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    mainCard: {
        backgroundColor: 'white',
        marginHorizontal: 25
    },
    notificationItem: {
        flexDirection: 'row',
        marginTop: 20
    },
    profileImage: {
        height: 25,
        width: 25,
        borderRadius: 12.5
    },
    notificationMessage: {
        alignSelf: 'center',
        marginLeft: 10,
        marginRight: 20,
        fontFamily: Fonts.DM_SANS_SEMIBOLD,
        fontSize: 13,
        color: Colors.BLACK,
        flex: 1
    },
    textMessage: {
        flex: 1, fontFamily: Fonts.DM_SANS_REGULAR
    },
    time: {
        color: Colors.LIGHT_GREY2,
        fontSize: 11,
        fontFamily: Fonts.DM_SANS_MEDIUM,
        marginLeft: 40,
        marginTop: 10
    },
    horizontalLine: {
        height: 1,
        width: '100%',
        backgroundColor: Colors.LIGHT_GREY,
        alignSelf: 'center',
        marginTop: 20,
    },

    unReadDot: {
        height: 6,
        width: 6,
        borderRadius: 4,
        marginTop: -5,
        backgroundColor: Colors.UNREAD_DOT,

    }
});

export default NotificationItem;
