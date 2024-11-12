import { useContext } from "react";
import DataContext from "../../hooks/context/DataContext";

function Header(){
    const {id, setId} = useContext(DataContext);
    function searchLocation(event){
        event.preventDefault();
        console.log(id);
        console.log(event.target.children[0].value);
        setId(event.target.children[0].value);
    }
    const time = String(new Date().getHours()) + ":" + new Date().getMinutes();
    return(
        <header className="header">
            <div className="header__logo">
                Weather
            </div>
            <form onSubmit={(event) => {searchLocation(event)}} className="header__search">
                <input type="text" className="header__search--input" placeholder="Enter a city name" />
            </form>
            <div className="header__time">
                {time}
            </div>
        </header>
    );
}

export default Header;