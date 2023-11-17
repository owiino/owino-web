import React, { Fragment, useEffect, useState } from "react";

export const LiveVideoRecorder: React.FC = () => {
  // const [stream, setStream] = useState<MediaStream | null>(null);
  const [stream, setStream] = useState<any>();
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [count, setCount] = useState(0);
  const ws = new WebSocket("wss://owino-backend-go.onrender.com/ws");
  const ws1 = new WebSocket("wss://owino-backend-go.onrender.com/ws1");

  const appendStreamToVideoPlayer = (videoStream: MediaStream) => {
    const videoElement = document.getElementById(
      "video-element"
    ) as HTMLVideoElement;
    videoElement.srcObject = videoStream;
  };

  //ws connection status and reconnection
  useEffect(() => {
    //Check for connections status
    ws.onopen = function () {
      console.log("WebSocket Status: Connected");
    };
    // Reconnect here
    // clean effect
  }, [ws]);

  //ws connection status and reconnection
  // useEffect(() => {
  //   const incrementCountHandler = () => {
  //     setCount((count) => {
  //       console.log(count + 1);
  //       return count + 1;
  //     });
  //   };

  //   setTimeout(() => {
  //     incrementCountHandler();
  //   }, 5000);
  // }, [count]);

  // useEffect to get video streams from the usermedia
  useEffect(() => {
    const accessUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(() => stream);
        appendStreamToVideoPlayer(stream);
      } catch (error) {
        console.error("error accessing userMedia", error);
      }
      // clean effect
    };
    accessUserMedia();
    // }, []);
  }, []);

  //Send video chunks to the server
  useEffect(() => {
    const recordSendMediaStream = () => {
      if (!stream) return;
      const mediaRecorder = new MediaRecorder(stream);
      setMediaRecorder(mediaRecorder);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          // Send individual video chunks to the server

          console.log("event.data", event.data);
          ws.send(event.data);
        }
      };
      // clean effect
    };
    recordSendMediaStream();
  }, [stream, count]);

  // useEffect(() => {
  //   // Open a WebSocket connection to the server
  //   const ws = new WebSocket("wss://owino-backend-go.onrender.com/ws");
  //   setSocket(ws);

  //   ws.onopen = function () {
  //     console.log("WebSocket Status: Connected");
  //   };

  //   // Request access to video and audio
  //   navigator.mediaDevices
  //     .getUserMedia({ video: true, audio: true })
  //     .then(function (userStream) {
  //       setStream(userStream);
  //       const videoElement = document.getElementById(
  //         "video-element"
  //       ) as HTMLVideoElement;
  //       videoElement.srcObject = userStream;

  //       // Set up MediaRecorder to capture video chunks
  //       const mediaRecorder = new MediaRecorder(userStream);
  //       setMediaRecorder(mediaRecorder);

  //       mediaRecorder.ondataavailable = (event) => {
  //         if (event.data.size > 0) {
  //           // Send individual video chunks to the server
  //           console.log("event.data", event.data);
  //           ws.send(event.data);
  //         }
  //       };

  //       mediaRecorder.start();
  //     })
  //     .catch(function (error) {
  //       console.error("Error accessing camera: ", error.message);
  //       // Handle errors
  //     });

  //   return () => {
  //     // Cleanup: Stop recording and close WebSocket when the component unmounts
  //     if (mediaRecorder) {
  //       mediaRecorder.stop();
  //     }
  //     if (ws) {
  //       ws.close();
  //     }
  //     if (stream) {
  //       stream.getTracks().forEach((track) => track.stop());
  //     }
  //   };
  // }, []);

  const stopRecording = () => {
    // if (mediaRecorder) {
    //   mediaRecorder.stop();
    // }
    // if (socket) {
    //   socket.close();
    // }
  };

  return (
    <Fragment>
      <div>
        <h1>GoLive</h1>
        <div>
          <video
            id="video-element"
            className="w-72 h-72 border-2 border-gray-500"
            autoPlay
          ></video>
          <button onClick={() => stopRecording()}>Stop Recording</button>
        </div>
      </div>
    </Fragment>
  );
};
