import {
    SET_TOOTS,
    LOADING_DATA,
    LIKE_TOOT,
    UNLIKE_TOOT,
    DELETE_TOOT,
    SET_ERRORS,
    POST_TOOT,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_TOOT,
    STOP_LOADING_UI,
    SUBMIT_COMMENT
  } from '../types';
  import axios from 'axios';
  
  // Get all toots
  export const getToots = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
      .get('/toots')
      .then((res) => {
        dispatch({
          type: SET_TOOTS,
          payload: res.data
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_TOOTS,
          payload: []
        });
      });
  };
  export const getToot = (tootId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .get(`/toot/${tootId}`)
      .then((res) => {
        dispatch({
          type: SET_TOOT,
          payload: res.data
        });
        dispatch({ type: STOP_LOADING_UI });
      })
      .catch((err) => console.log(err));
  };
  // Post a toot
  export const postToot = (newToot) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .post('/toot', newToot)
      .then((res) => {
        dispatch({
          type: POST_TOOT,
          payload: res.data
        });
        dispatch(clearErrors());
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      });
  };
  // Like a toot
  export const likeToot = (tootId) => (dispatch) => {
    axios
      .get(`/toot/${tootId}/like`)
      .then((res) => {
        dispatch({
          type: LIKE_TOOT,
          payload: res.data
        });
      })
      .catch((err) => console.log(err));
  };
  // Unlike a toot
  export const unlikeToot = (tootId) => (dispatch) => {
    axios
      .get(`/toot/${tootId}/unlike`)
      .then((res) => {
        dispatch({
          type: UNLIKE_TOOT,
          payload: res.data
        });
      })
      .catch((err) => console.log(err));
  };
  // Submit a comment
  export const submitComment = (tootId, commentData) => (dispatch) => {
    axios
      .post(`/toot/${tootId}/comment`, commentData)
      .then((res) => {
        dispatch({
          type: SUBMIT_COMMENT,
          payload: res.data
        });
        dispatch(clearErrors());
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      });
  };
  export const deleteToot = (tootId) => (dispatch) => {
    axios
      .delete(`/toot/${tootId}`)
      .then(() => {
        dispatch({ type: DELETE_TOOT, payload: tootId });
      })
      .catch((err) => console.log(err));
  };
  
  export const getUserData = (userHandle) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
      .get(`/user/${userHandle}`)
      .then((res) => {
        dispatch({
          type: SET_TOOTS,
          payload: res.data.toots
        });
      })
      .catch(() => {
        dispatch({
          type: SET_TOOTS,
          payload: null
        });
      });
  };
  
  export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };