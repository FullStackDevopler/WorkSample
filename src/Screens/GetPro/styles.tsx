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
    contentView: {
        width: '80%',
        backgroundColor: Colors.primary,
        borderRadius: 40,
        marginTop: 10
    },
    contentText: {
        fontFamily: Fonts.Livvic_SemiBold,
        fontSize: 16,
        textAlignVertical: 'center',
        marginLeft: 10,
        lineHeight: 18,
        height: 24,
        color: Colors.whiteColor
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 20,
    },
    contentTextView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
        marginBottom: 12,
        marginLeft: 24,
        marginRight: 24,
    },
    tick: {
        height: 16,
        width: 16,
        tintColor: Colors.whiteColor,
        marginBottom: 6
    },
    logoView: {
        width: '80%',
        aspectRatio: 2.5,
        backgroundColor: Colors.primary,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    getProLogo: {
        width: '80%'
    },
    dogView: {
        width: '80%',
        height: 100,
        flexDirection: 'row',
        marginTop: 10
    },
    dogImage: {
        width: '50%',
        height: 100,
        transform: [
            { scaleX: -1 }
        ]
    },
    polygonStyle: {
        position: 'absolute',
        height: 15,
        width: 25,
        bottom: -15,
        left: '40%',
        transform: [
            { scaleX: -1 }
        ]
    },



})