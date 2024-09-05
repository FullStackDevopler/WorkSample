import { View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { StringConstants } from '../../Theme/StringConstants'
import { styles } from './styles'
import Header from '../../Components/Header'
import ConfirmationModal from '../../Modals/ConfirmationModal'
import { AppConstants } from '../../Theme/AppConstants'
import Sign from '../../Components/Sign'
import { useDispatch, useSelector } from 'react-redux'
import { clearJobsResponse } from '../../Redux/Reducers/jobListSlice'
import ValidationModal from '../../Modals/ValidationModal'
import { completeJobAction, createBillAction } from '../../Redux/Actions/jobActions'
import { useToast } from 'react-native-toast-notifications'

export default function AddSignature({ navigation, route }: any): React.JSX.Element {
    const dispatch = useDispatch()
   
    // const { amount, additionalAmount, jobId, note } = route?.params
    // console.log('route.params', route?.params);
    

    
    const [showModal, setShowModal] = useState<boolean>(false)
    const [showValidationModal, setShowValidationModal] = useState<boolean>(false)
    const [alertTitle, setAlertTitle] = useState<string>('')

    const accessToken = useSelector((state: any) => state?.persistedReducer.userData.userToken);
    const errorMessage = useSelector((state: any) => state.persistedReducer.jobListData.error);
    const isLoading = useSelector((state: any) => state?.persistedReducer.jobListData.isLoading)
    const completeJobData = useSelector((state: any) => state.persistedReducer.jobListData.completeJobData);
    const createBillData = useSelector((state: any) => state.persistedReducer.jobListData.createBillData);
    // console.log('createBillData', createBillData);



    //    useEffect(() => {
    //     if (!isLoading && createBillData?._id) {
    //         setShowValidationModal(true)
    //         setAlertTitle(StringConstants.BILL_CREATED_SUCCESSFULLY)
    //     }
    // }, [createBillData])

    // useEffect(() => {
    //     if (!isLoading && completeJobData?.message !== ""  && createBillData?._id) {
    //         setShowValidationModal(true)
    //         setAlertTitle(StringConstants.JOB_FINISHED_SUCCESSFULLY)
    //     }
    // }, [completeJobData, createBillData])


    useEffect(() => {
        if (errorMessage != null && !isLoading) {
            setShowValidationModal(true)
            setAlertTitle(`${errorMessage}`)

        } else if (errorMessage == null) {
            setShowValidationModal(false)
            setAlertTitle('')
        }

        return () => { dispatch(clearJobsResponse('error')) }
    }, [errorMessage])


    const tapOnYes = () => {
        setShowModal(false)
        navigation.navigate(AppConstants.screens.ADD_HOTSHOT)
    }

    const hideModal = () => {
        setShowModal(false)
        navigation.navigate(AppConstants.screens.HOME_SCREEN)
    }

   

    const tapOnConfirm = (signatureData: any) => {
        navigation.navigate(AppConstants.screens.MY_IN_JOBS, {signatureData})

        // console.log('jobId',jobId);
        
        
        // const createBillData = {
        //     amount: amount,
        //     additional_amount: additionalAmount,
        //     job_id: jobId,
        //     signature: signatureData,
        //     bill_notes: note
        // }
        

        // const completeJobData = {
        //     jobId: jobId
        // }

        // console.log('body of createBillData=>', createBillData);
         
        // const createbill = dispatch(createBillAction(accessToken, createBillData))
        // const finishJob = dispatch(completeJobAction(accessToken, completeJobData))
 
    }

    return (
        <View style={styles.rootContainer}>
            {showModal &&
                <ConfirmationModal
                    showModal={showModal}
                    hideModal={hideModal}
                    tapOnConfirm={tapOnYes}
                    title={StringConstants.LIKE_TO_CREATE_HOTSHOT}
                    tapOnNo={hideModal}
                />
            }
            {showValidationModal &&
                <ValidationModal
                    showModal={showValidationModal}
                    hideModal={() => {

                        if (alertTitle == StringConstants.JOB_FINISHED_SUCCESSFULLY) {
                            dispatch(clearJobsResponse('createBillData'));
                            dispatch(clearJobsResponse('completeJobData'));
                            setShowValidationModal(false)
                            setAlertTitle('')
                            setTimeout(() => {
                                setShowModal(true)
                            }, 500);
                        } else {
                            dispatch(clearJobsResponse('error'));
                            setShowValidationModal(false)
                            setAlertTitle('')
                        }
                    }}
                    title={alertTitle}
                />
            }
            <Header tapOnBack={() => navigation.goBack()}
                headerText={StringConstants.ADD_SIGNATURE}
            />

            <Sign tapOnConfirm={(signatureData: any)=>tapOnConfirm(signatureData)} />


        </View>
    )
}

