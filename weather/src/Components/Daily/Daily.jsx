import { useContext, useEffect, useState } from "react";
import DataContext from "../../hooks/context/DataContext";
import Icon from "../Icon/Icon";

function Daily(){
    const {data} = useContext(DataContext);
    const [days, setDays] = useState([]);

    useEffect(() => {
        if(data.list){
            const getDays = [];
            let oldDate = null;
            
            const filterData = data.list.filter((value) => {
                const date = new Date(value.dt * 1000).toLocaleDateString();
                if(date != oldDate){
                    oldDate = date;
                    getDays.push(value);
                    return;
                }
            });
            setDays(getDays);
        }
    }, [data]);
    
    const dailySets = days?.slice(1).map((day, index) => {
        const date = new Date(day.dt * 1000).toLocaleDateString("en-US", {weekday: "short"});
        const getIcon = Icon(day.weather[0].icon);

        return(
            <article className="weather__day" key={index}>
                <span className="weather__day--date">
                    {date}
                </span>
                <span className="weather__day--wrapper" title={day.weather[0].description}>
                    <i className={`${getIcon} weather__day--icon`}/>
                </span>
                <span className="weather__day--temp">
                    {(day.main.temp - 273.15).toFixed(1)}°C
                </span>
            </article>
        );
    });

    return(
        <>
            {dailySets}
        </>
    );
}

export default Daily;