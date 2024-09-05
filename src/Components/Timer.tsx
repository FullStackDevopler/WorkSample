import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import {
    Image,
    ImageProps,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { AppImages } from './../Assets';
import { Colors } from '../Theme/colors';
import { Fonts } from '../Theme/fonts';


type TimerProps = PropsWithChildren<{
    completed: Function
}>;

export default function Timer({ completed }: TimerProps): JSX.Element {
    const [time, setTime] = useState(60)
    const interval = useRef(null)
    useEffect(() => {
        interval.current = setInterval(() => {
            setTime((time) => {
                return time - 1
            })
        }, 1000);

        return () => clearInterval(interval.current);
    }, [])
    useEffect(() => {
        if (time === 0) {
            clearInterval(interval.current)
            completed()
        }
    }, [time])
    return (
        <View style={styles.container}>
            <Text style={styles.timerText}>{`:${time}`}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        width: '100%',
        alignItems: 'center',
    },
    timerText: { color: Colors.primary, fontFamily: Fonts.Livvic_Medium, fontSize: 24 }
})