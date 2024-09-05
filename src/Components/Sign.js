import { useEffect, useRef, useState } from "react";
import SignatureScreen from "react-native-signature-canvas";
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import Button from "./Button";
import { StringConstants } from "../Theme/StringConstants";
import { Colors } from "../Theme/Colors";
import { useToast } from "react-native-toast-notifications";


const Sign = ({ tapOnConfirm }) => {
  const ref = useRef();
  const toast = useToast()

  const [signData, setSignData] = useState()

  // Called after ref.current.readSignature() reads a non-empty base64 string
  const signCompleted = (signature) => {
    if (signature && signature.trim() !== "") {

      const signatureData = signature.split(',')[1];
      setSignData(signatureData)
      // onOK(signature); // Callback from Component props
    } 
  
  };


  const tapOnSubmit = () => {
    if (signData) {
      tapOnConfirm(signData)
    } else {
      console.log("No signature detected");
      toast.show("Please do the signature", {
        placement: "top",
        duration: 1000,
        animationType: "slide-in",
        type: 'warning',
      });
    }
  }


  // Called after ref.current.readSignature() reads an empty string
  const handleEmpty = () => {
    console.log("Empty");
  };

  // Called after ref.current.clearSignature()
  const handleClear = () => {
    console.log("clear success!");
  };



  // Called after end of stroke
  const handleEnd = () => {
    console.log('ref.current in handleEnd:', ref.current.readSignature());

    // ref.current.readSignature();
  };

  // Called after ref.current.getData()
  const handleData = (data) => {
    console.log(data);
  };



  const tapOnClear = () => {
    if (ref.current) {
      ref.current.clearSignature(); 
      setSignData()


    }
  }

  const imgWidth = "100%";
  const imgHeight = "100%";

  const style = `.m-signature-pad {box-shadow: none; border: none; } 
  .m-signature-pad--body {border: none;}
  .m-signature-pad--footer {display: none; margin: 0px;}
  body,html {
  width: ${imgWidth}; height: ${imgHeight};}`;


  return (
    <View style={{flex:1 }}>
      <View style ={{flex:1}}>
      <SignatureScreen
        ref={ref}
        onEnd={handleEnd}
        // bgSrc="https://via.placeholder.com/300x200/ff726b"
        bgWidth={imgWidth}
        bgHeight={imgHeight}
        onOK={signCompleted}
        onDraw={(data)=> console.log("data in onDraw ",data)}

        // onEmpty={handleEmpty}
        // onClear={handleClear}
        // onGetData={handleData}
        // descriptionText={"text"}
        autoClear={false}
        webStyle={style}

      />
</View>
      <View style={styles.bottomButtons}>
        <Button primaryTitle={StringConstants.SUBMIT}
          containerStyles={styles.submitButton}
          onPress={() => {
            tapOnSubmit()

          }} />
        <Button primaryTitle={StringConstants.CLEAR}
          containerStyles={styles.clearButton}
          onPress={() => {
            tapOnClear()
          }
          } />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 26,
    // backgroundColor: "red"
  },

  submitButton: {
    backgroundColor: Colors.GREEN,
    width: '45%',
    height: 40
  },
  clearButton: {
    backgroundColor: Colors.RED,
    width: '45%',
    height: 40
  }
})

export default Sign;
