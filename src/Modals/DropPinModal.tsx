import React, { useEffect, useRef, useState } from "react";
import {
    Image,
    Modal,
    StyleSheet,
    TouchableOpacity,
    View, SafeAreaView, Animated, PanResponder, PermissionsAndroid, Platform
} from 'react-native'
import { Colors } from "../Theme/Colors";
import { Fonts } from "../Theme/Fonts";
import { StringConstants } from "../Theme/StringConstants";
import { Images } from "../Assets";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Geolocation from 'react-native-geolocation-service';
import Button from "../Components/Button";
import { PERMISSIONS, RESULTS, request } from "react-native-permissions";

interface DropPinModalProps {
    showModal: boolean;
    hideModal: () => void;
    tapOnConfirm: (data: any, index?: number) => void;
}

const DropPinModal: React.FC<DropPinModalProps> = ({
    showModal,
    hideModal,
    tapOnConfirm,

}) => {

    const mapViewRef = useRef<MapView>(null);
    const [destination, setDestination] = useState({
        latitude: 0,
        longitude: 0,
    });
    const [region, setRegion] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      
    });

    const [panResponder, setPanResponder] = React.useState(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                console.log('event::', event);
                console.log('gesture::', gesture);
                // Handle the dragging logic here
                // Update the position of the pin based on the gesture
            },
        })
    );



    useEffect(() => {
        if (Platform.OS == 'android') {
            requestLocationPermissionAndroid()
        } else {
            console.log('in ios permission');

            // Geolocation.requestAuthorization
            requestLocationPermissionIOS()
        }
    }, [])

    const requestLocationPermissionAndroid = async () => {
        console.log("in requestlocationpersion");

        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,

            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Location permission granted in android');

                Geolocation.getCurrentPosition(
                    (position) => {
                        console.log('position in getCurrentPosition Android:', position);

                        const { latitude, longitude } = position.coords;
                        handleNavigateToCurrentLocation(latitude, longitude)
                        setRegion({ ...region, latitude, longitude });
                        setDestination({
                            latitude,
                            longitude,
                        });
                    },
                    (error) => console.log('Error getting location Android:', error),
                    { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 },
                );
            } else {
                console.log('Location permission denied in android');
            }
        } catch (err) {
            console.log(err);
        }
    }


    const requestLocationPermissionIOS = async () => {
        try {
            const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
            console.log('result in IOS:', result);


            if (result === RESULTS.GRANTED) {
                Geolocation.getCurrentPosition(
                    (position) => {
                        console.log('position in getCurrentPosition IOS:', position);
                        const { latitude, longitude } = position.coords;
                        handleNavigateToCurrentLocation(latitude, longitude)
                        setRegion({ ...region, latitude, longitude });
                        setDestination({
                            latitude,
                            longitude,
                        });
                    },
                    (error) => {
                        console.log('Error getting location IOS:', error);
                    },
                    { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 }
                );
            } else {
                console.log('Location permission denied in IOS');
            }
        } catch (err) {
            console.log('Error requesting location permission IOS:', err);
        }
    };

 

    const handleRegionChangeComplete = (newRegion: any) => {
     
        const ukLandBoundary = {
            latitude: 54.0, // Adjust this value to include the southernmost point of the landmass
            longitude: -2.0, // Adjust this value to include the westernmost point of the landmass
            latitudeDelta: 8.0, // Adjust this value based on the north-south span of the landmass
            longitudeDelta: 8.0, // Adjust this value based on the east-west span of the landmass
        };

        // Check if the new region is outside the UK boundaries
        const isOutsideBounds =
            newRegion.latitude < ukLandBoundary.latitude - ukLandBoundary.latitudeDelta / 2 ||
            newRegion.latitude > ukLandBoundary.latitude + ukLandBoundary.latitudeDelta / 2 ||
            newRegion.longitude < ukLandBoundary.longitude - ukLandBoundary.longitudeDelta / 2 ||
            newRegion.longitude > ukLandBoundary.longitude + ukLandBoundary.longitudeDelta / 2;


        // If outside bounds, animate the map back to the UK boundaries
        if (isOutsideBounds) {
            console.log('isOutsideBounds', isOutsideBounds);
            mapViewRef?.current?.animateToRegion(ukLandBoundary, 500);
        } else {
            console.log('newRegion.latitude', newRegion.latitude);
            console.log('newRegion.longitude', newRegion.longitude);

            // If within bounds, update the destination based on the new region
            setDestination({
                latitude: newRegion.latitude,
                longitude: newRegion.longitude,
            });
        }
    };



    // const handleRegionChangeComplete = (newRegion: any) => {
    //     // Extract the coordinates from the new region
    //     const { latitude, longitude } = newRegion;
    //     console.log('newRegion', newRegion);

    //     setDestination({
    //         latitude,
    //         longitude
    //     });
    // };


    const handleNavigateToCurrentLocation = (latitude: any, longitude: any) => {
        // You can use the 'location' state to center the map to the user's current location
        // Make sure 'location' is not null before using it

        if (latitude) {
            mapViewRef?.current?.animateToRegion({
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
            });
        }
    };


    return (
        <Modal transparent={true} animationType="fade" visible={showModal}
        // presentationStyle="overFullScreen"
        >
            <SafeAreaView style={styles.viewModalContainer}>
                <TouchableOpacity style={styles.touchBack} onPress={hideModal}>
                    <Image source={Images.IC_ARROW_BACK} style={styles.crossIcon} />
                </TouchableOpacity>


                <View style={{ flex: 1 }}>
                    <MapView
                        ref={mapViewRef}
                        style={{ flex: 1 }}
                        provider={PROVIDER_GOOGLE}
                        initialRegion={region} // Set the initial region
                        loadingEnabled
                        maxZoomLevel={18}
                        onRegionChangeComplete={handleRegionChangeComplete}

                    />
                </View>
                <Animated.View
                    {...panResponder.panHandlers}
                    style={{
                        left: '50%',
                        top: '50%',
                        marginLeft: -24, // Half of the width of your pin
                        marginTop: -48, // Height of your pin 
                        position: 'absolute',
                        width: 48,
                        height: 48,
                        backgroundColor: 'transparent',
                    }}
                >
                    <Image source={Images.IC_PIN} style={{ height: 35, width: 25, resizeMode: 'contain' }} />
                </Animated.View>

                <Button
                    primaryTitle={StringConstants.DONE}
                    onPress={() => {
                        tapOnConfirm(destination)
                    }}
                    containerStyles={{
                        backgroundColor: Colors.ORANGE,
                        position: 'absolute',
                        zIndex: 999,
                        bottom: Platform.OS == 'android' ? 10 : 45,

                    }}
                />
            </SafeAreaView>
        </Modal>
    )
}


