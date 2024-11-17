import { useContext, useEffect, useState } from "react";
import DataContext from "../../hooks/context/DataContext";

function Header(){
    const {id, setId} = useContext(DataContext);
    const [time, setTime] = useState();
    function searchLocation(event){
        event.preventDefault();
        console.log(id);
        setId(event.target.children[0].value);
    }
    useEffect(() => {
        setInterval(() => {
            setTime(new Date().toLocaleTimeString('en-UK', {timeStyle: 'short'}))
        }, 1000);
    });
    return(
        <header className="header">
            <div className="header__logo">
                Weather
            </div>
            <form onSubmit={(event) => {searchLocation(event)}} className="header__search">
                <input type="text" className="header__search--input lightmode" placeholder="Enter a city name" />
            </form>
            <div className="header__time">
                {time}
            </div>
        </header>
    );
}

export default Header;