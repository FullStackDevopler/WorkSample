import { AppConstants } from "../../Theme/constants";


const initialState = {
    loading: false,
    error: null,
    cardDetails: null,
    selectedLetters: [],
    wordsList: [],
    quizAnswerStatus: "Incorrect",
    gameScoreResponse: null,
    gameDetails: null
}

export default function userReducer(state = initialState, action: any) {
    switch (action.type) {
        case AppConstants.redux.GET_CARD_DETAILS_START: {
            return {
                ...state,
                token: action.payload.token,
                loading: true,
                error: null,
                cardDetails: null
            }
        }
        case AppConstants.redux.GET_CARD_DETAILS_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: null,
                cardDetails: action.data
            }
        }
        case AppConstants.redux.GET_CARD_DETAILS_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error,
                cardDetails: null
            }
        }
        case AppConstants.redux.SET_SELECTED_LETTERS: {
            return {
                ...state,
                selectedLetters: action.payload.letters
            }
        }
        case AppConstants.redux.SAVE_TO_WORDS_LIST: {
            const words = JSON.parse(JSON.stringify(state.wordsList))
            words.unshift(action.payload.word)
            return {
                ...state,
                wordsList: words
            }
        }
        case AppConstants.redux.GET_GAME_DETAILS_START: {
            return {
                ...state,
                loading: true,
                error: null,
                gameDetails: null
            }
        }
        case AppConstants.redux.GET_GAME_DETAILS_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: null,
                gameDetails: action.data,
                gameScoreResponse: null
            }
        }
        case AppConstants.redux.GET_GAME_DETAILS_ERROR: {
            return {
                ...state,
                loading: true,
                error: action.error,
                gameDetails: null
            }
        }
        case AppConstants.redux.SET_QUIZ_ANSWER_STATUS: {
            return {
                ...state,
                quizAnswerStatus: action.payload.status
            }
        }
        case AppConstants.redux.SAVE_GAME_SCORE_START: {
            return {
                ...state,
                loading: true,
                gameScoreResponse: null,
                error: null
            }
        }
        case AppConstants.redux.SAVE_GAME_SCORE_SUCCESS: {
            return {
                ...state,
                loading: false,
                gameScoreResponse: action.data,
                error: null
            }
        }
        case AppConstants.redux.SAVE_GAME_SCORE_ERROR: {
            return {
                ...state,
                loading: false,
                gameScoreResponse: null,
                error: action.error
            }
        }
        case AppConstants.redux.RESET_GAME_DATA: {
            return {
                ...state,
                loading: false,
                error: null,
                cardDetails: null,
                selectedLetters: [],
                wordsList: [],
                quizAnswerStatus: "Incorrect",
                gameScoreResponse: null,
                gameDetails: null
            }
        }
        default:
            return state;
    }
}