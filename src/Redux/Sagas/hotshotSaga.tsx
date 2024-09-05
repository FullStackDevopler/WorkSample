import { call, put, takeLatest } from "redux-saga/effects";
import { AppConstants } from "../../Theme/AppConstants";
import { NetworkRequestManager } from "../../Manager/NetworkRequestManager";
import { AppLogger } from "../../Theme/utils";
import { deleteToken } from "../Reducers/userInfoSlice";
import { getAcceptProposal, getCancelHotshot, getChatList, getCreatedHotshot, getFinishHotshot, getHotshotDetails, getHotshotDetailsNotification, getHotshotList, getHotshotPrice, getPastHotshotList, getProposalsCount, getProposalsListing, hotshotListingRequestError, hotshotRequestStart } from "../Reducers/hotshotSlice";

// Function to create hotshot
export function* CreateHotshotSaga(action: any) {
    const { body, token } = action.payload;

    yield put(hotshotRequestStart('hotshotDetails'))
    try {
        const response: { status: number; data?: any; message?: string, error ?: string } = yield call(
            NetworkRequestManager.CreateHotshot, body, token
        );

        // AppLogger("CreateHotshotSaga Response=>", JSON.stringify(response));

        if (response.status === 200 || response.status === 201) {
            yield put(getCreatedHotshot({ hotshotDetails: response?.data }));
        }
        else if (response.status === 401) {
            yield put(deleteToken());
        }
        else {
            const errorMessage = response?.error || "Something went wrong";
            AppLogger("CreateHotshotSaga Error=>", errorMessage);
            yield put(hotshotListingRequestError({ errorMessage }));

        }
    } catch (err: any) {
        const errorMessage = err?.message || "An unexpected error occurred";
        AppLogger("CreateHotshotSaga Catch Error", err);
        yield put(hotshotListingRequestError({ errorMessage }));

    }
}

//function to get hotshot listing made by driver itself
export function* GetHotshotListSaga(action: any) {
    const { token } = action.payload;

    yield put(hotshotRequestStart('hotshotList'))
    try {
        const response: { status: number; data?: any; message?: string } = yield call(
            NetworkRequestManager.GetHotshotList, token
        );

        // console.log("GetHotshotListSaga Response=>", JSON.stringify(response));

        if (response.status === 200 || response.status === 201) {
            yield put(getHotshotList({ hotshotList: response?.data }));
        }
        else if (response.status === 401) {
            yield put(deleteToken());
        }
        else {
            const errorMessage = response?.message || "Something went wrong";
            AppLogger("GetHotshotListSaga Error=>", errorMessage);
            yield put(hotshotListingRequestError({ errorMessage }));

        }
    } catch (err: any) {
        const errorMessage = err?.message || "An unexpected error occurred";
        AppLogger("GetHotshotListSaga Catch Error", err);
        yield put(hotshotListingRequestError({ errorMessage }));

    }
}


//function to get past hotshot listing 
export function* GetPastHotshotListSaga(action: any) {
    const { token } = action.payload;

    yield put(hotshotRequestStart('pastHotshotList'))
    try {
        const response: { status: number; data?: any; message?: string } = yield call(
            NetworkRequestManager.GetPastHotshotList, token
        );

        console.log("GetPastHotshotListSaga Response=>", JSON.stringify(response));

        if (response.status === 200 || response.status === 201) {
            yield put(getPastHotshotList({ pastHotshotList: response?.data }));
        }
        else if (response.status === 401) {
            yield put(deleteToken());
        }
        else {
            const errorMessage = response?.message || "Something went wrong";
            AppLogger("GetPastHotshotListSaga Error=>", errorMessage);
            yield put(hotshotListingRequestError({ errorMessage }));

        }
    } catch (err: any) {
        const errorMessage = err?.message || "An unexpected error occurred";
        AppLogger("GetPastHotshotListSaga Catch Error", err);
        yield put(hotshotListingRequestError({ errorMessage }));

    }
}


//function to cancel hotshot 
export function* CancelledHotshotSaga(action: any) {
    const { token, body } = action.payload;

    yield put(hotshotRequestStart('cancelHotshotResponse'))
    try {
        const response: { status: number; data?: any; message?: string } = yield call(
            NetworkRequestManager.CancelHotshot, token, body
        );

        AppLogger("CancelledHotshotSaga Response=>", JSON.stringify(response));

        if (response.status === 200 || response.status === 201) {
            yield put(getCancelHotshot({ cancelHotshotResponse: response?.data }));
        }
        else if (response.status === 401) {
            yield put(deleteToken());
        }
        else {
            const errorMessage = response?.message || "Something went wrong";
            AppLogger("CancelledHotshotSaga Error=>", errorMessage);
            yield put(hotshotListingRequestError({ errorMessage }));

        }
    } catch (err: any) {
        const errorMessage = err?.message || "An unexpected error occurred";
        AppLogger("CancelledHotshotSaga Catch Error", err);
        yield put(hotshotListingRequestError({ errorMessage }));

    }
}

