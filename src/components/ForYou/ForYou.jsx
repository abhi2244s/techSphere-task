import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './For.scss';
import axios from 'axios'
import toast from 'react-hot-toast';
import Spinner from '../Spinner/Spinner';

const ForYou = () => {
    const [loading, setLoading] = useState(false)
    const [favorites, setFavorites] = useState([]);
    const [token, setToken] = useState([])
    useEffect(() => {
        // Function to get the token from Spotify
        const getToken = async () => {
            const client_id = 'ea491cca8b2d4b529262cf5f21107c19';
            const client_secret = 'eef0d4c3b0464d3c8295ec0e40b3b007';
            const authOptions = {
                method: 'post',
                url: 'https://accounts.spotify.com/api/token',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
                },
                data: 'grant_type=client_credentials'
            };

            const response = await axios(authOptions);
            console.log(response, "response");
            setToken(response.data.access_token);
        };

        getToken();
    }, []);
    const [songs, setSongs] = useState([])
    const [selectedSong, setSelectedSong] = useState(null);
    useEffect(() => {
        if (token) {
            const fetchSongs = async () => {
                const playlistId = "37i9dQZF1DX0XUfTFmNBRM"; // Replace with your playlist ID
                try {
                    setLoading(true);
                    const result = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    });
                    console.log(result, "result")
                    setSongs(result.data.items);
                    setLoading(false)
                } catch (error) {
                    console.error(`Error fetching songs from playlist ${playlistId}`, error);
                }
            };

            fetchSongs();
        }
    }, [token]);

    const handleSongClick = (song) => {
        setSelectedSong(song);
    };

    console.log("selectedSong", selectedSong)
    const handleAddToFavorites = () => {
        if (selectedSong) {
            // Check if already in favorites
            const index = favorites.findIndex((fav) => fav.track.id === selectedSong.track.id);
            if (index === -1) {
                // Add to favorites
                const updatedFavorites = [...favorites, selectedSong];
                setFavorites(updatedFavorites);
                localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
                toast.success("Favorites added successfully")
            } else {
                // Remove from favorites
                const updatedFavorites = favorites.filter((fav) => fav.track.id !== selectedSong.track.id);
                setFavorites(updatedFavorites);
                localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
                toast.success("Favorites removed successfully")
            }
        }
    };

    const [search, setSearch] = useState('')

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const filterSongs = () => {
        if (!search.trim()) {
            return songs; // If no search query, return all songs
        } else {
            return songs.filter((song) =>
                song.track.name.toLowerCase().includes(search.toLowerCase()) ||
                song.track.artists[0]?.name.toLowerCase().includes(search.toLowerCase())
            );
        }
    };

    const filteredSongs = filterSongs();

    // const msToMinSec = (ms) => {
    //     const totalSeconds = Math.floor(ms / 1000);
    //     const minutes = Math.floor(totalSeconds / 60);
    //     const seconds = totalSeconds % 60;
    //     return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    // };

    const handlePlay = (song) => {
        let playedSongs = JSON.parse(localStorage.getItem('playedSongs')) || [];
        playedSongs = [song, ...playedSongs.filter((s) => s.track.id !== song.track.id)];
        if (playedSongs.length > 10) {
            playedSongs.pop();
        }
        localStorage.setItem('playedSongs', JSON.stringify(playedSongs));
    };

    return (

        <>
            {loading ? (<Spinner />) : (<div className='container-main'>


                <div className='foryouContainer'>
                    <h3 className='heading'>For You</h3>
                    <div className='inputContainer'>
                        <input
                            type='text'
                            placeholder='Search Songs, Artist'
                            className='input'
                            value={search}
                            onChange={handleChange}
                            name='search'
                        />
                        <FaSearch className='searchIcon' />
                    </div>
                    {/* music songs */}
                    {filteredSongs.length > 0 && <>
                        {filteredSongs.map((song) => {

                            return (<div className={`${selectedSong === song ? "musicSongsContainerSelected" : "musicSongsContainer"}`}
                                key={song?.track?.id}
                                onClick={() => handleSongClick(song)}>
                                <div className='songsConatainer'>
                                    <div className='imagesAndMusic'>
                                        <div className='images'>
                                            <img src={song?.track?.album?.images[2]?.url} className='image' />
                                        </div>
                                        <div className='names
            '>
                                            < p className='para1'>{song?.track?.album?.artists?.[0]?.name}</p>
                                            <p className='para2'>{song?.track?.album?.name}</p>

                                        </div>
                                    </div>
                                    <div className='musicTime'>
                                        <p className='duration'>{song?.track?.duration_ms}</p>
                                    </div>
                                </div>
                            </div>)
                        })}
                    </>}
                </div>

                {selectedSong && (<div className='musicPlayerContainer'>

                    <div className='selectedSong'>
                        <div className='selectedSongNameContainer'>
                            <p className='selected-song-para1'>{selectedSong?.track?.album?.artists?.[0]?.name}</p>
                            <p className='selected-song-para2'>{selectedSong?.track?.album?.name}</p>
                        </div>
                        <div className='selectedSongImageContainer'>
                            <img src={selectedSong?.track?.album?.images[1]?.url} className='image-selected-song' />
                        </div>
                        {selectedSong && selectedSong.track.preview_url && (
                            <div className='selectedSongMusic'>
                                <audio controls src={selectedSong.track.preview_url} onPlay={() => handlePlay(selectedSong)} />

                            </div>
                        )}

                        <div className='buttonContainer'>
                            <button onClick={handleAddToFavorites} className='button'>
                                {favorites.some((fav) => fav.track.id === selectedSong.track.id)
                                    ? 'Remove from Favorites'
                                    : 'Add to Favorites'}
                            </button>
                        </div>
                    </div>

                </div>)}


            </div>)}
        </>
    );
};

export default ForYou;
