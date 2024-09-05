import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import { NetworkRequestManager } from "../../Manager/NetworkRequestManager";
import { AppConstants } from "../../Theme/constants";
import { AppLogger, processErrorJsonResponse } from "../../Theme/utils";
import { goBack, navigate, reset } from "../../Router/RootNavigation";
import { DataManager } from "../../Manager/DataManager";
import { Alert } from "react-native";

export function* GuestSignInSaga(action: any) {
    try {
        yield DataManager.setIsGuestLogin(true)
    } catch (err: any) {
        AppLogger("Guest Login Datamanger operation failed")
    }
}

export function* SignInSaga(action: any) {
    try {
        const getState = (state) => (state)
        const state = yield select(getState)
        const userState = state.user
        if (!userState.isNetworkConnected) {
            alert("Please check your interent connection")
            return
        }
        const response: any = yield call(NetworkRequestManager.SignIn, action.payload.username, action.payload.password, action.payload.device)
        AppLogger("Sign In Saga Resposne *********", response)
        if (response.status === 200) {
            yield put({
                type: AppConstants.redux.SIGNIN_REQUEST_SUCCESS,
                status: response.status,
                data: response.data,
            })
            yield put({
                type: AppConstants.redux.SETUP_TOKEN,
                payload: {
                    token: response.data.data,
                }
            })
            yield DataManager.setAccessToken(response.data.data)
            yield DataManager.removeIsGuestLogin()
            AppLogger("Token", response.data)
        } else {
            const error = processErrorJsonResponse(response.error)
            AppLogger("Sign In Saga Processed Error *********", error)
            alert(error + JSON.stringify(action))
            yield put({
                type: AppConstants.redux.SIGNIN_REQUEST_ERROR,
                status: response.status,
                error: response.error,
            })
        }
    } catch (err: any) {
        AppLogger("SignIn Saga Catch Error", err)
        // alert(err + JSON.stringify(action))
        yield put({
            type: AppConstants.redux.SIGNIN_REQUEST_ERROR,
            status: response.status,
            error: response.error,
        })
    }
}

export function* SignUpSaga(action: any) {
    try {
        const getState = (state) => (state)
        const state = yield select(getState)
        const userState = state.user
        if (!userState.isNetworkConnected) {
            alert("Please check your interent connection.")
            return
        }
        const response: any = yield call(NetworkRequestManager.SignUp, action.payload.username, action.payload.email, action.payload.password)
        AppLogger("SignUp Saga Resposne *********", response)
        if (response.status === 200) {
            Alert.alert('DoggyWords', response.data.message, [
                { text: 'OK', onPress: () => navigate(AppConstants.screens.verification, { email: action.payload.email }) },
            ]);
            yield put({
                type: AppConstants.redux.SIGNUP_REQUEST_SUCCESS,
                status: response.status,
                data: response.data,
            })
        } else {
            const error = processErrorJsonResponse(response.error)
            AppLogger("SignUp Saga Processed Error *********", error)
            alert(error + JSON.stringify(action))
            yield put({
                type: AppConstants.redux.SIGNUP_REQUEST_ERROR,
                status: response.status,
                error: response.error,
            })
        }
    } catch (err) {
        AppLogger("SignUp Saga Catch Error", err)
        alert(err + JSON.stringify(action))
        yield put({
            type: AppConstants.redux.SIGNUP_REQUEST_ERROR,
            status: 0,
            error: err,
        })
    }
}

export function* ForgotPasswordSaga(action: any) {
    try {
        const getState = (state) => (state)
        const state = yield select(getState)
        const userState = state.user
        if (!userState.isNetworkConnected) {
            alert("Please check your interent connection")
            return
        }
        const response: any = yield call(NetworkRequestManager.ForgotPassword, action.payload.email)
        AppLogger("Resposne===", response)
        if (response.status === 200) {
            alert(response.data.message)
            goBack()
        } else {
            const error = processErrorJsonResponse(response.error)
            AppLogger("Sign In Saga Processed Error *********", error)
            alert(error + JSON.stringify(action))
        }
    } catch (e) {
        AppLogger("Error", e)
        alert(e + JSON.stringify(action))
    }
}

export function* ChangePasswordSaga(action: any) {
    try {
        const getState = (state) => (state)
        const state = yield select(getState)
        const userState = state.user
        if (!userState.isNetworkConnected) {
            alert("Please check your interent connection")
            return
        }
        const response: any = yield call(NetworkRequestManager.ChangePassword, action.payload.old_password, action.payload.password)
        AppLogger("Change Password Resposne *********", response)
        if (response.status === 200) {
            alert(response.data.message)
            goBack()
            yield put({
                type: AppConstants.redux.CHANGE_PASSWORD_REQUEST_SUCCESS,
                status: response.status,
                data: response.data,
            })
        } else {
            const error = processErrorJsonResponse(response.error)
            AppLogger("Change Password Saga Processed Error *********", error)
            alert(error)
            yield put({
                type: AppConstants.redux.CHANGE_PASSWORD_REQUEST_ERROR,
                status: response.status,
                error: response.error,
            })
        }
    } catch (err) {
        AppLogger("Change Password Saga Catch Error", err)
        alert(err)
        yield put({
            type: AppConstants.redux.CHANGE_PASSWORD_REQUEST_ERROR,
            status: 0,
            error: err,
        })
    }
}

