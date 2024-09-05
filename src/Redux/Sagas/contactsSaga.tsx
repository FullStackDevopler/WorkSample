import { put, call, takeLatest } from 'redux-saga/effects';
import { AppConstants } from '../../Theme/AppConstants';
import { NetworkRequestManager } from '../../Manager/NetworkRequestManager';
import {
    addContact,
    contactListingRequestError,
    contactRequestStart,
    deleteContact,
    getContactListing,
    updateContact
} from '../Reducers/contactsSlice';
import { deleteToken } from '../Reducers/userInfoSlice';


export function* ContactListingSaga(action: any) {

    const { token } = action.payload;
    console.log('action.payload in ContactListingSaga ', action.payload);
    yield put(contactRequestStart("contactListing"))

    try {
        const response: { status: number; data?: any; message?: string } = yield call(
            NetworkRequestManager.GetContactsListing, token);


        if (response.status === 200 || response.status === 201) {
            yield put(getContactListing({ contactListing: response?.data }))
        } 
        else if (response.status === 401) {
            console.log("in 401 of ContactListingSaga");
            // const errorMessage = response?.message || "Something went wrong";
            // yield put(contactListingRequestError({ errorMessage }));
            yield put(deleteToken()); 
        }
        else {
            console.log("in else of ContactListingSaga",);
            const errorMessage = response?.message || "Something went wrong";
            yield put(contactListingRequestError({ errorMessage }));

        }
    } catch (err: any) {
        console.log("in error of ContactListingSaga", err);
        const errorMessage = err?.message || "An unexpected error occurred";
        yield put(contactListingRequestError({ errorMessage }));

    }
}
export function* AddContactSaga(action: any) {

    const { token, contactInfo } = action.payload;
    console.log('action.payload in AddContactSaga ', action.payload);


    yield put(contactRequestStart("AddContactSaga"))


    try {
        const response: { status: number; data?: any; message?: string } = yield call(
            NetworkRequestManager.AddContact, token, contactInfo);

        console.log('response in AddContactSaga Saga', response);

        if (response.status === 200 || response.status === 201) {
            console.log("status is 200  AddContactSaga");
            yield put(addContact({ newContact: response?.data }))
        }
        else if (response.status === 401) {
            console.log("in 401 of AddContactSaga");
            yield put(deleteToken());  
        }
        else {
            console.log("in else of AddContactSaga",);
            const errorMessage = response?.message || "Something went wrong";
            yield put(contactListingRequestError({ errorMessage }));

        }
    } catch (err: any) {
        console.log("in error of ContactListingSaga", err);

        const errorMessage = err?.message || "An unexpected error occurred";
        yield put(contactListingRequestError({ errorMessage }));

    }
}
export function* UpdateContactSaga(action: any) {

    const { token, contactInfo } = action.payload;
    console.log('action.payload in UpdateContactSaga ', action.payload);


    yield put(contactRequestStart("AddContactSaga"))


    try {
        const response: { status: number; data?: any; message?: string } = yield call(
            NetworkRequestManager.UpdateContact, token, contactInfo);

        console.log('response in UpdateContactSaga Saga', response);

        if (response.status === 200 || response.status === 201) {
            console.log("status is 200  UpdateContactSaga");
            //   const myInJobs = response?.data
            yield put(updateContact({ updatedContact: { ...response?.data, id: contactInfo.id } }))
        }
        else if (response.status === 401) {
            console.log("in 401 of UpdateContactSaga");
        
            yield put(deleteToken()); 
        }
        else {
            console.log("in else of UpdateContactSaga",);
            const errorMessage = response?.message || "Something went wrong";
            yield put(contactListingRequestError({ errorMessage }));

        }
    } catch (err: any) {
        console.log("in error of UpdateContactSaga", err);

        const errorMessage = err?.message || "An unexpected error occurred";
        yield put(contactListingRequestError({ errorMessage }));

    }
}
export function* DeleteContactSaga(action: any) {

    const { token, id } = action.payload;
    console.log('action.payload in DeleteContactSaga ', action.payload);
    yield put(contactRequestStart("DeleteContactSaga"))
    try {
        const response: { status: number; data?: any; message?: string } = yield call(
            NetworkRequestManager.DeleteContact, token, id);

        console.log('response in DeleteContactSaga Saga', response);

        if (response.status === 200 || response.status === 201) {
            console.log("status is 200  DeleteContactSaga");
            //   const myInJobs = response?.data
            yield put(deleteContact({ deleteContactResponse: { ...response?.data, deleteId: id } }))
        }
        else if (response.status === 401) {
            console.log("in 401 of DeleteContactSaga");
            yield put(deleteToken()); 
        }
        else {
            console.log("in else of DeleteContactSaga",);
            const errorMessage = response?.message || "Something went wrong";
            yield put(contactListingRequestError({ errorMessage }));

        }
    } catch (err: any) {
        console.log("in error of DeleteContactSaga", err);

        const errorMessage = err?.message || "An unexpected error occurred";
        yield put(contactListingRequestError({ errorMessage }));

    }
}



export function* contactsSaga() {
    yield takeLatest(AppConstants.redux.ADD_CONTACT_REQUEST_START, AddContactSaga);
    yield takeLatest(AppConstants.redux.LIST_ALL_CONTACT_REQUEST_START, ContactListingSaga);
    yield takeLatest(AppConstants.redux.DELETE_CONTACT_REQUEST_START, DeleteContactSaga);
    yield takeLatest(AppConstants.redux.UPDATE_CONTACT_REQUEST_START, UpdateContactSaga);


}
