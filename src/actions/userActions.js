import { LOGIN, BUSINESS_INFO_ARRAY, BUSINESS_EMAIL, GET_BUSINESS_APPOINTMENT } from "./types";
import axios from "axios";

export const customerSignUp = (object) => async (dispatch) => {
  const result = await axios
    .post("http://localhost:3001/customer/signUp", {
      object,
    })
    .catch((err) => {
      return err.response;
    });
  return result;
};

export const businessSignUp = (object) => async (dispatch) => {
  const result = await axios
    .post("http://localhost:3001/business/signUp", {
      object,
    })
    .catch((err) => {
      return err.response;
    });
  return result;
};

export const customerLogin = (object) => async (dispatch) => {
  const result = await axios
    .post("http://localhost:3001/customer/login", {
      object,
    })
    .catch((err) => {
      return err.response;
    });
  dispatch({
    type: LOGIN,
    payload: result.data,
  });
  localStorage.setItem("userInfo", JSON.stringify(result.data));
  return result;
};

export const businessLogin = (object) => async (dispatch) => {
  const result = await axios
    .post("http://localhost:3001/business/login", {
      object,
    })
    .catch((err) => {
      return err.response;
    });
  dispatch({
    type: LOGIN,
    payload: result.data,
  });
  localStorage.setItem("userInfo", JSON.stringify(result.data));
  return result;
};

export const getBusinessInfoArray = (object) => async (dispatch) => {
  const result = await axios
    .get("http://localhost:3001/business/")
    .catch((err) => {
      return err.response;
    });
  dispatch({
    type: BUSINESS_INFO_ARRAY,
    payload: result.data,
  });
  return result;
};

export const setBusinessEmail = (email) => (dispatch) => {
  dispatch({
    type: BUSINESS_EMAIL,
    payload: email,
  });
};

export const postAppointments = (object) => async(dispatch) => {
  const result = await axios
    .post("http://localhost:3000/appointment/", {
      object,
    })
    .catch((err) => {
      return err.response;
    });
  return result;
};

export const getBusinessAppointment = (id) => async(dispatch) => {
  const result = await axios
    .get(`http://localhost:3001/business/${id}`)
    .catch((err) => {
      return err.response;
    });
    const data = result.data.appointment;
    const appointmentArray = [];
    data.forEach((value) => {
      var newObject = {
        startDate:value.starttime,
        endDate:value.endtime,
        location: 'Room 1',
        //title:value.title,
        //classNames:'disabled',
        disabled: true,
      };
      appointmentArray.push(newObject);
    })
    dispatch({
      type: GET_BUSINESS_APPOINTMENT,
      payload: appointmentArray,
    });
    return result;
}

export const getCustomerAppointment = (id) => async(dispatch) => {
  const result = await axios
    .get(`http://localhost:3001/customer/${id}`)
    .catch((err) => {
      return err.response;
    });
    const data = result.data.appointment;
    const appointmentArray = [];
    data.forEach((value) => {
      var newObject = {
        startDate:value.starttime,
        endDate:value.endtime,
        location: 'Room 1',
        //title:value.title,
        //classNames:'disabled',
        disabled: true,
      };
      appointmentArray.push(newObject);
    })
    dispatch({
      type: GET_BUSINESS_APPOINTMENT,
      payload: appointmentArray,
    });
    return result;
}
