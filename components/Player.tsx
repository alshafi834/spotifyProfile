import React, { useEffect, useState } from "react";
import SpotifyWebPlayer from "react-spotify-web-playback/lib";

const Player = ({
  accessToken,
  trackUri,
  play,
  setPlay,
}: {
  accessToken: string;
  trackUri: string;
  play: boolean;
  setPlay: (play: boolean) => void;
}) => {
  //const [play, setPlay] = useState(false);

  useEffect(() => {
    setPlay(true);
  }, [trackUri]);

  if (!accessToken) return null;
  return (
    <SpotifyWebPlayer
      styles={{
        activeColor: "#1BB954",
        bgColor: "#1b1b1b",
        color: "#fff",
        loaderColor: "#fff",
        sliderColor: "#1cb954",
        sliderTrackColor: "#267748",
        trackArtistColor: "#ccc",
        trackNameColor: "#1BB954",
        height: 60,
      }}
      token={accessToken}
      play={play}
      callback={(state) => {
        if (!state.isPlaying) setPlay(false);
      }}
      showSaveIcon
      uris={trackUri ? [trackUri] : []}
    />
  );
};

export default Player;
