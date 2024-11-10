import { useContext, useEffect } from "react";
import DataContext from "../../hooks/context/DataContext";
import Search from "../Search/Search";

function Pokedex(){
    const { data, id } = useContext(DataContext);

    useEffect(() => {
        if(id){
            return;
        }
    }, [id]);

    const typesSets = data?.types?.map(type => 
        <article className="pokedex__info--type" key={type.slot}>
            {type.type.name}
        </article>
    );
    const statsSets = data?.stats?.map((stat, index) => 
        <li className="pokedex__stats--item" key={index}>
            <p className="pokedex__stats--item-name">{stat.stat.name}</p>
            <p className="pokedex__stats--item-number">{stat.base_stat}</p>
        </li>
    );
    const movesSets = data?.moves?.map((move, index) => 
        <li className="pokedex__moves--item" key={index}>
            <p className="pokedex__moves--item-move">{move.move.name}</p>
            <p className="pokedex__moves--item-number">{move.version_group_details[0].level_learned_at}</p>
        </li>
    );
    return(
        <section className="pokedex">
            <Search/>
            <div className="pokedex__wrapper">
                <div className="pokedex__info">
                    <figure className="pokedex__info--figure">
                        <img src={data?.sprites?.front_default} alt={data.name} className="pokedex__info--figure-image" />
                    </figure>
                    <article className="pokedex__info--wrapper">
                        <h1 className="pokedex__info--name">{data.name}</h1>
                        <span className="pokedex__info--types">{typesSets}</span>
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
    );
}

export default Pokedex;