export function* GetProfileSaga(action: any) {
    try {
        const getState = (state) => (state)
        const state = yield select(getState)
        const userState = state.user
        if (!userState.isNetworkConnected) {
            alert("Please check your interent connection")
            return
        }
        const response: any = yield call(NetworkRequestManager.GetProfileDetails)
        AppLogger("Get Profile Details Resposne *********", response)
        if (response.status === 200) {
            yield put({
                type: AppConstants.redux.GET_PROFILE_SUCCESS,
                status: response.status,
                data: response.data,
            })
        } else if (response.status === 403) {
            const error = processErrorJsonResponse(response.error)
            alert(error + JSON.stringify(action))
            yield put({
                type: AppConstants.redux.GET_PROFILE_ERROR,
                status: response.status,
                error: response.error,
            })
            yield put({
                type: AppConstants.redux.LOGOUT_USER_DIRECTLY,
                payload: {}
            })
        } else if (response.status === 401) {
            const error = processErrorJsonResponse(response.error)
            alert(error + JSON.stringify(action))
            yield put({
                type: AppConstants.redux.GET_PROFILE_ERROR,
                status: response.status,
                error: response.error,
            })
            yield put({
                type: AppConstants.redux.LOGOUT_USER_DIRECTLY,
                payload: {}
            })
        } else {
            const error = processErrorJsonResponse(response.error)
            AppLogger("Get Profile Details Processed Error *********", error)
            alert(error + JSON.stringify(action))
            yield put({
                type: AppConstants.redux.GET_PROFILE_ERROR,
                status: response.status,
                error: response.error,
            })
        }
    } catch (err) {
        AppLogger("Get Profile Details Catch Error", err)
        alert(err + JSON.stringify(action))
        yield put({
            type: AppConstants.redux.GET_PROFILE_ERROR,
            status: 0,
            error: err,
        })
    }
}

export function* PurchaseSubscriptionApiSaga(action: any) {
    try {
        const { productId, transactionReceipt, transactionId, transactionDate } = action.payload
        const response: any = yield call(NetworkRequestManager.PurchaseSubscriptionApi, productId, transactionReceipt, transactionId, transactionDate)
        AppLogger("Purchase Subscription API Resposne *********", response)
        if (response.status === 200) {
            console.log("Input Params", action.payload.toString(), "\n")
            console.log("Response", response.data.toString(), "\n")
            let alertData = "Input Params" + JSON.stringify(action.payload) + "\n" + "Response" + JSON.stringify(response.data) + "\n"
            yield GetProfileSaga(null)
            goBack()
            yield put({
                type: AppConstants.redux.PURCHASE_SUBSCRIPTION_API_SUCCESS,
                status: response.status,
                data: response.data,
            })
        } else if (response.status === 403) {
            const error = processErrorJsonResponse(response.error)
            alert(error)
            yield put({
                type: AppConstants.redux.PURCHASE_SUBSCRIPTION_API_ERROR,
                status: response.status,
                error: response.error,
            })
            yield put({
                type: AppConstants.redux.LOGOUT_USER_DIRECTLY,
                payload: {}
            })
        } else if (response.status === 401) {
            const error = processErrorJsonResponse(response.error)
            alert(error)
            yield put({
                type: AppConstants.redux.PURCHASE_SUBSCRIPTION_API_ERROR,
                status: response.status,
                error: response.error,
            })
            yield put({
                type: AppConstants.redux.LOGOUT_USER_DIRECTLY,
                payload: {}
            })
        } else {
            const error = processErrorJsonResponse(response.error)
            AppLogger("Purchase Subscription API Processed Error *********", error)
            alert(error + JSON.stringify(action))
            yield put({
                type: AppConstants.redux.PURCHASE_SUBSCRIPTION_API_ERROR,
                status: response.status,
                error: response.error,
            })
        }
    } catch (err) {
        AppLogger("Purchase Subscription API Catch Error", err)
        alert(err)
        yield put({
            type: AppConstants.redux.PURCHASE_SUBSCRIPTION_API_ERROR,
            status: 0,
            error: err,
        })
    }
}

