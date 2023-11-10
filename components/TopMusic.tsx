import axios from "axios";
import html2canvas from "html2canvas";
import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import spotifyIcon from "../contents/images/spotify_logo.png";

const spotifyApi = new SpotifyWebApi({
  clientId: "a31a94629e394d4282216937dfe09c84",
});

interface ITopSong {
  image: string;
  name: string;
}

interface ITopSongResponse {
  album: {
    images: IImage[];
  };
  name: string;
}
interface IImage {
  url: string;
}

interface IResponse {
  items: ITopSongResponse[];
}

const TopMusic = () => {
  const [topSongs, setTopSongs] = useState<ITopSong[]>([]);
  const accessToken = localStorage.getItem("token");
  const [topSongDuration, setTopSongDuration] = useState("short_term");
  const [profileInfo, setProfileInfo] = useState<IProfileInfo>({});
  const durationMapper = {
    short_term: "This month",
    medium_term: "Last 6 months",
    long_term: "All time",
  };
  const webApiUrl = `https://api.spotify.com/v1/me/top/tracks?limit=8&time_range=${topSongDuration}`;

  const exportTopSongs = () => {
    const input = document.getElementById("MyTopSongs");
    html2canvas(input, {
      logging: true,
      letterRendering: 1,
      useCORS: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const createEl = document.createElement("a");
      createEl.href = imgData;
      createEl.download = "top-songs";
      createEl.click();
    });
  };

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    const fetchTopSongs = async () => {
      await axios
        .get<IResponse>(webApiUrl, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => {
          setTopSongs(
            res.data.items.map((track) => {
              return {
                image: track.album.images[0].url,
                name: track.name,
              };
            })
          );
        })
        .catch((err) => console.log(err));
    };

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

    fetchTopSongs();
  }, [webApiUrl, accessToken]);

  return (
    <div className="p-10 text-white">
      <div className="flex justify-end">
        <select
          className="bg-[#1b1b1b] mb-4 focus:outline-none p-2 rounded w-[180px]"
          value={topSongDuration}
          onChange={(e) => setTopSongDuration(e.target.value)}
        >
          <option value="short_term">This Month</option>
          <option value="medium_term">Last 6 Month</option>
          <option value="long_term">All Time</option>
        </select>
      </div>
      <div className="w-[380px] bg-[#1B1B1B] p-6 rounded" id="MyTopSongs">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-row">
            <img className="w-12 h-12" src={spotifyIcon.src} alt="" />
            <img
              src={profileInfo.image}
              alt=""
              className="w-12 h-12 rounded-full  -ml-4"
            />
          </div>

          <h2 className="text-center text-xl py-2">
            What's on my playlist? - Music
          </h2>
        </div>
        <p className="text-center mt-[-5px]">
          {durationMapper[topSongDuration]}
        </p>
        {topSongs.map((song, index) => (
          <div
            key={index}
            className="flex items-center gap-2 my-2 bg-[#272727] p-2 rounded"
          >
            <img
              src={song.image}
              alt="Song image"
              className="w-14 h-14 rounded-full"
            />
            <p>{song.name}</p>
          </div>
        ))}
      </div>
      <button
        onClick={() => exportTopSongs()}
        className="px-4 py-2 rounded mt-2 bg-[#1BB954]"
      >
        Create story
      </button>
    </div>
  );
};

export default TopMusic;
