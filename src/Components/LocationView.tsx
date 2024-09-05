import React, { FC } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import { Colors } from '../Theme/Colors';
import { Fonts } from '../Theme/Fonts';
import { Images } from '../Assets';
import { StringConstants } from '../Theme/StringConstants';
import { DimensionsValue } from '../Theme/DimensionsValue';
import Button from './Button';

interface LocationViewProps {
    buttonTitle: any;
    tapOnButton: () => void;
    address: any
}

const LocationView: FC<LocationViewProps> = ({ buttonTitle, tapOnButton, address }) => {
    
    let backgroundColors =  buttonTitle == StringConstants.START_JOB || buttonTitle == StringConstants.ARRIVED  ? Colors.LIGHT_GREEN : buttonTitle == StringConstants.ON_ROUTE ? Colors.LIGHT_RED : Colors.LIGHT_ORANGE
    let borderColors =  buttonTitle == StringConstants.START_JOB || buttonTitle == StringConstants.ARRIVED  ? Colors.GREEN : buttonTitle == StringConstants.ON_ROUTE ? Colors.TOMATO_RED : Colors.ORANGE
    let buttonBackgroundColor =  buttonTitle == StringConstants.START_JOB || buttonTitle == StringConstants.ARRIVED  ? Colors.GREEN : buttonTitle == StringConstants.ON_ROUTE ? Colors.TOMATO_RED : Colors.ORANGE
    let tintColor = buttonTitle == StringConstants.ON_ROUTE ? Colors.TOMATO_RED : buttonTitle == StringConstants.START_JOB || buttonTitle == StringConstants.ARRIVED  ? Colors.GREEN : Colors.ORANGE
  
  
  
    return (
        <View style={[styles.rootContainer, { backgroundColor: backgroundColors, borderColor: borderColors}]}>
            <View style={styles.locationView}>
                <Image source={Images.IC_ORANGE_LOCATION} style={[styles.locationIcon, {tintColor : tintColor}]} />
                <Text style={styles.address}>{address}</Text>
            </View>
            <Button primaryTitle={buttonTitle} onPress={tapOnButton}
                containerStyles={{backgroundColor : buttonBackgroundColor, height: 40,  width: DimensionsValue.VALUE_280}}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    rootContainer: {
        width: DimensionsValue.VALUE_348,
        alignSelf: 'center',
        borderRadius: 20,
        borderWidth: 1,
        marginBottom: 20
    },
    locationView: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    },
    locationIcon: {
        marginRight: 8,
        marginLeft: 30,
    },
    address: {
        fontSize: 15,
        fontFamily: Fonts.DM_SANS_MEDIUM,
        alignSelf: 'center',
        flex: 1,
        color: Colors.BLACK,
        marginRight: 25
    },
  
})

export default LocationView