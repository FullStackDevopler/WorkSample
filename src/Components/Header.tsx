import React, { FC } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    View,
} from 'react-native';
import { Colors } from '../Theme/Colors';
import { Images } from '../Assets';
import { Fonts } from '../Theme/Fonts';

interface HeaderProps {
    headerText: string,
    tapOnBack: () => void;
}

const Header: FC<HeaderProps> = ({
   headerText,
   tapOnBack
}) => {
    return (
        <View style={{ flexDirection: 'row', marginBottom: 15, marginTop: 20 }}>
            <TouchableOpacity onPress={tapOnBack} style={styles.touchBack}>
                <Image source={Images.IC_ARROW_BACK} />
            </TouchableOpacity>
            <Text style={styles.jobDetailText}>{headerText}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    jobDetailText: {
        fontSize: 18,
        fontFamily: Fonts.DM_SANS_MEDIUM,
        paddingVertical: 12,
        color: Colors.BLACK

    },
    touchBack: {
        paddingVertical: 12,
        paddingHorizontal: 26
    },   

});

export default Header;
