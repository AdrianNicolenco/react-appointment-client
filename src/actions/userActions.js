import { Login } from "./types";
import axios from 'axios';

export const customerSignUp = (object) => async(dispatch) => {
    const result = await axios.post('http://localhost:3001/customer/signUp', {
        object
    }).catch((err) => {
        return err.response;
    });
    return result;
}

export const businessSignUp = (object) => async(dispatch) => {
    const result = await axios.post('http://localhost:3001/business/signUp', {
        object
    }).catch((err) => {
        return err.response;
    });
    return result;
}

export const customerLogin = (object) => async(dispatch) => {
    const result = await axios.post('http://localhost:3001/customer/login', {
        object
    }).catch((err) => {
        return err.response;
    });
    return result;
}

export const businessLogin = (object) => async(dispatch) => {
    const result = await axios.post('http://localhost:3001/business/login', {
        object
    }).catch((err) => {
        return err.response;
    });
    return result;
}