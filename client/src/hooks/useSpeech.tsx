import { useEffect, useState } from 'react';
import axios from 'axios';

const useSpeech = (text: string) => {
  const [audioUrl, setAudioUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchAudio = async () => {
      try {
        const response = await axios.get('http://localhost:5000/phoenix', {
          params: { text: text },
          responseType: 'blob', // Important to get the audio file as a Blob
        });

        // Create a URL for the audio blob response
        const audioUrl = URL.createObjectURL(response.data);
        setAudioUrl(audioUrl);
      } catch (error) {
        console.error('Error fetching audio:', error);
      }
    };

    fetchAudio();
  }, [text]);

  return { audioUrl };
};

export default useSpeech;
