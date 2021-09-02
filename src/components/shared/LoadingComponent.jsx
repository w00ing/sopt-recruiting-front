import React from 'react';
import Lottie from 'react-lottie';
import { Image, Loader } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const LoadingComponent = (props) => {
  return (
    <div
      style={{
        // position: "fixed",
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}>
      <Loader active />
    </div>
  );
};

export default LoadingComponent;
