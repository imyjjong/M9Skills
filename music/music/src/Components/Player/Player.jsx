import { useContext, useEffect, useRef, useState } from "react";
import DataContext from "../../hooks/context/DataContext";

function Player({setCurrentPage, setSpecifyPage}){
    const {currentSong, currentList, isPlaying, setIsPlaying, index, setIndex} = useContext(DataContext);
    const audioRef = useRef(null);
    function pageLink(page){
        setCurrentPage(page)
    }
    function pageLink(page, id){
        setSpecifyPage(id);
        setCurrentPage(page);
    }
    useEffect(() => {
        if(audioRef.current && currentSong){
            audioRef.current.src = currentSong.getSong;
            setIsPlaying(true);
        }
    }, [currentSong]);

    useEffect(() => {
        if(audioRef.current && currentList){
            audioRef.current.src = currentList.getList[index].audio;
            audioRef.current.play();
            setIsPlaying(true);
        }
    }, [currentList, index]);

    function rewindButton(){
        if(audioRef){
            audioRef.current.currentTime -= 5;
        }
    }
    function playButton(){
        if(audioRef){
          if(audioRef.current.paused){
            audioRef.current.play();
            setIsPlaying(true);
          }
          else{
            audioRef.current.pause();
            setIsPlaying(false);
          }
        }
    }
    function forwardButton(){
        if(audioRef){
            audioRef.current.currentTime += 5;
        }
    }
    function songended(){
        if(index < currentList.getList.length - 1){
            setIndex(index + 1);
        }
        else{
            setIndex(0);
        }
    }
    return(
        <div className="player">
            <div className="player__current">
                <img src={currentSong?.getImage || currentList?.getList[index].albumcover} alt={currentSong?.getTitle || currentList?.getList[index].title} className="player__current--image" />
                <span className="player__current--wrapper">
                    <p onClick={() => {pageLink('album', currentSong?.getAlbum)}} className="player__current--song">
                        {currentSong?.getTitle || currentList?.getList[index].title}
                    </p>
                    <p onClick={() => {pageLink('artist', currentSong?.getArtist)}} className="player__current--artist">
                        {currentSong?.getArtist || currentList?.getList[index].artist}
                    </p>
                </span>
            </div>
            <div className="player__wrapper">
                <span className="player__controls">
                    <button onClick={rewindButton} className="player__controls--rewind">
                        <i className="fa-solid fa-backward player__controls--rewind-icon"></i>
                    </button>
                    <button onClick={playButton} className="player__controls--play">
                        <i className={isPlaying ? 'fa-solid fa-pause player__controls--play-icon' : 'fa-solid fa-play player__controls--play-icon'}></i>
                    </button>
                    <button onClick={forwardButton} className="player__controls--forward">
                        <i className="fa-solid fa-forward player__controls--forward-icon"></i>
                    </button>
                </span>
                <audio ref={audioRef} onEnded={songended} autoPlay controls controlsList="nodownload noplaybackrate" className="player__audio"></audio>
            </div>
        </div>
    );
}
export function Play(props){
    const { currentSong, setCurrentSong, isPlaying } = useContext(DataContext);
    function playSong(){
        setCurrentSong({
            getId: props.getId,
            getSong: props.getSong,
            getImage: props.getImage,
            getAlbum: props.getAlbum,
            getTitle: props.getTitle,
            getArtist: props.getArtist
        });
    }
    const isSongPlaying = currentSong?.getTitle === props.getTitle && isPlaying;
    return(
        <>
            <button className={`${props.class}${isSongPlaying ? '-playing' : ''}`} onClick={playSong}>
                <i className={`${isSongPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play'}`}></i>
            </button>
        </>
    );
}

export function PlaylistPlay(props){
    const {currentList, setCurrentList, isPlaying, setCurrentSong, index} = useContext(DataContext);
    function playList(){
        setCurrentSong({
            getId: null,
            getSong: null,
            getImage: null,
            getAlbum: null,
            getTitle: null,
            getArtist: null
        })
        console.log(currentList);
        setCurrentList({
            getList: props.getList
        });
    }
    const isListPlaying = currentList?.getList[index]?.title === props.getList[index]?.title && isPlaying;
    return(
        <>
            <button className={`${props.class}`} onClick={playList}>{props.children}
                <i className={`${isListPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play'}`}></i>
            </button>
        </>
    );
}

export default Player;