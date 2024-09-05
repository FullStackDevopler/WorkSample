import { put, call, takeLatest } from 'redux-saga/effects';
import { AppConstants } from '../../Theme/AppConstants';
import { NetworkRequestManager } from '../../Manager/NetworkRequestManager';
import {
  saveSignInResponse, authenticationRequestStart, saveVerifyOtpResponse,
  getUserProfile, saveSignUpResponse, saveResendOtpResponse, editUserProfile,
  contactAdmin, saveForgotPasswordResponse, deleteAccount, saveChangePasswordResponse, logoutUser,
  deleteToken,
  getNotificationListing,
  readNotification,
  notificationRequestError,
  deleteNotification,
  updateFcmToken
} from '../Reducers/userInfoSlice';
import { AppLogger } from '../../Theme/utils';

export function* SignInSaga(action: any) {
  const { myFormData } = action.payload;
  console.log('action.payload in sign in saga: ', action.payload);
  yield put(authenticationRequestStart('signInResponse'))

  try {
    const response: { status: number; data?: any; message?: string, error?: string } = yield call(
      NetworkRequestManager.SignIn, myFormData);

    console.log('response in Sign in Saga', response);

    if (response.status === 200 || response.status === 201) {
      console.log("status is 200 signin in signinsaag");
      yield put(saveSignInResponse({ signInResponse: response?.data }));
    }

    else {
      const errorMessage = response?.error || response?.message || "Something went wrong";
      yield put(saveSignInResponse({ errorMessage }));

    }
  } catch (err: any) {
    console.log("in error of SignInSaga", err);

    const errorMessage = err?.message || "An unexpected error occurred";
    yield put(saveSignInResponse({ errorMessage }));

  }
}

export function* SignUpSaga(action: any) {

  const { myFormData } = action.payload

   yield put(authenticationRequestStart('signUpResponse'))
   

  try {
    const response: { status: number; data?: any; message?: string } = yield call(
      NetworkRequestManager.SignUp, myFormData
    )
    console.log('SignUp response saga=>', response);

    if (response.status === 200 || response.status === 201) {
      console.log("signup response 200 in usersaga");
      
      yield put(saveSignUpResponse({ signUpResponse: response?.data }));
    }
    else {
      console.log("signup response else in usersaga");
      const errorMessage = response?.message || "Something went wrong";
      console.log('errorMessage in sign up saga', errorMessage);

      yield put(saveSignUpResponse({ errorMessage }));

    }
  } catch (err: any) {
    
    console.log("err in catch in SignUpSaga:", err);

    const errorMessage = err?.message || "An unexpected error occurred";
    yield put(saveSignUpResponse({ errorMessage }));
  }
}

export function* ForgotPasswordSaga(action: any) {
  const { email } = action.payload;
  console.log('action.payload in ForgotPasswordSaga: ', action.payload);
  yield put(authenticationRequestStart('forgotPasswordResponse'))

  try {
    const response: { status: number; data?: any; message?: string } = yield call(
      NetworkRequestManager.ForgotPassword, email);

    console.log('response in ForgotPasswordSaga', response);

    if (response.status === 200 || response.status === 201) {
      console.log("status is 200 ForgotPasswordSaga");
      yield put(saveForgotPasswordResponse({ forgotPasswordResponse: response?.message }));
    }

    else {
      console.log("in else of ForgotPasswordSaga",);
      const errorMessage = response?.message || "Something went wrong";
      yield put(saveForgotPasswordResponse({ errorMessage }));

    }
  } catch (err: any) {
    console.log("in error of ForgotPasswordSaga", err);

    const errorMessage = err?.message || "An unexpected error occurred";
    yield put(saveForgotPasswordResponse({ errorMessage }));

  }
}

export function* ChangePasswordSaga(action: any) {
  const { email, oldPassword, password, token } = action.payload;
  console.log('action.payload in ChangePasswordSaga: ', action.payload);
  yield put(authenticationRequestStart('changePasswordResponse'))

  try {
    const response: { status: number; data?: any; message?: string, error: string } = yield call(
      NetworkRequestManager.ChangePassword, email, oldPassword, password, token);

    console.log('response in ChangePasswordSaga', response);

    if (response.status === 200 || response.status === 201) {
      yield put(saveChangePasswordResponse({ changePasswordResponse: response?.message }));
    }
    else if (response.status === 401) {
      const errorMessage = response?.message || "Something went wrong";
      yield put(saveChangePasswordResponse({ errorMessage }));
      yield put(deleteToken());
    }
    else {
      console.log("in else of ChangePasswordSaga",);
      const errorMessage = response.error || response?.message || "Something went wrong";
      console.log('errorMessage in ChangePasswordSaga==>>', errorMessage);

      yield put(saveChangePasswordResponse({ errorMessage }));

    }
  } catch (err: any) {
    console.log("in error of ChangePasswordSaga", err);

    const errorMessage = err?.message || "An unexpected error occurred";
    yield put(saveChangePasswordResponse({ errorMessage }));

  }
}


