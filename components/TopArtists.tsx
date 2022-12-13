import axios from "axios";
import html2canvas from "html2canvas";
import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: "a31a94629e394d4282216937dfe09c84",
});

interface ITopArtists {
  name: string;
  image: string;
}

interface ITopArtistsResponse {
  name: string;
  images: IImage[];
}

interface IImage {
  url: string;
}

interface IResponse {
  items: ITopArtistsResponse[];
}

const TopArtists = () => {
  const accessToken = localStorage.getItem("token");
  const [topArtists, setTopArtists] = useState<ITopArtists[]>([]);
  const [topArtistDuration, setTopArtistDuration] = useState("short_term");
  const webApiUrl = `https://api.spotify.com/v1/me/top/artists?limit=10&time_range=${topArtistDuration}`;

  const exportTopArtist = () => {
    const input = document.getElementById("MyTopArtist");
    html2canvas(input, {
      logging: true,
      letterRendering: 1,
      useCORS: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const createEl = document.createElement("a");
      createEl.href = imgData;
      createEl.download = "top-artists";
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
          setTopArtists(
            res.data.items.map((artist) => {
              return {
                name: artist.name,
                image: artist.images[0].url,
              };
            })
          );
        })
        .catch((err) => console.log(err));
    };

    fetchTopSongs();
  }, [webApiUrl, accessToken]);

  return (
    <div className="p-10 text-white">
      <div className="flex justify-end">
        <select
          className="bg-[#1b1b1b] mb-4 focus:outline-none p-2 rounded w-[180px]"
          value={topArtistDuration}
          onChange={(e) => setTopArtistDuration(e.target.value)}
        >
          <option value="short_term">This Month</option>
          <option value="medium_term">Last 6 Month</option>
          <option value="long_term">All Time</option>
        </select>
      </div>
      <div className="bg-[#1b1b1b] w-[380px] rounded" id="MyTopArtist">
        <h2 className="text-2xl pt-4 pb-2 text-center">Your Top Artists</h2>
        <div className="grid grid-cols-2 gap-2 p-2">
          {topArtists.map((artist) => (
            <div
              key={artist.name}
              className="flex flex-col gap-2 items-center py-2"
            >
              <img
                src={artist.image}
                alt="artist image"
                className="w-20 h-20 rounded-full"
              />
              <h2>{artist.name}</h2>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() => exportTopArtist()}
        className="px-4 py-2 rounded mt-2 bg-[#1BB954]"
      >
        Create story
      </button>
    </div>
  );
};

export default TopArtists;
