import { put, call, takeLatest } from 'redux-saga/effects';
import { AppConstants } from '../../Theme/AppConstants';
import { NetworkRequestManager } from '../../Manager/NetworkRequestManager';
import { cancelJobsList, completedJob, getAcceptJobData, getCreateBill, getCreatedJob, getInJobMyJobCountResponse, getJobDetails, getJobDetailsForNotification, getJobPrice, getNewLoadsCountResponse, getNotificationJobDetail, getOutJobMyJobCountResponse, getOutUnassignCountResponse, getRatingResponse, getVehichleList, getmyInJobs, getmyInPastJobs, getmyInUnAssignedJobs, getmyOutJobs, getmyOutPastJobs, getmyOutUnAssignedJobs, giveRatingResponse, jobListingRequestError, jobRequestStart } from '../Reducers/jobListSlice';
import { AppLogger } from '../../Theme/utils';
import { deleteToken } from '../Reducers/userInfoSlice';

// Function for Creating the jobs
export function* JobCreatedSaga(action: any) {
  const { myFormData, accessToken } = action.payload;

  yield put(jobRequestStart('jobDetails'))
  try {

    const response: { status: number; data?: any; message?: string } = yield call(
      NetworkRequestManager.GetCreatedJobDetails, myFormData, accessToken
    );

    if (response.status === 200 || response.status === 201) {
      yield put(getCreatedJob({ jobDetails: response?.data }));
    }
    else if (response.status === 401) {
      yield put(deleteToken());
    }
    else {
      const errorMessage = response?.message || "Something went wrong";
      AppLogger("JobCreatedSaga Error=>", errorMessage);
      yield put(getCreatedJob({ errorMessage }));

    }
  } catch (err: any) {
    const errorMessage = err?.message || "An unexpected error occurred";
    AppLogger("JobCreatedSaga Catch Error", err);
    yield put(getCreatedJob({ errorMessage }));

  }
}

// Function for get listing of IN JOBS-> MY JOBS
export function* MyInJobSaga(action: any) {

  const { token } = action.payload;
  yield put(jobRequestStart('myInJobs'))

  try {
    const response: { status: number; data?: any; message?: string } = yield call(
      NetworkRequestManager.GetMyInJobs, token);


    if (response.status === 200 || response.status === 201) {
      yield put(getmyInJobs({ myInJobs: response?.data }))
    }
    else if (response.status === 401) {
      yield put(deleteToken());
    }
    else {
      const errorMessage = response?.message || "Something went wrong";
      yield put(jobListingRequestError({ errorMessage }));

    }
  } catch (err: any) {

    const errorMessage = err?.message || "An unexpected error occurred";
    yield put(jobListingRequestError({ errorMessage }));

  }
}

// Function for get jobDetails
export function* JobDetailsSaga(action: any) {

  const { token, jobId, jobType } = action.payload;
  yield put(jobRequestStart('jobDetails'))

  try {
    const response: { status: number; data?: any; message?: string } = yield call(
      NetworkRequestManager.GetJobDetails, token, jobId);


    if (response.status === 200 || response.status === 201) {
      yield put(getJobDetails({ jobDetails: response?.data, jobType }))
    }
    else if (response.status === 401) {
      yield put(deleteToken());
    }
    else {
      const errorMessage = response?.message || "Something went wrong";
      yield put(jobListingRequestError({ errorMessage }));

    }
  } catch (err: any) {

    const errorMessage = err?.message || "An unexpected error occurred";
    console.log(" error in JobDetailsSaga=>>>", err);
    
    yield put(jobListingRequestError({ errorMessage }));

  }
}

// Function for get particular jobDetails on notification item click
export function* GetNotificationJobDetail(action: any) {

  const { token, jobId, jobType } = action.payload;
  AppLogger('action.payload in MyInJobSaga ', action.payload);
  yield put(jobRequestStart('jobDetails'))

  try {
    const response: { status: number; data?: any; message?: string } = yield call(
      NetworkRequestManager.GetJobDetails, token, jobId);

    // console.log('response in JobDetailsSaga Saga', JSON.stringify(response));

    if (response.status === 200 || response.status === 201) {

      AppLogger('jobType in JobDetailsSaga', jobType);

      yield put(getNotificationJobDetail({ selectedJobItem: response?.data, jobType }))
    }
    else if (response.status === 401) {
      yield put(deleteToken());
    }
    else {
      console.log("in else of JobDetailsSaga",);
      const errorMessage = response?.message || "Something went wrong";
      yield put(jobListingRequestError({ errorMessage }));

    }
  } catch (err: any) {
    console.log("in error of JobDetailsSaga", err);

    const errorMessage = err?.message || "An unexpected error occurred";
    yield put(jobListingRequestError({ errorMessage }));

  }
}

