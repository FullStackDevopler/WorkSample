import {all} from '@redux-saga/core/effects';
import { userSaga } from './userSaga';
import { jobSaga } from './jobSaga';
import { contactsSaga } from './contactsSaga';
import { hotshotSaga } from './hotshotSaga';

export default function* rootSaga () {
    yield all([
       userSaga(),
       jobSaga(),
       contactsSaga(),
       hotshotSaga()
    ]);
}