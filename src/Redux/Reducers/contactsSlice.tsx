import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type DeleteResponseAction = {
    type: string;
    payload: string;
};

const initialState = {
    isLoading: false,
    error: null,
    contactsList: [],
    addContactResponse: null,
    deleteContactResponse: null,
    updatedContactResponse: null
}

const contactListSlice = createSlice({
    name: 'contactSlice',
    initialState: initialState,
    reducers: {
        contactRequestStart(state: any = initialState, action: PayloadAction<{ [key: string]: null } | string>) {
            // console.log('state in signInRequestStart=>>', JSON.stringify(state));
            // console.log("action in signInRequestStart=>>", action);

            if (typeof action.payload === 'string') {
                // Handle the case where payload is a string (e.g., 'signInResponse')
                state.isLoading = true;
                state.error = null;
            }
        },
        getContactListing(state: any = initialState, action: PayloadAction<{ contactListing?: string }>) {

            console.log('state in getContactListing=>>', JSON.stringify(state));
            console.log("action in getContactListing=>>", action);
            state.isLoading = false;
            state.error = null;
            state.contactsList = action.payload.contactListing
        },
        contactListingRequestError(state: any = initialState, action: PayloadAction<{ errorMessage?: string }>) {
            console.log('state in contactListingRequestError=>>', JSON.stringify(state));
            console.log("action in contactListingRequestError=>>", action);
            state.isLoading = false;
            state.error = action.payload.errorMessage
        },

        updateContact(state: any = initialState, action: PayloadAction<{ updatedContact?: any }>) {

            console.log('state in updateContact=>>', JSON.stringify(state));
            console.log("action in updateContact=>>", action);
            state.isLoading = false;
            state.error = null;
            state.updatedContactResponse = action.payload.updatedContact
           let tempData = [...state.contactsList];

            const index = tempData.findIndex(item => item._id == action.payload.updatedContact?.id)

            console.log("index of delted item", index);
            if (index !== -1) {
                tempData.splice(index, 1, action.payload.updatedContact);
            }
            state.contactsList = tempData
        },
        deleteContact(state: any = initialState, action: PayloadAction<{ deleteContactResponse?: any }>) {

            console.log('state in deleteContact=>>', JSON.stringify(state));
            console.log("action in deleteContact=>>", action);
            state.isLoading = false;
            state.error = null;
            state.deleteContactResponse = action.payload.deleteContactResponse

            let tempData = [...state.contactsList];

            const index = tempData.findIndex(item => item._id == action.payload.deleteContactResponse?.deleteId)

            console.log("index of delted item", index);
            if (index !== -1) {
                tempData.splice(index, 1);
            }
            state.contactsList = tempData

        },
     

        addContact(state: any = initialState, action: PayloadAction<{ newContact?: string }>) {

            // console.log('state in addContact=>>', JSON.stringify(state));
            // console.log("action in addContact=>>", JSON.stringify(action));
            state.isLoading = false;
            state.error = null;
            let tempData = [...state.contactsList];
            tempData.unshift(action.payload.newContact)
            // tempData.push(action.payload.newContact)
            state.contactsList = tempData
            state.addContactResponse = action.payload.newContact
        },

        clearContactResponse(state: any = initialState, action: PayloadAction<{ [key: string]: null } | string>) {
            // console.log('state in signInRequestStart=>>', JSON.stringify(state));
            // console.log("action in signInRequestStart=>>", action);

            if (typeof action.payload === 'string') {
                // Handle the case where payload is a string (e.g., 'signInResponse')
                state.isLoading = false;
                
                state[action.payload] = null
            }
        },
        loadingContactsState(state: any= initialState){ 
            state.isLoading = false
        },

    }
})


export const {
    contactRequestStart,
    contactListingRequestError,
    updateContact,
    deleteContact,
    getContactListing,
    addContact,
    clearContactResponse,
    loadingContactsState
} = contactListSlice.actions

export default contactListSlice.reducer; 