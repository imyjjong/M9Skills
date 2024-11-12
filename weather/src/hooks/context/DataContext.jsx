import { createContext, useEffect, useState } from "react";

const DataContext = createContext(null);

function WeatherDataProvider({children}){
    const [data, setData] = useState([]);
    const [id, setId] = useState("Amsterdam");

    useEffect(() => {
        (async () => {
            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${id}&appid=4347eae6ae99608eaf6053d5e90be353`)
            .then((response) => response.json())
            .then((weatherData) => {
                setData(weatherData);
            })
        })();
    }, [id]);
    console.log(id);
    return(
        <DataContext.Provider value={{data, id, setId}}>
            {children}
        </DataContext.Provider>
    );
}

export default DataContext;

export {WeatherDataProvider};