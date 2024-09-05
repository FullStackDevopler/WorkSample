import React from "react";
import { StyleSheet } from 'react-native'
import { Colors } from "../../Theme/Colors";
import { Fonts } from "../../Theme/Fonts";
import { DimensionsValue } from "../../Theme/DimensionsValue";

export const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  backArrow: {
    marginLeft: 20,
  },
  topView: {
    flexDirection: 'row',
    marginBottom: 40,
    marginTop: 20,
    // backgroundColor:'red'
  },
  backArrowContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 40,

  },
  jobDetailText: {
    fontSize: 25,
    fontFamily: Fonts.DM_SANS_MEDIUM,
    paddingVertical: 7,
    color: Colors.BLACK

  },
  touchBack: {
    paddingVertical: 12,
    paddingHorizontal: 26
  },
  verificationText: {
    alignSelf: 'center',
    fontSize: 30,
    marginTop: 52,
    marginBottom: 16,
    fontFamily: Fonts.DM_SANS_SEMIBOLD,
    color: Colors.BLACK
  },
  verificationCodeLine: {
    alignSelf: 'center',
    fontFamily: Fonts.DM_SANS_REGULAR,
    fontSize: 14,
    marginHorizontal: 20,
    textAlign: 'center',
    color: Colors.COLOR_GREY1,
    marginBottom: 42
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 30,
    paddingHorizontal: 30,
  },
  mainView: {
    height: 40,
    width: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.BLACK,
    alignItems: "center",
    justifyContent: "center",
    textAlign: 'center'
  },
  otpText: {
    color: Colors.BLACK,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: 'center',
  },
  timer: {
    alignSelf: 'center',
    fontSize: 16,
    fontFamily: Fonts.DM_SANS_MEDIUM,
    marginTop: 22,
    color: Colors.SEA_BLUE
  },
  viewDontHaveAccount: {
    flexDirection: 'row',
    marginBottom: 30,
    alignSelf: 'center'
  },
  textDontHaveAccount: {
    fontSize: 14,
    fontFamily: Fonts.DM_SANS_LIGHT,
    color: Colors.COLOR_GREY2,
  },
  textSignUpNow: {
    fontSize: 14,
    fontFamily: Fonts.DM_SANS_BOLD,
    color: Colors.ORANGE,
    marginLeft: 4
  },

  textInputContainer: {
    marginBottom: 20,
    elevation: 0,
    paddingHorizontal: 30,
  },
  // roundedTextInput: {
  //   borderRadius: 10,
  //   borderWidth: 1,
  //   borderBottomWidth: 1,
  //   height: 40,
  //   width: 40,
  //   borderColor: Colors.BLACK,
  //   fontSize: 14,
  //   fontFamily: Fonts.DM_SANS_MEDIUM

  // },


  roundedTextInput: {
      height: 40,
      width: DimensionsValue.VALUE_150,
    alignSelf: 'center', 
    // justifyContent:'center',
    // alignItems:'center',
    // backgroundColor:'red',
    // borderColor: Colors.LIGHT_GREY,
    fontSize: 14,
    fontFamily: Fonts.DM_SANS_MEDIUM,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderTopColor: Colors.WHITE,
    borderLeftColor: Colors.WHITE,
    borderRightColor: Colors.WHITE,
    color: Colors.BLACK,
    paddingHorizontal: 0, // Ensures no extra padding on the sides
    marginHorizontal: 0,

  },
})