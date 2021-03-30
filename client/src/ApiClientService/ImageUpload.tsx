import { AppDispatch } from '..';
import { setError } from '../Store/actions/errors';
import { CloudinaryFormData } from '../Interfaces/cloudinaryFormData';

const { REACT_APP_CLOUD_NAME, REACT_APP_UPLOAD_PRESET } = process.env;

const uploadToCloud = async (file: string, dispatch: AppDispatch) => {
  const cloudUrl: string = `https://api.cloudinary.com/v1_1/${REACT_APP_CLOUD_NAME}/upload`;
  const formData: CloudinaryFormData = {
    file,
    upload_preset: REACT_APP_UPLOAD_PRESET,
  };

  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  };

  try {
    const res = await fetch(cloudUrl, options);
    const cloudinaryImage = await res.json();
    return cloudinaryImage.url;
  } catch (error) {
    console.error(error);
    const action = setError(
      "Sorry we, couldn't upload your image to the cloud"
    );
    dispatch(action);
  }

  const cloudinaryImage = await fetch(cloudUrl, options)
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
      const action = setError(
        "Sorry we, couldn't upload your image to the cloud"
      );
      dispatch(action);
    });

  return cloudinaryImage.url;
};

export { uploadToCloud };
