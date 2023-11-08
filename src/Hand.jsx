import React, { useRef, useEffect } from "react";
import { Hands } from "@mediapipe/hands";

const HandDetection = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const hands = new Hands({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });
    hands.setOptions({ maxNumHands: 1 });

    hands.onResults(handleHandResults);

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: {} })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((error) => {
          console.error("Error accessing webcam:", error);
        });
    }
  }, []);

  const handleHandResults = (results) => {
    // Process hand tracking results here
    console.log(results);
  };

  return (
    <div>
      <h1>Hand Detection</h1>
      <video ref={videoRef} width="640" height="480" autoPlay></video>
    </div>
  );
};

export default HandDetection;
