import {ADD_ERROR, REMOVE_ERROR} from '../actionTypes';

export const addError = error => ({
    type: ADD_ERROR,   //action type
    error   //payload(actual data)
});

export const removeError = () => ({
    type: REMOVE_ERROR
});