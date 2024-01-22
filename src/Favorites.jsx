import { useEffect, useState } from "react";
import PokemonCard from "./pokemonCard";
import "bulma/css/bulma.min.css";

function GetFavoris() {
    const token = localStorage.getItem('token');
    const [pokemonData, setPokemonData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`https://pokemonsapi.herokuapp.com/favorites`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setPokemonData(data);
                }
            } catch (error) {
                console.error("Error fetching pokemon data:", error);
            }
        }
        fetchData();
    }, [token]);

    return (
        <div className="container">
            <h1 className="title has-text-centered">Favorites Pokemon</h1>
            <div className="columns is-multiline">
                {pokemonData && pokemonData.map((pokemon) => (
                    <div key={pokemon.pokemonId} className="column is-6-mobile is-4-tablet is-2-desktop">
                        <PokemonCard pokemon={pokemon} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GetFavoris;
