import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type DeleteResponseAction = {
    type: string;
    payload: string;
};

type CancelJob = {
    message: string;
    deleteId ?: string
}

const initialState = {

    isLoading: false,
    error: null,
    jobDetails: {},
    allJobDetails: {},
    myInJobs: [],
    myOutJobs: [],
    myInPastJobs: [],
    myOutPastJobs: [],
    myInUnAssignedJobs: [],
    myOutUnAssignedJobs: [],
    vehicleList: [],
    createBillData: {},
    completeJobData: {},
    acceptJobData: {},
    cancelJob: {},
    ratingMessage: '',
    ratingData: {},
    selectedJobItem:{},
    inJobMyJobCount: {},
    newLoadsCount: {},
    outMyJobCount: {},
    outUnassignJobCount: {},
    jobPriceResponse: {}

    
}

const jobListSlice = createSlice({
    name: 'jobList',
    initialState: initialState,
    reducers: {


        jobRequestStart(state: any = initialState, action: PayloadAction<{ [key: string]: null } | string>) {

            if (typeof action.payload === 'string') {
                // Handle the case where payload is a string (e.g., 'signInResponse')
                state.isLoading = true;
                state.error = null;
            }
        },

        jobListingRequestError(state: any = initialState, action:  PayloadAction<{ errorMessage?: string }>) {
            state.isLoading = false;
            state.error = action.payload.errorMessage
        },
        getCreatedJob(state: any= initialState,  action: PayloadAction<{jobDetails?: object; errorMessage?: string }>){
            state.isLoading = false
            if(action.payload.jobDetails){
        
                state.jobDetails = action.payload.jobDetails         
            } else if(action.payload.errorMessage) {
              state.error = action.payload.errorMessage
            }   
        },
        getmyInJobs(state: any = initialState, action: PayloadAction<{ myInJobs?: string }>) {

            state.isLoading = false;
            state.error = null;
            state.myInJobs = action.payload.myInJobs

        },

        getJobDetails(state: any = initialState, action: PayloadAction<{ jobDetails?: any, jobType: string }>) {
     
            
            const { jobDetails, jobType } = action.payload
            // console.log("jobDetails in jobListSlice",jobDetails);
            
            // console.log('jobDetails._id',jobDetails._id);

            state.isLoading = false;
            state.error = null;
            let tempData = [...state[jobType]]
            
            const index = tempData.findIndex((item: any) => item?._id == jobDetails?._id)
            if (index > -1) {                
                tempData.splice(index, 1, jobDetails);
                state[jobType] = tempData
            }


        },
        getNotificationJobDetail(state: any= initialState,  action: PayloadAction<{selectedJobItem?: any; jobType: string  }>){
            state.isLoading = false
            if(action.payload.selectedJobItem){
                state.selectedJobItem = action.payload.selectedJobItem         
            }
             
        },
        getJobDetailsForNotification(state: any = initialState, action: PayloadAction<{ allJobDetails?: any }>) {
            state.isLoading = false
            if(action.payload.allJobDetails.status == 'InProgress'){
                state.error = null;
                state.allJobDetails = action.payload.allJobDetails
            
                let tempData = [...state.myOutJobs];                  
                
                const index = tempData.findIndex(item => {
                   return item._id == action.payload.allJobDetails._id})
                
                if (index < 0) {
                    tempData.push(action.payload.allJobDetails);
                }
                state.myOutJobs = tempData
            } 
            
            else if (action.payload.allJobDetails.status == 'Completed' || action.payload.allJobDetails.status == 'Cancelled'){
                state.error = null;
                state.allJobDetails = action.payload.allJobDetails
            
                let tempPastData = [...state.myOutPastJobs];
                const index = tempPastData.findIndex(item => item._id == action.payload.allJobDetails?.id)
                
                if (index < 0) {
                    tempPastData.push(action.payload.allJobDetails);
                }
                state.myOutPastJobs = tempPastData
            }

            else if (action.payload.allJobDetails.status == 'Pending'){
                state.error = null;
                state.allJobDetails = action.payload.allJobDetails
            
                let tempNewLoadsData = [...state.myInUnAssignedJobs];
                const index = tempNewLoadsData.findIndex(item => item._id == action.payload.allJobDetails?.id)
                
                
                if (index < 0) {
                    tempNewLoadsData.push(action.payload.allJobDetails);
                }
                state.myInUnAssignedJobs = tempNewLoadsData
            }
     
            
            // if(action.payload.allJobDetails){
            //     state.allJobDetails = action.payload.allJobDetails   
            //     state.isLoading = false      
            // }  
        },
        getmyOutJobs(state: any = initialState, action: PayloadAction<{ myOutJobs?: string }>) {

            state.isLoading = false;
            state.error = null;
            state.myOutJobs = action.payload.myOutJobs

        },
        getmyInPastJobs(state: any = initialState, action: PayloadAction<{ myInPastJobs?: string }>) {

            state.isLoading = false;
            state.error = null;
            state.myInPastJobs = action.payload.myInPastJobs

        },
        getmyOutPastJobs(state: any = initialState, action: PayloadAction<{ myOutPastJobs?: string }>) {

 
            state.isLoading = false;
            state.error = null;
            state.myOutPastJobs = action.payload.myOutPastJobs

        },
        getmyInUnAssignedJobs(state: any = initialState, action: PayloadAction<{ myInUnAssignedJobs?: string }>) {

            state.isLoading = false;
            state.error = null;
            state.myInUnAssignedJobs = action.payload.myInUnAssignedJobs

        },
        getmyOutUnAssignedJobs(state: any = initialState, action: PayloadAction<{ myOutUnAssignedJobs?: any }>) {

            state.isLoading = false;
            state.error = null;
            state.myOutUnAssignedJobs = action.payload.myOutUnAssignedJobs
    
        },
        getInJobMyJobCountResponse(state: any= initialState,  action: PayloadAction<{inJobMyJobCount?: string }>){
          
             state.isLoading = false
             if(action.payload.inJobMyJobCount){
                 state.inJobMyJobCount = action.payload.inJobMyJobCount         
             }
              
         },
       
        getNewLoadsCountResponse(state: any= initialState,  action: PayloadAction<{newLoadsCount?: string }>){
          
            state.isLoading = false
            if(action.payload.newLoadsCount){
                state.newLoadsCount = action.payload.newLoadsCount         
            }
             
        },
        getOutJobMyJobCountResponse(state: any= initialState,  action: PayloadAction<{outMyJobCount?: string }>){
          
            state.isLoading = false
            if(action.payload.outMyJobCount){
                state.outMyJobCount = action.payload.outMyJobCount         
            }
             
        },
        getOutUnassignCountResponse(state: any= initialState,  action: PayloadAction<{outUnassignJobCount?: string }>){
          
            state.isLoading = false
            if(action.payload.outUnassignJobCount){
                state.outUnassignJobCount = action.payload.outUnassignJobCount         
            }
             
        },
        getVehichleList(state: any= initialState,  action: PayloadAction<{vehicleList?: any; errorMessage?: string }>){
            
             state.isLoading = false
             if(action.payload.vehicleList){
                 state.vehicleList = action.payload.vehicleList         
             }
              
         },
         getJobPrice(state: any= initialState,  action: PayloadAction<{jobPriceResponse?: any }>){
         
            state.isLoading = false
            if(action.payload.jobPriceResponse){
                state.jobPriceResponse = action.payload.jobPriceResponse         
            }
             
        },
         getCreateBill(state: any= initialState,  action: PayloadAction<{createBillData?: any, errorMessage?: string }>){
            // console.log('state in getCreateBill', state);
            console.log('action in getCreateBill', action);
            console.log('jobId in getCreateBill:', action.payload.createBillData.job_id);
            
            
             state.isLoading = false
             if(action.payload.createBillData){
                 state.createBillData = action.payload.createBillData  
                 
                 let tempData = [...state.myInJobs];

                 const index = tempData.findIndex(item => item._id == action.payload.createBillData.job_id)
     
                 console.log("index of deleted item", index);
                 if (index !== -1) {
                     tempData.splice(index, 1);
                 }
                 state.myInJobs = tempData
             }
             else if (action.payload.errorMessage) {
                state.error = action.payload.errorMessage
            }
              
         },
         completedJob(state: any= initialState,  action: PayloadAction<{completeJobData?: any, errorMessage?: string }>){
            // console.log('state in completedJob', state);
            // console.log('action in completedJob', action);
            
             state.isLoading = false
             if(action.payload.completeJobData){
                 state.completeJobData = action.payload.completeJobData         
             }
             else if (action.payload.errorMessage) {
                state.error = action.payload.errorMessage
            }
              
         },
         getAcceptJobData(state: any= initialState,  action: PayloadAction<{acceptJobData?: any }>){
            // console.log('state in getAcceptJobData', state);
            // console.log('action in getAcceptJobData', action);
            
             state.isLoading = false
             if(action.payload.acceptJobData){
                 state.acceptJobData = action.payload.acceptJobData         
             }
              
         },
         cancelJobsList(state: any= initialState,  action: PayloadAction<{cancelJob?: CancelJob }>){
            // console.log('state in cancelJobsList', state);
            // console.log('action in cancelJobsList', action);
            
             state.isLoading = false
             if(action.payload.cancelJob){
                 state.cancelJob = action.payload.cancelJob         
             }

             let tempData = [...state.myOutUnAssignedJobs];
             
             const index = tempData.findIndex((item) => 
                item._id == action.payload.cancelJob?.deleteId
            )
 
             console.log("index of deleted item", index);
             if (index !== -1) {
                 tempData.splice(index, 1);
             }
        
             state.myOutUnAssignedJobs = tempData
              
         },
         giveRatingResponse(state: any= initialState,  action: PayloadAction<{ratingMessage?: string }>){
            // console.log('state in giveRatingResponse', state);
            // console.log('action in giveRatingResponse', action);
            
             state.isLoading = false
             if(action.payload.ratingMessage){
                 state.ratingMessage = action.payload.ratingMessage         
             }
              
         },
         getRatingResponse(state: any= initialState,  action: PayloadAction<{ratingData?: string }>){
            // console.log('state in giveRatingResponse', state);
            // console.log('action in giveRatingResponse', action);
            
             state.isLoading = false
             if(action.payload.ratingData){
                 state.ratingData = action.payload.ratingData         
             }
              
         },
      
        clearJobsResponse(state: any = initialState, action: DeleteResponseAction) {
            // console.log('state in signInRequestStart=>>', JSON.stringify(state));
            // console.log("action in signInRequestStart=>>", action);

            return {
                ...state,
                [action.payload]: null
            }
        },
        loadingJobsState(state: any= initialState){ 
            state.isLoading = false
        },
    }
})


export const {
    jobRequestStart,
    jobListingRequestError,
    getCreatedJob,
    getmyInJobs,
    getJobDetails,
    getNotificationJobDetail,
    getJobDetailsForNotification,
    getmyOutJobs,
    getmyInPastJobs,
    getmyOutPastJobs,
    getmyInUnAssignedJobs,
    getmyOutUnAssignedJobs,
    getInJobMyJobCountResponse,
    getNewLoadsCountResponse,
    getOutJobMyJobCountResponse,
    getOutUnassignCountResponse,
    getVehichleList,
    getJobPrice,
    getCreateBill,
    completedJob,
    getAcceptJobData,
    cancelJobsList,
    giveRatingResponse,
    getRatingResponse,
    clearJobsResponse,
    loadingJobsState
} = jobListSlice.actions

export default jobListSlice.reducer; 