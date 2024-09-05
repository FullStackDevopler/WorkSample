import { StyleSheet } from "react-native";
import { Colors } from "../../Theme/colors";
import { Fonts } from "../../Theme/fonts";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: 'center'
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        backgroundColor: 'transparent'
    },
    commentView: {
        backgroundColor: Colors.primary,
        borderRadius: 35,
        padding: 15,
        marginHorizontal: 10,
        paddingVertical: 30
    },
    commentText: {
        fontFamily: Fonts.Livvic_Italic,
        fontSize: 16,
        textAlign: 'center',
        color: Colors.whiteColor,
        marginHorizontal: 10
    },
    polygonStyle: {
        position: 'absolute',
        height: 15,
        width: 25,
        bottom: -15,
        left: 'auto',
        right: 'auto',
        alignSelf: 'center'
    },
})