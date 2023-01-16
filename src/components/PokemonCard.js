import React from 'react';
import { Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const getSinglePokemon = async (url) => {

  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
      throw new Error(error);
  }
}

function PokemonCard(props) {
  const [singlePokemonInfo, setSinglePokemonInfo] = useState();
  const pokemon = props.pokemonObject;

  useEffect(() => {
      getSinglePokemon(pokemon.url).then((pokemonInfo) => {
        setSinglePokemonInfo(pokemonInfo);
      }).catch( error => {throw new Error(error)})
  })
  
  if (singlePokemonInfo) {
  return (
    <Card>
      <Card.Img src={singlePokemonInfo.sprites.front_default}></Card.Img>
      <Card.Title>{singlePokemonInfo.name}</Card.Title>
      {singlePokemonInfo.abilities.map((ability) => {
        return (<Card.Text>{ability.ability.name}</Card.Text>)
      })}
    </Card>
  );
}
}

export { PokemonCard };
