import { call, put, select, takeLatest } from "redux-saga/effects"
import { NetworkRequestManager } from "../../Manager/NetworkRequestManager"
import { AppConstants } from "../../Theme/constants"
import { AppLogger, processErrorJsonResponse } from "../../Theme/utils"
import { Alert } from "react-native"

function* GetCardDetails(action: any) {
    try {
        const getState = (state) => (state)
        const state = yield select(getState)
        const userState = state.user
        if (!userState.isNetworkConnected) {
            alert("Please check your interent connection")
            return
        }
        const response: any = yield call(NetworkRequestManager.GetCardDetails, action.payload.fcmToken, action.payload.accessToken)
        AppLogger("Get Card Details Resposne *********", response)
        if (response.status === 200) {
            // alert(response.data.message)
            yield put({
                type: AppConstants.redux.GET_CARD_DETAILS_SUCCESS,
                status: response.status,
                data: response.data.data,
                // data: {
                //     card: {
                //         _id: "6512b17c7e1d1b1e7dda65ce",
                //         question: "The protagonist's inner struggle with concupiscence led them to wrestle with their _____ and make a profound moral choice.",
                //         option1: "desires",
                //         option2: "curiosity",
                //         option3: "heads",
                //         option4: "ignorance",
                //         answer: "option1",
                //         explanation: "Strong desire; “the struggle against concupiscence is a common theme in literature, portraying characters torn between their passions and reality.”",
                //         status: true,
                //         createdAt: "2023-09-26T10:25:00.049Z",
                //         updatedAt: "2023-09-29T16:01:37.162Z",
                //         __v: 0,
                //         word: "Comcupiscence"
                //     },
                //     gamesAvailable: true
                // }
            })
        } else if (response.status === 403) {
            const error = processErrorJsonResponse(response.error)
            alert(error + JSON.stringify(action))
            yield put({
                type: AppConstants.redux.GET_CARD_DETAILS_ERROR,
                status: response.status,
                error: response.error,
            })
            yield put({
                type: AppConstants.redux.LOGOUT_USER_DIRECTLY,
                payload: {}
            })
        } else if (response.status === 401) {
            const error = processErrorJsonResponse(response.error)
            alert(error + JSON.stringify(action))
            yield put({
                type: AppConstants.redux.GET_CARD_DETAILS_ERROR,
                status: response.status,
                error: response.error,
            })
            yield put({
                type: AppConstants.redux.LOGOUT_USER_DIRECTLY,
                payload: {}
            })
        } else {
            const error = processErrorJsonResponse(response.error)
            alert(error + JSON.stringify(action))
            AppLogger("Get Card Details Saga Processed Error *********", error)
            yield put({
                type: AppConstants.redux.GET_CARD_DETAILS_ERROR,
                status: response.status,
                error: response.error,
            })
        }
    } catch (err) {
        AppLogger("Get Card Details Saga Catch Error", err)
        alert(err + JSON.stringify(action))

        yield put({
            type: AppConstants.redux.GET_CARD_DETAILS_ERROR,
            status: 0,
            error: err,
        })
    }
}

