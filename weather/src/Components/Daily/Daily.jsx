import { useContext, useEffect, useState } from "react";
import DataContext from "../../hooks/context/DataContext";

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
    
    const dailySets = days?.map((day, index) => {
        const date = new Date(day.dt * 1000).toLocaleDateString("en-US", {weekday: "short"});

        return(
            <article className="weather__day" key={index}>
                <span className="weather__day--date">
                    {date}
                </span>
                <span className="weather__day--wrapper">
                    <i className="fa-solid fa-cloud weather__day--icon"/>
                </span>
                <span className="weather__day--temp">
                    {(day.main.temp - 273.15).toFixed(1)}
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