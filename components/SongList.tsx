import React from 'react'

interface ISearchResult {
    artist: string;
                title: string;
                uri: string;
                albumUrl: string;
   }
   interface ISonglist {
    songs: ISearchResult[],
    chooseTrack: (song: ISearchResult) => void
   }

const SongList:React.FC<ISonglist> = ({songs, chooseTrack}) => {
    const handlePlay = (song: ISearchResult) => {
        chooseTrack(song);
    }
  return (
    <div className='h-[80vh] overflow-auto'>
        {songs.map((song, index) => <div key={index}>
            <div className='flex bg-[#1e272e] rounded m-1' onClick={() => handlePlay(song)}>

            <div className='w-12'>

            <img src={song.albumUrl} alt="image url"  />
            </div>
            <p className='text-white'>{song.title}</p>
            </div>
            </div> )}
    </div>
  )
}

export default SongList