// Function for get jobDetails in notifications screen before navigating anywhere
export function* JobDetailsNotificationsSaga(action: any) {

  const { token, jobId } = action.payload;
  yield put(jobRequestStart('allJobDetails'))

  try {
    const response: { status: number; data?: any; message?: string } = yield call(
      NetworkRequestManager.GetJobDetails, token, jobId);

      console.log("response in JobDetailsNotificationsSaga ", JSON.stringify(response));
      
    if (response.status === 200 || response.status === 201) {
      yield put(getJobDetailsForNotification({ allJobDetails: response?.data }))
    }
    else if (response.status === 401) {
      yield put(deleteToken());
    }
    else {
      const errorMessage = response?.message || "Something went wrong";
      yield put(jobListingRequestError({ errorMessage }));
    }

  } catch (err: any) {
    const errorMessage = err?.message || "An unexpected error occurred";
    yield put(jobListingRequestError({ errorMessage }));

  }
}

// Function for get listing of OUT JOBS-> MY JOBS

export function* MyOutJobSaga(action: any) {
  const { token } = action.payload;
  yield put(jobRequestStart('myOutJobs'))

  try {
    const response: { status: number; data?: any; message?: string } = yield call(
      NetworkRequestManager.GetMyOutJobs, token);


    if (response.status === 200 || response.status === 201) {
      yield put(getmyOutJobs({ myOutJobs: response?.data }))
    }
    else if (response.status === 401) {
      yield put(deleteToken());
    }
    else {
      const errorMessage = response?.message || "Something went wrong";
      yield put(jobListingRequestError({ errorMessage }));

    }
  } catch (err: any) {

    const errorMessage = err?.message || "An unexpected error occurred";
    yield put(jobListingRequestError({ errorMessage }));

  }
}

// Function for get listing of IN JOBS-> PAST JOBS

export function* MyInPastJobSaga(action: any) {


  const { token, body } = action.payload;
  console.log('action.payload in MyInPastJobSaga: ', action.payload);
  yield put(jobRequestStart('myInPastJobs'))

  try {
    const response: { status: number; data?: any; message?: string } = yield call(
      NetworkRequestManager.GetMyInPastJobs, token, body);

    // console.log('response in  MyInPastJobSaga', response);

    if (response.status === 200 || response.status === 201) {
      yield put(getmyInPastJobs({ myInPastJobs: response?.data }))
    }
    else if (response.status === 401) {

      yield put(deleteToken());
    }
    else {
      const errorMessage = response?.message || "Something went wrong";
      yield put(jobListingRequestError({ errorMessage }));

    }
  } catch (err: any) {

    const errorMessage = err?.message || "An unexpected error occurred";
    yield put(jobListingRequestError({ errorMessage }));

  }
}

// Function for get listing of OUT JOBS-> PAST JOBS

export function* MyOutPastJobSaga(action: any) {


  const { token, body } = action.payload;
  yield put(jobRequestStart('myOutPastJobs'))

  try {
    const response: { status: number; data?: any; message?: string } = yield call(
      NetworkRequestManager.GetMyOutPastJobs, token, body);


    if (response.status === 200 || response.status === 201) {
      console.log("status is 200 MyOutPastJobSaga");
      yield put(getmyOutPastJobs({ myOutPastJobs: response?.data }))
    }
    else if (response.status === 401) {
      yield put(deleteToken());
    }
    else {
      const errorMessage = response?.message || "Something went wrong";
      yield put(jobListingRequestError({ errorMessage }));

    }
  } catch (err: any) {

    const errorMessage = err?.message || "An unexpected error occurred";
    yield put(jobListingRequestError({ errorMessage }));

  }
}

