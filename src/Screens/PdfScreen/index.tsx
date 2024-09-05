import React from "react";
import { Platform, View } from "react-native";
import Header from "../../Components/Header";
import { styles } from "./styles";
import Pdf from "react-native-pdf";
import LoaderModal from "../../Modals/LoaderModal";

export default function PdfScreen({ navigation, route }: any): React.JSX.Element {
    // const DOCUMENT =
    // Platform.OS === 'ios'
    // 	? require('./Document.pdf')
    // 	: 'file:///android_asset/Document.pdf';
    console.log('route.params?.uri',route.params?.uri);
    

    return (
        <View style={styles.rootContainer}>
            <Header tapOnBack={() => navigation.goBack()}
                headerText={"PDF"}
            />
            <Pdf style={styles.pdf} 
                // source={{uri: 'https://www.sldttc.org/allpdf/21583473018.pdf'}}
                source={{ uri: route.params?.uri}}
                minScale={0.5}
                maxScale={3.0}
                renderActivityIndicator={()=> <LoaderModal showModal />}
                enablePaging
                onError={(error)=>console.log('Error in loading PDF:',error)}
                trustAllCerts={false}
               />
        </View>

    )
}
