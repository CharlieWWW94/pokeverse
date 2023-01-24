import {React, useState, useEffect} from 'react';
import { Navigation } from './components/Navigation';
import { PokemonCard } from './components/PokemonCard';
import { Row, Col } from 'react-bootstrap';
import { Form, InputGroup } from 'react-bootstrap';

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
  const [pokemonToDisplay, setPokemonToDisplay] = useState([]);
  
  useEffect(() => {
  getPokemon().then(items => {
    setPokemon(items);
    setPokemonToDisplay(items)
  }).catch((error) => {
    throw new Error(error);
  });
  }, []);

  
  const handleChange = (e) => {
    const value = e.target.value.toLowerCase();
    const relevantPokemon = pokemon.filter((onePokemon) => {
      return onePokemon.name.toLowerCase().includes(value) || onePokemon.name.toLowerCase() === value;
    })
    setPokemonToDisplay(relevantPokemon);
  }


  return (
    <div data-testid="app">
      <Navigation />
      <InputGroup className="mb-3">
        <Form.Control
          aria-label="Default"
          onChange={(event) => {handleChange(event)}}
        />
      </InputGroup>
      <h1>Pokemon should appear here</h1>
      <Row className='g-4'>
      {pokemonToDisplay.map((item, index) => {
        return (
        <Col xs={3}>
          <PokemonCard key={index} pokemonObject={item}/>
          </Col>
        )
      })}
      </Row>
    </div>
  );
}

export { App };
