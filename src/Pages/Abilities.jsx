import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import "../index.css"

const Abilities = () => {
    const [ability, setAbility] = useState('');
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [abilityName, setAbilityName] = useState('');
    const [abilityEffect, setAbilityEffect] = useState('');

    const fetchPokemonByAbility = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await axios.get(`https://pokeapi.co/api/v2/ability/${ability}`);
            const { name, effect_entries, pokemon } = response.data;
            const updatedPokemonList = await Promise.all(
                pokemon.map(async (pokemon) => {
                    const pokemonResponse = await axios.get(pokemon.pokemon.url);
                    return {
                        name: pokemon.pokemon.name,
                        spriteUrl: pokemonResponse.data.sprites.front_default,
                    };
                })
            );
            setAbilityName(name);
            setAbilityEffect(effect_entries[1].effect);
            setPokemonList(updatedPokemonList);
        } catch (error) {
            console.error(error);
            setAbilityName('');
            setAbilityEffect('');
            setPokemonList([]);
            setError('Oops... No data found');
        } finally {
            setLoading(false);
        }
    };

    const handleAbilityChange = (event) => {
        setAbility(event.target.value);
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        fetchPokemonByAbility();
    };

    return (
        <div id="background">

        <div className="container mx-auto p-4 mt-24">
            <Navbar />
            <h1 className="text-2xl font-bold mb-4">Search Pokémon by Ability</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="border border-gray-400 px-2 py-1 rounded"
                    placeholder="Enter Ability ID or Name"
                    value={ability}
                    onChange={handleAbilityChange}
                    />
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 ml-2 rounded"
                    >
                    Search
                </button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {abilityName && (
                <div className="mt-4">
                    <h2 className="text-xl font-bold mb-2 capitalize">{abilityName}</h2>
                    <p>
                        <span className="font-bold">Effect:</span> {abilityEffect}
                    </p>
                </div>
            )}

            {pokemonList.length > 0 && (
                <ul className="mt-4">
                    {pokemonList.map((pokemon) => (
                        <li className='flex' key={pokemon.name}>
                            {pokemon.spriteUrl && (
                                <img src={pokemon.spriteUrl} alt={pokemon.name} className="ml-2 h-6" />
                                )}
                            <p className="">{pokemon.name}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
            </div>
    );
};

export default Abilities;
