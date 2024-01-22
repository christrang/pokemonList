import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PokemonCard from "./pokemonCard";
import "bulma/css/bulma.min.css";

function DetailsPokemon() {
    const { id } = useParams();
    const [pokemonData, setPokemonData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`https://pokemonsapi.herokuapp.com/pokemon?pokemonId=${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setPokemonData(data);
                }
            } catch (error) {
                console.error("Error fetching pokemon data:", error);
            }
        }
        fetchData();
    }, [id]);

    return (
        <div className="has-text-centered">
            <h1 className="title">Details Pokemon</h1>
            {pokemonData && (
                <div>
                    <img src={pokemonData.thumbURL} alt={pokemonData.name}/>
                    <p><b>Name: </b> {pokemonData.name}</p>
                    <p><b>HP: </b> {pokemonData.hp}</p>
                    <p><b>Attack: </b> {pokemonData.attack}</p>
                    <p><b>Defense: </b> {pokemonData.defense}</p>
                    <p><b>Height: </b>{pokemonData.height}</p>
                    <p><b>Special Attack: </b>{pokemonData.specialattack}</p>
                    <p><b>Special Defense: </b>{pokemonData.specialdefense}</p>
                    <p><b>Speed: </b>{pokemonData.speed}</p>
                    <p><b>Weight: </b>{pokemonData.weight}</p>
                    <audio controls>
                        <source src={pokemonData.cry} type="audio/ogg" />
                    </audio>
                    <p><b>Habitat: </b>{pokemonData.habitat.name}</p>
                    <p><b>Species: </b>{pokemonData.species.name}</p>
                    <p><b>Types: </b>{pokemonData.poketypes.map((type) => type.name).join("/ ")}</p>
                    {pokemonData.evolution && (
                        <div className="section">
                            <h2 className="subtitle">Evolution</h2>
                            <div className="pokemon-list columns is-multiline">
                                <PokemonCard pokemon={pokemonData.evolution} />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default DetailsPokemon;