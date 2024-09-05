import { all } from "redux-saga/effects";
import userSaga from "./user-saga";
import gameSaga from "./game-saga";

const sagas = [userSaga(), gameSaga()]

function* rootSaga() {
    yield all(sagas);
}

export default rootSaga;