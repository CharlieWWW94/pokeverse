import React from 'react';

function PokemonCard(props) {
  const singlePokemon = props.pokemonObject;
  return (
    <div>
        <h3>{singlePokemon.name}</h3>
        <p>{singlePokemon.url}</p>
    </div>
  );
}

export { PokemonCard };
