import React, { Fragment, useEffect } from "react";
import { Moderation } from "./Moderation/Moderation";
// import WebSocket from 'ws';

// import { io, Socket } from "socket.io-client";

// import { goSocketUrl } from "../../../store";

// TODO: reconnecting webSockets based on internet connectivity state
// TODO: rename the component to VideoRecorder
export const LiveVideoRecorder: React.FC = () => {
  // const socket: Socket = io(goSocketUrl);
  // const ws = new WebSocket("wss://localhost:443");
  const socket = new WebSocket("wss://owino-backend-go.onrender.com/ws");

  socket.onopen = function () {
    // check connectivity here
    console.log("Status: Connected\n");
  };

  // socket.on("connect", () => {
  //   console.log("connected");
  // });

  useEffect(() => {
    // dispatch action to authorize media access(video and audio)
    // dispatch another action to start sending video streams to the server
    // dispatch action to stop sending video streams to the server a
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(function (stream) {
        const videoElement = document.getElementById(
          "video-element"
        ) as HTMLVideoElement;
        videoElement.srcObject = stream;

        // socket.emit("live", stream);

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
    // }, [socket]);
  }, []);

  const sendMessage = () => {
    console.log("clicked send message");

    socket.send("Hello Server!");

    console.log("Believe it has sent");
  };

  return (
    <Fragment>
      <div>
        <h1>GoLive</h1>
        <div>
          <video
            id="video-element"
            className="w-72 h-72 border-2 border-gray-500"
          ></video>
          <button onClick={() => sendMessage()}>Send message</button>
        </div>
        <div>
          <Moderation />
        </div>
      </div>
    </Fragment>
  );
};
