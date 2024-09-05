import React, { useState } from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    TextInput,
    View,
} from 'react-native';
import { Colors } from '../Theme/colors';
import { Fonts } from '../Theme/fonts';

export default function GamePlayField(props): JSX.Element {
    const [value, setValue] = useState("")

    const handleKeyPress = (e) => {
        if (e.nativeEvent.key === 'Enter') {
            if (value.length >= 3) {
                props.onWordReceived(value)
                setValue("")
            }
        }
    }

    const containsNextLine = (text) => {
        const regex = /[\s\n]+/g;
        if (regex.test(text)) {
            return true
        } else {
            return false
        }
    }
    return (

        <TextInput
            editable
            autoCapitalize='none'
            autoFocus={true}
            autoCorrect={false}
            onChangeText={text => {
                if (containsNextLine(text)) {
                    if (Platform.OS === 'android') {
                        if (value.length >= 3) {
                            props.onWordReceived(value)
                            setValue("")
                        }
                    }
                } else {
                    setValue(text)
                    props.onChangeText(text)
                }
            }}
            style={[styles.inputField, props.textFieldStyle]}
            placeholder={props.placeholder}
            placeholderTextColor={Colors.placeholderText}
            secureTextEntry={props.secureTextEntry}
            value={value}
            multiline={true}
            onKeyPress={handleKeyPress}
        />

    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    inputField: {
        fontFamily: Fonts.Livvic_Medium,
        backgroundColor: Colors.textfield,
        width: '75%',
        height: 40,
        borderRadius: 20,
        paddingHorizontal: 20,
        fontSize: 16,
        paddingTop: 8,
    }
})