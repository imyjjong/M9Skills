import { useContext, useEffect, useState } from "react";
import DataContext from "../../hooks/context/DataContext";
import Header from "../Header/Header";
import Daily from "../Daily/Daily";

function Weather(){
    const { data, id } = useContext(DataContext);

    useEffect(() => {
        if(id){
            return;
        }
    }, [id]);

    useEffect(() => {
        if(data.length != 0){
            return;
        }
    }, [data]);

    if(data.length!=0){
        console.log(data.list[0].main.temp - 273.15);
        console.log(new Date(data.list[0].dt * 1000).toLocaleDateString());
        
        return(
            <section className="weather">
                <Header/>
                <div className="weather__heading">
                    <span className="weather__heading--wrapper">
                    <h2 className="weather__heading--location">
                        {data.city.name}
                    </h2>
                    <span className="weather__heading--riseset">
                        <h3 className="weather__heading--riseset-item">
                            <i className="fa-solid fa-circle weather__heading--riseset-sun"/>
                         {new Date(data.city.sunrise * 1000).toLocaleTimeString("en-UK", {hour: '2-digit', minute: '2-digit'})}
                        </h3>
                        <h3 className="weather__heading--riseset-item">
                            <i className="fa-solid fa-moon weather__heading--riseset-moon"/>
                         {new Date(data.city.sunset * 1000).toLocaleTimeString("en-UK", {hour: '2-digit', minute: '2-digit'})}
                        </h3>
                    </span>
                    <span className="weather__heading--temperature">
                        <h2 className="weather__heading--temperature-text">
                            {(data.list[0].main.temp - 273.15).toFixed(1)}
                        </h2>
                        <p className="weather__heading--temperature-celsius">°C</p>
                    </span>
                    </span>
                    <span className="weather__heading--icon">
                        <i className="fa-solid fa-cloud weather__heading--icon-item"/>
                    </span>
                </div>
                <div className="weather__week">
                    <Daily/>
                </div>
            </section>
        );
    }
    else{
        console.log(data);
        return(
            <section className="weather">
                <h2>couldnt find city</h2>
                <Header/>
            </section>
        );
    }

    
}

export default Weather;