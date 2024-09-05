import { Alert, FlatList, Text, View } from "react-native";
import Header from "../../Components/Header";
import React, { useEffect, useState } from "react";
import { StringConstants } from "../../Theme/StringConstants";
import UnAssignedJobItem from "../../Components/UnassignedJobItem";
import { Colors } from "../../Theme/Colors";
import { useDispatch, useSelector } from "react-redux";
import ValidationModal from "../../Modals/ValidationModal";
import { clearHotshotResponse } from "../../Redux/Reducers/hotshotSlice";
import LoaderModal from "../../Modals/LoaderModal";
import { checkInternetConnection } from "../../Components/InternetConnection";
import { acceptHotshotProposal, getProposalsListAction } from "../../Redux/Actions/hotshotActions";
import { Fonts } from "../../Theme/Fonts";
import HotshotProposal from "../../Components/HotshotProposal";
import { AppConstants } from "../../Theme/AppConstants";


export default function ProposalScreen({ navigation, route }: any): React.JSX.Element {
    const dispatch = useDispatch()

    const [showValidationModal, setShowValidationModal] = useState<boolean>(false)
    const [alertTitle, setAlertTitle] = useState<string>('')

    const proposalsList = useSelector((state: any) => state.persistedReducer.hotshotListData.proposalsList);
    const acceptProposalResponse = useSelector((state: any) => state.persistedReducer.hotshotListData.acceptProposalResponse);
    const isLoading = useSelector((state: any) => state?.persistedReducer.hotshotListData.isLoading)
    const errorMessage = useSelector((state: any) => state.persistedReducer.hotshotListData.error);
    const accessToken = useSelector((state: any) => state?.persistedReducer.userData.userToken);
    console.log('acceptProposalResponse in ProposalScreen=>>>', JSON.stringify(acceptProposalResponse));

    useEffect(()=>{

        console.log("acceptProposalResponse in useEffect==>>>",JSON.stringify(acceptProposalResponse));
        
        if(acceptProposalResponse && !isLoading){
            setAlertTitle(StringConstants.HOTSHOT_PROPOSAL_ACCEPTED_SUCCESSFULLY)
            setShowValidationModal(true)
        }

    },[acceptProposalResponse])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const isConnected = await checkInternetConnection();

                if (!isConnected) {
                    setAlertTitle(StringConstants.PLEASE_CHECK_YOUR_INTERNET_CONNECTION);
                    setShowValidationModal(true);
                }
                else {
                    getProposals()
                }
            } catch (error) {
                console.error('Error checking internet connection:', error);
            }
        };

        fetchData();
    }, []);

    const getProposals = async () => {
        let body = {
            hotshot_id: route?.params?.hotshotId
        }
        await dispatch(getProposalsListAction(accessToken, body))
    }

    useEffect(() => {

        if (errorMessage != null && !isLoading) {
            setShowValidationModal(true)
            setAlertTitle(`${errorMessage}`)

        } else if (errorMessage == null) {
            setShowValidationModal(false)
            setAlertTitle('')
        }
    }, [errorMessage])

  

    const tapOnAcceptHotshot = (hotshotId: string, userId: string) => {
        let body ={
            hotshot_id: hotshotId,
            sender_id: userId
        }

        dispatch(acceptHotshotProposal(accessToken, body))

    }


    return (
        <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            {showValidationModal &&
                <ValidationModal
                    showModal={showValidationModal}
                    hideModal={() => {
                        if(alertTitle === StringConstants.HOTSHOT_PROPOSAL_ACCEPTED_SUCCESSFULLY){
                            setShowValidationModal(false)
                            setAlertTitle('')
                            dispatch(clearHotshotResponse('acceptProposalResponse'))
                            navigation.navigate(AppConstants.screens.HOTSHOT_SCREEN, {addHotshot: true})
                        } 
                        else {
                            setShowValidationModal(false)
                            setAlertTitle('')
                            dispatch(clearHotshotResponse('error'))
                        }
                    }}
                    title={alertTitle}
                />
            }
            {isLoading &&
                <LoaderModal showModal={isLoading} />
            }
            <Header tapOnBack={() => navigation.goBack()}
                headerText={StringConstants.PROPOSAL}
            />


            {
                proposalsList && proposalsList.length > 0 ?
                    <FlatList
                       
                        data={proposalsList}
                        extraData={proposalsList}
                        renderItem={({ item, index }) => {
                            return (
                                <HotshotProposal item={item}
                                    index={index}
                                    jobType="Proposals"
                                    tapOnAcceptHotshot={(hotshotId: string, userId: string) => {
                                        tapOnAcceptHotshot(hotshotId, userId)
                                    }}
                                />
                            )
                        }}
                    />

                    :

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{
                            fontSize: 16,
                            fontFamily: Fonts.DM_SANS_REGULAR,
                            color: Colors.LIGHT_GREY2,
                            marginHorizontal: 28,
                            textAlign: 'center',

                        }}>{'No Proposals found'}</Text>
                    </View>
            }
        </View>
    )
}
