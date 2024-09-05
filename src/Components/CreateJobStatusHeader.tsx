import React, { FC } from "react";
import { Image, StyleSheet, Text, View } from 'react-native'
import { Images } from "../Assets";
import { Colors } from "../Theme/Colors";
import { StringConstants } from "../Theme/StringConstants";
import { Fonts } from "../Theme/Fonts";
interface CreateJobStatusHeaderProps {
    selectedTab: number;
}




const CreateJobStatusHeader: FC<CreateJobStatusHeaderProps> = ({
    selectedTab
}) => {


    const getFirstImage = () => {

        switch (selectedTab) {
            case 0:
                return Images.IC_WARN_CIRCULAR
            default:
                return Images.IC_TICK_CIRCULAR
        }
    }

    const getSecondImage = () => {

        switch (selectedTab) {
            case 1:
                return Images.IC_WARN_CIRCULAR
            case 2:
                return Images.IC_TICK_CIRCULAR
            default:
                return Images.IC_I_CIRCULAR
        }
    }

    const getThirdImage = () => {

        switch (selectedTab) {

            case 2:
                return Images.IC_WARN_CIRCULAR
            default:
                return Images.IC_I_CIRCULAR
        }
    }



    return (
        <View style={styles.rootContainer}>

            <Image source={Images.IC_LINE_PLAIN} style={[styles.startLine, selectedTab == 0 && { tintColor: Colors.ORANGE2 }]} />
            <Image source={Images.IC_LINE_PLAIN} style={[styles.endLine, { tintColor: selectedTab == 0 ? Colors.COLOR_GREY4 : selectedTab == 1 ? Colors.ORANGE2 : Colors.ORANGE }]} />
           
            <View  style={{alignItems:'center'}}>
                <Image source={getFirstImage()} />
                <Text style={[styles.activeText && selectedTab == 2 && { color: Colors.ORANGE }]}>{StringConstants.PICKUP}</Text>
            </View>
          
            <View style={{alignItems:'center'}}>
                <Image source={getSecondImage()} />
                <Text style={[
                    styles.activeText,
                    selectedTab == 0 && styles.inActiveText,
                    selectedTab == 2 && { color: Colors.ORANGE }]}>{StringConstants.DROP_OFF}</Text>

            </View>

            <View style={{alignItems:'center',}}>
                <Image source={getThirdImage()} style={{alignSelf:'flex-end'}}/>
                <Text style={[

                    styles.inActiveText,
                    selectedTab == 2 && styles.activeText
                ]}>{StringConstants.OTHER}</Text>


            </View>
        </View>
    )
}
const styles = StyleSheet.create({

    rootContainer: {
        flexDirection: 'row',
        // backgroundColor:'red',
        marginHorizontal: 28,
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginBottom:40
    },
    startLine: {
        position: 'absolute',
        width: '50%',
        start: 0,
        top:22
    },
    endLine: {
        position: 'absolute',
        width: '50%',
        end: 0,
        top:22
    },
    activeText: {
        fontSize: 14,
        fontFamily: Fonts.DM_SANS_MEDIUM,
        color: Colors.BLACK,
 
    },
    inActiveText: {
        fontSize: 14,
        fontFamily: Fonts.DM_SANS_MEDIUM,
        color: Colors.BLACK,
      
    }

})

export default CreateJobStatusHeader
