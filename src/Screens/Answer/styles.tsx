import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../Theme/colors";
import { Fonts } from "../../Theme/fonts";
const windowWidth = Dimensions.get('window').width;
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: 'center'
    },
    bottomView: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        height: 140,
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },
    bottomImage: {
        height: 140,
        width: 114,
    },
    bottomContentText: {
        fontFamily: Fonts.Livvic_MediumItalic,
        fontSize: 16,
        textAlign: 'center',
        color: Colors.whiteColor
    },
    bottomPolygonImage: {
        height: 40,
        width: 30,
        left: -26,
        top: 20,
        position: 'absolute'
    },
    bottomRightView: {
        backgroundColor: Colors.primary,
        height: 80,
        borderTopStartRadius: 30,
        width: windowWidth - 130,
        alignItems: 'center',
        justifyContent: 'center'
    },
    responseTitle: {
        fontSize: 32,
        fontFamily: Fonts.Livvic_Regular,
        fontWeight: '700',
        color: Colors.greenColor
    },
    responseText: {
        fontSize: 16,
        fontFamily: Fonts.Livvic_Medium,
        textAlign: 'center',
        color: Colors.blackColor
    }
})