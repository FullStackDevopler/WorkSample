import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type DeleteResponseAction = {
    type: string;
    payload: string;
};

const initialState = {
    isLoading: false,
    error: null,
    hotshotDetails: {},
    hotshotList: [],
    pastHotshotList: [],
    cancelHotshotResponse: {},
    finishHotshotResponse: {},
    getChatData: {},
    hotshotDetailsResponse: {},
    acceptProposalResponse: {},
    proposalsList: [],
    proposalsCount: {},
    hotshotPriceResponse: {}
}

const hotshotSlice = createSlice({
    name: 'hotshotList',
    initialState: initialState,
    reducers: {


        hotshotRequestStart(state: any = initialState, action: PayloadAction<{ [key: string]: null } | string>) {
            // console.log('state in signInRequestStart=>>', JSON.stringify(state));
            // console.log("action in signInRequestStart=>>", action);

            if (typeof action.payload === 'string') {
                // Handle the case where payload is a string (e.g., 'signInResponse')
                state.isLoading = true;
                state.error = null;
            }
        },

        hotshotListingRequestError(state: any = initialState, action: PayloadAction<{ errorMessage?: string }>) {
            // console.log('state in jobRequestError=>>', JSON.stringify(state));
            console.log("action in jobRequestError=>>", action);
            state.isLoading = false;
            state.error = action.payload.errorMessage
        },


        getCreatedHotshot(state: any = initialState, action: PayloadAction<{ hotshotDetails?: object; errorMessage?: string }>) {
            state.isLoading = false
            if (action.payload.hotshotDetails) {
                state.hotshotDetails = action.payload.hotshotDetails
            } else if (action.payload.errorMessage) {
                state.error = action.payload.errorMessage
            }
        },
        getHotshotList(state: any = initialState, action: PayloadAction<{ hotshotList?: any}>) {
            state.isLoading = false
            if (action.payload.hotshotList) {
                state.hotshotList = action.payload.hotshotList
            } 
       
        },
        getPastHotshotList(state: any = initialState, action: PayloadAction<{ pastHotshotList?: any }>) {
            state.isLoading = false
            if (action.payload.pastHotshotList) {
                state.pastHotshotList = action.payload.pastHotshotList
            } 
        },
    
        getCancelHotshot(state: any = initialState, action: PayloadAction<{ cancelHotshotResponse?: object }>) {
            state.isLoading = false
            if (action.payload.cancelHotshotResponse) {
                state.cancelHotshotResponse = action.payload.cancelHotshotResponse
            } 
        },
        getFinishHotshot(state: any = initialState, action: PayloadAction<{ finishHotshotResponse?: object }>) {
            state.isLoading = false
            if (action.payload.finishHotshotResponse) {
                state.finishHotshotResponse = action.payload.finishHotshotResponse
            } 
        },
        getHotshotDetails(state: any = initialState, action: PayloadAction<{ hotshotDetails?: any,  jobType: string }>) {
            const { hotshotDetails, jobType } = action.payload
            // console.log('hotshotDetails in reducer=>',hotshotDetails); 
            
            state.isLoading = false
            state.error = null;
            let tempData = [...state[jobType]]

            const index = tempData.findIndex((item: any) => item?._id == hotshotDetails?._id)

            if (index > -1) {                
                tempData.splice(index, 1, hotshotDetails);
                state[jobType] = tempData
            }

        },
        getChatList(state: any = initialState, action: PayloadAction<{ getChatData?: object }>) {
            state.isLoading = false
            if (action.payload.getChatData) {
                state.getChatData = action.payload.getChatData
            } 
        },
        getHotshotDetailsNotification(state: any = initialState, action: PayloadAction<{ hotshotDetailsResponse?: any }>) {
            
            state.isLoading = false
            if (action.payload.hotshotDetailsResponse) {
                state.hotshotDetailsResponse = action.payload.hotshotDetailsResponse
            } 
           

        },
        
        getAcceptProposal(state: any = initialState, action: PayloadAction<{ acceptProposalResponse?: any }>) {
            
            state.isLoading = false
            if (action.payload.acceptProposalResponse) {
                state.acceptProposalResponse = action.payload.acceptProposalResponse
            } 
        
        },
        getProposalsCount(state: any = initialState, action: PayloadAction<{ proposalsCount?: any }>) {
            
            state.isLoading = false
            if (action.payload.proposalsCount) {
                state.proposalsCount = action.payload.proposalsCount
            } 
        
        },
        getHotshotPrice(state: any = initialState, action: PayloadAction<{ hotshotPriceResponse?: any }>) {
            
            state.isLoading = false
            if (action.payload.hotshotPriceResponse) {
                state.hotshotPriceResponse = action.payload.hotshotPriceResponse
            } 
        
        },
        
        getProposalsListing(state: any = initialState, action: PayloadAction<{ proposalsList?: any }>) {
            state.isLoading = false
            if (action.payload.proposalsList) {
                state.proposalsList = action.payload.proposalsList
            } 
        
        },
        
        clearHotshotResponse(state: any = initialState, action: DeleteResponseAction) {
            
            return {
                ...state,
                [action.payload]: null
            }
        },
        loadingHotshotState(state: any= initialState){ 
            state.isLoading = false
        },
    }
})


export const {
    hotshotRequestStart,
    hotshotListingRequestError,
    getCreatedHotshot,
    getHotshotList,
    getPastHotshotList,
    getCancelHotshot,
    getFinishHotshot,
    getHotshotDetails,
    getChatList,
    getHotshotDetailsNotification,
    getAcceptProposal,
    getProposalsCount,
    getHotshotPrice,
    getProposalsListing,
    clearHotshotResponse,
    loadingHotshotState
} = hotshotSlice.actions

export default hotshotSlice.reducer; 