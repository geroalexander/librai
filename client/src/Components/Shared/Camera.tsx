//PAMEL
import React, { useEffect, useState } from 'react';
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';
import imageToBase64 from '../Shared/imageToBase64';
import { getBookByCover } from '../../ApiClientService/Book';
import { uploadToCloud } from '../../ApiClientService/ImageUpload';
import { useHistory } from 'react-router-dom';
const { REACT_APP_ACCESS_TOKEN } = process.env;

// const accessToken: string | null = localStorage.getItem('accessToken');
const accessToken = REACT_APP_ACCESS_TOKEN;

const Camera = () => {
  const history = useHistory();

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const base64Image = await imageToBase64(e.target.files[0]).then(
      (base64EncodedImageString) => base64EncodedImageString
    );

    const cloudURL = await uploadToCloud(base64Image);

    let book;
    if (accessToken) book = await getBookByCover(accessToken, cloudURL);
    if (book) {
      history.push({
        pathname: `/details/${book.id}`,
        state: { book, isNew: false },
      });
    }
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
