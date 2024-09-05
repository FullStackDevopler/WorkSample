import { AppConstants } from "../../Theme/constants";


const initialState = {
    token: undefined,
    isGuest: false,
    loading: false,
    error: null,
    signUpResponse: null,
    signInResponse: null,
    isGuestLogin: false,
    profileDetails: null,
    isProUser: false,
    trackingAllowed: false,
    isNetworkConnected: false
}

export default function userReducer(state = initialState, action: any) {
    switch (action.type) {
        case AppConstants.redux.SETUP_TOKEN: {
            return {
                ...state,
                token: action.payload.token
            }
        }
        case AppConstants.redux.LOGOUT_USER_SUCCESS: {
            return {
                ...state,
                token: null,
                isGuest: false,
                loading: false,
                error: null,
                signUpResponse: null,
                signInResponse: null,
                isGuestLogin: false,
                profileDetails: null,
                isProUser: false
            }
        }
        case AppConstants.redux.LOGOUT_GUEST_USER: {
            return {
                ...state,
                token: null,
                isGuest: false,
                loading: false,
                error: null,
                signUpResponse: null,
                signInResponse: null,
                isGuestLogin: false,
                profileDetails: null,
                isProUser: false
            }
        }
        case AppConstants.redux.LOGOUT_USER_DIRECTLY: {
            return {
                ...state,
                token: null,
                isGuest: false,
                loading: false,
                error: null,
                signUpResponse: null,
                signInResponse: null,
                isGuestLogin: false,
                profileDetails: null,
                isProUser: false
            }
        }
        case AppConstants.redux.SIGNIN_REQUEST_START: {
            return {
                ...state,
                loading: true,
                error: null
            }
        }
        case AppConstants.redux.SIGNIN_REQUEST_SUCCESS: {
            return {
                ...state,
                signInResponse: action.data,
                loading: false,
                error: null,
                isGuestLogin: false
            }
        }
        case AppConstants.redux.SIGNIN_REQUEST_ERROR: {
            return {
                ...state,
                signInResponse: null,
                loading: false,
                error: action.error
            }
        }
        case AppConstants.redux.GUEST_SIGNIN: {
            return {
                ...state,
                loading: false,
                error: null,
                isGuestLogin: true
            }
        }
        case AppConstants.redux.SIGNUP_REQUEST_START: {
            return {
                ...state,
                signUpResponse: null,
                loading: true,
                error: null
            }
        }
        case AppConstants.redux.SIGNUP_REQUEST_SUCCESS: {
            return {
                ...state,
                signUpResponse: action.data,
                loading: false,
                error: null
            }
        }
        case AppConstants.redux.SIGNUP_REQUEST_ERROR: {
            return {
                ...state,
                signUpResponse: null,
                loading: false,
                error: action.error
            }
        }
        case AppConstants.redux.FORGOT_PASSWORD_REQUEST_START: {
            return {
                ...state,
                loading: true,
                error: null
            }
        }
        case AppConstants.redux.FORGOT_PASSWORD_REQUEST_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: null
            }
        }
        case AppConstants.redux.FORGOT_PASSWORD_REQUEST_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error
            }
        }
        case AppConstants.redux.GET_PROFILE_START: {
            return {
                ...state,
                loading: true,
                error: null
            }
        }
        case AppConstants.redux.GET_PROFILE_SUCCESS: {
            return {
                ...state,
                loading: false,
                profileDetails: action.data,
                isProUser: action.data?.data?.pro_status,
                error: null
            }
        }
        case AppConstants.redux.GET_PROFILE_ERROR: {
            return {
                ...state,
                loading: false,
                profileDetails: null,
                error: action.error
            }
        }
        case AppConstants.redux.PURCHASE_SUBSCRIPTION_API_START: {
            return {
                ...state,
                loading: true,
                error: null
            }
        }
        case AppConstants.redux.PURCHASE_SUBSCRIPTION_API_SUCCESS: {
            return {
                ...state,
                loading: false,
                subscriptionApiResponse: action.data,
                isProUser: true,
                error: null
            }
        }
        case AppConstants.redux.PURCHASE_SUBSCRIPTION_API_ERROR: {
            return {
                ...state,
                loading: false,
                subscriptionApiResponse: null,
                isProUser: false,
                error: action.error
            }
        }
        case AppConstants.redux.RESEND_VERIFICATION_EMAIL_START: {
            return {
                ...state,
                loading: true,
                error: null
            }
        }
        case AppConstants.redux.RESEND_VERIFICATION_EMAIL_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: null
            }
        }
        case AppConstants.redux.RESEND_VERIFICATION_EMAIL_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error
            }
        }
        case AppConstants.redux.SET_TRACKING_STATUS: {
            return {
                ...state,
                trackingAllowed: action.payload.status,
            }
        }
        case AppConstants.redux.SET_NETWORK_STATE: {
            return {
                ...state,
                isNetworkConnected: action.payload.isConnected
            }
        }
        default:
            return state;
    }
}