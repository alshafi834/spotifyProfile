import React, { useEffect, useState } from 'react'
import SpotifyWebApi from 'spotify-web-api-node';
import useAuth from '../contents/hooks/useAuth';
import Player from './Player';
import SongList from './SongList';

interface ICode  {
    code: string
   }

   interface ISearchResult {
    artist: string;
                title: string;
                uri: string;
                albumUrl: string;
   }

   const spotifyApi = new SpotifyWebApi({
    clientId: "a31a94629e394d4282216937dfe09c84",
  })

const DashboardSection:React.FC<ICode> = ({code}) => {
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState<ISearchResult[]>([]);
    const accessToken = useAuth(code);
    console.log('here is my token',accessToken);
   /*  console.log(search);
    console.log(searchResults); */

    const [playingTrack, setPlayingTrack] = useState<ISearchResult>(searchResults[0])

    const chooseTrack = (track: ISearchResult) => {
        setPlayingTrack(track)
        //setSearch("")
      }

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
      }, [accessToken])

      useEffect(() => {
        console.log(accessToken);
        if (!search) return setSearchResults([])
        if (!accessToken) return
    
        //let cancel = false
        spotifyApi.searchTracks(search).then(res => {
          //if (cancel) return
          setSearchResults(
            res.body.tracks!.items.map(track => {
              /* const smallestAlbumImage = track.album.images.reduce(
                (smallest, image) => {
                  if (image.height? < smallest.height) return image
                  return smallest
                },
                track.album.images[0]
              ) */
              console.log('entering here');
    
              return {
                artist: track.artists[0].name,
                title: track.name,
                uri: track.uri,
                albumUrl: track.album.images[0].url,
              }
            })
          )
        }).catch(err => {
            console.log(err);
          })
    
        //return () => (cancel = true)
      }, [search, accessToken])


  return (
    <div className="w-[80%] min-h-[100vh] bg-[#2d3436]">
        <p>This is main section</p>
        <input type="text" placeholder="Search Songs/Artists"
        value={search}
        onChange={e => setSearch(e.target.value)} />
        <SongList songs={searchResults} chooseTrack={chooseTrack} />
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
  )
}

export default DashboardSection