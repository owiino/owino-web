import React, { Fragment, useEffect } from "react";
import Flv from "flv.js";

export const FLVideoPlayer: React.FC = () => {
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (stream) {
        const videoElement = document.getElementById(
          "video-element"
        ) as HTMLVideoElement;
        videoElement.srcObject = stream;

        // Wait for the loadedmetadata event before calling play()
        videoElement.addEventListener("loadedmetadata", function () {
          videoElement.play().catch(function (error) {
            console.log("Error playing video: ", error);
          });
        });
      })
      .catch(function (error) {
        console.log("Error accessing camera: ", error.message);
        // Handle errors
      });

    const videoElement = document.getElementById(
      "video-element"
    ) as HTMLVideoElement;

    const BACKEND_STREAMING_URL = "rtmp://localhost:1935";
    // Create an FLV player
    const flvPlayer = Flv.createPlayer({
      type: "flv",
      isLive: true,
      url: BACKEND_STREAMING_URL,
    });

    // Attach the FLV player to the video element
    flvPlayer.attachMediaElement(videoElement);

    // Load the video stream (play will be handled after 'loadedmetadata')
    flvPlayer.load();
  }, []);

  return (
    <Fragment>
      <div>
        <h1>GoLive</h1>
        <div>
          <video
            id="video-element"
            className="w-72 h-72 border-2 border-gray-500"
          ></video>
        </div>
      </div>
    </Fragment>
  );
};
