/* eslint-disable */
import { call, put } from 'redux-saga/effects';

export function* showLoading(action, loading) {
  yield put({ type: action, payload: loading });
}

export function* doApiCall(
  apiService,
  payload = null,
  LOADING_ACTION = null,
  SET_ERROR_MESSAGE = null,
  showError = false
) {
  yield showLoading(LOADING_ACTION, true);
  try {
    const response = yield call(apiService, payload);
 console.info('----------------------------');
 console.info('response =>', response);
 console.info('----------------------------');
    if (response.status === 200) {
      yield showLoading(LOADING_ACTION, false);
      return response.data;
    } else if (response.response.status === 422) {
      yield showLoading(LOADING_ACTION, false);
      const { data } = response.response;
      yield put({ type: SET_ERROR_MESSAGE, payload: data?.info?.errors });
    } else if (response.response.status === 403) {
      yield showLoading(LOADING_ACTION, false);
      const { data } = response.response;
    } else if (response.response.status === 500) {
      yield showLoading(LOADING_ACTION, false);
      console.log('500');
      console.log(showError);
     
    } else if (response.response.status === 400) {
      yield showLoading(LOADING_ACTION, false);
      const { data } = response.response;
      yield put({ type: SET_ERROR_MESSAGE, payload: data });
    } else if (response.response.status === 404) {
      yield showLoading(LOADING_ACTION, false);
      const { data } = response.response;
    //   if (showError) {
    //     yield history.push('/404');
    //     yield window?.location?.reload(true);
    //   }
    } else if (response.response.status === 408) {
      yield showLoading(LOADING_ACTION, false);
    } else if (response.response.status === 401) {
      const { data } = response.response;
      yield showLoading(LOADING_ACTION, false);
      yield put({
        type: SET_ERROR_MESSAGE,
        payload: data?.info?.errors?.length > 0 ? data?.info?.errors : [data?.info?.message],
      });
    } else {
      yield showLoading(LOADING_ACTION, false);
    }
  } catch (e) {
    yield showLoading(LOADING_ACTION, false);
    yield put({ type: SET_ERROR_MESSAGE, payload: '' });
    const { response } = e;
    if (response) {
      const { code, errors } = response;
      if (code === 422) {
      }
    }
  }
  return { success: false };
}