const styles = StyleSheet.create({
    viewModalContainer: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        // alignItems: 'center'
    },
    modalView: {
        width: '100%',
        paddingVertical: 35,
        backgroundColor: Colors.WHITE,
        borderRadius: 22,
    },
    touchBack: {
        position: 'absolute',
        top: Platform.OS == 'android' ? 10 : 60,
        zIndex: 999,
        marginRight: 15,
        padding: 10,
    },

    crossIcon: {
        height: 25,
        width: 25
    },
    customRow: {

    },
    emailIcon: {
        height: 60,
        width: 60,
        alignSelf: 'center',
        marginBottom: 20
    },
    textLogout: {
        fontSize: 14,
        fontFamily: Fonts.DM_SANS_REGULAR,
        color: Colors.BLACK,
        marginBottom: 27,
        textAlign: 'center',
        marginHorizontal: 30

    },
    textLogoutWarning: {
        fontSize: 18,
        lineHeight: 26,
        fontFamily: Fonts.DM_SANS_SEMIBOLD,
        color: Colors.BLACK,
        marginBottom: 15,
        textAlign: 'center',
        marginHorizontal: 50

    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    touchButtonCancel: {
        height: 38,
        width: 140,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.BUTTON_GREY,
        borderRadius: 20,

    },
    textCancel: {
        fontFamily: Fonts.DM_SANS_REGULAR,
        fontSize: 14,
        color: Colors.WHITE
    },
    touchButtonSubmit: {
        height: 38,
        width: 140,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.ORANGE,
        borderRadius: 20,
    },
    textLogoutButton: {
        fontFamily: Fonts.DM_SANS_REGULAR,
        fontSize: 14,
        color: Colors.WHITE
    },

})
export default DropPinModal;