import { AppConstants } from "../../Theme/constants";

export function setupToken(token: string | null) {
    return {
        type: AppConstants.redux.SETUP_TOKEN,
        payload: { token }
    }
}

export function logoutUser() {
    return {
        type: AppConstants.redux.LOGOUT_USER_START,
        payload: {}
    }
}

export function logoutGuestUser() {
    return {
        type: AppConstants.redux.LOGOUT_GUEST_USER,
        payload: {}
    }
}

export function signInAction(username: string, password: string, device: string) {
    return {
        type: AppConstants.redux.SIGNIN_REQUEST_START,
        payload: { username, password, device }
    }
}

export function guestSignInAction() {
    return {
        type: AppConstants.redux.GUEST_SIGNIN,
        payload: {}
    }
}

export function signUpAction(username: string, email: string, password: string) {
    return {
        type: AppConstants.redux.SIGNUP_REQUEST_START,
        payload: { username, email, password }
    }
}

export function forgotPasswordAction(email: string) {
    return {
        type: AppConstants.redux.FORGOT_PASSWORD_REQUEST_START,
        payload: { email }
    }
}

export function changePasswordAction(old_password: string, password: string) {
    return {
        type: AppConstants.redux.CHANGE_PASSWORD_REQUEST_START,
        payload: { old_password, password }
    }
}

export function getProfileAction() {
    return {
        type: AppConstants.redux.GET_PROFILE_START,
        payload: {}
    }
}

export function purchaseSubscriptionAPI(purchaseData) {
    return {
        type: AppConstants.redux.PURCHASE_SUBSCRIPTION_API_START,
        payload: {
            productId: purchaseData.productId,
            transactionReceipt: purchaseData.transactionReceipt,
            transactionId: purchaseData.transactionId,
            transactionDate: purchaseData.transactionDate
        }
    }
}

export function saveFCMToken(fcm_token: string) {
    return {
        type: AppConstants.redux.SAVE_FCM_TOKEN_START,
        payload: { fcm_token }
    }
}

export function reSendVerifictaionEmail(email: string) {
    return {
        type: AppConstants.redux.RESEND_VERIFICATION_EMAIL_START,
        payload: { email }
    }
}

export function setTrackingStatus(status: boolean) {
    return {
        type: AppConstants.redux.SET_TRACKING_STATUS,
        payload: { status }
    }
}

export function updateNetworkState(isConnected: boolean) {
    return {
        type: AppConstants.redux.SET_NETWORK_STATE,
        payload: { isConnected }
    }
}