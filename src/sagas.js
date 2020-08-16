import {takeLatest, fork, call, put, take, cancel, select} from 'redux-saga/effects';
import reduxSagaFirebase from './config/firebaseConfig';
import {createProjectSuccess, syncProjects} from './store/actions/projectActions';
import {
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
  signupSuccess,
  signupFailure, addUserSuccess, getUserSuccess, getUserRequest
} from './store/actions/authActions';

export function* createProjectSaga({payload}) {
  const userProfile = state => state.auth.userprofile;
  const profileData = yield select(userProfile);
  const userAuth = state => state.auth.user.uid
  const authorID = yield select(userAuth);
  payload = {
    ...payload,
    authorFirstName: profileData.firstName,
    authorLastName: profileData.lastName,
    authorId: authorID,
    createdAt: new Date()
  }
  yield call(
    reduxSagaFirebase.firestore.addDocument,
    'projects',
    payload
  );
  yield put(createProjectSuccess());
}

export function* syncFirebaseProjectsSaga() {
  // Start the sync saga
  let task = yield fork(
    reduxSagaFirebase.firestore.syncCollection, 'projects', {
      successActionCreator: syncProjects,
      transform: projectTransformer
    }
  );
  // Wait for the logout action, then stop sync
  yield take('LOGOUT_SUCCESS');
  yield cancel(task);
}

export function* loginSaga({credentials}) {
  try {
    const data = yield call(
      reduxSagaFirebase.auth.signInWithEmailAndPassword,
      credentials.email,
      credentials.password);
    yield put(loginSuccess(data));
    yield put(getUserRequest(data.user.uid))
  } catch (error) {
    yield put(loginFailure(error));
  }
}

export function* logOutSaga() {
  try {
    const data = yield call(reduxSagaFirebase.auth.signOut);
    yield put(logoutSuccess(data));
  } catch (error) {
    yield put(logoutFailure(error));
  }
}

export function* syncFirebaseUserSaga() {
  // events on this channel fire when the user logs in or logs out
  const channel = yield call(reduxSagaFirebase.auth.channel)

  while (true) {
    const {user} = yield take(channel)

    if (user) yield put(loginSuccess(user))
    else yield put(logoutSuccess())
  }
}

export function* createUserSaga({credentials}) {
  try {
    const user = yield call(reduxSagaFirebase.auth.createUserWithEmailAndPassword,
      credentials.email,
      credentials.password);
    yield put(loginSuccess(user));
    yield put(signupSuccess(user, credentials));
    yield put(getUserRequest(user.user.uid))
  } catch (error) {
    yield put(signupFailure(error));
  }
}

export function* addUserToCollection(data) {
  const docId = 'users/' + data.data.user.uid.toString()
  yield call(
    reduxSagaFirebase.firestore.setDocument,
    docId,
    {
      firstName: data.credentials.firstName,
      lastName: data.credentials.lastName,
      initials: data.credentials.firstName[0] + data.credentials.lastName[0],
    }
  );
  yield put(addUserSuccess())
}

export function* getUserSaga(data) {
  const docId = 'users/' + data.uid.toString()
  const snapshot = yield call(reduxSagaFirebase.firestore.getDocument, docId);
  const user = snapshot.data();
  yield put(getUserSuccess(user));
}

export default function* sagas() {
  yield fork(syncFirebaseProjectsSaga);
  yield fork(syncFirebaseUserSaga)
  yield takeLatest('CREATE_PROJECT_REQUEST', createProjectSaga);
  yield takeLatest('CREATE_PROJECT_SUCCESS', syncFirebaseProjectsSaga);
  yield takeLatest('GET_PROJECTS', syncFirebaseProjectsSaga);
  yield takeLatest('LOGIN_REQUEST', loginSaga);
  yield takeLatest('LOGOUT_REQUEST', logOutSaga);
  yield takeLatest('SIGNUP_REQUEST', createUserSaga);
  yield takeLatest('SIGNUP_SUCCESS', addUserToCollection);
  yield takeLatest('GET_USER_REQUEST', getUserSaga);
}

//helper functions
const projectTransformer = projects => {
  const result = []
  projects.forEach(doc =>
    result.push({
      id: doc.id,
      ...doc.data(),
    }),
  )
  return result
}