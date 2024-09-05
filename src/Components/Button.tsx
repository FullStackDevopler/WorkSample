import React, { FC } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextStyle,
  ViewStyle,
} from 'react-native'; 
import { DimensionsValue } from '../Theme/DimensionsValue';
import { Colors } from '../Theme/Colors';

interface ButtonProps {
  containerStyles?: ViewStyle;
  primaryTitle: string;
  secondaryTitle?: string;
  titleStyles?: TextStyle;
  onPress: () => void;
  isLoading?: boolean;
  secondaryTitleStyles?: TextStyle;
  leftChild?: React.ReactNode;
  rightChild?: React.ReactNode;
  showShadow?: boolean;
}

const Button: FC<ButtonProps> = ({
  containerStyles,
  primaryTitle,
  secondaryTitle,
  titleStyles,
  onPress,
  isLoading,
  secondaryTitleStyles,
  leftChild,
  rightChild,
  showShadow,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyles, showShadow && styles.shadowStyle]}
      disabled={isLoading}
      onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator color={'#FFFFFF'} />
      ) : (
        <>
          {leftChild}
          <Text style={[styles.textTitle, titleStyles]}>
            {primaryTitle}
            <Text style={secondaryTitleStyles}>{secondaryTitle}</Text>
          </Text>
          {rightChild}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 54,
    width: DimensionsValue.VALUE_346,
    backgroundColor: Colors.BUTTON_GREY,
    alignSelf: 'center',
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    marginTop: 20,
  },
  textTitle: {
    color: Colors.WHITE,
    fontSize: 14,
  },
  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default Button;
