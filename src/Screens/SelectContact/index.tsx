import { Alert, FlatList, Linking, PermissionsAndroid, Platform, Text, View } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { styles } from "./styles";
import React, { useEffect, useState } from "react";
import ValidationModal from "../../Modals/ValidationModal";
import Header from "../../Components/Header";
import { StringConstants } from "../../Theme/StringConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Contacts from 'react-native-contacts';
import ContactList from "../../Components/ContactList";
import Button from "../../Components/Button";
import { Colors } from "../../Theme/Colors";
import { AppConstants } from "../../Theme/AppConstants";

export default function SelectContact({ navigation, route }: any): React.JSX.Element {
    const toast = useToast()
    const [contactList, setContactList] = useState<any>([])
    const [alertTitle, setAlertTitle] = useState<string>('');
    const [showValidationModal, setShowValidationModal] = useState<boolean>(false);
    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const [selectedContactIndex, setSelectedContactIndex] = useState<number | null>(null);
    const [selectedPhoneNumber, setSelectedPhoneNumber] = useState<string | null>(null);

    useEffect(() => {
        if (Platform.OS == 'ios') {
            checkPermissionIOS();
        } else checkPermissionAndroid()

    }, []);


    const checkPermissionIOS = async () => {
        const permissionDenied = await AsyncStorage.getItem('contactsPermissionDenied');

        const permission = await Contacts.checkPermission();
        // console.log('Permission in checkpermissinios:', permission);
        const requestPermission = await Contacts.requestPermission();
        if (requestPermission == 'authorized') {
            loadContacts()
            await AsyncStorage.removeItem('contactsPermissionDenied',);
            setHasPermission(true)
        } else {
            setHasPermission(false)
            if (permissionDenied == null) {
                await AsyncStorage.setItem('contactsPermissionDenied', '1');
            } else await AsyncStorage.setItem('contactsPermissionDenied', '2');
        }
        const permissionCount = await AsyncStorage.getItem('contactsPermissionDenied');
        if (permissionCount == '2') permissionAlert()
        // console.log('requestPermission in checkpermissinios:', requestPermission);

    }

    const checkPermissionAndroid = async () => {
        const permissionDenied = await AsyncStorage.getItem('contactsPermissionDenied');

        const requestPermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS);
        if (requestPermission == 'granted') {
            setHasPermission(true)
            loadContacts()
            await AsyncStorage.removeItem('contactsPermissionDenied',);
        } else {
            setHasPermission(false)
            if (permissionDenied == null) {
                await AsyncStorage.setItem('contactsPermissionDenied', '1');
            } else if (permissionDenied == '1') {
                await AsyncStorage.setItem('contactsPermissionDenied', '2');
            } else {

                await AsyncStorage.setItem('contactsPermissionDenied', '3');
            }

        }
        const permissionCount = await AsyncStorage.getItem('contactsPermissionDenied');
        if (permissionCount == '3') permissionAlert()

        // console.log('requestPermission in checkpermissinios:', requestPermission);
    }

    const permissionAlert = async () => {
        const permissionDenied = await AsyncStorage.getItem('contactsPermissionDenied');
        // console.log("permissionDenied in permissionAlert", permissionDenied);

        Alert.alert(
            'Permission Required',
            'We do not have access to your contacts. Please grant access to contacts.',
            [
                {
                    text: 'Ask Me Later',
                    onPress: () => { },
                    style: 'cancel',
                },
                {
                    text: 'Go to Settings',
                    onPress: () => { Linking.openSettings() },
                },
            ],
        );

    }

    const loadContacts = async () => {
        try {
            const contacts = await Contacts.getAll();
            //   console.log('Contacts:', JSON.stringify(contacts));
            setContactList(contacts);
            contacts.sort((a,b)=>{
                if(a.givenName > b.givenName){
                    return 1;
                }
                if(a.givenName < b.givenName){
                    return -1;
                }
                return 0;
           });
           
        } catch (error: any) {
            console.log('Error in getAll contacts:', error);
        }
    };

    const tapOnItem = (item: any, index: number) => {
        // console.log('number==>>>',item?.phoneNumbers[0]?.number);
        if (index === selectedContactIndex) {
            setSelectedContactIndex(null);
            setSelectedPhoneNumber(null);
        } else {
            setSelectedContactIndex(index);
            setSelectedPhoneNumber(item?.phoneNumbers[0]?.number || item?.phone_number || null);
        }
    }


    return (
        <View style={styles.rootContainer}>
            {showValidationModal &&
                <ValidationModal
                    showModal={showValidationModal}
                    hideModal={() => {
                        setShowValidationModal(false)
                        setAlertTitle('')
                    }}
                    title={alertTitle}
                />
            }
            <Header tapOnBack={() => navigation.goBack()}
                headerText={StringConstants.ADD_NUMBER}
            />
            {hasPermission == false ?
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={styles.message}>
                        We do not have access to your contacts. Please go to the settings and grant access to contacts.
                    </Text>
                </View>
                :

                <View style={{ flex: 1 }}>
                    <FlatList
                        data={contactList}
                        extraData={contactList}
                        keyExtractor={(item, index) => `${index}`}
                        renderItem={({ item, index }) => {
                            return (
                                <ContactList item={item}
                                    isSelected={index === selectedContactIndex}
                                    tapOnItem={() => tapOnItem(item, index)} />
                            );
                        }}
                    />
                    <Button
                        primaryTitle={StringConstants.DONE}
                        onPress={() => {
                            navigation.navigate(AppConstants.screens.CREATE_JOB_SCREEN, { selectedPhoneNumber })
                        }}
                        containerStyles={{
                            backgroundColor: Colors.ORANGE,
                            position: 'absolute',
                            zIndex: 999,
                            bottom: Platform.OS == 'android' ? 10 : 0,

                        }}
                    />
                </View>
            }
        </View>)
}
