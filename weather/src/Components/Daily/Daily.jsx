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
    
    const dailySets = days?.map(day => {
        const date = new Date(day.dt * 1000).toLocaleDateString("en-US", {weekday: "short"});
        console.log(date);

        return(
            <article className="weather__day">
                {date}
                {(day.main.temp - 273.15).toFixed(1)}
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

// const [oldDate, setOldDate] = useState(null);
// const filterDaily = data.list?.filter((value) => {
//     const date = new Date(value.dt * 1000).toLocaleDateString();
//     if(date !== oldDate){
//         console.log(date);
//         setOldDate(date);
//     }
// })