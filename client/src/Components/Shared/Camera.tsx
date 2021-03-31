//PAMEL
import React from 'react';
import { useDispatch } from 'react-redux';
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';
import imageToBase64 from '../Shared/imageToBase64';
import { getBookByCover } from '../../ApiClientService/Book';
import { uploadToCloud } from '../../ApiClientService/ImageUpload';
import { useHistory } from 'react-router-dom';
import { setError } from '../../Store/actions/errors';

interface CameraProps {
  setIsLoading: (value: React.SetStateAction<boolean>) => void;
}

const Camera: React.FC<CameraProps> = ({ setIsLoading }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    if (!e.target.files) return;
    const base64Image = await imageToBase64(e.target.files[0]).then(
      (base64EncodedImageString) => base64EncodedImageString
    );
    const cloudURL = await uploadToCloud(base64Image, dispatch, true);
    let book;
    const accessToken: string | null = localStorage.getItem('accessToken');

    try {
      if (accessToken) book = await getBookByCover(accessToken, cloudURL);
      history.push({
        pathname: `/details/${book.id}`,
        state: { book, isNew: false },
      });
    } catch (error) {
      const action = setError('Unable to retrieve book details');
      dispatch(action);
      setIsLoading(false);
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
