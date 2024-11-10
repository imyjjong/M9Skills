import './css/style.css';
import Header from './Components/Header/Header';
import Player from './Components/Player/Player';
import Home from './Components/Home/Home';
import Album from './Components/Album/Album';
import Playlist from './Components/Playlist/Playlist';
import Artist from './Components/Artist/Artist';
import { useState } from 'react';

function App(){
  const [currentPage, setCurrentPage] = useState('home');
  const [specifyPage, setSpecifyPage] = useState(null);

  function showPage(){
    switch(currentPage){
      case 'home':
        return <Home setCurrentPage={setCurrentPage} setSpecifyPage={setSpecifyPage} />;
      case 'album':
        return <Album setCurrentPage={setCurrentPage} setSpecifyPage={setSpecifyPage} albumId={specifyPage} />;
      case 'playlist':
        return <Playlist setCurrentPage={setCurrentPage} setSpecifyPage={setSpecifyPage} playlistId={specifyPage} />;
      case 'artist':
        return <Artist setCurrentPage={setCurrentPage} setSpecifyPage={setSpecifyPage} artistId={specifyPage} />;
      default:
        return <Home />;
    }
  }


  return (
    <>
      <Header setCurrentPage={setCurrentPage} setSpecifyPage={setSpecifyPage} />
      <main className="main">
        {showPage()}
      </main>
      <Player setCurrentPage={setCurrentPage} setSpecifyPage={setSpecifyPage} />
    </>
  );
}

export default App;
