import { useContext, useEffect, useState } from "react";
import DataContext from "../../hooks/context/DataContext";
import Daily from "../Daily/Daily";

function Weather(){
    const { data, id, setId } = useContext(DataContext);

    console.log(id);
    useEffect(() => {
        if(data.length != 0){
            console.log(data);
            return;
        }
    }, [data]);
    
    if(data.length!=0){
        console.log(data.city.name);
            
        // const listSets = data.list?.find((value) =>{
        //     return(
        //         <>
        //             {value.main.feels_like}
        //         </>
        //     );
        // })

        const listSets = "";
        console.log(data.list[0].main.temp - 273.15);
        console.log(new Date(data.list[0].dt * 1000).toLocaleDateString());
        
        return(
            <section className="weather">
                <div className="weather__heading">
                    <h2 className="weather__heading--location">
                        {data.city.name}
                    </h2>
                    <span className="weather__heading--wrapper">
                        <h3 className="weather__heading--riseset">sunrise {new Date(data.city.sunrise * 1000).toLocaleTimeString()}</h3>
                        <h3 className="weather__heading--riseset">sunset {new Date(data.city.sunset * 1000).toLocaleTimeString()}</h3>
                    </span>
                    <span className="weather__heading--temperature">
                        <h2 className="weather__heading--temperature-text">
                            {(data.list[0].main.temp - 273.15).toFixed(1)}°C
                        </h2>
                    </span>
                </div>
                <div className="weather__week">
                    <Daily/>
                </div>
            </section>
        );
    }
    else{
        return <h2>nah</h2>
    }

    
}

export default Weather;