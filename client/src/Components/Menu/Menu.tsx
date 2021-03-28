import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { setLogout } from '../../Store/actions/auth';
import './Menu.css';

const DropMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(setLogout());
    history.push('/login');
  };

  const StyledMenuItem = withStyles((theme) => ({
    root: {
      fontSize: 18,
      fontFamily: 'Montserrat',
      backgroundColor: '#dfd5fc',
      color: '#140245',
      textDecoration: 'none',
    },
  }))(MenuItem);

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Avatar className="profile-icon" />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: '10rem',
            backgroundColor: '#dfd5fc',
          },
        }}
      >
        <Link to="/profile" className="link">
          <StyledMenuItem onClick={handleClose}>Profile</StyledMenuItem>
        </Link>
        <Link to="/saved" className="link">
          <StyledMenuItem onClick={handleClose}>Saved</StyledMenuItem>
        </Link>
        <StyledMenuItem onClick={handleLogout}>Logout</StyledMenuItem>
      </Menu>
    </div>
  );
};

export default DropMenu;
