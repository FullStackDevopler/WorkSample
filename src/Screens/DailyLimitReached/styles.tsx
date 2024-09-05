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
        fontFamily: Fonts.Livvic_Italic,
        fontSize: 16,
        textAlign: 'center',
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
        height: 120,
        borderTopStartRadius: 30,
        width: windowWidth - 130,
        alignItems: 'center',
        justifyContent: 'center'
    },
    contentView: {
        width: '80%',
        backgroundColor: Colors.primary,
        borderRadius: 30,
        padding: 20,
        marginHorizontal: 10,
    },
    polygonStyle: {
        position: 'absolute',
        height: 15,
        width: 25,
        bottom: -15,
        right: '50%',
    },
    contentLabel: {
        fontFamily: Fonts.Livvic_Regular,
        fontSize: 16,
        fontWeight: '400',
        color: Colors.whiteColor,
        textAlign: 'center'
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 20,
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%'
    },
})