// Function for get listing of IN JOBS-> UNASSIGNED JOBS

export function* MyInUnassignedSaga(action: any) {
  const { token } = action.payload;
  yield put(jobRequestStart('myInUnAssignedJobs'))

  try {
    const response: { status: number; data?: any; message?: string } = yield call(
      NetworkRequestManager.GetMyInAssignedJobs, token);


    if (response.status === 200 || response.status === 201) {
      console.log("status is 200 MyInUnassignedSaga");
      yield put(getmyInUnAssignedJobs({ myInUnAssignedJobs: response?.data }))
    }
    else if (response.status === 401) {
      yield put(deleteToken());
    }
    else {
      const errorMessage = response?.message || "Something went wrong";
      yield put(jobListingRequestError({ errorMessage }));

    }
  } catch (err: any) {

    const errorMessage = err?.message || "An unexpected error occurred";
    yield put(jobListingRequestError({ errorMessage }));

  }
}

// Function for get listing of OUT JOBS-> JOB REQUEST

export function* MyOutUnAssignedJobSaga(action: any) {
  const { token } = action.payload;
  yield put(jobRequestStart('myOutUnAssignedJobs'))

  try {
    const response: { status: number; data?: any; message?: string } = yield call(
      NetworkRequestManager.GetMyOutUnassignedJobs, token);


    if (response.status === 200 || response.status === 201) {
      yield put(getmyOutUnAssignedJobs({ myOutUnAssignedJobs: response?.data }))
    }
    else if (response.status === 401) {
      yield put(deleteToken());
    }
    else {
      const errorMessage = response?.message || "Something went wrong";
      yield put(jobListingRequestError({ errorMessage }));

    }
  } catch (err: any) {

    const errorMessage = err?.message || "An unexpected error occurred";
    yield put(jobListingRequestError({ errorMessage }));

  }
}


// Function for get vehichle listing 

export function* vehicleListSaga(action: any) {
  const { token } = action.payload;

  yield put(jobRequestStart('vehicleList'))
  try {
    const response: { status: number; data?: any; message?: string } = yield call(
      NetworkRequestManager.GetVehichleList, token
    );

    // AppLogger("vehicleListSaga Response=>", JSON.stringify(response));

    if (response.status === 200 || response.status === 201) {
      yield put(getVehichleList({ vehicleList: response?.data }));
    }
    else if (response.status === 401) {
      yield put(deleteToken());
    }
    else {
      const errorMessage = response?.message || "Something went wrong";
      AppLogger("vehicleListSaga Error=>", errorMessage);
      yield put(jobListingRequestError({ errorMessage }));

    }
  } catch (err: any) {
    const errorMessage = err?.message || "An unexpected error occurred";
    AppLogger("vehicleListSaga Catch Error", err);
    yield put(jobListingRequestError({ errorMessage }));

  }
}

// Function for create the bill after finish job

export function* createBillSaga(action: any) {
  const { token, body } = action.payload;

  yield put(jobRequestStart('createBillData'))
  try {
    const response: { status: number; data?: any; message?: string } = yield call(
      NetworkRequestManager.CreateBill, token, body
    );

    AppLogger("createBillSaga Response=>", JSON.stringify(response));

    if (response.status === 200 || response.status === 201) {
      yield put(getCreateBill({ createBillData: response?.data, }));
    }
    else if (response.status === 401) {
      yield put(deleteToken());
    }
    else {
      const errorMessage = response?.message || "Something went wrong";
      AppLogger("createBillSaga Error=>", errorMessage);
      yield put(getCreateBill({ errorMessage }));

    }
  } catch (err: any) {
    const errorMessage = err?.message || "An unexpected error occurred";
    AppLogger("createBillSaga Catch Error", err);
    yield put(getCreateBill({ errorMessage }));

  }
}

