import "./App.css";
import React, { useRef, useEffect, useState } from "react";
function Camera() {
  const videoRef = useRef(null);
  const photeRef = useRef(null);

  const [hasPhoto, sethasPhoto] = useState(false);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: 1920,
          height: 1180,
        },
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const takePhoto = () => {
    const width = 414;
    const height = width / (16 / 9);

    let video = videoRef.current;
    let photo = photeRef.current;

    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);
    console.log(ctx);
    sethasPhoto(true);
  };

  const closePhoto = () => {
    const width = 0;
    const height = 0;

    let video = videoRef.current;
    let photo = photeRef.current;

    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);

    sethasPhoto(true);
  };
  useEffect(() => {
    getVideo();
  }, [videoRef]);
  return (
    <div className="App">
      <div className="camera">
        <video ref={videoRef}></video>
        <button onClick={takePhoto}>take</button>
      </div>
      <div className={"result" + (hasPhoto ? "hasPhoto" : "")}>
        <canvas ref={photeRef}></canvas>
        <button onClick={closePhoto}>close</button>
      </div>
    </div>
  );
}

export default Camera;
