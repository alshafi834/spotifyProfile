import html2canvas from "html2canvas";
import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: "a31a94629e394d4282216937dfe09c84",
});

interface ITopArtists {
  artistName: string;
  artistImage: string;
}

const TopArtists = () => {
  const accessToken = localStorage.getItem("token");
  const [topArtists, setTopArtists] = useState<ITopArtists[]>([]);

  const exportTopArtist = () => {
    const input = document.getElementById("MyTopArtist");
    html2canvas(input, {
      logging: true,
      letterRendering: 1,
      useCORS: true,
    }).then((canvas) => {
      const imgWidth = 208;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
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
    //if (!search) return setSearchResults([]);
    if (!accessToken) return;

    spotifyApi
      .getMyTopArtists()
      .then((res) => {
        console.log(res.body.items);
        setTopArtists(
          res.body.items.map((artist) => {
            console.log("entering here");

            return {
              artistName: artist.name,
              artistImage: artist.images[0].url,
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="p-10 text-white">
      <div className="bg-[#1b1b1b] w-[380px] rounded" id="MyTopArtist">
        <h2 className="text-2xl py-4 text-center">Your Top Artists</h2>
        <div className="grid grid-cols-2 gap-4 p-2">
          {topArtists.slice(0, 10).map((artist) => (
            <div
              key={artist.artistName}
              className="flex flex-col items-center py-2"
            >
              <img
                src={artist.artistImage}
                alt="artist image"
                className="w-20 h-20 rounded-full"
              />
              <h2>{artist.artistName}</h2>
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
