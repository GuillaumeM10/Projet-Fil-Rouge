import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
// import './toast.scss';

// const errorToast = (message) => {
//   return toast.error(
//     <div className="toast-error container-toast">
//       <div className="toast-error__message">{message}</div>
//       <div className="toast-error__close" onClick={() => toast.dismiss()}>
//         <div className="cross">
//           <div className="cross__line cross__line--left"></div>
//           <div className="cross__line cross__line--right"></div>
//         </div>
//       </div>
//     </div>
//   );
// }

// const successToast = (message) => {
//   return toast.success(
//     <div className="toast-success container-toast">
//       <div className="toast-success__message">{message}</div>
//       <div className="toast-success__close" onClick={() => toast.dismiss()}>
//         <div className="cross">
//           <div className="cross__line cross__line--left"></div>
//           <div className="cross__line cross__line--right"></div>
//         </div>
//       </div>
//     </div>
//   );
// }

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
          duration: 1000000,
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