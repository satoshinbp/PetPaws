import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';

///////////////////////These design will be in styles directory/////////////////////
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function Header() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const handleLogout = () => {
    logout()
      .then(() => history.push('/'))
      .catch((err) => console.log('Failed to log out: ', err));
  };

  return (
    <header style={{ background: 'yellow' }}>
      <Link to="/" style={{ padding: '0 1rem' }}>
        Logo
      </Link>
      {/* ////////Following design will be in styles directory//// */}
      <Link to="/calorie" style={{ padding: '0 1rem' }}>
        Calorie Calculator
      </Link>
      <Link to="/search-shops" style={{ padding: '0 1rem' }}>
        Finding Pet shops/Vets
      </Link>
      <Link to="/contact" style={{ padding: '0 1rem' }}>
        Contact Us
      </Link>
      {currentUser ? (
        <div>
          {}{' '}
          <div className={classes.root}>
            <Button
              ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              Icon
            </Button>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                        <MenuItem onClick={handleClose}>
                          <Link to="/pet_profile" style={{ padding: '0 1rem' }}>
                            Pet Profile
                          </Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        </div>
      ) : (
        <Button>
          <Link to="/signup" style={{ padding: '0 1rem' }}>
            Sign Up
          </Link>
        </Button>
      )}
    </header>
  );
}
