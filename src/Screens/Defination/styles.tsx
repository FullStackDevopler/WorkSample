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
        width: '100%'
    },
    definationText: {
        fontFamily: Fonts.Livvic_Medium,
        fontSize: 16,
        textAlign: 'center',
        color: Colors.blackColor
    },
    answerView: {
        backgroundColor: Colors.primary,
        borderRadius: 35,
        padding: 15,
        marginHorizontal: 15,
        marginTop: 30
    },
    answerText: {
        fontFamily: Fonts.Livvic_Regular,
        fontSize: 16,
        textAlign: 'center',
        color: Colors.whiteColor
    },
    polygonStyle: {
        position: 'absolute',
        height: 15,
        width: 25,
        bottom: -14,
        left: 'auto',
        right: 'auto',
        alignSelf: 'center'
    }
})