import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import './Menu.css'


const DropMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const StyledMenuItem = withStyles(theme => ({
    root: {
        fontSize:18,
        fontFamily: 'Montserrat',
        backgroundColor: '#dfd5fc',
        color: '#140245'
    }
}))(MenuItem);

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <Avatar className="profile-icon"/>
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
              
            }
          }}
      >
        <StyledMenuItem onClick={handleClose}>Profile</StyledMenuItem>
        <StyledMenuItem onClick={handleClose}>Saved</StyledMenuItem>
        <StyledMenuItem onClick={handleClose}>Upload</StyledMenuItem>
        <StyledMenuItem onClick={handleClose}>Logout</StyledMenuItem>
      </Menu>
    </div>
  );
}

export default DropMenu