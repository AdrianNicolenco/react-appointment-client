import * as React from "react";
import MyCalendar from "../initCalendar"
import Menubar from "../menubar"
import { useSelector, useDispatch } from 'react-redux';

const Customer = (props) => {
  React.useEffect(()=>{

  }, []);
  return (
    <div>
      <Menubar/>
      <MyCalendar/>
    </div>
  );
};

export default Customer;
