import React, { useState } from 'react';
import  Modal  from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
// import Avatar from '@material-ui/core/Avatar';

import { makeStyles } from '@material-ui/core/styles';



function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    root: {
      '& .MuiTextField-root': {
        display:"flex", 
        margin: theme.spacing(1),
        width: 200,
      },
    }
  }));



function Registration () {
    
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    
    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
      return (
          <>
        <div>
          <button type="button" onClick={handleOpen}>
            Register Now
          </button>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={open}
            onClose={handleClose}
          >
            <div style={modalStyle} className={classes.paper}>
              <h2 id="simple-modal-title">New Phoenix </h2>
              <p id="simple-modal-description">
              Start Your Journey As A Phoenix 
              </p>
              <div>
                <form className={classes.root}>
              <div>
              {/* <Avatar src="/broken-image.jpg" /> */}
              <TextField
                  required
                  id="filled-required"
                  label="Username"
                  defaultValue=""
                  placeholder="Username"
                  variant="filled" />
                  
                  </div>
                   <TextField
                  required
                  id="filled-required"
                  label="Password"
                  defaultValue=""
                  placeholder="Must be 8 characters"
                  variant="filled"
                  />
                    <TextField
                  required
                  id="filled-required"
                  label="Full Name"
                  defaultValue=""
                  placeholder='Letters are nice'
                  variant="filled"
                  />
                    <TextField
                  required
                  id="filled-required"
                  label="Email"
                  defaultValue=""
                  placeholder="@ required"
                  variant="filled"
                  />
                   <TextField
                  required
                  id="filled-required"
                  label="Age"
                  defaultValue=""
                  variant="filled"
                  />
                  </form>
              </div>
            </div>
          </Modal>
        </div>
        </>
      );
      }
    

export default Registration;