import {
    SET_TOOTS,
    LIKE_TOOT,
    UNLIKE_TOOT,
    LOADING_DATA,
    DELETE_TOOT,
    POST_TOOT,
    SET_TOOT,
    SUBMIT_COMMENT
  } from '../types';
  
  const initialState = {
    toots: [],
    toot: {},
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case LOADING_DATA:
        return {
          ...state,
          loading: true
        };
      case SET_TOOTS:
        return {
          ...state,
          toots: action.payload,
          loading: false
        };
      case SET_TOOT:
        return {
          ...state,
          toot: action.payload
        };
      case LIKE_TOOT:
      case UNLIKE_TOOT:
        let index = state.toots.findIndex(
          (toot) => toot.tootId === action.payload.tootId
        );
        state.toots[index] = action.payload;
        if (state.toot.tootId === action.payload.tootId) {
          state.toot = action.payload;
        }
        return {
          ...state
        };
      case DELETE_TOOT:
        index = state.toots.findIndex(
          (toot) => toot.tootId === action.payload
        );
        state.toots.splice(index, 1);
        return {
          ...state
        };
      case POST_TOOT:
        return {
          ...state,
          toots: [action.payload, ...state.toots]
        };
      case SUBMIT_COMMENT:
        return {
          ...state,
          toot: {
            ...state.toot,
            comments: [action.payload, ...state.toot.comments]
          }
        };
      default:
        return state;
    }
  }