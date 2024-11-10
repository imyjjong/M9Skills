import { useContext, useEffect, useState } from "react";
import DataContext from "../../hooks/context/DataContext";

function Artist({artistId, setCurrentPage, setSpecifyPage}){
    const {artistData, albumData} = useContext(DataContext);
    const [artist, setArtist] = useState(null);
    const [album, setAlbum] = useState([]);

    function pageLink(page, id){
        setSpecifyPage(id);
        setCurrentPage(page);
    }

    useEffect(() => {
        if(!artistData || artistData.length === 0){
            setArtist(null);
            setAlbum([]);
            return;
        }
        setArtist(artistData.find((artists) => artists.name === artistId)) ?? null;
        setAlbum(albumData.filter((albums) => albums.artist.includes(artistId)) ?? []);
    }, [artistData, albumData, artistId]);

    const getAlbums = album.length > 0 ? album.map(album => 
        <article onClick={() => {pageLink('album', album.title)}} className="artist__album" key={album.id}>
            <figure className="artist__album--figure">
                <img src={album.albumcover} alt={album.title} className="artist__album--figure-cover" />
            </figure>
            <div className="artist__album--info">
                <h3 className="artist__album--info-title">{album.title}</h3>
                <span className="artist__album--info-release">
                    <p className="artist__album--info-year">{album.year}</p>
                    <p className="artist__album--info-middledot">·</p>
                    <p className="artist__album--info-text">{album.release}</p>
                </span>
            </div>
        </article>
    ) :
    <>
        <h2>geen albums</h2>
    </>

    return artist ? (
        <section className="artist">
            <div className="artist__heading">
                <img src={artist.backdrop} alt={artist.name} className="artist__heading--banner" />
                <article className="artist__heading--info">
                    <h1 className="artist__heading--info-name">
                        {artist.name}
                    </h1>
                </article>
            </div>
            <div className="artist__albums">
                <h2 className="artist__albums--title">Discography</h2>
                <div className="artist__albums--wrapper">
                    {getAlbums}
                </div>
            </div>
        </section>
    ) :
    <>
        <h2>cant find artist</h2>
    </>
}

export default Artist;