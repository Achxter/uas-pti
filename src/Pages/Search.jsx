import React, { useState } from 'react';
import axios from 'axios';

const Search = () => {
    const [pokemonData, setPokemonData] = useState(null);
    const [pokemonInput, setPokemonInput] = useState('');
    const [showNoDataMessage, setShowNoDataMessage] = useState(false);

    const handleInputChange = (event) => {
        setPokemonInput(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (pokemonInput.trim() !== '') {
            fetchPokemonData();
        }
    };

    const fetchPokemonData = async () => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonInput}`);
            if (response.status === 200) {
                setPokemonData(response.data);
                setShowNoDataMessage(false);
            } else {
                setPokemonData(null);
                setShowNoDataMessage(true);
            }
        } catch (error) {
            console.log(error);
            setPokemonData(null);
            setShowNoDataMessage(true);
        }
    };

    return (
        <div className="container mx-auto p-4 mt-24">
            <h1 className="text-2xl font-bold mb-4">Search Pokémon by Name or ID</h1>
            <form onSubmit={handleFormSubmit} className="mb-4">
                <input
                    type="text"
                    placeholder="Enter Pokémon name or ID"
                    value={pokemonInput}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded p-2 mr-2"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Search
                </button>
            </form>
            {showNoDataMessage && <p className="text-red-500">Oops.. No data found</p>}
            {pokemonData && (
                <div className="border border-gray-300 rounded p-4 capitalize">
                    <h2 className="text-xl font-bold mb-2">{pokemonData.name}</h2>
                    <img src={pokemonData.sprites.front_default} alt={pokemonData.name} className="mb-2" />
                    <p>
                        <span className="font-bold">Type:</span> {pokemonData.types.map((type) => type.type.name).join(', ')}
                    </p>
                    <span className="font-bold">Stats:</span> {pokemonData.stats.map((stat) => <h3>{stat.stat.name} : {stat.base_stat}</h3>)}
                    <p>
                        <span className="font-bold">Abilities:</span> {pokemonData.abilities.map((ability) => ability.ability.name).join(', ')}
                    </p>
                </div>
            )}
        </div>
    );
};

export default Search;
