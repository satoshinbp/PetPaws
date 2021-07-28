import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import headerMenu from '../images/header-menu.svg';
import menuClose from '../images/header-menu-close.svg';
import { Link, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const classes = useStyles();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const anchorRef = useRef(null);

  const handleClickMenuOpen = () => {
    setMenuOpen(true);
  };

  const handleMenuClose = (e) => {
    if (anchorRef.current && anchorRef.current.contains(e.target)) {
      return;
    }
    setMenuOpen(false);
  };

  return (
    <div className="mobile-menu ">
      <img src={headerMenu} onClick={handleClickMenuOpen} />
      <Dialog fullScreen open={menuOpen} onClose={handleMenuClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleMenuClose} aria-label="close">
              <img src={menuClose} />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className="btn-area">
          <button className="btn-mobile-menu" onClick={handleMenuClose}>
            <Link to="/">Home</Link>
          </button>
        </div>
        <div className="btn-area">
          <button className="btn-mobile-menu" onClick={handleMenuClose}>
            <Link to="/finding_stores">Stores and Vet</Link>
          </button>
        </div>
        <div className="btn-area">
          <button className="btn-mobile-menu" onClick={handleMenuClose}>
            <Link to={props.currentUser ? '/calorie' : '/calorieguest'}>Calorie Calculator</Link>
          </button>
        </div>
        {props.currentUser ? (
          <>
            <div className="btn-area">
              <button className="btn-mobile-menu" onClick={handleMenuClose}>
                <Link to="/mealsummary">Meals Tracker</Link>
              </button>
            </div>
            <div className="btn-area">
              <button className="btn-mobile-menu" onClick={handleMenuClose}>
                <Link to="/walksummary">Walks Tracker</Link>
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="btn-area">
              <button className="btn-mobile-menu " onClick={handleMenuClose}>
                <Link to="/signin"> Sign In </Link>
              </button>
            </div>

            <div className="btn-area">
              <button className="btn-mobile-menu" onClick={handleMenuClose}>
                <Link to="/signup">Sign Up </Link>
              </button>
            </div>
          </>
        )}
        <div className="btn-area">
          <button className="btn-mobile-menu" onClick={handleMenuClose}>
            <Link to="/contact">Contact</Link>
          </button>
        </div>
      </Dialog>
    </div>
  );
}
