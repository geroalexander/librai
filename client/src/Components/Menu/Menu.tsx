import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { setLogout } from '../../Store/actions/auth';
import './Menu.css';

const DropMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = (event: React.MouseEvent) => {
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
        <div className="profile-icon">
          <AccountCircleOutlinedIcon style={{fontSize: 60, color: "#fffef9"}} />
          </div>
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
