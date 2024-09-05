import { AppConstants } from "../../Theme/AppConstants"

  export function createdJobAction(myFormData: any, accessToken: string){
    
    return {
        type: AppConstants.redux.JOB_CREATED_REQUEST_START,
        payload: { myFormData, accessToken }
    }
}

export function myInJobAction(token: string) {
    console.log("in myInJobAction");
    return {
        type: AppConstants.redux.MY_IN_JOB_REQUEST_START,
        payload: { token }
    }

}
export function jobDetailAction(token: string,jobId:string,jobType:string) {
    console.log("in myInJobAction");
    return {
        type: AppConstants.redux.JOB_DETAILS_START,
        payload: { token,jobId,jobType}
    }

}


export function jobDetailNotificationAction(token: string,jobId:string,jobType:string) {
    return {
        type: AppConstants.redux.JOB_DETAILS_NOTIFICATION_START,
        payload: { token,jobId,jobType}
    }

}

export function myOutJobAction(token: string) {
    console.log("in myOutJobAction");

    return {
        type: AppConstants.redux.MY_OUT_JOB_REQUEST_START,
        payload: { token }
    }
}
export function myInPastJobAction(token: string, body: object) {
    console.log("in myInPastJobAction");

    return {
        type: AppConstants.redux.MY_IN_PAST_JOB_REQUEST_START,
        payload: { token , body }
    }
}
export function myOutPastJobAction(token: string, body: object) {
    console.log("in myOutPastJobAction");

    return {
        type: AppConstants.redux.MY_OUT_PAST_JOB_REQUEST_START,
        payload: { token, body }
    }
}
export function myInUnAssignedJobAction(token: string) {
    console.log("in myInUnAssignedJobAction");

    return {
        type: AppConstants.redux.MY_IN_UNASSIGNED_JOB_REQUEST_START,
        payload: { token }
    }
}
export function myOutUnAssignedJobAction(token: string) {
    console.log("in myOutUnAssignedJobAction");

    return {
        type: AppConstants.redux.MY_OUT_UNASSIGNED_JOB_REQUEST_START,
        payload: { token }
    }
}
export function vehichleListAction(token: string){
    return {
        type: AppConstants.redux.VEHICLE_LIST_REQUEST_START,
        payload: { token }
    }
}

export function createBillAction(token: string, body: any){
    return {
        type: AppConstants.redux.CREATE_BILL_REQUEST_START,
        payload: { token , body}
    }
}

export function completeJobAction(token: string, body: any){
    return {
        type: AppConstants.redux.COMPLETE_JOB_REQUEST_START,
        payload: { token , body}
    }
}

export function acceptJob(token: string, body: object){
    return {
        type: AppConstants.redux.ACCEPT_JOB_REQUEST_START,
        payload: { token ,body}
    }
}

export function cancelJobAction(token: string, reason: string, jobId: string, name: string){
    return {
        type: AppConstants.redux.CANCEL_JOB_REQUEST_START,
        payload: { token, reason, jobId , name}
    }
}

export function giveRatingAction(token: string){
    return {
        type: AppConstants.redux.RATING_REQUEST_START,
        payload: { token }
    }
}

export function getRatingAction(token: string, driverId: string){
    console.log('driverId in getRatingAction', driverId);
    
    return {
        type: AppConstants.redux.GET_RATING_REQUEST_START,
        payload: { token , driverId}
    }
}

export function getInJobMyJobCount(token: string, body: object) {
    return {
        type: AppConstants.redux.JOB_COUNT_REQUEST_START,
        payload: { token, body }
    }
}

export function getNewLoadsCount(token: string, body: object) {
    return {
        type: AppConstants.redux.JOB_COUNT_REQUEST_START,
        payload: { token, body }
    }
}

export function getOutJobMyJobCount(token: string, body: object) {
    return {
        type: AppConstants.redux.JOB_COUNT_REQUEST_START,
        payload: { token, body }
    }
}

export function getOutJobUnassignCount(token: string, body: object) {
    return {
        type: AppConstants.redux.JOB_COUNT_REQUEST_START,
        payload: { token, body }
    }
}

export function jobDetailForNotificationAction(token: string, jobId: string) {
    return {
        type: AppConstants.redux.JOB_DETAILS_FOR_NOTIFICATION_START,
        payload: { token, jobId }
    }

}

export function getJobPriceAction(token: string, body: object) {
    return {
        type: AppConstants.redux.JOB_PRICE_REQUEST_START,
        payload: { token, body }
    }

}
