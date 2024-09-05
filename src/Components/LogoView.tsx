import React, { PropsWithChildren } from 'react';
import {
    Image,
    ImageProps,
    StyleSheet,
    View,
} from 'react-native';
import { AppImages } from './../Assets';
import { Colors } from '../Theme/colors';


type LogoViewProps = PropsWithChildren<{
    image?: ImageProps;
    imageStyle?: Object;
}>;

export default function LogoView({ image, imageStyle }: LogoViewProps): JSX.Element {
    return (
        <View style={styles.container}>
            <Image style={[styles.logoImage, imageStyle]} resizeMode='contain' source={image || AppImages.TextLogo} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 70,
        marginTop: 60,
    },
    logoImage: { width: '80%', height: 70 }
})