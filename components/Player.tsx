import React, { useEffect, useState } from 'react'
import SpotifyWebPlayer from 'react-spotify-web-playback/lib'

const Player = ({accessToken, trackUri}: {accessToken: string, trackUri: string}) => {
    const [play, setPlay] = useState(false);

    useEffect(() => {
      setPlay(true);
    }, [trackUri])
    



    if(!accessToken) return null
  return (
    
    <SpotifyWebPlayer token={accessToken} play={play} callback={state => {
        if(!state.isPlaying) setPlay(false)
    }} showSaveIcon uris={trackUri ? [trackUri] : []} />
  )
}

export default Player