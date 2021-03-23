//PAMELA
import React from 'react';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import loadDashboard from '../../Store/actions/users';
import { RootState } from '../../App';

const Dashboard = () => {
  const recommendations = useSelector(
    (state: RootState) => state.userReducer?.recommendations
  );
};
