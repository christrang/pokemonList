import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import 'bulma/css/bulma.min.css';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [species, setSpecies] = useState([]);
  const [habitats, setHabitats] = useState([]);
  const [pokeTypes, setPokeTypes] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState('');
  const [selectedHabitat, setSelectedHabitat] = useState('');
  const [selectedPokeType, setSelectedPokeType] = useState('');

  useEffect(() => {
    async function fetchData() {
      async function getPokemon() {
        try {
          const response = await fetch('https://pokemonsapi.herokuapp.com/pokemons');
          if (response.ok) {
            const data = await response.json();
            setPokemon(data);
          }
        } catch (error) {
          console.error('Error fetching pokemon data:', error);
        }
      }
      await getPokemon();

      async function getSpecies() {
        try {
          const response = await fetch('https://pokemonsapi.herokuapp.com/species');
          if (response.ok) {
            const data = await response.json();
            setSpecies(data);
          }
        } catch (error) {
          console.error('Error fetching species data:', error);
        }
      }
      await getSpecies();

      async function getHabitats() {
        try {
          const response = await fetch('https://pokemonsapi.herokuapp.com/habitats');
          if (response.ok) {
            const data = await response.json();
            setHabitats(data);
          }
        } catch (error) {
          console.error('Error fetching habitat data:', error);
        }
      }
      await getHabitats();

      async function getPokeTypes() {
        try {
          const response = await fetch('https://pokemonsapi.herokuapp.com/poketypes');
          if (response.ok) {
            const data = await response.json();
            setPokeTypes(data);
          }
        } catch (error) {
          console.error('Error fetching poke types data:', error);
        }
      }
      await getPokeTypes();
    }
    fetchData();
  }, []);

  function PokemonCard({ pokemon }) {
    const cardStyle = {
      backgroundColor: pokemon.color,
    };
    return (
      <Link to={`/pokemon/${pokemon.pokemonId}`}>
      <div className="card" style={cardStyle}>
          <div className="card-image">
              <figure className="image">
                  <img src={pokemon.thumbURL} alt={pokemon.name} />
              </figure>
          </div>
          <div className="card-content">
              <p className="title is-4">{pokemon.name}</p>
              <p className="subtitle is-6"><b>Species:</b> {pokemon.species.name}<br></br>
              <b>Habitat:</b> {pokemon.habitat.name}<br></br>
              <b>Types:</b> {pokemon.poketypes.map((type, index) => (
                <span key={type.poketypeId}>
                  {type.name}
                  {index !== pokemon.poketypes.length - 1 && ', '}
                </span>
                ))}</p> 
          </div>
      </div>
  </Link>
    );
  }
  PokemonCard.propTypes = {
    pokemon: PropTypes.shape({
      pokemonId: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      thumbURL: PropTypes.string.isRequired,
      habitat: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      species: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      poketypes: PropTypes.arrayOf(
        PropTypes.shape({
          poketypeId: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
        })
      ).isRequired,
      color: PropTypes.string.isRequired,
    }).isRequired,
  };
  
  function filteredPokemons(pokemons, selectedSpecies, selectedHabitat, selectedPokeType) {
    return pokemons.filter((pokemon) => {
      const speciesFilter = !selectedSpecies || pokemon.species.name === selectedSpecies;
      const habitatFilter = !selectedHabitat || pokemon.habitat.name === selectedHabitat;
      const pokeTypeFilter = !selectedPokeType || pokemon.poketypes.some((type) => type.name === selectedPokeType);
      return speciesFilter && habitatFilter && pokeTypeFilter;
    });
  }
  const filteredPokemonList = filteredPokemons(pokemon, selectedSpecies, selectedHabitat, selectedPokeType);
  
  

  return (
    <div className="App">
      <h1 className="title has-text-centered">Pokemon</h1>
      <div className="section">
        <div className="container">
          <div className="columns">
            <div className="column">
              <div className="field">
                <label className="label is-large">Species:</label>
                <div className="control">
                  <div className="select is-large">
                    <select onChange={(e) => setSelectedSpecies(e.target.value)}>
                      <option value="">All</option>
                      {species.map((s) => (
                        <option key={s.speciesId} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-large">Habitat:</label>
                <div className="control">
                  <div className="select is-large">
                    <select onChange={(e) => setSelectedHabitat(e.target.value)}>
                      <option value="">All</option>
                      {habitats.map((h) => (
                        <option key={h.habitatId} value={h.name}>
                          {h.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-large">PokeType:</label>
                <div className="control">
                  <div className="select is-large">
                    <select onChange={(e) => setSelectedPokeType(e.target.value)}>
                      <option value="">All</option>
                      {pokeTypes.map((pt) => (
                        <option key={pt.pokeTypeId} value={pt.name}>
                          {pt.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='section'>
        <div className="pokemon-list columns is-multiline">
            {filteredPokemonList.map((pokemon) => (
            <div key={pokemon.pokemonId} className="column is-6-mobile is-4-tablet is-2-desktop">
              <PokemonCard pokemon={pokemon} />
            </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
