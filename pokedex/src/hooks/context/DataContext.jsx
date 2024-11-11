import { createContext, useEffect, useState } from "react";

const DataContext = createContext(null);

function PokemonDataProvider({children}){
    const [data, setData] = useState([]);
    const [species, setSpecies] = useState([]);
    const [id, setId] = useState(1);

    useEffect(() => {
        (async () => {
            
            const [response, speciesResponse] = await Promise.all([
                fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(response => response.json()),
                fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then(response => response.json())
            ]);
            setData(response);
            setSpecies(speciesResponse);
        })();
    }, [id]);

    return(
        <DataContext.Provider value={{data, species, id, setId}}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;

export { PokemonDataProvider }; 