export function* VerifyOtpSaga(action: any) {
  const { email, otp, userId } = action.payload;

  yield put(authenticationRequestStart('verifyOtpResponse'));

  try {
    const response: { status: number; data?: any; message?: string, error: string } = yield call(
      NetworkRequestManager.verifyOtp, email, otp, userId);

    // console.log('response in VerifyOtpSaga Saga', response); 

    if (response.status === 200 || response.status === 201) {
      console.log("status is 200 VerifyOtpSaga VerifyOtpSaga");
      yield put(saveVerifyOtpResponse({ verifyOtpResponse: response?.data }));
    }
    else {
      const errorMessage = response.error || response?.message || "Something went wrong";
      yield put(saveVerifyOtpResponse({ errorMessage }))
    }
  } catch (err: any) {
    console.log('err in catch in VerifyOtpSaga==>>>>', err);

    const errorMessage = err?.message || "An unexpected error occurred";
    yield put(saveVerifyOtpResponse({ errorMessage }));

  }
}

export function* ResendOtpSaga(action: any) {
  const { email, userId } = action.payload;
  console.log('action.payload in RESENDOtpSaga saga: ', action.payload);

  yield put(authenticationRequestStart('resendOtpResponse'));

  try {
    const response: { status: number; data?: any; message?: string, validationError: string } = yield call(
      NetworkRequestManager.resendOtp, email, userId);

    console.log('response in ResendOtpSaga Saga', response);

    if (response.status === 200) {
      console.log("status is 200 ResendOtpSaga ResendOtpSaga");

      yield put(saveResendOtpResponse({ resendOtpResponse: response?.data }));   //in generator func  

    }

    else {
      let errorMessage
      errorMessage = response?.message == 'Bad Request' && response?.validationError || response?.message || 'Something went wrong'
      yield put(saveResendOtpResponse({ errorMessage }));

    }
  } catch (err: any) {
    AppLogger("ResendOtpSaga Catch Error", err);
    const errorMessage = err?.message || "An unexpected error occurred";
    yield put(saveResendOtpResponse({ errorMessage }));

  }
}



export function* GetProfileSaga(action: any) {
  const { token } = action.payload;
  yield put(authenticationRequestStart('profileDetails'))

  try {
    const response: { status: number; data?: any; message?: string } = yield call(
      NetworkRequestManager.GetProfile, token
    );

    // AppLogger("GetProfileSaga Response=>", JSON.stringify(response));

    if (response.status === 200 || response.status === 201) {
      yield put(getUserProfile({ profileDetails: response?.data }));
    }
    else if (response.status === 401) {
      yield put(deleteToken());
    }
    else {
      const errorMessage = response?.message || "Something went wrong";
      AppLogger("GetProfileSaga Error=>", errorMessage);
      yield put(getUserProfile({ errorMessage }));

    }
  } catch (err: any) {
    const errorMessage = err?.message || "An unexpected error occurred";
    AppLogger("GetProfileSaga Catch Error", err);
    yield put(getUserProfile({ errorMessage }));

  }
}


export function* EditProfileSaga(action: any) {
  const { formData, token } = action.payload;

  yield put(authenticationRequestStart('editedProfileResponse'))

  try {
    const response: { status: number; data?: any; message?: string } = yield call(
      NetworkRequestManager.EditProfile, formData, token
    );

    AppLogger("EditProfileSaga Response=>", JSON.stringify(response));

    if (response.status === 200 || response.status === 201) {
      yield put(editUserProfile({ profileDetails: response?.data }));
    }
    else if (response.status === 401) {
      yield put(deleteToken());
    }

    else {
      const errorMessage = response?.message || "Something went wrong";
      AppLogger("EditProfileSaga Error=>", errorMessage);
      yield put(editUserProfile({ errorMessage }));

    }
  } catch (err: any) {
    const errorMessage = err?.message || "An unexpected error occurred";
    AppLogger("EditProfileSaga Catch Error", err);
    yield put(editUserProfile({ errorMessage }));

  }
}

