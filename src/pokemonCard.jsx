import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function PokemonCard({ pokemon }) {
  const cardStyle = {
    backgroundColor: pokemon.color,
  };

  const renderEvolutions = (evolutions) => {
    if (!evolutions || evolutions.length === 0) {
      return ;
    }

    return (
      <div>
        {evolutions.map((evolution, index) => (
          <div key={index} className="card" style={cardStyle}>
            <div className="card-image">
              <figure className="image">
                <img src={evolution.thumbURL} alt={evolution.name} />
              </figure>
            </div>
            <div className="card-content">
              <p className="title is-4">{evolution.name}</p>
              <p className="subtitle is-6"><b>Species:</b> {pokemon.species.name}<br></br>
              <b>Habitat:</b> {pokemon.habitat.name}<br></br>
              <b>Types:</b> {pokemon.poketypes.map((type, index) => (
                <span key={type.poketypeId}>
                  {type.name}
                  {index !== pokemon.poketypes.length - 1 && ', '}
                </span>
                ))}</p> 
              {renderEvolutions(evolution.evolutions)}
            </div>
          </div>
        ))}
      </div>
    );
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
          <p className="subtitle is-6"><b>Species:</b> {pokemon.species.name}</p>
          <p className="subtitle is-6"><b>Habitat:</b> {pokemon.habitat.name}</p>
          <p className="subtitle is-6"><b>Types:</b> {pokemon.poketypes.map((type, index) => (
            <span key={type.poketypeId}>
              {type.name}
              {index !== pokemon.poketypes.length - 1 && ', '}
            </span>
          ))}
          </p>
          {renderEvolutions(pokemon.evolutions)}
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
    evolutions: PropTypes.arrayOf(PropTypes.object), // Array of evolutions
  }).isRequired,
};

export default PokemonCard;
