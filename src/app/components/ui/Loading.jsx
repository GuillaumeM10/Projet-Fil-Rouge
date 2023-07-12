import { Player } from '@lottiefiles/react-lottie-player';
import React from 'react';

const Loading = () => {
  return (
    <Player
      autoplay
      loop
      src="/loading.json"
      style={{ height: '150px', width: '150px' }}
    />
  );
};

export default Loading;