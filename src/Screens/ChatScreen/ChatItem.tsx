import React, { FC } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    View,
} from 'react-native';
import { Images } from '../../Assets';
import { Colors } from '../../Theme/Colors';
import { Fonts } from '../../Theme/Fonts';


interface ChatItemProps {
    item: any;
    index: number;
    profileImage: any
}

const ChatItem: FC<ChatItemProps> = ({
    item,
    index,
    profileImage
}) => {

    const convertTime = (timestamp: any) => {
        const date = new Date(timestamp);
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // Handle midnight (0 hours)
        const timeString = hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + ampm;
        return timeString;
    };
    
    let isMyMessage =  item?.sendBy == "driver"  ? true : false
    

    const showMyMessage = () => {
        return (
            <View style={styles.myMessageContainer}>
                <View style={styles.myMessage}>
                    <Text style={styles.textMyMessage}>{item.message}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <Text style={[styles.time, { color: Colors.BLACK, marginRight: 5 }]}>{convertTime(item?.time)}</Text>
                    </View>
                </View>
            </View>
        )
    }

    const getUserProfileImage = () => {
        if (profileImage !== null) {
            return { uri: profileImage}
        } else {
            return Images.IC_PICKER
        }
    }

    const showOtherMessage = () => {

        return (
            <View style={styles.otherMessageContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={getUserProfileImage()} style={styles.profilePic} />
                    <View>
                        <View style={styles.otherMessage}>
                            <Text style={styles.textOtherMessage}>{item.message}</Text>
                            <Text style={[styles.time, { color: '#807F7F' }]}>{convertTime(item?.time)}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }


    return (
        <>
            {isMyMessage ? showMyMessage() : showOtherMessage()}
        </>
    );
};

const styles = StyleSheet.create({
    myMessageContainer: {
        flex: 1,
        maxWidth: 300,
        marginVertical: 10,
        alignSelf: 'flex-end',
        marginRight: 25,
    },
    myMessage: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: Colors.ORANGE,
        // backgroundColor: '#008080',
        maxWidth: 225,
        borderRadius: 10,
        borderBottomEndRadius: 0
    },
    otherMessageContainer: {
        flex: 1,
        marginVertical: 10,
        alignSelf: 'flex-start',
    },
    otherMessage: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: Colors.LIGHT_GREY3,
        maxWidth: 225,
        borderRadius: 10,
        borderBottomStartRadius: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0.2 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        elevation: 0,
    },
    profilePic: {
        height: 45,
        width: 45,
        borderRadius: 25,
        marginEnd: 10,
        marginHorizontal: 10,
    },
    time: {
        fontSize: 8,
        fontFamily: Fonts.DM_SANS_REGULAR,
        marginBottom: 2,
        alignSelf: 'flex-end',
        marginTop: 5
    },
    textMyMessage: {
        fontSize: 12,
        lineHeight: 18,
        fontFamily: Fonts.DM_SANS_REGULAR,
        color: Colors.WHITE,
    },
    textOtherMessage: {
        fontSize: 12,
        lineHeight: 18,
        fontFamily: Fonts.DM_SANS_REGULAR,
        color: Colors.BLACK,
    },

});

export default ChatItem;



