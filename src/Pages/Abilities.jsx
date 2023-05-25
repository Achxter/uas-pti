import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import "../index.css";

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
            <div className="container mx-auto p-4 mt-16 md:mt-24">
                <Navbar />
                <div className='flex justify-center'>
                    <div className='bg-slate-100/[.8] rounded-md p-4 flex flex-col items-center md:w-1/2'>
                        <h1 className="text-2xl font-bold mb-4 text-center">Search Pokémon by Ability</h1>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                className="p-2 rounded text-center"
                                placeholder="Enter Ability ID or Name"
                                value={ability}
                                onChange={handleAbilityChange}
                            />
                            <button
                                type="submit"
                                className="bg-zinc-950 hover:bg-zinc-800 text-white px-4 py-2 ml-2 rounded"
                            >
                                Search
                            </button>
                            <p className='mt-2 text-slate-600 text-center text-sm'>*Use - instead of space. Type in lowercase*</p>
                        </form>
                    </div>
                </div>
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {abilityName && (
                    <div className="mt-4 md:mx-8 bg-slate-100/[.8] p-4 rounded-md text-center">
                        <h2 className="text-xl font-bold mb-2 capitalize">{abilityName}</h2>
                        {/* <span className="font-bold">Effect:</span> */}
                        {abilityEffect}
                    </div>
                )}

                {pokemonList.length > 0 && (
                    <ul className="mt-4 sm:grid md:grid sm:grid-cols-3 lg:grid-cols-5 gap-4 px-8">
                        {pokemonList.map((pokemon) => (
                            <li className='flex bg-slate-100 rounded-md capitalize items-center mt-4' key={pokemon.name}>
                                {pokemon.spriteUrl && (
                                    <img className="ml-2 h-20" src={pokemon.spriteUrl} alt={pokemon.name} />
                                )}
                                <p className="text-lg mx-auto">{pokemon.name}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
        // <div id="background">
        //     <div className="container mx-auto p-4 mt-24">
        //         <Navbar />
        //         <h1 className="text-2xl font-bold mb-4">Search Pokémon by Ability</h1>
        //         <form onSubmit={handleSubmit}>
        //             <input
        //                 type="text"
        //                 className="border border-gray-400 px-2 py-1 rounded"
        //                 placeholder="Enter Ability ID or Name"
        //                 value={ability}
        //                 onChange={handleAbilityChange}
        //             />
        //             <button
        //                 type="submit"
        //                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 ml-2 rounded"
        //             >
        //                 Search
        //             </button>
        //         </form>
                
        //         {loading && <p>Loading...</p>}
        //         {error && <p className="text-red-500">{error}</p>}

        //         {abilityName && (
        //             <div className="mt-4">
        //                 <h2 className="text-xl font-bold mb-2 capitalize">{abilityName}</h2>
        //                 <p>
        //                     <span className="font-bold">Effect:</span> {abilityEffect}
        //                 </p>
        //             </div>
        //         )}

        //         {pokemonList.length > 0 && (
        //             <ul className="mt-4">
        //                 {pokemonList.map((pokemon) => (
        //                     <li className='flex' key={pokemon.name}>
        //                         {pokemon.spriteUrl && (
        //                             <img src={pokemon.spriteUrl} alt={pokemon.name} className="ml-2 h-6" />
        //                         )}
        //                         <p className="">{pokemon.name}</p>
        //                     </li>
        //                 ))}
        //             </ul>
        //         )}
        //     </div>
        // </div>
    );
};

export default Abilities;
