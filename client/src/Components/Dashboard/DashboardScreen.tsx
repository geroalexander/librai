//PAMELA
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { _loadDashboard } from '../../Store/actions/users';
import { RootState } from '../../App';

const Dashboard = () => {
  const recommendations = useSelector(
    (state: RootState) => state.userReducer?.recommendations
  );
  const userWithBooks = useSelector(
    (state: RootState) => state.userReducer?.userWithBooks
  );

  return (
    <div className="dashboard">
      <p>This is the dashboard</p>
    </div>
  );
};

export default Dashboard;