//Function for complete job
export function* completeJobSaga(action: any) {
  const { token, body } = action.payload;

  yield put(jobRequestStart('completeJobData'))
  try {
    const response: { status: number; data?: any; message?: string } = yield call(
      NetworkRequestManager.CompleteJob, token, body
    );

    AppLogger("completeJobSaga Response=>", JSON.stringify(response));

    if (response.status === 200 || response.status === 201) {
      yield put(completedJob({ completeJobData: response?.data }));
    }
    else if (response.status === 401) {
      yield put(deleteToken());
    }
    else {
      const errorMessage = response?.message || "Something went wrong";
      AppLogger("completeJobSaga Error=>", errorMessage);
      yield put(completedJob({ errorMessage }));

    }
  } catch (err: any) {
    const errorMessage = err?.message || "An unexpected error occurred";
    AppLogger("completeJobSaga Catch Error", err);
    yield put(completedJob({ errorMessage }));

  }
}

// Function for accept the job requests

export function* acceptJobSaga(action: any) {
  const { token, body } = action.payload;

  yield put(jobRequestStart('acceptJobData'))
  try {
    const response: { status: number; data?: any; message?: string } = yield call(
      NetworkRequestManager.AcceptJob, token, body
    );

    AppLogger("acceptJobSaga Response=>", JSON.stringify(response));

    if (response.status === 200 || response.status === 201) {
      yield put(getAcceptJobData({ acceptJobData: response?.data }));
    }
    else if (response.status === 401) {
      yield put(deleteToken());
    }
    else {
      const errorMessage = response?.message || "Something went wrong";
      AppLogger("acceptJobSaga Error=>", errorMessage);
      yield put(jobListingRequestError({ errorMessage }));

    }
  } catch (err: any) {
    const errorMessage = err?.message || "An unexpected error occurred";
    AppLogger("acceptJobSaga Catch Error", err);
    yield put(jobListingRequestError({ errorMessage }));

  }
}

// Function for cancel the unassigned jobs

export function* CancelJobSaga(action: any) {
  const { token, reason, jobId, name } = action.payload;

  yield put(jobRequestStart('cancelJob'))
  try {
    const response: { status: number; data?: any; message?: string } = yield call(
      NetworkRequestManager.CancelJob, token, reason, jobId, name
    );

    AppLogger("CancelJobSaga Response=>", JSON.stringify(response));

    if (response.status === 200 || response.status === 201) {
      // yield put(cancelJobsList({ cancelJob: response?.message}));
      yield put(cancelJobsList({ cancelJob: { ...response?.data, deleteId: jobId } }))

    }
    else if (response.status === 401) {
      yield put(deleteToken());
    }
    else {
      const errorMessage = response?.message || "Something went wrong";
      AppLogger("CancelJobSaga Error=>", errorMessage);
      yield put(jobListingRequestError({ errorMessage }));

    }
  } catch (err: any) {
    const errorMessage = err?.message || "An unexpected error occurred";
    AppLogger("CancelJobSaga Catch Error", err);
    yield put(jobListingRequestError({ errorMessage }));

  }
}

// Function for rating the job, currently not in use

export function* RatingJobSaga(action: any) {
  const { token } = action.payload;

  yield put(jobRequestStart('ratingMessage'))
  try {
    const response: { status: number; data?: any; message?: string } = yield call(
      NetworkRequestManager.RatingJob, token
    );

    AppLogger("RatingJobSaga Response=>", JSON.stringify(response));

    if (response.status === 200 || response.status === 201) {
      yield put(giveRatingResponse({ ratingMessage: response?.message }));
    }
    else if (response.status === 401) {
      yield put(deleteToken());
    }
    else {
      const errorMessage = response?.message || "Something went wrong";
      AppLogger("RatingJobSaga Error=>", errorMessage);
      yield put(jobListingRequestError({ errorMessage }));

    }
  } catch (err: any) {
    const errorMessage = err?.message || "An unexpected error occurred";
    AppLogger("RatingJobSaga Catch Error", err);
    yield put(jobListingRequestError({ errorMessage }));

  }
}

// Function for get rating for the job given by user, currently not in use because UI not there

