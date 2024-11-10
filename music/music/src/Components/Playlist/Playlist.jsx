import { useContext, useEffect, useState } from "react";
import DataContext from "../../hooks/context/DataContext";
import { Play } from "../Player/Player";
import { PlaylistPlay } from "../Player/Player";

function Playlist({ playlistId, setCurrentPage, setSpecifyPage }){
  const { playlistData, currentSong, isPlaying, index, currentList } = useContext(DataContext);
  const [playlist, setPlaylist] = useState(null);

  function pageLink(page, id){
    setSpecifyPage(id);
    setCurrentPage(page);
  }
  useEffect(() => {
    if(!playlistData || playlistData.length === 0){
      setPlaylist(null);
      return;
    }
    setPlaylist(playlistData.find((playlists) => playlists.title === playlistId)) ?? null;
  }, [playlistData, playlistId]);


  const getSongs = playlist?.songs.map(song => {   
    const isSongPlaying = currentSong?.getTitle === song.title && isPlaying;
    const isListPlaying = currentList?.getList[index]?.title === song.title && isPlaying;
    console.log(index)
    console.log(currentList?.getList[0]);
    return(
    <li className="playlist__song" key={song.id}>
        <span className="playlist__song--number">
            <p className="playlist__song--number-text">{song.id + 1}</p>
            <Play class="playlist__song--number-play" getId={song.id} getSong={song.audio} getImage={song.albumcover} getAlbum={song.album} getTitle={song.title} getArtist={song.artist}>&#x25B6;</Play>
        </span>
        <span className="playlist__song--title">
            <img src={song.albumcover} alt={song.album} className="playlist__song--title-image" />
            <article className="playlist__song--title-wrapper">
                <p onClick={() => {pageLink('album', song.album)}} className={`playlist__song--title-name${(isSongPlaying || isListPlaying) ? '-playing' : ''}`}>{song.title}</p>
                <p onClick={() => {pageLink('artist', song.artist)}} className="playlist__song--title-artist">{song.artist}</p>
            </article>
        </span>
        <span className="playlist__song--album">
            <p onClick={() => {pageLink('album', song.album)}} className="playlist__song--album-link">{song.album}</p>
        </span>
        <span className="playlist__song--duration">
            <p className="playlist__song--duration-time">
                {song.duration}
            </p>
        </span>
    </li>
    )}
  );

  return playlist ? (
    <section className="playlist">
        <div className="playlist__heading">
            <img src={playlist.image} alt="background" className="playlist__heading--background" />
            <div className="playlist__heading--wrapper">
                <img src={playlist.image} alt={playlist.title} className="playlist__heading--cover" />
                <article className="playlist__heading--info">
                    <p className="playlist__heading--release">Playlist</p>
                    <h1 className="playlist__heading--title">{playlist.title}</h1>
                    <span className="playlist__heading--creator">
                        <img src={playlist.creatorimage} alt={playlist.creator} className="playlist__heading--creator-image" />
                        <p className="playlist__heading--creator-name">{playlist.creator}</p>
                        <p className="playlist__heading--creator-middledot">·</p>
                        <p className="playlist__heading--creator-length">{getSongs.length} songs</p>
                    </span>
                </article>
            </div>
        </div>
        <div className="playlist__controls">
            <PlaylistPlay class="playlist__controls--play" getList={playlist?.songs}>
                <i className={`playlist__controls--play-icon`}></i>
            </PlaylistPlay>
        </div>
        <ul className="playlist__list">
            <li className="playlist__song playlist__song--items">
                <span className="playlist__song--number">
                    <p className="playlist__song--number-hashtag">
                        #
                    </p>
                </span>
                <span className="playlist__song--title">
                    <p className="playlist__song--title-list">Title</p>
                </span>
                <span className="playlist__song--album">
                    <p className="playlist__song--album-list">Album</p>
                </span>
                <span className="playlist__song--duration">
                    <i className="fa-regular fa-clock playlist__song--duration-clock"></i>
                </span>
            </li>
            {getSongs}
        </ul>
    </section>
  ) : 
  <>
    <h2>sorry mate</h2>
  </>
}

export default Playlist;
