import { useContext, useEffect, useState } from "react";
import DataContext from "../../hooks/context/DataContext";
import Search from "../Search/Search";

function Pokedex(){
    const { data, species, id } = useContext(DataContext);
    const [moveTypes, setMoveTypes] = useState([]);
    console.log(species);

    useEffect(() => {
        if(id){
            return;
        }
    }, [id]);

    const typesSets = data?.types?.map(type => 
        <article className={`pokedex__info--type pokedex__info--type-${type.type.name}`} key={type.slot}>
            {type.type.name}
        </article>
    );
    const statsSets = data?.stats?.map((stat, index) => 
        <li className="pokedex__stats--item" key={index}>
            <p className="pokedex__stats--item-name">{stat.stat.name}</p>
            <p className="pokedex__stats--item-number">{stat.base_stat}</p>
        </li>
    );
    useEffect(() => {
        const fetchMoves = async () => {
            if(data?.moves){
                const moveData = data?.moves.map(move => 
                    fetch(`https://pokeapi.co/api/v2/move/${move.move.name}`)
                        .then((response) => response.json())
                );
                const getMoves = await Promise.all(moveData);
                const getMove = getMoves.reduce((acc, move) => {
                    acc[move.name] = move;
                    return acc;
                }, []);
                setMoveTypes(getMove);
            }
        }
        fetchMoves();
    }, [data?.moves]);

    const movesSets = data?.moves?.map((move, index) => {
        const getMoveTypes = moveTypes[move.move.name] || [];
        return(       
            <li className="pokedex__moves--item" key={index}>
                <p className="pokedex__moves--item-move">{move.move.name}</p>
                <p className="pokedex__moves--item-number">{move.version_group_details[0].level_learned_at}</p>
                <p className={`pokedex__moves--item-type pokedex__info--type-${getMoveTypes.type?.name}`}>{getMoveTypes.type?.name}</p>
            </li>
        );
    } 
    );
    const descriptions = () => {
        if(species?.flavor_text_entries){
            const englishDescription = species.flavor_text_entries.find(
                (description) => description.language.name === "en"
            );
            return englishDescription ? englishDescription.flavor_text.replace(/[\n\f]/g, " ")
            : "no description";
        }
    };
    return data && species ? (
        <section className="pokedex">
            <Search/>
            <div className="pokedex__wrapper">
                <div className="pokedex__info">
                    <figure className="pokedex__info--figure">
                        <img src={data?.sprites?.front_default} alt={data.name} className="pokedex__info--figure-image" />
                    </figure>
                    <article className="pokedex__info--wrapper">
                        <span className="pokedex__info--names">
                            <h1 className="pokedex__info--names-name">{data.name}</h1>
                            <p className="pokedex__info--names-japanese">
                                {
                                    species.names?.find(
                                        (name) => name.language.name === "ja-Hrkt"
                                    )?.name
                                }
                            </p>
                        </span>
                        <span className="pokedex__info--types">{typesSets}</span>
                        <p className="pokedex__info--description">
                            {descriptions()}
                        </p>
                    </article>
                </div>
                <div className="pokedex__stats">
                    <h2 className="pokedex__stats--title">
                        Stats
                    </h2>
                    <ul className="pokedex__stats--list">
                        {statsSets}
                    </ul>
                </div>
                <div className="pokedex__moves">
                    <h2 className="pokedex__moves--title">
                        Moves
                    </h2>
                    <ul className="pokedex__moves--list">
                        {movesSets}
                    </ul>
                </div>
            </div>
        </section>
    ) : 
    <>no pokemon whoomp whoomp</>;
}

export default Pokedex;