//function to finish hotshot 
export function* FinishHotshotSaga(action: any) {
    const { token , body} = action.payload;

    yield put(hotshotRequestStart('finishHotshotResponse'))
    try {
        const response: { status: number; data?: any; message?: string } = yield call(
            NetworkRequestManager.FinishHotshot, token, body
        );

        console.log("FinishHotshotSaga Response=>", JSON.stringify(response));
        
        // AppLogger("FinishHotshotSaga Response=>", JSON.stringify(response));

        if (response.status === 200 || response.status === 201) {
            yield put(getFinishHotshot({ finishHotshotResponse: response?.data }));
        }
        else if (response.status === 401) {
            yield put(deleteToken());
        }
        else {
            const errorMessage = response?.message || "Something went wrong";
            AppLogger("FinishHotshotSaga Error=>", errorMessage);
            yield put(hotshotListingRequestError({ errorMessage }));

        }
    } catch (err: any) {
        const errorMessage = err?.message || "An unexpected error occurred";
        AppLogger("FinishHotshotSaga Catch Error", err);
        yield put(hotshotListingRequestError({ errorMessage }));

    }
}


//function to get hotshot details
export function* HotshotDetailsSaga(action: any) {
    const { token , body, jobType } = action.payload;

    yield put(hotshotRequestStart('hotshotDetails'))
    try {
        const response: { status: number; data?: any; message?: string } = yield call(
            NetworkRequestManager.GetHotshotDetails, token, body
        );

        AppLogger("HotshotDetailsSaga Response=>", JSON.stringify(response));

        if (response.status === 200 || response.status === 201) {
            yield put(getHotshotDetails({ hotshotDetails: response?.data[0], jobType }));
        }
        else if (response.status === 401) {
            yield put(deleteToken());
        }
        else {
            const errorMessage = response?.message || "Something went wrong";
            yield put(hotshotListingRequestError({ errorMessage }));

        }
    } catch (err: any) {
        const errorMessage = err?.message || "An unexpected error occurred";
        AppLogger("HotshotDetailsSaga Catch Error", err);
        yield put(hotshotListingRequestError({ errorMessage }));

    }
}


export function* GetChatListSaga(action: any) {
    const { token , body } = action.payload;

    yield put(hotshotRequestStart('getChatData'))
    try {
        const response: { status: number; data?: any; message?: string } = yield call(
            NetworkRequestManager.GetChat, token, body
        );

        // AppLogger("GetChatListSaga Response=>", JSON.stringify(response));

        if (response.status === 200 || response.status === 201) {
            yield put(getChatList({ getChatData: response?.data }));
        }
        else if (response.status === 401) {
            yield put(deleteToken());
        }
        else {
            const errorMessage = response?.message || "Something went wrong";
            yield put(hotshotListingRequestError({ errorMessage }));

        }
    } catch (err: any) {
        const errorMessage = err?.message || "An unexpected error occurred";
        AppLogger("GetChatListSaga Catch Error", err);
        yield put(hotshotListingRequestError({ errorMessage }));

    }
}

export function* HotshotDetailsNotificationsSaga(action: any) {
    const { token , body } = action.payload;

    yield put(hotshotRequestStart('hotshotDetailsResponse'))
    try {
        const response: { status: number; data?: any; message?: string } = yield call(
            NetworkRequestManager.GetHotshotDetails, token, body
        );

        console.log("HotshotDetailsNotificationsSaga Response=>", JSON.stringify(response));

        if (response.status === 200 || response.status === 201) {
            yield put(getHotshotDetailsNotification({ hotshotDetailsResponse: response?.data[0] }));
        }
        else if (response.status === 401) {
            yield put(deleteToken());
        }
        else {
            const errorMessage = response?.message || "Something went wrong";
            yield put(hotshotListingRequestError({ errorMessage }));

        }
    } catch (err: any) {
        const errorMessage = err?.message || "An unexpected error occurred";
        AppLogger("HotshotDetailsNotificationsSaga Catch Error", err);
        yield put(hotshotListingRequestError({ errorMessage }));

    }
}


export function* AcceptProposalSaga(action: any) {
    const { token , body } = action.payload;

    yield put(hotshotRequestStart('acceptProposalResponse'))
    try {
        const response: { status: number; data?: any; message?: string } = yield call(
            NetworkRequestManager.AcceptProposal, token, body
        );

        console.log("AcceptProposalSaga Response=>", JSON.stringify(response));

        if (response.status === 200 || response.status === 201) {
            yield put(getAcceptProposal({ acceptProposalResponse: response?.data }));
        }
        else if (response.status === 401) {
            yield put(deleteToken());
        }
        else {
            const errorMessage = response?.message || "Something went wrong";
            yield put(hotshotListingRequestError({ errorMessage }));

        }
    } catch (err: any) {
        const errorMessage = err?.message || "An unexpected error occurred";
        AppLogger("AcceptProposalSaga Catch Error", err);
        yield put(hotshotListingRequestError({ errorMessage }));

    }
}


