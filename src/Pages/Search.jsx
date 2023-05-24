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
        <div className="mx-auto md:px-20 p-4 mt-28">
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
            {showNoDataMessage && <p className="text-red-500">Oops.. No data found</p>}
            {pokemonData && (
                <div className="capitalize md:grid md:gap-4 md:grid-cols-7 md:flex md:items-center">
                    <div className="card col-span-3">
                        <div className="card-inner bg-black/[.6] p-4 rounded-md text-white">
                            <h2 className="text-2xl font-bold">{pokemonData.name}</h2>
                            <p>
                                <span className="font-bold">Type:</span> {pokemonData.types.map((type) => type.type.name).join(', ')}
                            </p>
                            <div className="mt-2">
                                {pokemonData.stats.map((stat) => <h3><span className='font-semibold'>{stat.stat.name}</span> : {stat.base_stat}</h3>)}
                            </div>
                        </div>
                    </div>
                    <img className="h-80 mt-2 mx-auto col-span-4" src={pokemonData.sprites.other.dream_world.front_default} alt={pokemonData.name} />
                    {/* <span className="font-bold">Stats:</span>  */}
                    {/* <p>
                        <span className="font-bold">Abilities:</span> {pokemonData.abilities.map((ability) => ability.ability.name).join(', ')}
                    </p> */}
                </div>
            )}
            </form>
        </div>
    );
};

export default Search;
