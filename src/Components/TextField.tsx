import React from "react";
import { Image, KeyboardTypeOptions, StyleSheet, TextInput, TextInputProps, View, ViewStyle } from 'react-native'
import { Colors } from "../Theme/Colors";
import { DimensionsValue } from "../Theme/DimensionsValue";
import { Fonts } from "../Theme/Fonts";


interface InputProps extends TextInputProps {
    parentStyles?: ViewStyle;
    containerStyle?: ViewStyle;
    customStyles?: ViewStyle;
    fontFamily?: string;
    customHeight?: number;
    placeholderTextColor?: string;
    onChangeText?: (text: string) => void;
    keyboardType?: KeyboardTypeOptions;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    placeholder?: string;
    value?: string;
    maxLength?: number;
    editable?: boolean;
    secureTextEntry?: boolean;
    leftImage?: any;

    error?: boolean;
    onFocus?: () => void;
    rightChild?: React.ReactNode;
    fieldRef?: React.RefObject<TextInput>;
    onSubmitEditing?: () => void;
    leftIconStyles?: any
}

const TextField: React.FC<InputProps> = ({
    parentStyles,
    containerStyle,
    customStyles,
    fontFamily,
    customHeight,


    leftImage,
    value,
    placeholder,
    keyboardType,
    autoCapitalize,
    returnKeyType,
    secureTextEntry,
    placeholderTextColor,
    editable,
    maxLength,
    error,
    rightChild,
    onChangeText,
    fieldRef,
    leftIconStyles,
    onSubmitEditing,
    onFocus = () => { },
    ...props
}) => {

    const [isFocused, setIsFocused] = React.useState<boolean>(false);
    const textInputRef = React.useRef<TextInput>(null);

    const removeFocus = () => {
        if (textInputRef.current) {
            textInputRef.current.blur(); // Blur the TextInput to remove focus
        }
    };

    return (
        <View style={[styles.rootContainer, parentStyles]}>
            <View style={[styles.viewTextInput, containerStyle,
            {
                borderColor: error ? Colors.BLACK : isFocused ? Colors.BLACK : Colors.COLOR_GREY1,
                height: customHeight ? customHeight : styles.viewTextInput.height,
                paddingEnd: rightChild ? 0 : 18
            },]}>
                {leftImage && <Image source={leftImage} style={[styles.leftIcon, leftIconStyles]} />}

                <TextInput
                    ref={fieldRef}
                    style={[styles.textInput, customStyles, { fontFamily: fontFamily && fontFamily }, { textAlignVertical: 'top' },]}

                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}


                    keyboardType={keyboardType ? keyboardType : 'default'}
                    autoCapitalize={autoCapitalize ? autoCapitalize : 'none'}
                    autoCorrect={false}
                    returnKeyType={returnKeyType ? returnKeyType : 'done'}

                    onSubmitEditing={onSubmitEditing}
                    maxLength={maxLength}
                    editable={editable}
                    secureTextEntry={secureTextEntry}
                    placeholderTextColor={placeholderTextColor ? placeholderTextColor : Colors.FIELD_BORDER}

                    onFocus={() => {
                        onFocus();
                        setIsFocused(true);
                    }}
                    onBlur={() => {
                        setIsFocused(false);
                        removeFocus();
                    }}



                    {...props}

                />
                {rightChild && rightChild}


            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    rootContainer: {
        marginBottom: 20,
        width: DimensionsValue.VALUE_346,
        alignSelf: 'center',


    },
    viewTextInput: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        height: 43,
        width: DimensionsValue.VALUE_346,
        borderRadius: 30,
        borderWidth: 0.5,
        borderColor: Colors.FIELD_BORDER,
        paddingHorizontal: 18

    },
    leftIcon: {
        height: 18,
        width: 18,
        resizeMode: 'contain',
        marginEnd: 10,
    },
    textInput: {
        fontSize: 14,
        color: Colors.BLACK,
        fontFamily: Fonts.DM_SANS_MEDIUM,
        flex: 1,
        height: '100%',
        marginTop: 2
        // backgroundColor:'red'
    },



})

export default TextField;