import { useContext } from "react";
import DataContext from "../../hooks/context/DataContext";

export function Header({ setCurrentPage, setSpecifyPage }) {
  const { playlistData } = useContext(DataContext);

  function pageLink(page, id = null) {
    setSpecifyPage(id);
    setCurrentPage(page);
  }

  const getPlaylists = playlistData.map((playlist) => (
    <li className="header__list--item" onClick={() => pageLink('playlist', playlist.title)} key={playlist.id}>
      <img src={playlist.image} alt={playlist.title} title={playlist.title} className="header__list--item-image" />
    </li>
  ));

  return (
    <header className="header">
      <nav className="header__navigation">
        <ul className="header__list">
          <li onClick={() => pageLink('home')} className="header__list--item">
            <i className="fa-solid fa-house header__list--item-home"></i>
          </li>
          {getPlaylists}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
