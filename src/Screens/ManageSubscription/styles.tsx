import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../Theme/colors";
import { Fonts } from "../../Theme/fonts";
const windowWidth = Dimensions.get('window').width;
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomImage: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        height: 150,
        width: 110,
    },
    contentTitleText: {
        fontFamily: Fonts.Livvic_BoldItalic,
        fontSize: 16,
        textAlign: 'center',
        paddingHorizontal: 25
    },
    contentText: {
        fontFamily: Fonts.Livvic_Italic,
        fontSize: 16,
        textAlign: 'left',
        paddingVertical: 5
    },
    bottomPolygonImage: {
        height: 40,
        width: 30,
        left: 80,
        top: 'auto',
        bottom: -30,
        position: 'absolute',
        tintColor: Colors.secondary
    },
    contentView: {
        backgroundColor: Colors.secondary,
        borderRadius: 30,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        marginBottom: 80
    },

})