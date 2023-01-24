import {React, useState, useEffect} from 'react';
import { Navigation } from './components/Navigation';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import PokemonDetails from './routes/PokemonDetails';
const LIMIT = 150;
const pokeApi = `https://pokeapi.co/api/v2/pokemon/?limit=${LIMIT}`;

const getPokemon = async () => {
  try {
  const res = await fetch(pokeApi);
  const data = await res.json();
  console.log(data)
  return data.results;
  } catch (error) {
    throw new Error(error);
  }
}


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
    <BrowserRouter>
      <div data-testid="app">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home pokemon={pokemon}/>} />
          <Route path="/:name" element={<PokemonDetails />} />
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export { App };
