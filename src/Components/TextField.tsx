import React from 'react';
import {
    Image,
    StyleSheet,
    TextInput,
    View,
} from 'react-native';
import { Colors } from '../Theme/colors';
import { Fonts } from '../Theme/fonts';

export default function TextField(props): JSX.Element {
    return (

        <TextInput
            editable
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={text => props.onChangeText(text)}
            style={[styles.inputField, props.textFieldStyle]}
            placeholder={props.placeholder}
            placeholderTextColor={Colors.placeholderText}
            secureTextEntry={props.secureTextEntry}
            value={props.value}
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
        marginVertical: 5

    }
})