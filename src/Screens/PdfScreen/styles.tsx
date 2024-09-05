import { Dimensions, StyleSheet } from 'react-native'
import { Colors } from "../../Theme/Colors";
import { Fonts } from "../../Theme/Fonts";
import { DimensionsValue } from "../../Theme/DimensionsValue";


export const styles = StyleSheet.create({

    rootContainer: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    	pdf: {
		flex: 1,
		width: Dimensions.get('window').width,
	},
})