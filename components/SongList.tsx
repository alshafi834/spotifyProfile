import React, { useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";

interface ISearchResult {
  artist: string;
  title: string;
  uri: string;
  albumUrl: string;
}
interface ISonglist {
  song: ISearchResult;
  chooseTrack: (song: ISearchResult) => void;
  isPlaying: boolean;
}

const SongList: React.FC<ISonglist> = ({ song, chooseTrack, isPlaying }) => {
  const handlePlay = (song: ISearchResult) => {
    chooseTrack(song);
  };
  return (
    <div>
      <div>
        <div className="flex bg-[#3b3d3f] rounded m-1 items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-20">
              <img src={song.albumUrl} alt="image url" className="rounded" />
            </div>
            <p className="text-white">{song.title}</p>
          </div>
          <div className="mr-4 flex gap-10">
            {isPlaying && (
              <img
                src="https://open.spotifycdn.com/cdn/images/equaliser-green.f8937a92.svg"
                alt="playing"
                className="w-10 h-10"
              />
            )}

            <div
              className="bg-[#1b1b1b] p-4 rounded-2xl cursor-pointer"
              onClick={() => handlePlay(song)}
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongList;
