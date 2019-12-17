import React from "react";
import ReactPlayer from "react-player";

const AudioPlayer = ({ url }) => (
  <div>
    <ReactPlayer height="30px" width="500px" controls={true} url={url} />
  </div>
);

export default AudioPlayer;
