//PAMEL
import React, { useEffect, useState } from 'react';
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';
import imageToBase64 from '../Shared/imageToBase64';
import { getBookByCover } from '../../ApiClientService/Book';
const { REACT_APP_ACCESS_TOKEN } = process.env;

// const accessToken: string | null = localStorage.getItem('accessToken');
const accessToken = REACT_APP_ACCESS_TOKEN;

const Camera = () => {
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const base64Image = await imageToBase64(e.target.files[0]).then(
      (base64EncodedImageString) => base64EncodedImageString
    );

    let result;
    if (accessToken) result = await getBookByCover(accessToken, base64Image);
    console.log('THIS IS THE BOOK-------->', result);
  };

  return (
    <label>
      <input
        style={{ display: 'none' }}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleImageChange}
      />
      <PhotoCameraOutlinedIcon style={{ fontSize: 30, color: '#fffef9' }} />
    </label>
  );
};

export default Camera;
