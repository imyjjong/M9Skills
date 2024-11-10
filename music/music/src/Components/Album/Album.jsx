import { useContext, useEffect, useState } from "react";
import DataContext from "../../hooks/context/DataContext";
import { Play } from "../Player/Player";
import { PlaylistPlay } from "../Player/Player";

function Album({ albumId, setCurrentPage, setSpecifyPage }){
    const {albumData, currentSong, isPlaying, index} = useContext(DataContext);
    const [album, setAlbum] = useState(null);

    function pageLink(page, id){
        setSpecifyPage(id);
        setCurrentPage(page);
    }

    useEffect(() => {
        if(!albumData || albumData.length === 0){
            setAlbum(null);
            return;
        }
        setAlbum(albumData.find((albums) => albums.title === albumId)) ?? null;
    }, [albumData, albumId]);

    const getSongs = album?.songs?.map(song => {
        const isSongPlaying = currentSong?.getTitle === song.title && isPlaying;
        return(
            <li className="album__song" key={song.id}>
                <span className="album__song--number">
                    <p className="album__song--number-text">{song.id + 1}</p>
                    <Play class="album__song--number-play" getId={song.id} getSong={song.audio} getImage={album.albumcover} getAlbum={album.title} getTitle={song.title} getArtist={song.artist}>&#x25B6;</Play>
                </span>
                <span className="album__song--title">
                    <p className={`album__song--title-text${isSongPlaying ? '-playing' : ''}`}>{song.title}</p>
                    <p onClick={() => {pageLink('artist', song.artist)}} className="album__song--title-artist">{song.artist}</p>
                </span>
                <span className="album__song--duration">
                    <p className="album__song--duration-text">{song.duration}</p>
                </span>
            </li>
        )
    }
    )

    return album ? (
        <section className="album">
            <div className="album__heading">
                <img src={album.albumcover} alt={album.title} className="album__heading--background" />
                <div className="album__heading--wrapper">
                    <img src={album.albumcover} alt={album.title} className="album__heading--cover" />
                    <article className="album__heading--info">
                        <p className="album__heading--release">{album.release}</p>
                        <h1 className="album__heading--title">{album.title}</h1>
                        <span className="album__heading--artist">
                            <img src={album.artistimage} alt={album.artist} className="album__heading--artist-image" />
                            <p onClick={() => {pageLink('artist', album.artist)}} className="album__heading--artist-name">{album.artist}</p>
                            <p className="album__heading--artist-middledot">·</p>
                            <p className="album__heading--artist-length">{getSongs.length} songs</p>
                        </span>
                    </article>
                </div>
            </div>
            <div className="album__controls">
                <PlaylistPlay class="album__controls--play" getList={album?.songs} getImage={album?.albumcover}>  
                <i className={`album__controls--play-icon`}></i>
                </PlaylistPlay>
            </div>
            <ul className="album__list">
                <li className="album__song album__song--items">
                    <span className="album__song--number">
                        <p className="album__song--number-hashtag">
                            #
                        </p>
                    </span>
                    <span className="album__song--title">
                        <p className="album__song--title-list">
                            Title
                        </p>
                    </span>
                    <span className="album__song--duration">
                        <i className="fa-regular fa-clock album__song--duration-clock"></i>
                    </span>
                </li>
                {getSongs}
            </ul>

        </section>
    ) :

    <>
        <h2>geen album</h2>
    </>
}

export default Album;