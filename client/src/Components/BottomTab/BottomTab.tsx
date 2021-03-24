import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import BarChartRoundedIcon from '@material-ui/icons/BarChartRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import './BottomTab.css';

const useStyles = makeStyles({
  root: {
    width: '100vw',
    position: 'fixed',
    bottom: 0,
    backgroundColor: '#23076e',
  },
  selected: {
    fontSize: '0.6rem',
    color: '#dfd5fc',
    fontFamily: '"Open Sans", sans-serif',
  },
  label: {
    '&$selected': {
      fontSize: '0.7rem',
    },
  },
});

const BottomTabNavigation = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState('dashboard');

  const handleChange = (event: React.ChangeEvent<{}>, newValue: any) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}
    >
      <BottomNavigationAction
        label="Dashboard"
        value="dashboard"
        icon={<HomeRoundedIcon style={{ fontSize: 30, color: 'white' }} />}
        classes={{ selected: classes.selected, label: classes.label }}
      />
      <BottomNavigationAction
        label="Saved"
        value="saved"
        icon={<BarChartRoundedIcon style={{ fontSize: 30, color: 'white' }} />}
        classes={{ selected: classes.selected, label: classes.label }}
      />
      <BottomNavigationAction
        label="Profile"
        value="profile"
        icon={<PersonRoundedIcon style={{ fontSize: 30, color: 'white' }} />}
        classes={{ selected: classes.selected, label: classes.label }}
      />
    </BottomNavigation>
  );
};

export default BottomTabNavigation;
