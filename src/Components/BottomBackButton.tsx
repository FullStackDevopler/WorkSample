import React, { PropsWithChildren } from 'react';
import {
    Image,
    ImageResizeMode,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Colors } from '../Theme/colors';
import { Fonts } from '../Theme/fonts';
import DeviceInfo from 'react-native-device-info';

type BottomBackButtonProps = PropsWithChildren<{
    onButtonPress: Function;
}>;

export default function BottomBackButton({ onButtonPress }: BottomBackButtonProps): JSX.Element {
    return (
        <View style={styles.container}>
            <Pressable onPress={() => onButtonPress()} style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, styles.buttonStyle]}>
                <Text style={styles.text}>{'Back'}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: Platform.OS == 'ios' ? DeviceInfo.hasNotch() ? 20 : 20 : 20,
        alignSelf: 'center',
        height: Platform.OS == 'ios' ? DeviceInfo.hasNotch() ? 20 : 30 : 30,
    },
    text: {
        fontFamily: Fonts.Livvic_Bold,
        color: Colors.primary,
        fontSize: 16,
        width: 50,
        textAlign: 'center'
    },
    buttonStyle: {
        width: 60,
        height: 40,
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
})