import React from 'react';
import Lottie from 'react-lottie';
import { Image, Loader } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import SpinnerComponent from './SpinnerComponent';

const LoadingComponent = (props) => {
  return (
    <div
      className="bg-surface-light flex flex-row items-center justify-center w-full h-screen"
      style={
        {
          // position: "fixed",
          // width: '100%',
          // height: '100vh',
          // display: 'flex',
          // alignItems: 'center',
        }
      }>
      <SpinnerComponent />
    </div>
  );
};

export default LoadingComponent;
