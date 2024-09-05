import { AppConstants } from "../../Theme/AppConstants"

export function createHotshotAction(body: any ,token: string){
    console.log('body',body);
    
    return {
        type: AppConstants.redux.CREATE_HOTSHOT_REQUEST_START,
        payload: { body, token}
    }
}

export function getHotshotListAction(token: string){
    return {
        type: AppConstants.redux.GET_HOTSHOT_LIST_REQUEST_START,
        payload: { token }
    }
}

export function getPastHotshotListAction(token: string){
    return {
        type: AppConstants.redux.GET_PAST_HOTSHOT_LIST_REQUEST_START,
        payload: { token }
    }
}

export function cancelHotshotAction(token: string, body: object){
    
    return {
        type: AppConstants.redux.CANCEL_HOTSHOT_REQUEST_START,
        payload: { token, body }
    }
}

export function finishHotshotAction(token: string, body: object){
    return {
        type: AppConstants.redux.FINISH_HOTSHOT_REQUEST_START,
        payload: { token, body}
    }
}

export function hotshotDetailsAction(token: string, body: object, jobType: string){
    return {
        type: AppConstants.redux.HOTSHOT_DETAILS_REQUEST_START,
        payload: { token, body, jobType }
    }
}


export function getChatAction(token: string, body: object){
    return {
        type: AppConstants.redux.GET_CHAT_REQUEST_START,
        payload: { token, body }
    }
}



export function hotshotDetailsForNotificationsAction(token: string, body: object){
    
    return {
        type: AppConstants.redux.HOTSHOT_DETAILS_NOTIFICATION_REQUEST_START,
        payload: { token, body }
    }
}

export function acceptHotshotProposal(token: string, body: object){
    
    return {
        type: AppConstants.redux.ACCEPT_PROPOSAL_REQUEST_START,
        payload: { token, body }
    }
}

export function getProposalsListAction(token: string, body: object){
    
    return {
        type: AppConstants.redux.GET_PROPOSAL_LIST_REQUEST_START,
        payload: { token, body }
    }
}


export function getProposalsCountAction(token: string, body: object){
    return {
        type: AppConstants.redux.GET_PROPOSAL_COUNT_REQUEST_START,
        payload: { token, body }
    }
}


export function getHotshotPriceAction(token: string, body: object){
    return {
        type: AppConstants.redux.GET_HOTSHOT_PRICE_REQUEST_START,
        payload: { token, body }
    }
}