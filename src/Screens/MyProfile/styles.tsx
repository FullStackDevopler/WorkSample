import { StyleSheet } from "react-native";
import { Colors } from "../../Theme/colors";
import { Fonts } from "../../Theme/fonts";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: 'center'
    },
    contentView: {
        backgroundColor: Colors.secondary,
        borderRadius: 35,
        width: '70%',
        padding: 25,
        marginVertical: 30,
    },
    contentLabel: {
        color: Colors.primary,
        fontFamily: Fonts.Livvic_Bold,
        fontSize: 16,
        marginVertical: 2
    }
})