function* GetGameDetails(action: any) {
    try {
        const getState = (state) => (state)
        const state = yield select(getState)
        const userState = state.user
        if (!userState.isNetworkConnected) {
            alert("Please check your interent connection")
            return
        }
        const response: any = yield call(NetworkRequestManager.GetGameDetails)
        AppLogger("Get Game Details Resposne *********", response)
        if (response.status === 200) {
            yield put({
                type: AppConstants.redux.GET_GAME_DETAILS_SUCCESS,
                status: response.status,
                data: response.data,
            })
        } else if (response.status === 403) {
            const error = processErrorJsonResponse(response.error)
            AppLogger("Get Game Details Saga Processed Error *********", error)
            alert(error + JSON.stringify(action))
            yield put({
                type: AppConstants.redux.GET_GAME_DETAILS_ERROR,
                status: response.status,
                error: response.error,
            })
            yield put({
                type: AppConstants.redux.LOGOUT_USER_DIRECTLY,
                payload: {}
            })
        } else if (response.status === 401) {
            const error = processErrorJsonResponse(response.error)
            AppLogger("Get Game Details Saga Processed Error *********", error)
            alert(error + JSON.stringify(action))
            yield put({
                type: AppConstants.redux.GET_GAME_DETAILS_ERROR,
                status: response.status,
                error: response.error,
            })
            yield put({
                type: AppConstants.redux.LOGOUT_USER_DIRECTLY,
                payload: {}
            })
        } else {
            const error = processErrorJsonResponse(response.error)
            AppLogger("Get Game Details Saga Processed Error *********", error)
            alert(error + JSON.stringify(action))
            yield put({
                type: AppConstants.redux.GET_GAME_DETAILS_ERROR,
                status: response.status,
                error: response.error,
            })
        }
    } catch (err) {
        AppLogger("Get Game Details Saga Catch Error", err)
        alert(err + JSON.stringify(action))
        yield put({
            type: AppConstants.redux.GET_GAME_DETAILS_ERROR,
            status: 0,
            error: err,
        })
    }
}

function* SaveGameScore(action: any) {
    try {
        const getUserState = (state) => (state)
        const userSelectState = yield select(getUserState)
        const userState = userSelectState.user
        if (!userState.isNetworkConnected) {
            alert("Please check your interent connection")
            return
        }
        const getState = (state) => (state)
        const state = yield select(getState)
        const gameState = state.game
        const wordsList = gameState.wordsList.toString()
        const selectedLetters = gameState.selectedLetters.toString()
        const quizAnswerStatus = gameState.quizAnswerStatus === "Correct" ? true : false

        const response: any = yield call(NetworkRequestManager.SaveGameScore, action.payload.score, wordsList, selectedLetters, quizAnswerStatus)
        AppLogger("Save Game Score Resposne *********", response)
        if (response.status === 200) {
            yield put({
                type: AppConstants.redux.SAVE_GAME_SCORE_SUCCESS,
                status: response.status,
                data: response.data,
            })
        } else if (response.status === 403) {
            const error = processErrorJsonResponse(response.error)
            alert(error + JSON.stringify(action))
            yield put({
                type: AppConstants.redux.SAVE_GAME_SCORE_ERROR,
                status: response.status,
                error: response.error,
            })
            yield put({
                type: AppConstants.redux.LOGOUT_USER_DIRECTLY,
                payload: {}
            })
        } else if (response.status === 401) {
            const error = processErrorJsonResponse(response.error)
            alert(error + JSON.stringify(action))
            yield put({
                type: AppConstants.redux.SAVE_GAME_SCORE_ERROR,
                status: response.status,
                error: response.error,
            })
            yield put({
                type: AppConstants.redux.LOGOUT_USER_DIRECTLY,
                payload: {}
            })
        } else {
            const error = processErrorJsonResponse(response.error)
            AppLogger("Save Game Score Saga Processed Error *********", error)
            alert(error + JSON.stringify(action))
            yield put({
                type: AppConstants.redux.SAVE_GAME_SCORE_ERROR,
                status: response.status,
                error: response.error,
            })
        }
    } catch (err) {
        AppLogger("Save Game Score Saga Catch Error", err)
        alert(err + JSON.stringify(action))
        yield put({
            type: AppConstants.redux.SAVE_GAME_SCORE_ERROR,
            status: 0,
            error: err,
        })
    }
}

function* watch() {
    yield takeLatest(AppConstants.redux.GET_CARD_DETAILS_START, GetCardDetails);
    yield takeLatest(AppConstants.redux.GET_GAME_DETAILS_START, GetGameDetails);
    yield takeLatest(AppConstants.redux.SAVE_GAME_SCORE_START, SaveGameScore);
}

export default watch;