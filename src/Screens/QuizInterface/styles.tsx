import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../Theme/colors";
import { Fonts } from "../../Theme/fonts";
const windowWidth = Dimensions.get('window').width;
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        // alignItems: 'center',
        // justifyContent: 'center'
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
        paddingHorizontal: 10
    },
    bottomPolygonImage: {
        height: 40,
        width: 30,
        left: -26,
        top: 20,
        position: 'absolute',
        tintColor: Colors.secondary
    },
    bottomRightView: {
        backgroundColor: Colors.secondary,
        height: 80,
        borderTopStartRadius: 30,
        width: windowWidth - 130,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleTextStyle: {
        color: Colors.blackColor,
        textAlign: 'center',
        fontFamily: Fonts.Livvic_Regular,
        fontSize: 20,
        fontWeight: '400',
        marginHorizontal: 40,
        // marginTop: 100,
        marginBottom: 40
    }
})