import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StringConstants } from "../../Theme/StringConstants";
interface VerifyOtpResponse {
    accessToken: string;
}
type DeleteResponseAction = {
    type: string;
    payload: string;
};

const initialState = {
    userToken: null,
    isLoading: false,
    userDetails: null,
    signInResponse: null,
    signUpResponse: null,
    verifyOtpResponse: null,
    resendOtpResponse: null,
    error: null,
    profileDetails: {},
    editedProfileResponse: {},
    contactAdminResponse: null,
    forgotPasswordResponse: null,
    changePasswordResponse: null,
    logoutResponse: null,
    deleteAccountResponse: null,
    notificationData: [],
    deletedNotificationResponse: {},
    readNotificationResponse: {},
    fcmTokenResponse: {}
}

const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState: initialState,
    reducers: {

        saveAccessToken(state: any = initialState, action: any) {
            console.log('state in saveAccessToken=>>', JSON.stringify(state));
            console.log("action in saveAccessToken=>>", action);
            return {
                ...state,
                userToken: action.payload.accessToken
            }
        },

        authenticationRequestStart(state: any = initialState, action: PayloadAction<{ [key: string]: null } | string>) {
            // console.log('state in signInRequestStart=>>', JSON.stringify(state));
            console.log("action.payload in signInRequestStart=>>", action);
            state.isLoading = true;


            if (typeof action.payload === "string") {
                // Handle the case where payload is a string (e.g., 'signInResponse')
                state.error = null;
                state[action.payload] = null;
            }
        },

        saveSignInResponse(state: any = initialState, action: PayloadAction<{ signInResponse?: object; errorMessage?: string }>) {

            state.isLoading = false
            if (action.payload.signInResponse) {
                state.signInResponse = action.payload.signInResponse

            } else if (action.payload.errorMessage) {
                state.error = action.payload.errorMessage
            }

        },
        saveSignUpResponse(state: any = initialState, action: PayloadAction<{ signUpResponse?: object; errorMessage?: string }>) {
            console.log("signup response 200 in userinfoslice saveSignUpResponse");

            state.isLoading = false
            if (action.payload.signUpResponse) {
                console.log("action.payload.signUpResponse in userinfoslice");

                state.signUpResponse = action.payload.signUpResponse
            } else if (action.payload.errorMessage) {
                console.log("else of ction.payload.errorMessage userinfoslice");

                state.error = action.payload.errorMessage
            }
        },
        saveVerifyOtpResponse(state: any = initialState, action: PayloadAction<{ verifyOtpResponse?: VerifyOtpResponse; errorMessage?: string }>) {

            state.isLoading = false
            if (action.payload.verifyOtpResponse) {
                state.verifyOtpResponse = action.payload.verifyOtpResponse
                state.userToken = action.payload.verifyOtpResponse.accessToken


            } else if (action.payload.errorMessage) {
                state.error = action.payload.errorMessage
            }

        },
        saveResendOtpResponse(state: any = initialState, action: PayloadAction<{ resendOtpResponse?: object; errorMessage?: string }>) {

            state.isLoading = false
            if (action.payload.resendOtpResponse) {
                state.resendOtpResponse = action.payload.resendOtpResponse


            } else if (action.payload.errorMessage) {
                state.error = action.payload.errorMessage
            }

        },
        saveForgotPasswordResponse(state: any = initialState, action: PayloadAction<{ forgotPasswordResponse?: string; errorMessage?: string }>) {
    //   console.log("state in saveForgotPasswordResponse", JSON.stringify(state));
    //   console.log("action.payload.errorMessage in saveForgotPasswordResponse",JSON.stringify(action));
      
      
            state.isLoading = false
            if (action.payload.forgotPasswordResponse) {
                state.forgotPasswordResponse = action.payload.forgotPasswordResponse

            } else if (action.payload.errorMessage) {
                // console.log("in error message userinfolice");
                state.error = action.payload.errorMessage
            }

        },
        saveChangePasswordResponse(state: any = initialState, action: PayloadAction<{ changePasswordResponse?: string; errorMessage?: string }>) {

            state.isLoading = false
            if (action.payload.changePasswordResponse) {
                state.changePasswordResponse = action.payload.changePasswordResponse

            } else if (action.payload.errorMessage) {
                state.error = action.payload.errorMessage
            }

        },
        deleteSignInResponse(state: any = initialState, action: DeleteResponseAction) {
            console.log("action in deleteSignInResponse=>>", action);
            // return {
            //     ...state,
            //     [action.payload]: null,
            //     isLoading: false,
            // }

            if (action.payload !== 'forgotPasswordResponse') {
                state[action.payload] = null
                state.isLoading = false
            }
        },
        deleteForgetPasswordResponse(state: any = initialState, action: DeleteResponseAction) {
            console.log("action in deleteForgetPasswordResponse=>>", action);
                state[action.payload] = null;
                state.isLoading = false;
            // return {
            //     ...state,
            //     [action.payload]: null,
            //     isLoading: false,
            // }
        },


        getUserProfile(state: any = initialState, action: PayloadAction<{ profileDetails?: object; errorMessage?: string }>) {


            state.isLoading = false
            if (action.payload.profileDetails) {
                state.profileDetails = action.payload.profileDetails
            } else if (action.payload.errorMessage) {
                state.error = action.payload.errorMessage
            }
        },
        editUserProfile(state: any = initialState, action: PayloadAction<{ profileDetails?: object; errorMessage?: string; profileImage?: any }>) {


            state.isLoading = false
            if (action.payload.profileDetails) {
                state.profileDetails = { ...state.profileDetails, ...action.payload.profileDetails }
                state.editedProfileResponse = { ...state.editedProfileResponse, ...action.payload.profileDetails }
            } else if (action.payload.profileImage) {
                const tempObj = { ...state.profileDetails, photo: action.payload.profileImage.imagePath }
                state.profileDetails = tempObj
                state.editedProfileResponse = tempObj;
            } else if (action.payload.errorMessage) {
                state.error = action.payload.errorMessage
            }
        },

        contactAdmin(state: any = initialState, action: PayloadAction<{ contactAdminResponse?: object; errorMessage?: string; profileImage?: any }>) {
            state.isLoading = false
            if (action.payload.contactAdminResponse) {
                state.contactAdminResponse = action.payload.contactAdminResponse
            } else if (action.payload.errorMessage) {
                state.error = action.payload.errorMessage
            }
        },
        logoutUser(state: any = initialState, action: PayloadAction<{ logoutResponse?: string; errorMessage?: string }>) {


            state.isLoading = false
            state.logoutResponse = action.payload.logoutResponse
            state.userToken = null
            state.profileDetails = {}
            state.editedProfileResponse = {}
            state.verifyOtpResponse = null


        },
        deleteToken(state: any = initialState) {
            state.isLoading = false
            state.userToken = null
            state.profileDetails = {}
            state.editedProfileResponse = {}
            state.verifyOtpResponse = null

        },
        deleteAccount(state: any = initialState, action: PayloadAction<{ deleteAccountResponse?: string; errorMessage?: string }>) {
            console.log('state in deleteAccount', state);
            console.log('action in deleteAccount', action);

            state.isLoading = false
            if (action.payload.deleteAccountResponse) {
                state.deleteAccountResponse = action.payload.deleteAccountResponse
                state.userToken = null
                state.profileDetails = {}
                state.editedProfileResponse = {}
                state.verifyOtpResponse = null
            }
            else if (action.payload.errorMessage) {
                state.error = action.payload.errorMessage
            }

        },
        getNotificationListing(state: any = initialState, action: PayloadAction<{ notificationData?: string, errorMessage?: string }>) {
            // console.log('state in getNotificationListing=>>', JSON.stringify(state));
            // console.log("action in getNotificationListing=>>", action);
            state.isLoading = false;
            if (action.payload.notificationData) {
                state.notificationData = action.payload.notificationData
            }
            else if (action.payload.errorMessage) {
                state.error = action.payload.errorMessage
            }
        },
        deleteNotification(state: any = initialState, action: PayloadAction<{ deletedNotificationResponse?: any }>) {

            state.isLoading = false;
            state.error = null;
            state.deletedNotificationResponse = action.payload.deletedNotificationResponse

            let tempData = [...state.notificationData];
            const index = tempData.findIndex(item => item._id == action.payload.deletedNotificationResponse._id)

            if (index !== -1) {
                tempData.splice(index, 1);
            }
            state.notificationData = tempData

        },
        readNotification(state: any = initialState, action: PayloadAction<{ readNotificationResponse?: any }>) {

            state.isLoading = false;
            state.error = null;
            state.readNotificationResponse = action.payload.readNotificationResponse

            let tempData = [...state.notificationData];
            const index = tempData.findIndex(item => item._id == action.payload.readNotificationResponse._id)
            console.log('index in readNotification=>>>', index);
            console.log('tempData before splice==>>>', JSON.stringify(tempData));


            if (index !== -1) {
                tempData.splice(index, 1, action.payload.readNotificationResponse);
                console.log('tempData after splice==>>>', JSON.stringify(tempData));
            }
            state.notificationData = tempData


        },
        updateFcmToken(state: any = initialState, action: PayloadAction<{ fcmTokenResponse?: object; errorMessage?: string }>) {
            state.isLoading = false
            if (action.payload.fcmTokenResponse) {
                state.fcmTokenResponse = action.payload.fcmTokenResponse
            } else if (action.payload.errorMessage) {
                state.error = action.payload.errorMessage
            }
        },

        loadingUserState(state: any = initialState) {
            console.log("loadingUserState loadingUserState userinfoslice");

            state.isLoading = false
        },
        notificationRequestError(state: any = initialState, action: PayloadAction<{ errorMessage?: string }>) {

            state.isLoading = false;
            state.error = action.payload.errorMessage
        },
    }
})




export const {
    saveSignInResponse,
    saveSignUpResponse,
    authenticationRequestStart,
    saveVerifyOtpResponse,
    saveResendOtpResponse,
    saveForgotPasswordResponse,
    saveChangePasswordResponse,
    deleteSignInResponse,
    deleteForgetPasswordResponse,
    getUserProfile,
    editUserProfile,
    logoutUser, deleteAccount,
    contactAdmin,
    deleteToken,
    getNotificationListing,
    deleteNotification,
    readNotification,
    updateFcmToken,
    loadingUserState,
    notificationRequestError,
} = userInfoSlice.actions

export default userInfoSlice.reducer; 