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
import { StringConstants } from '../Theme/StringConstants';
import { DimensionsValue } from '../Theme/DimensionsValue';

interface UploadDocumentsProps {
  topText?: string;
  bottomText?: string;
  onPressEye?: () => void;
  uploaded?: boolean;
  onPress?: ()=>void;
  onLongPress?: ()=>void;
  uriAvaiable ?: boolean
}

const UploadDocuments: FC<UploadDocumentsProps> = ({
  topText,
  bottomText,
  uploaded,
  onPress,
  onLongPress,
  onPressEye,
  uriAvaiable,
}) => {


  return (
    <TouchableOpacity style={styles.borderDottedLine} onPress={onPress} onLongPress={onLongPress}>
      <Image source={Images.IC_UPLOAD} style={{ height: 30, width: 30, marginLeft: 10 }} />
      <View style={{ marginLeft: 10,flex:1  }}>
      <Text numberOfLines={1} style={styles.pdfText}>{topText}</Text>
        <Text style={styles.pdfBelowText}>{bottomText}</Text>
      </View>
      {uploaded &&
        <View style={{ flexDirection: 'row',  justifyContent: 'flex-end' }}>
          <Image source={Images.IC_SUCCESS} style={[styles.rightIcon, { marginLeft: 10 }]}  />
         {uriAvaiable && <TouchableOpacity onPress={onPressEye}>
            <Image source={Images.IC_ORANGE_EYE} style={styles.rightIcon} />
          </TouchableOpacity>}
        </View>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  borderDottedLine: {
    borderStyle: 'dashed',
    height: 45,
    width: DimensionsValue.VALUE_346,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: Colors.LIGHT_GREY2,
    alignSelf: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  pdfText: {
    fontSize: 12,
    fontFamily: Fonts.DM_SANS_SEMIBOLD,
    color: Colors.BLACK,
    marginRight: 15
  },
  pdfBelowText: {
    fontSize: 11,
    fontFamily: Fonts.DM_SANS_REGULAR,
    color: Colors.LIGHT_GREY4
  },
  rightIcon: {
    height: 20,
    width: 20,
    marginRight: 10
  }

});

export default UploadDocuments;
