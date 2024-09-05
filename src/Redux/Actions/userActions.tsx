import { AppConstants } from "../../Theme/AppConstants"

export function signInAction(myFormData:any) {
    console.log("signinaction in action", myFormData);

    return {
        type: AppConstants.redux.SIGNIN_REQUEST_START,
        payload: { myFormData}
    }
}

// export function signUpAction(username: string, email: string, phoneNumber: string, dob: string, gender: string, addressLine1: string, addressLine2: string, city: string, state: string, zipCode: string, password: string, allDocuments: any, pdfName: string, termsAccepted: boolean, fileExtension: string,  location: string, latitude: number, longitude: number, placeId: string, findAddress: boolean) {
export function signUpAction(myFormData: any){   
return {
        type: AppConstants.redux.SIGNUP_REQUEST_START,
        payload: {myFormData}
        // payload: { username, email, phoneNumber, dob, gender, addressLine1, addressLine2, city, state, zipCode, password, allDocuments, pdfName, termsAccepted, fileExtension, location, latitude, longitude, placeId, findAddress }
    }
}

export function verifyOtp(email: string, otp: string, userId: string) {
    return {
        type: AppConstants.redux.VERIFY_OTP_REQUEST_START,
        payload: { email, otp, userId }
    }
}

export function resendOtp(email: string, userId: string) {
    return {
        type: AppConstants.redux.RESEND_OTP_REQUEST_START,
        payload: { email, userId }
    }
}

export function getProfile(token: string) {
    return {
        type: AppConstants.redux.GET_PROFILE_REQUEST_START,
        payload: { token }
    }
}


export function editProfileAction(formData: any, token: string){
    
return {
        type: AppConstants.redux.EDIT_PROFILE_REQUEST_START,
        payload: {formData, token}
    }
}

export function editProfileImageAction(profileImage: string, token: string) {
    return {
        type: AppConstants.redux.EDIT_PROFILE_IMAGE_REQUEST_START,
        payload: { profileImage, token }
    }
}

export function contactAdminAction(token:string, messageData: any){
    return {
       type:AppConstants.redux.CONTACT_ADMIN_REQUEST_START,
       payload: {token,messageData}
    }
}

export function forgotPasswordAction(  email: string){
    return {
       type:AppConstants.redux.FORGOT_PASSWORD_REQUEST_START,
       payload: {email}
    }
} 

export function changePasswordAction(email: string, oldPassword: string, password: string, token: string) {
    return {
        type: AppConstants.redux.CHANGE_PASSWORD_REQUEST_START,
        payload: { email ,oldPassword, password, token}
    }
}


export function logoutUser(token: string) {
    console.log('logoutUser func ');
    
    return {
        type: AppConstants.redux.LOGOUT_REQUEST_START,
        payload: { token }
    }
}

export function deleteAccountAction(token: string , id: string) {
    return {
        type: AppConstants.redux.DELETE_ACCOUNT_REQUEST_START,
        payload: { token , id}
    }
}

export function getNotificationAction(token: string) {
    return {
        type: AppConstants.redux.NOTIFICATION_LIST_REQUEST_START,
        payload: { token }
    }
}

export function deleteNotificationAction(token: string, notificationId: string) {
    return {
        type: AppConstants.redux.DELETE_NOTIFICATION_REQUEST_START,
        payload: { token , notificationId}
    }
}

export function readNotificationAction(token: string, notificationId: string) {
    return {
        type: AppConstants.redux.READ_NOTIFICATION_REQUEST_START,
        payload: { token , notificationId}
    }
}


export function updateFcmAction(token: string, body: object) {
    return {
        type: AppConstants.redux.UPDATE_FCM_REQUEST_START,
        payload: { token , body}
    }
}
