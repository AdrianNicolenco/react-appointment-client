import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MessageIcon from '@mui/icons-material/Message';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';

import { postAppointments } from '../../actions/userActions';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AddDialog = (props) => {

  const navigate = useNavigate();
  const businessInfoArray = useSelector((state) => state.UserReducerState.businessInfoArray)
  const businessEmail = useSelector((state) => state.UserReducerState.businessEmail)
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const titleRef = React.useRef();
  const handleClose = () => props.dialogClose();

  const addAppointment = async() => {
    var businessId = 0;
    var userInfo = JSON.parse(localStorage.getItem("userInfo"))
    businessInfoArray.forEach((value) => {
        if(value.email === businessEmail) businessId = value.id;
    })
    const newObject = {
        starttime: props.data.startStr,
        endtime: props.data.endStr,
        title: titleRef.current.value,
        customerId:userInfo.dataValues.id,
        businessId:businessId
    }
    await dispatch(postAppointments(newObject)).then(res => {
      console.log(res.status);
      if(res.status === 409 ) enqueueSnackbar(res.data, {variant: 'warning', autoHideDuration: 1000})
      if(res.status === 400 ) enqueueSnackbar(res.data, {variant: 'warning', autoHideDuration: 1000})
      if(res.status === 500 ) enqueueSnackbar(res.data, {variant: 'warning', autoHideDuration: 1000})
      if(res.status === 201 || res.status === 200 ) {
        enqueueSnackbar("Successfully Created", {variant: 'success', autoHideDuration: 1000})
      setTimeout(()=>{
        navigate('/customer');
      },1000) }
    });
  }
  return (
    <div>
      <Modal
        keepMounted
        open={props.open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Please Leave a message for your appointment
          </Typography>
          <Box sx={{ display: 'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div style={{display: 'flex',alignItems: 'flex-end'}}>
                <MessageIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField id="input-with-sx" label="Message" variant="standard"  multiline
                  inputRef={titleRef}
                />
              </div>
            
            <Button variant="contained" color="success" onClick={addAppointment}>
                Appointment
            </Button>
        </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default AddDialog;