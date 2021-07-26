import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { makeStyles } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListItem from '@material-ui/core/ListItem';
// import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import CloseIcon from '@material-ui/icons/Close';
// import Slide from '@material-ui/core/Slide';
import Logo from '../images/header.svg';
import Line from '../images/line.svg';
import closeButton from '../images/close-button.svg';
import MobileMenu from './HeaderMenu';

const useStyles = makeStyles({
  customWidth: {
    display: 'block',
    width: '350px',
    background: '#CCABDA',
  },
  hover: {
    display: 'block',
    '&:hover': {
      background: 'white',
    },
  },
  close: {
    textAlign: 'center',
  },
});

export default function Header() {
  const [open, setOpen] = useState(false);
  const prevOpen = useRef(open);
  const anchorRef = useRef(null);
  const history = useHistory();
  const { currentUser, logout } = useAuth();

  const classes = useStyles();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (e) => {
    if (anchorRef.current && anchorRef.current.contains(e.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      setOpen(false);
    }
  };

  const handleLogout = () => {
    logout()
      .then(() => history.push('/'))
      .catch((err) => console.log('Failed to log out: ', err));
  };

  useEffect(() => {
    if (prevOpen.current && !open) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <header>
      <div className="header__wrapper">
        <nav>
          <ul>
            <MobileMenu currentUser={currentUser} />
            <div className="site-logo">
              <li>
                <img src={Logo} alt="site logo" />
              </li>
            </div>

            <div className="header__menu">
              {currentUser && (
                <>
                  <li>
                    <Link to="/mealsummary">Meals Tracker</Link>
                  </li>
                  <li>
                    <Link to="/walksummary">Walks Tracker</Link>
                  </li>
                </>
              )}
              <li>
                <Link to={currentUser ? '/calorie' : '/calorieguest'}>Calorie Calculator</Link>
              </li>
              <li>
                <Link to="/finding_stores">Stores and Vet</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              {currentUser ? (
                <li>
                  <button
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    className="profile-img"
                  >
                    Icon
                  </button>
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
                            <MenuList
                              className={classes.customWidth}
                              autoFocusItem={open}
                              id="menu-list-grow"
                              onKeyDown={handleListKeyDown}
                            >
                              <MenuItem className={`${classes.hover} ${classes.close}`} onClick={handleClose}>
                                <img src={closeButton} />
                              </MenuItem>
                              <MenuItem className={classes.hover} onClick={handleClose}>
                                <Link to="/pet_profile">Pet Profile</Link>
                              </MenuItem>
                              <MenuItem className={classes.hover} onClick={handleLogout}>
                                Logout
                              </MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </li>
              ) : (
                <>
                  <li>
                    <Link to="/signin">
                      <button className="btn-outlined--header ">Sign In</button>
                    </Link>
                  </li>
                  <li>
                    <img src={Line} />
                  </li>
                  <li>
                    <Link to="/signup">
                      <button className="btn-contained--header ">Sign Up</button>
                    </Link>
                  </li>
                </>
              )}
            </div>
          </ul>
        </nav>
      </div>
    </header>
  );
}
