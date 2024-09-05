import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { DimensionsValue } from "../Theme/DimensionsValue";
import { Colors } from "../Theme/Colors";
import { Fonts } from "../Theme/Fonts";

interface CommonHeadingProps {
    headingText?: string;
    outerStyles ?: any
}

const CommonHeading: React.FC<CommonHeadingProps> = ({ headingText, outerStyles }) => {

    return (
        <View style={[styles.detailsView, outerStyles]}>
            <View style={styles.topView}>
                <Text style={styles.detailText}>{headingText}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    detailsView: {
        width: DimensionsValue.VALUE_348,
        alignSelf: 'center',
        marginBottom: 15
    },
    topView: {
        height: 36,
        backgroundColor: Colors.ORANGE,
        justifyContent: 'center',
        paddingLeft: 10,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6
    },
    detailText: {
        color: Colors.WHITE,
        fontSize: 16,
        fontFamily: Fonts.DM_SANS_BOLD
    },
})
export default CommonHeading;