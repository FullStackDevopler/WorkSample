import React, { useEffect, useRef, useState } from "react";
import {
    Image,
    Modal,
    StyleSheet,
    TouchableOpacity,
    View, SafeAreaView, PermissionsAndroid, Platform, Text
} from 'react-native'
import { Colors } from "../Theme/Colors";
import { Fonts } from "../Theme/Fonts";
import { Images } from "../Assets";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";
import Geolocation from 'react-native-geolocation-service';
import { PERMISSIONS, RESULTS, request } from "react-native-permissions";
import MapViewDirections from 'react-native-maps-directions'
import LoaderModal from "./LoaderModal";


interface Location {
    latitude: number;
    longitude: number;
}


interface TrackLocationModalProps {
    showModal: boolean;
    hideModal: () => void;
    destinations?: any
    driverLocation?: Location;
}

const TrackLocationModal: React.FC<TrackLocationModalProps> = ({
    showModal,
    hideModal,
    destinations,
    driverLocation
}) => {
    const mapViewRef = useRef<MapView>(null);
    const [totalDistance, setTotalDistance] = useState<number>(0);
    const [totalDuration, setTotalDuration] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [region, setRegion] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.01,    //initial zoom-in effect vertically 
        longitudeDelta: 0.01,   //initial zoom-in effect horizontally 
    });

    useEffect(() => {
        if (driverLocation) {
            // Update the region when driver's location changes
            setRegion({
                latitude: driverLocation.latitude,
                longitude: driverLocation.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });

            // Optionally, animate to the new region
            mapViewRef?.current?.animateToRegion({
                latitude: driverLocation.latitude,
                longitude: driverLocation.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
        }
    }, [driverLocation]);


    useEffect(() => {
        if (Platform.OS == 'android') {
            requestLocationPermissionAndroid()
        } else {
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
                        setLoading(false);

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

            if (result === RESULTS.GRANTED) {
                Geolocation.getCurrentPosition(
                    (position) => {
                        console.log('position in getCurrentPosition IOS:', position);
                        const { latitude, longitude } = position.coords;
                        handleNavigateToCurrentLocation(latitude, longitude)
                        setRegion({ ...region, latitude, longitude });
                        setLoading(false);
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

    const onReady = (result: any) => {
        // result contains distance and duration information
        setTotalDistance((prevDistance) => prevDistance + result.distance);
        setTotalDuration((prevDuration) => prevDuration + result.duration);

    };

    
    const formatDuration = (durationInMinutes: any) => {
        const hours = Math.floor(durationInMinutes / 60);
        const minutes = durationInMinutes % 60;
    
        if (hours > 0) {
            return `${hours} hr ${minutes.toFixed(0)} min`;
        } else {
            return `${minutes.toFixed(0)} min`;
        }
    };
 
    return (
        <Modal transparent={true} animationType="fade" visible={showModal}>
            <SafeAreaView style={styles.viewModalContainer}>
                <TouchableOpacity style={styles.touchBack} onPress={hideModal}>
                    <Image source={Images.IC_ARROW_BACK} style={styles.crossIcon} />
                </TouchableOpacity>


                <View style={{ flex: 1 }}>
                    {loading ? (
                        <LoaderModal showModal={loading} />
                    ) : (
                        <MapView
                            ref={mapViewRef}
                            style={{ flex: 1 }}
                            provider={PROVIDER_GOOGLE}
                            initialRegion={region}
                            loadingEnabled
                        >

                            {/* Current Location Marker */}
                            {driverLocation && (
                                <Marker coordinate={driverLocation} pinColor={Colors.RED} title="Driver" />
                            )}

                            {/* It shows the marker to every destinations */}
                            {destinations &&
                                destinations.map((item: any, index: number) => (
                                    <Marker
                                        key={index}
                                        coordinate={item}
                                        pinColor={Colors.RED}
                                        title={`Destination ${index + 1}`}
                                    />
                                ))}

                            {/* MapViewDirections to connect driver current Location to the first Destination */}
                            {driverLocation && destinations && destinations.length > 0 && (
                                <MapViewDirections
                                    origin={driverLocation}
                                    destination={destinations[0]}
                                    apikey={'AIzaSyD18in84QdXIsB25ms_snw1C-xxTkQsDd8'}
                                    strokeWidth={1}
                                    strokeColor="blue"
                                    onReady={onReady}
                                />
                            )}

                            {/* MapViewDirections to connect first Destination to another Destinations */}
                            {destinations &&
                                destinations.length > 1 &&
                                destinations.map((item: any, index: number) => (
                                    index < destinations.length - 1 && (
                                        <MapViewDirections
                                            key={index}
                                            origin={item}
                                            destination={destinations[index + 1]}
                                            apikey={'AIzaSyD18in84QdXIsB25ms_snw1C-xxTkQsDd8'}
                                            strokeWidth={1}
                                            strokeColor="blue"
                                            onReady={onReady}
                                        />
                                    )
                                ))}
                        </MapView>
                    )}

                    {totalDistance !== null && totalDuration !== null && (
                        <View style={styles.infoContainer}>
                            <Text>Total Distance: {totalDistance.toFixed(1)} km</Text>
                            <Text>Total Duration: {formatDuration(totalDuration)}</Text>
                        </View>
                    )}
                </View>

            </SafeAreaView>
        </Modal>
    )
}


const styles = StyleSheet.create({
    viewModalContainer: {
        flex: 1,
        backgroundColor: Colors.WHITE,
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
    infoContainer: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: 10,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        elevation: 5
    },

})
export default TrackLocationModal;