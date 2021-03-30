import React from 'react';
import LottieAnimation from '../../Animations/Lottie';
import errorAnimation from '../../Animations/errorAnimation.json';
import './Error.css';

interface ErrorPageProps {}

const ErrorPage: React.FC<ErrorPageProps> = (props: any) => {
  return (
    <div className="error-wrapper">
      <p className="title">
        Hmm... Looks like something went wrong. Please try again!
      </p>
      <LottieAnimation
        margin="none"
        animation={errorAnimation}
        width={150}
        height={150}
      />
    </div>
  );
};

export default ErrorPage;
