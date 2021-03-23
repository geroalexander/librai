//BEN
import React from 'react';
import {useSelector, useDispatch } from 'react-redux';
import { User } from '../../Interfaces/userObject';
import { RootState } from '../../App';

const ProfileScreen = () => {
  const user: User = useSelector((state: RootState) => state.userReducer?.userWithBooks);
}

export default ProfileScreen;