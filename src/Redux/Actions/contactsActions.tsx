import { AppConstants } from "../../Theme/AppConstants"


export function addContactAction(token: string, contactInfo: any) {
    console.log("in addContactAction", contactInfo);
    return {
        type: AppConstants.redux.ADD_CONTACT_REQUEST_START,
        payload: {
            token: token,
            contactInfo: contactInfo,
        },
    }

}
export function updateContactAction(token: string, contactInfo: any) {
    console.log("in updateContactAction");

    return {
        type: AppConstants.redux.UPDATE_CONTACT_REQUEST_START,
        payload: {
            token,
            contactInfo
        }
    }
}
export function deleteContactAction(token: string, id: string) {
    console.log("in deleteContactAction");
    return {
        type: AppConstants.redux.DELETE_CONTACT_REQUEST_START,
        payload: { token, id }
    }

}
export function contactListingAction(token: string) {
    console.log("in contactListingAction");

    return {
        type: AppConstants.redux.LIST_ALL_CONTACT_REQUEST_START,
        payload: { token }
    }
}