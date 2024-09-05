import { StyleSheet } from 'react-native'
import { Colors } from "../../Theme/Colors";
import { Fonts } from "../../Theme/Fonts";


export const styles = StyleSheet.create({

    rootContainer: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    header: {
        flexDirection: 'row',
        paddingLeft: 20,
        paddingVertical: 10,
        backgroundColor: Colors.ORANGE,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    touchableBackArrow: {
        padding: 10,
        paddingRight: 20
    },
    backArrow: {
        tintColor: 'white'
    },
    profilePicture: {
        height: 36,
        width: 36,
        borderRadius: 18,
        alignSelf: 'center'
    },
    fullName: {
        textAlignVertical: 'center',
        marginLeft: 8,
        color: 'white',
        fontFamily: Fonts.DM_SANS_SEMIBOLD,
        alignSelf: 'center'
    },
 
    input: {
        flex: 1,
        maxHeight: 100,
        minHeight: 50,
        fontFamily: Fonts.DM_SANS_MEDIUM,
        fontSize: 14,
        color: Colors.BLACK,
        paddingStart: 8,
        textAlignVertical: 'top',
        paddingTop: 14,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Colors.DARK_GREY,
        marginTop: 10,
    },
    bottomChatView: {
        flexDirection: 'row',
        paddingStart: 10,
        paddingEnd: 10,
        alignItems: 'center',
        paddingBottom: 10,
        // backgroundColor: 'red'
    }
})