import { StyleSheet } from "react-native";
import { Colors } from "../../Theme/colors";
import { Fonts } from "../../Theme/fonts";
import { getBottomSpace } from "../../Theme/utils";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    hyperLinkView: { width: '80%', alignSelf: 'center', alignItems: 'center', marginVertical: 15 },
    hyperLinkText: { fontFamily: Fonts.Livvic_Regular, fontSize: 16, textAlign: 'center', lineHeight: 24 },
    checkboxView: { backgroundColor: Colors.grayColor, height: 15, width: 15, marginTop: 5, marginLeft: 5 },
    bottomView: { alignItems: 'flex-end', backgroundColor: Colors.background, paddingRight: 16, marginBottom: getBottomSpace() },
    bottomButtomView: { backgroundColor: Colors.secondary, borderRadius: 15, paddingHorizontal: 10, paddingVertical: 5, marginVertical: 3 },
    bottomRegularText: { fontFamily: Fonts.Livvic_Regular, color: Colors.primary },
    bottomBoldText: { fontFamily: Fonts.Livvic_Bold, color: Colors.primary },
    bottomBoldItalicText: { fontFamily: Fonts.Livvic_BoldItalic, color: Colors.primary }
})