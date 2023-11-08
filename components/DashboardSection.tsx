import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import useAuth from "../contents/hooks/useAuth";
import Player from "./Player";
import SongList from "./SongList";

interface ICode {
  code: string | null;
}

interface ISearchResult {
  artist: string;
  title: string;
  uri: string;
  albumUrl: string;
}
interface IProfileInfo {
  image: string;
  name: string | undefined;
  email: string;
  followers: number | undefined;
}

const spotifyApi = new SpotifyWebApi({
  clientId: "a31a94629e394d4282216937dfe09c84",
});

const DashboardSection: React.FC = () => {
  const [search, setSearch] = useState("rock");
  const [profileInfo, setProfileInfo] = useState<IProfileInfo>({});
  const [searchResults, setSearchResults] = useState<ISearchResult[]>([]);
  const accessToken = localStorage.getItem("token");

  const [playingTrack, setPlayingTrack] = useState<ISearchResult>(
    searchResults[0]
  );
  //console.log(searchResults[0]);

  const [play, setPlay] = useState(false);
  const chooseTrack = (track: ISearchResult) => {
    if (track.uri === playingTrack?.uri) setPlay((prev) => !prev);
    setPlayingTrack(track);

    //setSearch("")
  };

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    //let cancel = false
    spotifyApi
      .searchTracks(search)
      .then((res) => {
        //if (cancel) return
        setSearchResults(
          res.body.tracks!.items.map((track) => {
            /* const smallestAlbumImage = track.album.images.reduce(
                (smallest, image) => {
                  if (image.height? < smallest.height) return image
                  return smallest
                },
                track.album.images[0]
              ) */

            return {
              artist: track.artists[0].name,
              title: track.name,
              uri: track.uri,
              albumUrl: track.album.images[0].url,
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });

    spotifyApi
      .getMe()
      .then((res) => {
        //if (cancel) return
        setProfileInfo({
          image: res.body.images[1].url,
          name: res.body.display_name,
          email: res.body.email,
          followers: res.body.followers?.total,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    //return () => (cancel = true)
  }, [search, accessToken]);

  return (
    <div className="text-white p-10">
      <div className="flex flex-row items-center p-2 justify-between">
        <div>
          Hi<span className="text-[#1BB954]"> {profileInfo.name}</span>!
        </div>

        <div>
          <img
            src={profileInfo.image}
            alt=""
            className="w-12 h-12 rounded-full"
          />
        </div>
      </div>
      <div className="flex justify-between">
        <h2 className="text-2xl">Browse music from Spotify</h2>
        <input
          type="text"
          className="border-0 rounded bg-[#1d1d1d] p-2 focus:outline-none"
          placeholder="Search Songs/Artists"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="h-[78vh] overflow-auto my-4">
        {searchResults.map((song, index) => (
          <SongList
            key={index}
            song={song}
            chooseTrack={chooseTrack}
            isPlaying={playingTrack?.uri === song.uri && play}
          />
        ))}
      </div>

      {searchResults[0] && (
        <Player
          accessToken={accessToken}
          trackUri={playingTrack?.uri || searchResults[0].uri}
          play={play}
          setPlay={setPlay}
        />
      )}
    </div>
  );
};

export default DashboardSection;
