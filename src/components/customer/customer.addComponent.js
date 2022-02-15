import React, {useEffect} from "react"
import {useSelector, useDispatch} from 'react-redux'
import AddCalendar from "./calendar";
import Menubar from "../menubar";
import AddItem from './selectBusiness'
import { postAppointments } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";

const Addappointment = (props) => {
   
  const businessAppointment = useSelector((state) => state.UserReducerState.businessAppointment);
  const businessEmail = useSelector((state) => state.UserReducerState.businessEmail);
  const businessInfoArray = useSelector((state) => state.UserReducerState.businessInfoArray)
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addfunc = async(params) => {
    console.log(params);
    var businessId = 0;
    businessInfoArray.forEach((value) => {
      if(value.email === businessEmail) businessId = value.id;
    });

    const newObject={
      title: params.title,
      location: params.location,
      starttime: params.startDate.toISOString(),
      endtime: params.endDate.toISOString(),
      businessId: businessId,
      customerId: userInfo.dataValues.id,
    }
    await dispatch(postAppointments(newObject));
  }

  const retFunc = () => {
    navigate('/customer');
  }

  return (
    <div style={{display:'flex', flexFlow:'row'}}>
      
      <Menubar/>
      <div style={{width:'70%', marginTop:'8%'}}>
      {
        businessAppointment.length > 0 && <AddCalendar data={businessAppointment} 
        addfunc={addfunc}
        retFunc={retFunc}
        />
      }
      </div>
      <div style={{width:'30%', marginTop:'8%'}}>
      <AddItem/>
      </div>
    </div>
  );
};

export default Addappointment;
