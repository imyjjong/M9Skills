import { useContext } from "react";
import DataContext from "../../hooks/context/DataContext";

function Search(){
    const {id, setId} = useContext(DataContext);
    function searchPokemon(event){
        event.preventDefault();
        setId(event.target.children[0].value);
    }
    return(
        <form onSubmit={(event) => {searchPokemon(event)}} className="pokedex__search">
            <input type="text" className="pokedex__search--input" placeholder="Enter Pokémon name or id"/>
        </form>
    );
}

export default Search;