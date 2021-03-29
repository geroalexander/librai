//PAMEL
import React, { useState } from 'react';
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';
import imageToBase64 from '../Shared/imageToBase64';
import { getBookByCover } from '../../ApiClientService/Book';
import { uploadToCloud } from '../../ApiClientService/ImageUpload';
import { useHistory } from 'react-router-dom';

interface CameraProps {
  setIsLoading: (value: React.SetStateAction<boolean>) => void;
}

const Camera: React.FC<CameraProps> = ({ setIsLoading }) => {
  const history = useHistory();

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    if (!e.target.files) return;
    const base64Image = await imageToBase64(e.target.files[0]).then(
      (base64EncodedImageString) => base64EncodedImageString
    );
    const cloudURL = await uploadToCloud(base64Image);
    let book;
    const accessToken: string | null = localStorage.getItem('accessToken');

    try {
      if (accessToken) book = await getBookByCover(accessToken, cloudURL);
      history.push({
        pathname: `/details/${book.id}`,
        state: { book, isNew: false },
      });
    } catch (error) {
      alert('Unable to retreive book details');
      setIsLoading(false);
      // setMessage('Unable to retreive book details');
      // setOpen(true);
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
