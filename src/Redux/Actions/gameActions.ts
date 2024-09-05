import { AppConstants } from "../../Theme/constants";

export function getCardDetails(fcmToken?: string, accessToken?: string) {
    return {
        type: AppConstants.redux.GET_CARD_DETAILS_START,
        payload: { fcmToken, accessToken }
    }
}

export function setSelectedLetters(letters: string[]) {
    return {
        type: AppConstants.redux.SET_SELECTED_LETTERS,
        payload: { letters }
    }
}

export function saveToWordsList(word: string) {
    return {
        type: AppConstants.redux.SAVE_TO_WORDS_LIST,
        payload: { word }
    }
}

export function getGameDetails() {
    return {
        type: AppConstants.redux.GET_GAME_DETAILS_START,
        payload: {}
    }
}

export function saveGameScore(score: number) {
    return {
        type: AppConstants.redux.SAVE_GAME_SCORE_START,
        payload: { score }
    }
}

export function setQuizAnswerStatus(status: string) {
    return {
        type: AppConstants.redux.SET_QUIZ_ANSWER_STATUS,
        payload: { status }
    }
}

export function resetGameData() {
    return {
        type: AppConstants.redux.RESET_GAME_DATA,
        payload: {}
    }
}

