import { StyleSheet } from "react-native";
import { Colors } from "../../Theme/colors";
import { Fonts } from "../../Theme/fonts";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: 'center'
    },
    bottomView: {
        position: 'absolute',
        left: 36,
        bottom: 10,
    },
    screenText: {
        fontFamily: Fonts.Livvic_Italic,
        fontSize: 15,
        fontWeight: "500",
        textAlign: 'center'
    }
})