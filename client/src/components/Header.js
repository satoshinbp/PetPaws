import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

export default function Header() {
  const [open, setOpen] = useState(false);
  const prevOpen = useRef(open);
  const anchorRef = useRef(null);
  const history = useHistory();
  const { currentUser, logout } = useAuth();

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
    <header style={{ display: 'flex', justifyContent: 'space-between' }}>
      {/* Styling to be removed */}
      <Link to="/">Logo</Link>
      {currentUser && (
        <>
          <Link to="/mealsummary">Meals Tracker</Link>
          <Link to="/walksummary">Walks Tracker</Link>
        </>
      )}
      <Link to={currentUser ? '/calorie' : '/calorieguest'}>Calorie Calculator</Link>
      <Link to="/finding_stores">Finding Pet Stores/Vets</Link>
      <Link to="/contact">Contact Us</Link>
      {currentUser ? (
        <>
          <button
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
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
                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                      <MenuItem onClick={handleClose}>
                        <Link to="/pet_profile">Pet Profile</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>My account</MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </>
      ) : (
        <>
          <Link to="/signin">Sign In</Link>
          <Link to="/signup">Sign Up</Link>
        </>
      )}
    </header>
  );
}
