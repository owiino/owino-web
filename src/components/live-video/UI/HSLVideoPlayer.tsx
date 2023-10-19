import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
// import "videojs-contrib-hls";

export const HSLVideoPlayer: React.FC = () => {
  const videoRef = useRef<any>(null);

  useEffect(() => {
    // Initialize the video player when the component mounts
    const player = videojs(videoRef.current, {
      controls: true,
      preload: "auto",
      techOrder: ["html5", "hls"],
    });

    // Set up the HLS source URL using videojs-contrib-hls
    player.src({
      src: "http://localhost:8080/hsl/stream", // Replace with the actual URL
      type: "application/x-mpegURL", // HLS MIME type
    });

    // Cleanup when the component unmounts
    return () => {
      player.dispose();
    };
  }, []);

  return (
    <div className="w-fulls bg-green-500 w-80 h-80 border-4 border-gray-500">
      <video ref={videoRef} className="video-js vjs-default-skin w-72 h-72" />
    </div>
  );
};
