import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth.js';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import logo from '../images/PhoenixLogo.png';
import NavbarStyle from '../styles/NavbarStyles.js';
import Registration from './Registration.js';
import Login from './Login.js';
import Event from './Calendar/CalComponents/Event.js';
import RenderMobileMenu from '../components/RenderMobileMenu.js';
import Grid from '@material-ui/core/Grid';
import { useLocation } from "react-router-dom";

const useStyles = NavbarStyle;

function PrimarySearchAppBar(props) {
  
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [string, setString] = useState('');
  const [result, setRes] = useState([]);
  
  let location = useLocation();

  const isBase = "/" === location.pathname;

  
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleChange = (e) => {
    setString(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .get('https://phoenix-be-staging.herokuapp.com/api/calendar')
      .then((res) => {
        console.log('response:', res);
        let token = localStorage.getItem('token');

        if (token) {
          let results = res.data.filter((item) => {
            return item.summary
              .toLowerCase()
              .includes(string.toLocaleLowerCase());
          });
          function standardTime(time1){
            var time = time1.split(':');
            var hours = Number(time[0]);
            var minutes = Number(time[1]);
            var seconds = Number(time[2]);
            var timevalue;
            if(hours > 0 && hours <=12) {
              timevalue= "" + hours;
            } else if(hours > 12) {
              timevalue= "" + (hours - 12);
            } else if(hours === 0) {
              timevalue= "12";
            }
            console.log('hi guys')
            console.log('its me ian')
    
            timevalue += (minutes < 10) ? ":0" + minutes : ":" + minutes;
            //timevalue += (seconds < 10) ? ":0" + seconds : ":" + seconds;
            timevalue += (hours >=12) ? "P.M." : "A.M.";
    
            console.log(timevalue)
            return(timevalue)
          }
          for (let i = 0; i < results.length; i++) {
            results[i].start_time = standardTime(results[i].start_time);
            results[i].end_time = standardTime(results[i].end_time);
            results[i].start_date = new Date(
              results[i].start_date
            ).toDateString();
          }
          setRes(results);
        } else {
          props.history.push('/login');
          window.alert('You need to log in to search for events!');
        }
      })
      .then((_) => setString(''))
      .catch((err) => console.log('Problem retrieving events', 'Error: ', err));
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = (e) => {
    setMobileMoreAnchorEl(null);
    console.log(e)
    
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem >
        <Link to='/dashboard'>Profile</Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Link
            to="/"
            style={{
              display: 'flex',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <img src={logo} alt="logo" className={classes.logo} />
            <Typography style={{ fontSize: '2rem' }}>
              <span className={classes.phoenix}>Phoenix</span>
            </Typography>
          </Link>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleChange}
              type="text"
              name="search"
              autoComplete="off"
              value={string}
            />
          </div>
          <Button onClick={handleSubmit}>Submit</Button>
          <span className={classes.phoenix}><Registration /></span>
          <span className={classes.phoenix}><Login /></span>
          {!isBase && (
          <Link to="/events" ><Button style={{ marginLeft: '16px' }} >Calendar</Button></Link>
          )}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
          {!isBase && (
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
          )}
           {!isBase && (
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          )}
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {!isBase && (
      <RenderMobileMenu
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        mobileMenuId={mobileMenuId}
        isMobileMenuOpen={isMobileMenuOpen}
        handleMobileMenuClose={handleMobileMenuClose}
        handleProfileMenuOpen={handleProfileMenuOpen}
      />
      )}
      {renderMenu}
      <Grid container spacing={1}>
        {result.map((data) => (
          <Event key={data.id} event={data} />
        ))}
      </Grid>
    </div>
  );
}

export default withRouter(PrimarySearchAppBar);
