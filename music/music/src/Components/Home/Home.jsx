import { useContext } from "react";
import DataContext from "../../hooks/context/DataContext.jsx";
import { Play } from "../Player/Player.jsx";

function Home({setCurrentPage, setSpecifyPage}){
    function pageLink(page, id){
        setSpecifyPage(id);
        setCurrentPage(page);
    }
    const {musicData, artistData, albumData, currentSong, isPlaying} = useContext(DataContext);
    if(musicData.length!=0){
        const dataSets = musicData.map(song => {
            const isSongPlaying = currentSong?.getTitle === song.title && isPlaying;
            return(
                <article className="song" key={song.id}>
                    <figure className="song__figure">
                        <img src={song.image} alt={song.title} className="song__figure--image" />
                        <Play class="song__figure--button" getId={song.id} getSong={song.audio} getImage={song.image} getAlbum={song.album} getTitle={song.title} getArtist={song.artist}>&#x25B6;</Play>
                    </figure>
                    <div className="song__info">
                        <h3 onClick={() => {pageLink('album', song.album)}} className={`song__info--title${isSongPlaying ? '-playing' : ''}`}>{song.title}</h3>
                        <p onClick={() => {pageLink('artist', song.artist)}} className="song__info--artist">{song.artist}</p>
                    </div>
                </article>
            );
        }
        )
        const artistSets = artistData.map(artist => 
            <article className="home__artist" key={artist.id}>
                <img onClick={() => {pageLink('artist', artist.name)}} src={artist.image} alt={artist.title} title={artist.name} className="home__artist--image" />
            </article>
        )
        const albumSets = albumData.map(album => 
            <article className="home__album" key={album.id}>
                <img onClick={() => {pageLink('album', album.title)}} src={album.albumcover} alt={album.title} className="home__album--image" />
                <div className="home__album--info">
                    <p onClick={() => {pageLink('album', album.title)}} className="home__album--info-title">{album.title}</p>
                    <p onClick={() => {pageLink('artist', album.artist)}} className="home__album--info-artist">{album.artist}</p>
                </div>
            </article>
        )
        
        return(
            <section className="home">
                <div className="home__list">
                    <h2 className="home__list--title">Songs</h2>
                    <span className="home__list--wrapper">
                        {dataSets}
                    </span>
                </div>
                <div className="home__artists">
                    <h2 className="home__artists--title">Artists</h2>
                    <span className="home__artists--wrapper">
                        {artistSets}
                    </span>
                </div>
                <div className="home__albums">
                    <h2 className="home__albums--title">Albums</h2>
                    <span className="home__albums--wrapper">
                        {albumSets}
                    </span>
                </div>
            </section>
        );
    }
    else{
        return <h2>nah</h2>
    }
}

export default Home;