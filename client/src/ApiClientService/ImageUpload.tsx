const { REACT_APP_CLOUD_NAME, REACT_APP_UPLOAD_PRESET } = process.env;

const uploadToCloud = async (file: string) => {
  const cloudUrl = `https://api.cloudinary.com/v1_1/${REACT_APP_CLOUD_NAME}/upload`;
  const formData = {
    file,
    upload_preset: REACT_APP_UPLOAD_PRESET,
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  };

  const cloudinaryImage = await fetch(cloudUrl, options)
    .then((res) => res.json())
    .catch((error) => console.error(error));

  return cloudinaryImage.url;
};

export { uploadToCloud };