export function* EditProfileImageSaga(action: any) {
  const { profileImage, token } = action.payload;
  yield put(authenticationRequestStart('profileImage'))

  try {
    const response: { status: number; data?: any; message?: string } = yield call(
      NetworkRequestManager.EditProfileImage, profileImage, token
    );

    AppLogger("EditProfileImageSaga Response=>", JSON.stringify(response));

    if (response.status === 200 || response.status === 201) {
      yield put(editUserProfile({ profileImage: response?.data }));
    }
    else if (response.status === 401) {
      yield put(deleteToken());
    }
    else {
      const errorMessage = response?.message || "Something went wrong";
      AppLogger("EditProfileImageSaga Error=>", errorMessage);
      yield put(editUserProfile({ errorMessage }));

    }
  } catch (err: any) {
    const errorMessage = err?.message || "An unexpected error occurred";
    AppLogger("EditProfileImageSaga Catch Error", err);
    yield put(editUserProfile({ errorMessage }));

  }
}
export function* ContactAdminSaga(action: any) {
  const { messageData, token } = action.payload;
  yield put(authenticationRequestStart('contactAdminResponse'))

  try {
    const response: { status: number; data?: any; message?: string } = yield call(
      NetworkRequestManager.ContactAdmin, token, messageData
    );

    AppLogger("ContactAdminSaga Response=>", JSON.stringify(response));

    if (response.status === 200 || response.status === 201) {
      yield put(contactAdmin({ contactAdminResponse: response?.data }));
    }
    else if (response.status === 401) {
      yield put(deleteToken());
    }
    else {
      const errorMessage = response?.message || "Something went wrong";
      AppLogger("ContactAdminSaga Error=>", errorMessage);
      yield put(contactAdmin({ errorMessage }));

    }
  } catch (err: any) {
    const errorMessage = err?.message || "An unexpected error occurred";
    AppLogger("ContactAdminSaga Catch Error", err);
    yield put(contactAdmin({ errorMessage }));

  }
}

export function* LogoutSaga(action: any) {
  const { token } = action.payload;

  yield put(authenticationRequestStart('logoutResponse'))

  try {
    const response: { status: number; data?: any; message?: string } = yield call(
      NetworkRequestManager.Logout, token
    );

    AppLogger("LogoutSaga Response=>", JSON.stringify(response));

    if (response.status === 200 || response.status === 201) {
      yield put(logoutUser({ logoutResponse: response?.message }));
    }
    // else if(response.status === 401){
    //   // yield put(deleteToken({}));

    // }
    else {
      const errorMessage = response?.message || "Something went wrong";
      AppLogger("LogoutSaga Error=>", errorMessage);
      yield put(logoutUser({ errorMessage }));

    }
  } catch (err: any) {
    const errorMessage = err?.message || "An unexpected error occurred";
    AppLogger("LogoutSaga Catch Error", err);
    yield put(logoutUser({ errorMessage }));

  }
}

export function* DeleteAccountSaga(action: any) {
  const { token, id } = action.payload;
  yield put(authenticationRequestStart('deleteAccountResponse'))

  try {
    const response: { status: number; data?: any; message?: string } = yield call(
      NetworkRequestManager.DeleteAccount, token, id
    );

    AppLogger("DeleteAccountSaga Response=>", JSON.stringify(response));

    if (response.status === 200 || response.status === 201) {
      yield put(deleteAccount({ deleteAccountResponse: response?.message }));
    }
    else {
      const errorMessage = response?.message || "Something went wrong";
      AppLogger("DeleteAccountSaga Error=>", errorMessage);
      yield put(deleteAccount({ errorMessage }));

    }
  } catch (err: any) {
    const errorMessage = err?.message || "An unexpected error occurred";
    AppLogger("DeleteAccountSaga Catch Error", err);
    yield put(deleteAccount({ errorMessage }));

  }
}

export function* GetNotificationSaga(action: any) {
  const { token } = action.payload;
  yield put(authenticationRequestStart('notificationData'))

  try {
    const response: { status: number; data?: any; message?: string } = yield call(
      NetworkRequestManager.GetNotifications, token
    );

    // AppLogger("GetNotificationSaga Response=>", JSON.stringify(response));

    if (response.status === 200 || response.status === 201) {
      yield put(getNotificationListing({ notificationData: response?.data }));
    }
    else if (response.status === 401) {
      yield put(deleteToken());
    }
    else {
      const errorMessage = response?.message || "Something went wrong";
      AppLogger("GetNotificationSaga Error=>", errorMessage);
      yield put(notificationRequestError({ errorMessage }));

    }
  } catch (err: any) {
    const errorMessage = err?.message || "An unexpected error occurred";
    AppLogger("GetNotificationSaga Catch Error", err);
    yield put(notificationRequestError({ errorMessage }));

  }
}


