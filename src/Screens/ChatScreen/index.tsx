import { FlatList, Image, Keyboard, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { Images } from "../../Assets";
import { Colors } from "../../Theme/Colors";
import ChatItem from "./ChatItem";
import { StringConstants } from "../../Theme/StringConstants";
import React, { useEffect, useRef } from "react";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import { ApiConstants } from "../../Theme/ApiConstants";
import { SocketManager, socket } from "../../Components/SocketManager";
import { capitalizeFirstLetter } from "../../Theme/Helper";
import { useDispatch, useSelector } from "react-redux";
import { getChatAction } from "../../Redux/Actions/hotshotActions";
import { clearHotshotResponse } from "../../Redux/Reducers/hotshotSlice";
import ValidationModal from "../../Modals/ValidationModal";
import LoaderModal from "../../Modals/LoaderModal";


export default function ChatScreen({ navigation, route }: any): React.JSX.Element {
    const dispatch = useDispatch()
    const flatListRef = useRef<FlatList | null>(null);

    const accessToken = useSelector((state: any) => state?.persistedReducer.userData.userToken);
    const isLoading = useSelector((state: any) => state?.persistedReducer.hotshotListData.isLoading)
    const errorMessage = useSelector((state: any) => state?.persistedReducer.hotshotListData.error)
    const getChatData = useSelector((state: any) => state.persistedReducer.hotshotListData.getChatData);
    // console.log('getChatData in ChatScreen=>>', getChatData);

    const { item } = route.params
    // console.log("paarms item in chatscreen", JSON.stringify(item));
    const [message, setMessage] = React.useState<any>()
    const [chatMessageList, setChatMessageList] = React.useState<any[]>([])
    const [showValidationModal, setShowValidationModal] = React.useState<boolean>(false)
    const [alertTitle, setAlertTitle] = React.useState<string>('')

    useEffect(() => {
        getChats()
    }, [])

    const getChats = async () => {
        let body = {
            job_id: route?.params?.item?._id
        }

        // console.log("body in getchat==>>", body);
        dispatch(getChatAction(accessToken, body))
    }

    useEffect(() => {
        if (getChatData) {
            setChatMessageList(getChatData)
        }

    }, [getChatData])

    useEffect(() => {
        if (errorMessage != null && !isLoading) {
            setShowValidationModal(true)
            setAlertTitle(`${errorMessage}`)
        }

        return () => {
            dispatch(clearHotshotResponse('error'))
        }
    }, [errorMessage])



    useEffect(() => {
        // Add event listeners here if needed
        socket.on('chatMessage', (data: any) => {
            console.log('called chatMessage sockets in useEffect:', data);
            updateMessageList(data)
        });

        return () => {
            // Remove event listeners if needed
            socket.removeAllListeners();
        };
    }, []);

    const updateMessageList = (data: any) => {
        if (data?.driverId === item?.createdBy) {
            setChatMessageList(prevList => {
                let tempList = [...prevList];
                tempList.push(data);
                return tempList;
            });

        }  else {
            console.log("called in else in chat screen ");
        }


    }

    const tapOnSend = () => {
        Keyboard.dismiss()
       
        let socketBody ={
            userId: item?.users[0]?._id || item?.users?._id, 
            driverId: item?.createdBy, 
            sendBy: 'driver' ,
            message: message, 
            type: 'hotshot', 
            job_id: item?._id,
            receiverId: item?.users[0]?._id || item?.users?._id,
        }

        // console.log("socket body in tapOnSend==>>>", socketBody);
        callSocketEvent(socketBody)
    }


    const callSocketEvent = (body: any) => {
        // console.log('body in callSocketEvent', body);

        try {
            socket.emit("chatMessage", body)
            setMessage('')
        } catch (error) {
            console.log("error while sending socket message", JSON.stringify(error));
        }

    }

    const getUserProfileImage = () => {
        if (item?.users[0]?.photo !== null && item?.users?.photo !== null) {
            return { uri: item?.users[0]?.photo || item?.users?.photo }
        } else {
            return Images.IC_PICKER
        }
    }


  


    //   useEffect(() => {
    //     if (getChatData.length > 0 && flatListRef.current) {
    //       setTimeout(() => {
    //         if (flatListRef.current) {
    //           flatListRef.current.scrollToEnd({ animated: true });
    //         }
    //       }, 0);
    //     }
    //   }, [getChatData]);

    //   const onContentSizeChange = () => {
    //     if (flatListRef.current && getChatData.length > 0) {
    //       setTimeout(() => {
    //         if (flatListRef.current) {
    //           flatListRef.current.scrollToEnd({ animated: true });
    //         }
    //       }, 0);
    //     }
    //   };
    
    
    
    

    return (
        <View style={styles.rootContainer}>
            {isLoading &&
                <LoaderModal showModal={isLoading} />
            }
            {showValidationModal &&
                <ValidationModal
                    showModal={showValidationModal}
                    hideModal={() => {
                        dispatch(clearHotshotResponse('error'));
                        setShowValidationModal(false)
                        setAlertTitle('')
                    }}
                    title={alertTitle}
                />
            }
            <View style={styles.header}>
                <TouchableOpacity style={styles.touchableBackArrow} onPress={() => navigation.goBack()}>
                    <Image source={Images.IC_ARROW_BACK} style={styles.backArrow} />
                </TouchableOpacity>
                <Image source={getUserProfileImage()} style={styles.profilePicture} />

                <Text style={styles.fullName}>{capitalizeFirstLetter(item?.users[0]?.full_name) || capitalizeFirstLetter(item?.users?.full_name)}</Text>
            </View>

            <SocketManager url={ApiConstants.MEDIA_BASE_URL}>
                <KeyboardAwareScrollView
                    automaticallyAdjustKeyboardInsets={true}
                    onScrollBeginDrag={() => Keyboard.dismiss()}
                    enableAutomaticScroll={true}
                    bounces={false}
                >
                    <FlatList 
                        // ref={flatListRef}
                        style={{
                            flex: 1,
                            backgroundColor: Colors.WHITE,
                        }}
                        data={chatMessageList}
                        extraData={chatMessageList}
                        keyExtractor={(item, index) => `${index}`}
                        renderItem={({ item, index }) => {
                            return <ChatItem item={item}
                                index={index}
                                profileImage ={route?.params?.item?.users[0]?.photo || route?.params?.item?.users?.photo}
                              
                            />
                        }}
                        bounces={false}
                        // onContentSizeChange={onContentSizeChange}
                        
                    />



                </KeyboardAwareScrollView>
                <View style={styles.bottomChatView} >
                    <TextInput
                        style={styles.input}
                        placeholderTextColor={Colors.DARK_GREY}
                        value={message}
                        placeholder={StringConstants.TYPE_A_MESSAGE}
                        onChangeText={val => setMessage(val)}
                        multiline={true}
                        onSubmitEditing={tapOnSend}
                    />

                    <TouchableOpacity onPress={tapOnSend}
                        style={{ padding: 10, paddingBottom: Platform.OS == 'ios' ? -10 : 0 }}>
                        <Image source={Images.IC_MESSAGE_SENT} />
                    </TouchableOpacity>
                </View>
            </SocketManager>
        </View>
    )
}
