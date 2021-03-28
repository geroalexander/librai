//PAMEL
import React, { useEffect, useState } from 'react';
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';
import imageToBase64 from '../Shared/imageToBase64';
import { getBookByCover } from '../../ApiClientService/Book';
import { uploadToCloud } from '../../ApiClientService/ImageUpload';
import { useHistory } from 'react-router-dom';

// const accessToken: string | null = localStorage.getItem('accessToken');

interface CameraProps {
  setIsLoading: (value: React.SetStateAction<boolean>) => void;
}

const Camera: React.FC<CameraProps> = ({ setIsLoading }) => {
  const history = useHistory();

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('In handleImageChange');
    
    setIsLoading(true);
    if (!e.target.files) return;
    const base64Image = await imageToBase64(e.target.files[0]).then(
      (base64EncodedImageString) => base64EncodedImageString
    );
    const cloudURL = await uploadToCloud(base64Image);
    console.log(cloudURL, 'cloudURL');

    let book;
    const accessToken: string | null = localStorage.getItem('accessToken');
    console.log(accessToken, 'token here');

    if (accessToken) book = await getBookByCover(accessToken, cloudURL);
    if (book) {
      setIsLoading(false);
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
