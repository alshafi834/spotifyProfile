import React from "react";
import { FaPlay } from "react-icons/fa";

interface ISearchResult {
  artist: string;
  title: string;
  uri: string;
  albumUrl: string;
}
interface ISonglist {
  songs: ISearchResult[];
  chooseTrack: (song: ISearchResult) => void;
}

const SongList: React.FC<ISonglist> = ({ songs, chooseTrack }) => {
  const handlePlay = (song: ISearchResult) => {
    chooseTrack(song);
  };
  return (
    <div className="h-[78vh] overflow-auto my-4">
      {songs.map((song, index) => (
        <div key={index}>
          <div className="flex bg-[#3b3d3f] rounded m-1 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20">
                <img src={song.albumUrl} alt="image url" className="rounded" />
              </div>
              <p className="text-white">{song.title}</p>
            </div>
            <div className="mr-4">
              <div
                className="bg-[#1b1b1b] p-4 rounded-2xl cursor-pointer"
                onClick={() => handlePlay(song)}
              >
                <FaPlay />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SongList;
