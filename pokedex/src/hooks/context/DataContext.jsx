import { createContext, useEffect, useState } from "react";

const DataContext = createContext(null);

function PokemonDataProvider({children}){
    const [data, setData] = useState([]);
    const [id, setId] = useState(1);

    useEffect(() => {
        (async () => {
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    setData(data);
                })
        })();
    }, [id]);

    return(
        <DataContext.Provider value={{data, id, setId}}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;

export { PokemonDataProvider }; 