export function* GetRatingSaga(action: any) {
  const { token, driverId } = action.payload;

  yield put(jobRequestStart('ratingData'))
  try {
    const response: { status: number; data?: any; message?: string } = yield call(
      NetworkRequestManager.GetRating, token, driverId
    );

    AppLogger("GetRatingSaga Response=>", JSON.stringify(response));

    if (response.status === 200 || response.status === 201) {
      yield put(getRatingResponse({ ratingData: response?.data }));
    }
    else if (response.status === 401) {
      yield put(deleteToken());
    }
    else {
      const errorMessage = response?.message || "Something went wrong";
      AppLogger("GetRatingSaga Error=>", errorMessage);
      yield put(jobListingRequestError({ errorMessage }));

    }
  } catch (err: any) {
    const errorMessage = err?.message || "An unexpected error occurred";
    AppLogger("GetRatingSaga Catch Error", err);
    yield put(jobListingRequestError({ errorMessage }));

  }
}

export function* InJobMyJobCountSaga(action: any) {
  const { token, body } = action.payload;

  yield put(jobRequestStart('inJobMyJobCount'))
  try {
    const response: { status: number; data?: any; message?: string } = yield call(
      NetworkRequestManager.GetJobCount, token, body
    );

    // AppLogger("InJobMyJobCountSaga Response=>", JSON.stringify(response));

    if (response.status === 200 || response.status === 201) {
      yield put(getInJobMyJobCountResponse({ inJobMyJobCount: response?.data }));
    }
    else if (response.status === 401) {
      yield put(deleteToken());
    }
    else {
      const errorMessage = response?.message || "Something went wrong";
      AppLogger("InJobMyJobCountSaga Error=>", errorMessage);
      yield put(jobListingRequestError({ errorMessage }));

    }
  } catch (err: any) {
    const errorMessage = err?.message || "An unexpected error occurred";
    AppLogger("InJobMyJobCountSaga Catch Error", err);
    yield put(jobListingRequestError({ errorMessage }));

  }
}

export function* NewLoadsCountSaga(action: any) {
  const { token, body } = action.payload;

  yield put(jobRequestStart('newLoadsCount'))
  try {
    const response: { status: number; data?: any; message?: string } = yield call(
      NetworkRequestManager.GetJobCount, token, body
    );

    // AppLogger("NewLoadsCountSaga Response=>", JSON.stringify(response));

    if (response.status === 200 || response.status === 201) {
      yield put(getNewLoadsCountResponse({ newLoadsCount: response?.data }));
    }
    else if (response.status === 401) {
      yield put(deleteToken());
    }
    else {
      const errorMessage = response?.message || "Something went wrong";
      AppLogger("NewLoadsCountSaga Error=>", errorMessage);
      yield put(jobListingRequestError({ errorMessage }));

    }
  } catch (err: any) {
    const errorMessage = err?.message || "An unexpected error occurred";
    AppLogger("NewLoadsCountSaga Catch Error", err);
    yield put(jobListingRequestError({ errorMessage }));

  }
}

export function* OutJobMyJobCountSaga(action: any) {
  const { token, body } = action.payload;

  yield put(jobRequestStart('outMyJobCount'))
  try {
    const response: { status: number; data?: any; message?: string } = yield call(
      NetworkRequestManager.GetJobCount, token, body
    );

    // AppLogger("OutJobMyJobCountSaga Response=>", JSON.stringify(response));

    if (response.status === 200 || response.status === 201) {
      yield put(getOutJobMyJobCountResponse({ outMyJobCount: response?.data }));
    }
    else if (response.status === 401) {
      yield put(deleteToken());
    }
    else {
      const errorMessage = response?.message || "Something went wrong";
      AppLogger("OutJobMyJobCountSaga Error=>", errorMessage);
      yield put(jobListingRequestError({ errorMessage }));

    }
  } catch (err: any) {
    const errorMessage = err?.message || "An unexpected error occurred";
    AppLogger("OutJobMyJobCountSaga Catch Error", err);
    yield put(jobListingRequestError({ errorMessage }));

  }
}

export function* OutJobUnassignCountSaga(action: any) {
  const { token, body } = action.payload;

  yield put(jobRequestStart('outUnassignJobCount'))
  try {
    const response: { status: number; data?: any; message?: string } = yield call(
      NetworkRequestManager.GetJobCount, token, body
    );

    // AppLogger("OutJobUnassignCountSaga Response=>", JSON.stringify(response));

    if (response.status === 200 || response.status === 201) {
      yield put(getOutUnassignCountResponse({ outUnassignJobCount: response?.data }));
    }
    else if (response.status === 401) {
      yield put(deleteToken());
    }
    else {
      const errorMessage = response?.message || "Something went wrong";
      AppLogger("OutJobUnassignCountSaga Error=>", errorMessage);
      yield put(jobListingRequestError({ errorMessage }));

    }
  } catch (err: any) {
    const errorMessage = err?.message || "An unexpected error occurred";
    AppLogger("OutJobUnassignCountSaga Catch Error", err);
    yield put(jobListingRequestError({ errorMessage }));

  }
}

