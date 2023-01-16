import {React, useState, useEffect} from 'react';
import { Navigation } from './components/Navigation';
import { PokemonCard } from './components/PokemonCard';

const LIMIT = 150;
const pokeApi = `https://pokeapi.co/api/v2/pokemon/?limit=${LIMIT}`;

const getPokemon = async () => {
  try {
  const res = await fetch(pokeApi);
  const data = await res.json();
  return data.results;
  } catch (error) {
    throw new Error(error);
  }
}

const pokemans = getPokemon();

function App() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
  getPokemon().then(items => {
    setPokemon(items);
  }).catch((error) => {
    throw new Error(error);
  });
  }, []);

  return (
    <div data-testid="app">
      <Navigation />
      <h1>Pokemon should appear here</h1>
      {pokemon.map((item, index) => {
        return <PokemonCard key={index} pokemonObject={item}/>
      })}
    </div>
  );
}

export { App };
