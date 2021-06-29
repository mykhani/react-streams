import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import _ from "lodash";

import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  EDIT_STREAM,
  DELETE_STREAM,
} from "../actions/types";

const INITIAL_STATE = {
  isSignedIn: null,
};

const authReducer = (auth = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...auth, isSignedIn: true, userId: action.payload };
    case SIGN_OUT:
      return { ...auth, isSignedIn: false, userId: null };
    default:
      return auth;
  }
};

const streamsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };

    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };

    case FETCH_STREAMS:
      return action.payload.reduce((acc, stream) => {
        acc[stream.id] = stream;
        return acc;
      }, {});

    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };

    case DELETE_STREAM:
      return _.omit(state, action.payload);

    default:
      return state;
  }
};

export default combineReducers({
  dummy: () => "dummy",
  auth: authReducer,
  form: formReducer,
  streams: streamsReducer,
});
