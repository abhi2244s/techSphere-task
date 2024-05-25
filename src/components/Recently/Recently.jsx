import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import './Recently.scss'

const Recently = () => {
  const [recently, setRecently] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('playedSongs');
    if (storedFavorites) {
      setRecently(JSON.parse(storedFavorites));
    }
  }, []);
  return (
    <div className='recently'>
      <div className='sidebarRecently'>
        <Sidebar />
      </div>
      <div className='grid-music'>
                {recently.map((favSong) => (
                    <div className='favoriteMusic' key={favSong.track.id}>
                        <div className='selectedSongNameContainer'>
                            <p className='selected-song-para1'>{favSong.track.album.artists[0]?.name}</p>
                            <p className='selected-song-para2'>{favSong.track.album.name}</p>
                        </div>
                        <div className='selectedSongImageContainer'>
                            <img src={favSong.track.album.images[1]?.url} className='image-selected-song' alt='Album Cover' />
                        </div>
                        {favSong.track.preview_url && (
                            <div className='selectedSongMusic'>
                                <audio controls src={favSong.track.preview_url} />
                            </div>
                        )}
                       
                    </div>
                ))}
            </div>
    </div>

  )
}

export default Recently
