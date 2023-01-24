import {React, useState, useEffect} from 'react';
import { Navigation } from '../components/Navigation';
import { PokemonCard } from '../components/PokemonCard';
import { Row, Col } from 'react-bootstrap';
import { Form, InputGroup } from 'react-bootstrap';


export default function Home (props) {
    console.log(props.pokemon)

    const [pokemonToDisplay, setPokemonToDisplay] = useState(props.pokemon)

    useEffect(() => {
        setPokemonToDisplay(props.pokemon)
    }, [props.pokemon])

    const handleChange = (e) => {
        const value = e.target.value.toLowerCase();
        const relevantPokemon = props.pokemon.filter((onePokemon) => {
          return onePokemon.name.toLowerCase().includes(value) || onePokemon.name.toLowerCase() === value;
        })
        setPokemonToDisplay(relevantPokemon);
      }
      return (
        <>
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
        </>
      )
};

