import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { makeStyles } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Logo from '../images/header.svg';
import Line from '../images/line.svg';
import closeButton from '../images/close-button.svg';
import MobileMenu from './HeaderMenu';
import signinImg from '../images/pet-profile-default.jpg';

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
  const location = useLocation();
  const currentLocation = location.pathname;

  const classes = useStyles();
  const [petProfile, setPetProfile] = useState({
    image: signinImg,
  });

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

  useEffect(() => {
    if (currentUser) {
      Axios.get(`http://localhost:3001/api/user/${currentUser.uid}`).then((res) => {
        if (res.data.length > 0) {
          const user_id = res.data[0].id;

          Axios.get(`http://localhost:3001/api/pet?user_id=${user_id}`)
            .then((res) => {
              if (res.data.length === 0) return;

              const fetchedPetProfile = res.data[0];
              setPetProfile({ ...fetchedPetProfile, birthday: fetchedPetProfile.birthday.slice(0, 10) });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    }
  }, []);

  return (
    <header>
      <div className="header__wrapper">
        <nav>
          <ul>
            <MobileMenu currentUser={currentUser} currentLocation={currentLocation} />
            <div className="site-logo">
              <li>
                <Link to="/">
                  <img src={Logo} alt="site logo" />
                </Link>
              </li>
            </div>

            <div className="header__menu">
              {currentUser && (
                <>
                  <li className="header-list">
                    <Link to="/mealsummary" className={currentLocation == '/mealsummary' ? 'active' : ''}>
                      Meals Tracker
                    </Link>
                  </li>
                  <li className="header-list">
                    <Link to="/walksummary" className={currentLocation == '/walksummary' ? 'active' : ''}>
                      Walks Tracker
                    </Link>
                  </li>
                </>
              )}
              <li className="header-list">
                <Link
                  to={currentUser ? '/calorie' : '/calorieguest'}
                  className={`${currentLocation == '/calorieguest' ? 'active' : ''} ${
                    currentLocation == '/calorie' ? 'active' : ''
                  } `}
                >
                  Calorie Calculator
                </Link>
              </li>
              <li className="header-list">
                <Link to="/finding_stores" className={currentLocation == '/finding_stores' ? 'active' : ''}>
                  Stores and Vet
                </Link>
              </li>
              <li className="header-list">
                <Link to="/contact" className={currentLocation == '/contact' ? 'active' : ''}>
                  Contact
                </Link>
              </li>
              {currentUser ? (
                <li className="icon-list">
                  {petProfile.image && (
                    <img
                      className={`${'pet-image'} ${'profile-img'}`}
                      src={petProfile.image}
                      ref={anchorRef}
                      aria-controls={open ? 'menu-list-grow' : undefined}
                      aria-haspopup="true"
                      onClick={handleToggle}
                    />
                  )}

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
                  <li className="header-list">
                    <div className="header-divider"></div>
                  </li>
                  <li className="header-list">
                    <Link to="/signin">
                      <button className="btn-outlined--header">Sign In</button>
                    </Link>
                  </li>

                  <li className="header-list">
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
