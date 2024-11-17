import { useContext, useEffect, useState } from "react";
import DataContext from "../../hooks/context/DataContext";
import Header from "../Header/Header";
import Daily from "../Daily/Daily";
import Icon from "../Icon/Icon";

function Weather(){
    const { data, id } = useContext(DataContext);
    const [locationTime, setLocationTime] = useState(null);
    const [darkmode, setDarkmode] = useState(false);

    useEffect(() => {
        if(data.length!=0 && data.cod === '200'){    
            const updateTime = () => {
                const getTime = new Date().getTime() + (data.city.timezone * 1000 - 3600000);
                setLocationTime(new Date(getTime).toLocaleTimeString('en-UK', {timeStyle: 'short'}))
            }

            updateTime();

            const interval = setInterval(updateTime, 1000);

            return() => clearInterval(interval);
        }
    }, [data]);

    useEffect(() => {
        if(data.length!=0 && data.cod === '200'){
            const currentTime = new Date().getTime();
            const sunrise = data.city.sunrise * 1000;
            const sunset = data.city.sunset * 1000;

            if(currentTime > sunrise && currentTime < sunset){
                setDarkmode(false);
            }
            else{
                setDarkmode(true);
            }
            return;
        }
    }, [data]);

    useEffect(() => {
        const themeElements = document.querySelectorAll(".lightmode");
        themeElements.forEach((themeElement) => {
            if(darkmode === true){
                themeElement.classList.add("darkmode");
                console.log(themeElement);
            }
            else{
                themeElement.classList.remove("darkmode");
                console.log(themeElement);
            }
        })
    });

    if(data.length!=0 && data.cod === '200'){
        const getIcon = Icon(data.list[0].weather[0].icon);
        
        return(
            <section className="weather lightmode">
                <Header/>
                <div className="weather__heading">
                    <span className="weather__heading--wrapper">
                    <h2 className="weather__heading--location">
                        {data.city.name}
                    </h2>
                    <span className="weather__heading--riseset">
                        <h3 className="weather__heading--riseset-item">
                            <i className="fa-solid fa-circle weather__heading--riseset-sun"/>
                         {new Date((data.city.sunrise + data.city.timezone - 3600) * 1000).toLocaleTimeString("en-UK", {hour: '2-digit', minute: '2-digit'})}
                        </h3>
                        <h3 className="weather__heading--riseset-item">
                            <i className="fa-solid fa-moon weather__heading--riseset-moon"/>
                         {new Date((data.city.sunset + data.city.timezone - 3600) * 1000).toLocaleTimeString("en-UK", {hour: '2-digit', minute: '2-digit'})}
                        </h3>
                    </span>
                    <span className="weather__heading--temperature">
                        <h2 className="weather__heading--temperature-text">
                            {(data.list[0].main.temp - 273.15).toFixed(1)}
                        </h2>
                        <p className="weather__heading--temperature-celsius">°C</p>
                    </span>
                    </span>
                    <span className="weather__heading--details" title={data.list[0].weather[0].description}>
                        <i className={`${getIcon} weather__heading--details-icon`}/>
                        <article className="weather__heading--details-time">
                            {locationTime}
                        </article>
                    </span>
                </div>
                <div className="weather__week">
                    <Daily/>
                </div>
            </section>
        );
    }
    else{
        return(
            <section className="weather lightmode">
                <Header/>
                <div className="weather__error lightmode">
                    <h3 className="weather__error--message">
                        can't find {id}
                    </h3>
                    <i className="fa-solid fa-magnifying-glass weather__error--icon"></i>
                </div>
            </section>
        );
    }

    
}

export default Weather;