import { useEffect, useState } from "react";
import { useParams }  from "react-router-dom";

const getPokemonDetails = async (name) => {
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${name}`;
    const res = await fetch(pokemonUrl);
    const data = await res.json();
    console.log(data);
    return data;
}

export default function PokemonDetails(props) {
    const params = useParams();
    const [pokemon, setPokemon] = useState(null);
    
    useEffect(() => {
        try {
            getPokemonDetails(params.name).then(details => {
                setPokemon(details);
            });
        } catch (error) {
            throw new Error(error);
        }
    }, [])
    
    if (!pokemon) {
        return <>loading...</>
    }

    return (
        <>
            <h1>{params.name}</h1>
            <p>Height: {pokemon.height}m</p>
            <p>Weight: {pokemon.weight}kg</p>
        </>

    );
}