import React, { Component } from 'react';
import {
    View, Modal, Image, TouchableOpacity, StyleSheet,
    SafeAreaView, Dimensions
} from 'react-native'
const { width, height } = Dimensions.get('window');
import ImageProgress from 'react-native-image-progress';
import ImageZoom from 'react-native-image-pan-zoom';
import { Images } from '../Assets';
import { DimensionsValue } from '../Theme/DimensionsValue';
import { Colors } from '../Theme/Colors';

export default class ImageModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            height,
            width,


        }
    }
    componentDidMount() {
        Image.getSize(this.props.image, (width, height) => {
            console.log("height and width in getsize", width, height);
            this.setState({ height, width })
        }, (errorMsg) => {
            console.log(errorMsg);

        });

    }
 
    render() {
        const { hideModal, showModal, image } = this.props;
     
   return (

            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => { }}>
                <SafeAreaView style={{ flex: 1 }}>

                    <View style={styles.viewModalContainer}>

                        <TouchableOpacity style={styles.touchCrossIcon}
                            onPress={() => { hideModal(false) }}>
                            <Image source={Images.IC_CROSS} style={{height: 25, width: 25}} />
                        </TouchableOpacity>
                        <ImageZoom
                            cropWidth={width}
                            cropHeight={height - 100}
                            imageWidth={width}
                            imageHeight={height}
                        >
                            <ImageProgress style={styles.imageStyles}
                                resizeMode={'contain'}
                                source={{ uri: image}} />
                        </ImageZoom> 
                    </View>
                </SafeAreaView>
            </Modal>
           
        )
    }
}

const styles = StyleSheet.create({
    viewModalContainer: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        justifyContent: 'center'
    },
    touchCrossIcon: {
        position: 'absolute',
        top: 10, 
        right: 10, 
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20, 
        // backgroundColor: 'red',
        zIndex: 999

    },
    imageModalMain: {
        height: width,
        width: width
    },
    imageStyles:{
        width: width,
        height: undefined,
        flex: 1, 
        // alignSelf: 'center',
        // backgroundColor: 'red',
        // justifyContent: 'center'
    }
})