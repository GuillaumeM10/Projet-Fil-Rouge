import React from 'react';
import { Toaster } from 'react-hot-toast';

const Toast = () => {

  return (
    <Toaster
      reverseOrder={false}
      gutter={8}
      containerClassName="toast-container"
      containerStyle={{}}
      toastOptions={{
        // Define default options
        className: 'toaster-options',
        duration: 5000,
        // Default options for specific types
        success: {
          duration: 1000,
          style: {
            background: 'green',
            color: 'white',
          }
        },
        error: {
          duration: 1000,
          style: {
            background: 'red',
            color: 'white',
          },
        },
      }}
    />
  );
};

export default Toast;
// export { errorToast, successToast };