export function* SaveFcmToken(action: any) {
    try {
        const response: any = yield call(NetworkRequestManager.SaveFcmToken, action.payload.fcm_token)
        AppLogger("Save FCM Token Resposne *********", response)
        if (response.status === 200) {
            yield put({
                type: AppConstants.redux.SAVE_FCM_TOKEN_SUCCESS,
                status: response.status,
                data: response.data,
            })
        } else {
            const error = processErrorJsonResponse(response.error)
            AppLogger("Save FCM Token Processed Error *********", error)
            alert(error + JSON.stringify(action))
            yield put({
                type: AppConstants.redux.SAVE_FCM_TOKEN_ERROR,
                status: response.status,
                error: response.error,
            })
        }
    } catch (err) {
        AppLogger("Save FCM Token Catch Error", err)
        alert(err + JSON.stringify(action))
        yield put({
            type: AppConstants.redux.SAVE_FCM_TOKEN_ERROR,
            status: 0,
            error: err,
        })
    }
}

export function* ReSendVerificationEmail(action: any) {
    try {
        const getState = (state) => (state)
        const state = yield select(getState)
        const userState = state.user
        if (!userState.isNetworkConnected) {
            alert("Please check your interent connection")
            return
        }
        const response: any = yield call(NetworkRequestManager.ResendVerificationEmail, action.payload.email)
        AppLogger("Resend Verifictaion Email Resposne *********", response)
        if (response.status === 200) {
            yield put({
                type: AppConstants.redux.RESEND_VERIFICATION_EMAIL_SUCCESS,
                status: response.status,
                data: response.data,
            })
            alert(response.data.message)
        } else {
            const error = processErrorJsonResponse(response.error)
            AppLogger("Resend Verifictaion Email Error *********", error)
            alert(error)
            yield put({
                type: AppConstants.redux.RESEND_VERIFICATION_EMAIL_ERROR,
                status: response.status,
                error: response.error,
            })
        }
    } catch (err) {
        AppLogger("Resend Verifictaion Email Catch Error", err)
        yield put({
            type: AppConstants.redux.RESEND_VERIFICATION_EMAIL_ERROR,
            status: 0,
            error: err,
        })
    }
}

function* LogoutGuestSaga(action: any) {
    try {
        yield DataManager.removeAccessToken()
        yield DataManager.removeIsGuestLogin()

    } catch (err) {
        AppLogger("Error in logout process due to DataManager/ API Call")
    }
}

function* LogoutSaga(action: any) {
    try {
        const getState = (state) => (state)
        const state = yield select(getState)
        const userState = state.user
        if (!userState.isNetworkConnected) {
            alert("Please check your interent connection")
            return
        }
        const response: any = yield call(NetworkRequestManager.LogOut)
        AppLogger("Log Out API Saga Resposne *********", response)
        if (response.status === 203) {
            yield put({
                type: AppConstants.redux.LOGOUT_USER_SUCCESS,
                status: response.status,
                data: response.data,
            })
            yield DataManager.removeAccessToken()
            yield DataManager.removeIsGuestLogin()
        } else {
            const error = processErrorJsonResponse(response.error)
            AppLogger("LogOut API Error Processed Error *********", error)
            alert(error)
            yield put({
                type: AppConstants.redux.LOGOUT_USER_ERROR,
                status: response.status,
                error: response.error,
            })
        }
    } catch (err) {
        AppLogger("Error in logout process due to DataManager/ API Call")
        yield put({
            type: AppConstants.redux.LOGOUT_USER_ERROR,
            status: 0,
            error: err,
        })
    }
}

function* watch() {
    yield takeLatest(AppConstants.redux.LOGOUT_USER_START, LogoutSaga);
    yield takeLatest(AppConstants.redux.LOGOUT_GUEST_USER, LogoutGuestSaga);
    yield takeLatest(AppConstants.redux.LOGOUT_USER_DIRECTLY, LogoutGuestSaga);
    yield takeLatest(AppConstants.redux.SIGNIN_REQUEST_START, SignInSaga);
    yield takeLatest(AppConstants.redux.GUEST_SIGNIN, GuestSignInSaga);
    yield takeLatest(AppConstants.redux.SIGNUP_REQUEST_START, SignUpSaga);
    yield takeLatest(AppConstants.redux.FORGOT_PASSWORD_REQUEST_START, ForgotPasswordSaga);
    yield takeLatest(AppConstants.redux.CHANGE_PASSWORD_REQUEST_START, ChangePasswordSaga);
    yield takeLatest(AppConstants.redux.GET_PROFILE_START, GetProfileSaga);
    yield takeLatest(AppConstants.redux.PURCHASE_SUBSCRIPTION_API_START, PurchaseSubscriptionApiSaga);
    yield takeLatest(AppConstants.redux.SAVE_FCM_TOKEN_START, SaveFcmToken);
    yield takeLatest(AppConstants.redux.RESEND_VERIFICATION_EMAIL_START, ReSendVerificationEmail);
}

export default watch;