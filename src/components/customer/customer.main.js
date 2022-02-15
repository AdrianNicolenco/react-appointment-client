import * as React from "react";
import MyCalendar from "../initCalendar"
import Menubar from "../menubar"
import { getCustomerAppointment, updateCustomerAppointment, deleteAppointment } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';

const usePrevious = (value) => {
  const ref = React.useRef()
  React.useEffect(()=>{
    ref.current = value;
  }, [value]);
  return ref.current
}

const Customer = (props) => {
  const dispatch = useDispatch();
  const [appointmentArray, setAppointmentArray] = React.useState([]);
  const customerAppointment = useSelector((state) => state.UserReducerState.customerAppointment)
  let isMounted = true;
  const prevCount = usePrevious(customerAppointment);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(async()=>{
    const result = await dispatch(getCustomerAppointment(JSON.parse(localStorage.getItem('userInfo')).dataValues.id));
    console.log(result);
  },[])

  React.useEffect(()=>{
    
    if(customerAppointment != prevCount && isMounted) 
    {
      setAppointmentArray(customerAppointment);
    }
    return () => {isMounted = false;}
  }, [customerAppointment]);

  const addFunc = () => {
    navigate('/add_appointment');
  }

  const postCommitChange = async(title, params) => {
    if(title === 'delete'){
      const result = await dispatch(deleteAppointment(params.id));
      if(result.status === 400 ) enqueueSnackbar(result.data, {variant: 'warning', autoHideDuration: 1000})
      if(result.status === 200 ) enqueueSnackbar("Successfully Deleted", {variant: 'success', autoHideDuration: 1000})
    }
    if(title === 'save'){
      const newObject={
        id:params.id,
        title: params.title,
        location: params.location,
        starttime: params.startDate.toISOString(),
        endtime: params.endDate.toISOString(),
      }
      const result = await dispatch(updateCustomerAppointment(newObject));
      
      if(result.status === 400 ) enqueueSnackbar(result.data, {variant: 'warning', autoHideDuration: 1000})
      if(result.status === 200 ) {
        enqueueSnackbar("Successfully Saved", {variant: 'success', autoHideDuration: 1000})
        navigate('/customer')
      }
    }
  }

  return (
    <div>
      <Menubar/>
      {appointmentArray.length > 0 && 
      <div style={{marginTop:'8%'}}>
        <MyCalendar data={appointmentArray} addFunc={addFunc} postCommitChange={postCommitChange}/>
      </div>
      } 
    </div>
  );
};

export default Customer;
