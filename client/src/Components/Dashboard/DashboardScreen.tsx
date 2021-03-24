//PAMELA
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { _loadDashboard } from '../../Store/actions/users';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { RootState } from '../../index';
import './Dashboard.css';

interface DashboardScreenProps extends RouteComponentProps {}

const Dashboard: React.FC<DashboardScreenProps> = () => {
  const recommendations = useSelector(
    (state: RootState) => state.userReducer?.recommendations
  );
  const userWithBooks = useSelector(
    (state: RootState) => state.userReducer?.userWithBooks
  );

  return (
    <div className="dashboard">
      <div className="title">
        <p>Recently saved</p>
        <div className="booklist">
          <p>Stuff</p>
        </div>
      </div>
      <div className="title">
        <p>Your favorites</p>
        <div className="booklist">
          <p>Stuff</p>
        </div>
      </div>
      <div className="title">
        <p>Recommended</p>
        <div className="booklist">
          <p>Stuff</p>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Dashboard);