export function* JobPriceSaga(action: any) {
  const { token, body } = action.payload;

  yield put(jobRequestStart('jobPriceResponse'))
  try {
    const response: { status: number; data?: any; message?: string } = yield call(
      NetworkRequestManager.GetJobPrice, token, body
    );

    AppLogger("JobPriceSaga Response=>", JSON.stringify(response));

    if (response.status === 200 || response.status === 201) {
      yield put(getJobPrice({ jobPriceResponse: response?.data }));
    }
    else if (response.status === 401) {
      yield put(deleteToken());
    }
    else {
      const errorMessage = response?.message || "Something went wrong";
      AppLogger("JobPriceSaga Error=>", errorMessage);
      yield put(jobListingRequestError({ errorMessage }));

    }
  } catch (err: any) {
    const errorMessage = err?.message || "An unexpected error occurred";
    AppLogger("JobPriceSaga Catch Error", err);
    yield put(jobListingRequestError({ errorMessage }));

  }
}



export function* jobSaga() {
  yield takeLatest(AppConstants.redux.JOB_CREATED_REQUEST_START, JobCreatedSaga);
  yield takeLatest(AppConstants.redux.MY_IN_JOB_REQUEST_START, MyInJobSaga);
  yield takeLatest(AppConstants.redux.JOB_DETAILS_START, JobDetailsSaga);
  yield takeLatest(AppConstants.redux.JOB_DETAILS_NOTIFICATION_START, GetNotificationJobDetail);
  yield takeLatest(AppConstants.redux.JOB_DETAILS_FOR_NOTIFICATION_START, JobDetailsNotificationsSaga);
  yield takeLatest(AppConstants.redux.MY_OUT_JOB_REQUEST_START, MyOutJobSaga);
  yield takeLatest(AppConstants.redux.MY_IN_PAST_JOB_REQUEST_START, MyInPastJobSaga);
  yield takeLatest(AppConstants.redux.MY_OUT_PAST_JOB_REQUEST_START, MyOutPastJobSaga);
  yield takeLatest(AppConstants.redux.MY_IN_UNASSIGNED_JOB_REQUEST_START, MyInUnassignedSaga);
  yield takeLatest(AppConstants.redux.MY_OUT_UNASSIGNED_JOB_REQUEST_START, MyOutUnAssignedJobSaga);
  yield takeLatest(AppConstants.redux.VEHICLE_LIST_REQUEST_START, vehicleListSaga);
  yield takeLatest(AppConstants.redux.CREATE_BILL_REQUEST_START, createBillSaga);
  yield takeLatest(AppConstants.redux.COMPLETE_JOB_REQUEST_START, completeJobSaga);
  yield takeLatest(AppConstants.redux.ACCEPT_JOB_REQUEST_START, acceptJobSaga);
  yield takeLatest(AppConstants.redux.CANCEL_JOB_REQUEST_START, CancelJobSaga);
  yield takeLatest(AppConstants.redux.RATING_REQUEST_START, RatingJobSaga);
  yield takeLatest(AppConstants.redux.GET_RATING_REQUEST_START, GetRatingSaga);
  yield takeLatest(AppConstants.redux.JOB_COUNT_REQUEST_START, InJobMyJobCountSaga);
  yield takeLatest(AppConstants.redux.JOB_COUNT_REQUEST_START, NewLoadsCountSaga);
  yield takeLatest(AppConstants.redux.JOB_COUNT_REQUEST_START, OutJobMyJobCountSaga);
  yield takeLatest(AppConstants.redux.JOB_COUNT_REQUEST_START, OutJobUnassignCountSaga);
  yield takeLatest(AppConstants.redux.JOB_PRICE_REQUEST_START, JobPriceSaga);


}
