import React, { PropsWithChildren } from 'react';
import {
    Image,
    ImageResizeMode,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Colors } from '../Theme/colors';
import { Fonts } from '../Theme/fonts';

type AppButtonProps = PropsWithChildren<{
    title?: string;
    titleStyle?: Object;
    onPress: Function;
    icon?: any;
    iconStyle?: Object;
    buttonStyle?: Object;
    iconResizeMode?: ImageResizeMode;
}>;

export default function AppButton({ title, titleStyle, onPress, icon, iconStyle, buttonStyle, iconResizeMode }: AppButtonProps): JSX.Element {
    return (
        <Pressable style={({ pressed }) => [styles.button, buttonStyle, { opacity: pressed ? 0.5 : 1 }]} onPress={() => onPress()}>
            {icon &&
                <Image style={[{ height: 16, width: 16, margin: 3 }, iconStyle]} resizeMode={iconResizeMode || 'contain'} source={icon} />}
            {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        alignSelf: 'center',
        fontFamily: Fonts.Livvic_Medium,
        alignItems: 'center',
        justifyContent: 'center',
        width: '75%',
        height: 40,
        borderRadius: 24,
        backgroundColor: Colors.primary,
        marginVertical: 8,
        flexDirection: 'row'
    },
    title: {
        fontFamily: Fonts.Livvic_Medium,
        color: Colors.whiteColor,
        fontSize: 16,
        textAlign: 'center',
        textAlignVertical: 'center',
        lineHeight: 40,
    }
})