export function* GetProposalListSaga(action: any) {
    const { token , body } = action.payload;

    yield put(hotshotRequestStart('proposalsList'))
    try {
        const response: { status: number; data?: any; message?: string } = yield call(
            NetworkRequestManager.GetProposalsList, token, body
        );

        // console.log("GetProposalListSaga Response=>", JSON.stringify(response));

        if (response.status === 200 || response.status === 201) {
            yield put(getProposalsListing({ proposalsList: response?.data }));
        }
        else if (response.status === 401) {
            yield put(deleteToken());
        }
        else {
            const errorMessage = response?.message || "Something went wrong";
            yield put(hotshotListingRequestError({ errorMessage }));

        }
    } catch (err: any) {
        const errorMessage = err?.message || "An unexpected error occurred";
        AppLogger("GetProposalListSaga Catch Error", err);
        yield put(hotshotListingRequestError({ errorMessage }));

    }
}

export function* GetProposalCountSaga(action: any) {
    const { token , body } = action.payload;

    yield put(hotshotRequestStart('proposalsCount'))
    try {
        const response: { status: number; data?: any; message?: string } = yield call(
            NetworkRequestManager.GetProposalsList, token, body
        );

        // console.log("GetProposalCountSaga Response=>", JSON.stringify(response));

        if (response.status === 200 || response.status === 201) {
            yield put(getProposalsCount({ proposalsCount: response?.data }));
        }
        else if (response.status === 401) {
            yield put(deleteToken());
        }
        else {
            const errorMessage = response?.message || "Something went wrong";
            yield put(hotshotListingRequestError({ errorMessage }));

        }
    } catch (err: any) {
        const errorMessage = err?.message || "An unexpected error occurred";
        AppLogger("GetProposalCountSaga Catch Error", err);
        yield put(hotshotListingRequestError({ errorMessage }));

    }
}


export function* GetHotshotPriceSaga(action: any) {
    const { token , body } = action.payload;

    yield put(hotshotRequestStart('hotshotPriceResponse'))
    try {
        const response: { status: number; data?: any; message?: string } = yield call(
            NetworkRequestManager.GetHotshotPrice, token, body
        );

        console.log("GetHotshotPriceSaga Response=>", JSON.stringify(response));

        if (response.status === 200 || response.status === 201) {
            yield put(getHotshotPrice({ hotshotPriceResponse: response?.data }));
        }
        else if (response.status === 401) {
            yield put(deleteToken());
        }
        else {
            const errorMessage = response?.message || "Something went wrong";
            yield put(hotshotListingRequestError({ errorMessage }));

        }
    } catch (err: any) {
        const errorMessage = err?.message || "An unexpected error occurred";
        AppLogger("GetHotshotPriceSaga Catch Error", err);
        yield put(hotshotListingRequestError({ errorMessage }));

    }
}

export function* hotshotSaga() {
    yield takeLatest(AppConstants.redux.CREATE_HOTSHOT_REQUEST_START, CreateHotshotSaga);
    yield takeLatest(AppConstants.redux.GET_HOTSHOT_LIST_REQUEST_START, GetHotshotListSaga);
    yield takeLatest(AppConstants.redux.GET_PAST_HOTSHOT_LIST_REQUEST_START, GetPastHotshotListSaga);
    yield takeLatest(AppConstants.redux.CANCEL_HOTSHOT_REQUEST_START, CancelledHotshotSaga);
    yield takeLatest(AppConstants.redux.FINISH_HOTSHOT_REQUEST_START, FinishHotshotSaga);
    yield takeLatest(AppConstants.redux.HOTSHOT_DETAILS_REQUEST_START, HotshotDetailsSaga);
    yield takeLatest(AppConstants.redux.GET_CHAT_REQUEST_START, GetChatListSaga);
    yield takeLatest(AppConstants.redux.HOTSHOT_DETAILS_NOTIFICATION_REQUEST_START, HotshotDetailsNotificationsSaga);
    yield takeLatest(AppConstants.redux.ACCEPT_PROPOSAL_REQUEST_START, AcceptProposalSaga);
    yield takeLatest(AppConstants.redux.GET_PROPOSAL_LIST_REQUEST_START, GetProposalListSaga);
    yield takeLatest(AppConstants.redux.GET_PROPOSAL_COUNT_REQUEST_START, GetProposalCountSaga);
    yield takeLatest(AppConstants.redux.GET_HOTSHOT_PRICE_REQUEST_START, GetHotshotPriceSaga);
    
    
}
