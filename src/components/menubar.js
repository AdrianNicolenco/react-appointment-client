import React, { useEffect, useState } from 'react'
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
import LogoutIcon from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

import { useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBusinessInfoArray } from "../actions/userActions";

const Menubar = (props) => {
  const [userInfo, setUserInfo] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const addAppointment = () => {
    navigate('/add_appointment')
  }
  useEffect(() => {
    props.getBusinessInfoArray();
    setUserInfo(JSON.parse(localStorage.getItem("userInfo")).dataValues.name)
  }, []);

  const logout = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
  }
  return (
    <MuiAppBar position="fixed">
        <Menu
            id="fade-menu"
            MenuListProps={{
              'aria-labelledby': 'fade-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
        >
            <MenuItem onClick={addAppointment}>Add_Appointment</MenuItem>
        </Menu>
        <Toolbar
          sx={{
            pr: "24px",
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ marginRight: "36px" }}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            {userInfo}
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton onClick={logout} color="inherit" sx={{marginX: '1rem'}}>
          <Badge color="secondary">
              <LogoutIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </MuiAppBar>
  )
}

Menubar.propTypes = {
    getBusinessInfoArray: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
    userInfo: state.UserReducerState.userInfo,
})

export default connect(mapStateToProps, { getBusinessInfoArray })(Menubar);