export function* DeleteNotificationSaga(action: any) {
  const { token, notificationId } = action.payload;
  yield put(authenticationRequestStart('deletedNotificationResponse'))

  try {
    const response: { status: number; data?: any; message?: string } = yield call(
      NetworkRequestManager.DeleteNotifications, token, notificationId
    );

    AppLogger("DeleteNotificationSaga Response=>", JSON.stringify(response));

    if (response.status === 200 || response.status === 201) {
      yield put(deleteNotification({ deletedNotificationResponse: response?.data }));
    }
    else if (response.status === 401) {
      yield put(deleteToken());
    }
    else {
      const errorMessage = response?.message || "Something went wrong";
      AppLogger("DeleteNotificationSaga Error=>", errorMessage);
      yield put(notificationRequestError({ errorMessage }));

    }
  } catch (err: any) {
    const errorMessage = err?.message || "An unexpected error occurred";
    AppLogger("DeleteNotificationSaga Catch Error", err);
    yield put(notificationRequestError({ errorMessage }));

  }
}


export function* ReadNotificationSaga(action: any) {
  const { token, notificationId } = action.payload;
  yield put(authenticationRequestStart('readNotificationResponse'))

  try {
    const response: { status: number; data?: any; message?: string } = yield call(
      NetworkRequestManager.ReadNotifications, token, notificationId
    );

    AppLogger("ReadNotificationSaga Response=>", JSON.stringify(response));

    if (response.status === 200 || response.status === 201) {
      yield put(readNotification({ readNotificationResponse: response?.data[0] }));
    }
    else if (response.status === 401) {
      yield put(deleteToken());
    }
    else {
      const errorMessage = response?.message || "Something went wrong";
      AppLogger("ReadNotificationSaga Error=>", errorMessage);
      yield put(notificationRequestError({ errorMessage }));

    }
  } catch (err: any) {
    const errorMessage = err?.message || "An unexpected error occurred";
    AppLogger("ReadNotificationSaga Catch Error", err);
    yield put(notificationRequestError({ errorMessage }));

  }
}


export function* UpdateFcmSaga(action: any) {
  const { token, body } = action.payload;
  yield put(authenticationRequestStart('fcmTokenResponse'))

  try {
    const response: { status: number; data?: any; message?: string } = yield call(
      NetworkRequestManager.UpdateFcm, token, body
    );

    AppLogger("UpdateFcmSaga Response=>", JSON.stringify(response));

    if (response.status === 200 || response.status === 201) {
      yield put(updateFcmToken({ fcmTokenResponse: response?.data }));
    }
    else if (response.status === 401) {
      yield put(deleteToken());
    }
    else {
      const errorMessage = response?.message || "Something went wrong";
      AppLogger("UpdateFcmSaga Error=>", errorMessage);
      yield put(updateFcmToken({ errorMessage }));

    }
  } catch (err: any) {
    const errorMessage = err?.message || "An unexpected error occurred";
    AppLogger("UpdateFcmSaga Catch Error", err);
    yield put(updateFcmToken({ errorMessage }));

  }
}

export function* userSaga() {
  yield takeLatest(AppConstants.redux.SIGNIN_REQUEST_START, SignInSaga);
  yield takeLatest(AppConstants.redux.SIGNUP_REQUEST_START, SignUpSaga);
  yield takeLatest(AppConstants.redux.FORGOT_PASSWORD_REQUEST_START, ForgotPasswordSaga);
  yield takeLatest(AppConstants.redux.CHANGE_PASSWORD_REQUEST_START, ChangePasswordSaga);
  yield takeLatest(AppConstants.redux.VERIFY_OTP_REQUEST_START, VerifyOtpSaga);
  yield takeLatest(AppConstants.redux.RESEND_OTP_REQUEST_START, ResendOtpSaga);
  yield takeLatest(AppConstants.redux.GET_PROFILE_REQUEST_START, GetProfileSaga);
  yield takeLatest(AppConstants.redux.EDIT_PROFILE_REQUEST_START, EditProfileSaga);
  yield takeLatest(AppConstants.redux.EDIT_PROFILE_IMAGE_REQUEST_START, EditProfileImageSaga);
  yield takeLatest(AppConstants.redux.CONTACT_ADMIN_REQUEST_START, ContactAdminSaga);
  yield takeLatest(AppConstants.redux.LOGOUT_REQUEST_START, LogoutSaga);
  yield takeLatest(AppConstants.redux.DELETE_ACCOUNT_REQUEST_START, DeleteAccountSaga);
  yield takeLatest(AppConstants.redux.NOTIFICATION_LIST_REQUEST_START, GetNotificationSaga);
  yield takeLatest(AppConstants.redux.DELETE_NOTIFICATION_REQUEST_START, DeleteNotificationSaga);
  yield takeLatest(AppConstants.redux.READ_NOTIFICATION_REQUEST_START, ReadNotificationSaga);
  yield takeLatest(AppConstants.redux.UPDATE_FCM_REQUEST_START, UpdateFcmSaga);

}
