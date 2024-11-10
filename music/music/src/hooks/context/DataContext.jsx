import { createContext, useEffect, useState } from "react";

const DataContext = createContext(null);

function MusicDataProvider({children}){
    const [data, setData] = useState([]);
    const [musicData, setMusicData] = useState([]);
    const [albumData, setAlbumData] = useState([]);
    const [playlistData, setPlaylistData] = useState([]);
    const [artistData, setArtistData] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);
    const [currentList, setCurrentList] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        (async () => {
            fetch('/data.json')
                .then((response) => response.json())
                .then((data) => {
                    setData(data);
                    setMusicData(data?.music);
                    setAlbumData(data?.albums);
                    setPlaylistData(data?.playlists);
                    setArtistData(data?.artists);
                })
        })();
    }, []);

    return(
        <DataContext.Provider value= {{data, musicData, albumData, playlistData, artistData, currentSong, setCurrentSong, currentList, setCurrentList, isPlaying, setIsPlaying, index, setIndex}}>
            {children}
        </DataContext.Provider>
    );
}

export default DataContext;

export { MusicDataProvider };