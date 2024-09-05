import { StyleSheet } from 'react-native'
import { Colors } from "../../Theme/Colors";
import { Fonts } from "../../Theme/Fonts";


export const styles = StyleSheet.create({

    rootContainer: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    myJobsText: {
        marginTop: 30,
        marginLeft: 20,
        fontFamily: Fonts.DM_SANS_BOLD,
        fontSize: 22,
        color: Colors.BLACK
    },
    mainWrapper: {
        height: 35,
        width: '90%',
        backgroundColor: Colors.COLOR_GREY3,
        alignSelf: 'center',
        marginTop: 17,
        borderRadius: 20,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    assignedButton: {
        backgroundColor: Colors.ORANGE,
        height: 35,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        alignSelf: 'flex-start'
    },
    unassignedButton: {
        backgroundColor: Colors.ORANGE,
        height: 35,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        alignSelf: 'flex-start'
    },
    tabText: {
        fontSize: 14,
        fontFamily: Fonts.DM_SANS_SEMIBOLD
    },
    filterView : {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginHorizontal: 28,
        marginBottom: 10
      },
    homeIcon: {
        alignSelf: 'center',
        marginTop: 60
    },
    noJobText: {
        fontSize: 16,
        fontFamily: Fonts.DM_SANS_REGULAR,
        marginHorizontal: 28,
        textAlign: 'center',
        marginTop: 12,
        color:Colors.BLACK
    },
    containerStyles: {
        height: 46,
        width: 217,
        backgroundColor: Colors.ORANGE,
       
    },
    container: {
        height: 172,
        width: '90%',
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 25,
        borderColor: Colors.LIGHT_GREY,
        borderWidth: .5

    },
    dateTimeText: {
        color: Colors.DARK_GREY,
        fontSize: 12,
        fontFamily: Fonts.DM_SANS_REGULAR,
    },
    horizontalLine: {
        height: 1,
        width: '95%',
        backgroundColor: Colors.LIGHT_GREY,
        alignSelf: 'center',
        marginTop: 12
    },
    startLocationText: {
        fontSize: 16,
        fontFamily: Fonts.DM_SANS_REGULAR
    },
    textTotalAmount:{
        color: Colors.BUTTON_GREY,
        fontSize: 12,
        fontFamily: Fonts.DM_SANS_REGULAR,
    },
    textTotalAmountValue:{
        color: Colors.BLACK,
        fontSize: 16,
        fontFamily: Fonts.DM_SANS_BOLD,
    },
    touchFilter:{
        flexDirection: 'row',
         alignItems: 'center',
         backgroundColor:Colors.LIGHT_GREY5,
         paddingHorizontal:10,
         paddingVertical:5,
         borderRadius:10
         
    },
    imageFilter:{
        height:10,
        width:10,
    },
    textFilter:{
        color: Colors.BLACK,
        fontSize: 11,
        fontFamily: Fonts.DM_SANS_MEDIUM,
        marginEnd:5
    },
    noDataFoundText: {
        fontSize: 16,
        fontFamily: Fonts.DM_SANS_REGULAR,
        color: Colors.LIGHT_GREY2,
        marginHorizontal: 28,
        textAlign: 'center',
    
    },

})