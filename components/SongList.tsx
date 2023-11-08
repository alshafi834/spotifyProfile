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
            <div className="md:w-20 w-10">
              <img src={song.albumUrl} alt="image url" className="rounded" />
            </div>
            <p className="text-white md:w-100 w-40">{song.title}</p>
          </div>
          <div className="mr-4 flex gap-4">
            <div>
              {isPlaying && (
                <img
                  src="https://media.tenor.com/9xx5jJaHPpIAAAAd/fat-guy.gif"
                  alt="playing"
                  className="w-12 h-12 rounded-full"
                />
              )}
            </div>

            <div
              className="bg-[#1b1b1b] p-4 rounded-2xl cursor-pointer h-12"
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
