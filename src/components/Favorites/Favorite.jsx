import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './Favorite.scss';

const Favorite = () => {
    const [fav, setFav] = useState([]);

    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            setFav(JSON.parse(storedFavorites));
        }
    }, []);

    const handleRemoveFavorite = (trackId) => {
        const updatedFav = fav.filter(favSong => favSong.track.id !== trackId);
        setFav(updatedFav);
        localStorage.setItem('favorites', JSON.stringify(updatedFav));
    };

    return (
        <div className='favorite'>
            <div className='sidebarContainerFav'>
                <Sidebar />
            </div>
            <div className='grid-music'>
                {fav.map((favSong) => (
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
                        <button
                            className='remove-favorite-button'
                            onClick={() => handleRemoveFavorite(favSong.track.id)}
                        >
                            Remove from Favorites
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Favorite;
