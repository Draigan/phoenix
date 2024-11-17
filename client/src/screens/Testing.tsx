//import React, { useEffect, useState } from 'react';
//import axios from 'axios';
import useSpeech from '../hooks/useSpeech';

const Testing = () => {
  const { audioUrl } = useSpeech("whatchamacallit");

  function testPlay() {

    const audio = new Audio(audioUrl);
    audio.play();
  }

  return (
    <div>
      <button onClick={testPlay}> TEST AUDIO</button>
    </div>
  );
};

export default Testing;

