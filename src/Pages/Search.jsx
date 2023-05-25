import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import "../index.css"

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
        <div id="background">
            <div className="container mx-auto p-4 mt-16 md:mt-24">
                <Navbar />
                <div className="">
                    <div className='bg-slate-100/[.8] rounded-md p-4'>
                        <h1 className="text-2xl font-bold mb-4">Search Pokémon by Name or ID</h1>
                        <form onSubmit={handleFormSubmit} className="">
                            <input
                                type="text"
                                placeholder="Enter Pokémon name or ID"
                                value={pokemonInput}
                                onChange={handleInputChange}
                                className="p-2 rounded text-center"
                            />
                            <button type="submit" className="bg-zinc-950 hover:bg-zinc-800 text-white px-4 py-2 ml-2 rounded">
                                Search
                            </button>
                            <p className='mt-2 text-slate-600 text-sm'>*Use - instead of space. Type in lowercase*</p>
                        </form>
                    </div>
                </div>
                {showNoDataMessage && <p className="text-red-500">Oops.. No data found</p>}
                {pokemonData && (
                    <div className="capitalize md:grid md:gap-4 md:grid-cols-7 md:flex md:items-center">
                        <div className="mt-4 col-span-3 h-full">
                            <div className="card-inner h-full bg-black/[.6] p-4 rounded-md text-white flex flex-col justify-center items-center">
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
                {/* </form> */}
            </div>
        </div >
        // <div id="background">
        //     <div className="mx-auto md:px-20 p-4 mt-28">
        //         <Navbar />
        //         <h1 className="text-2xl font-bold mb-4">Search Pokémon by Name or ID</h1>
        //         <form onSubmit={handleFormSubmit} className="mb-4">
        //             <input
        //                 type="text"
        //                 placeholder="Enter Pokémon name or ID"
        //                 value={pokemonInput}
        //                 onChange={handleInputChange}
        //                 className="border border-gray-300 rounded p-2 mr-2"
        //             />
        //             <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        //                 Search
        //             </button>
        //             {showNoDataMessage && <p className="text-red-500">Oops.. No data found</p>}
        //             {pokemonData && (
        //                 <div className="capitalize md:grid md:gap-4 md:grid-cols-7 md:flex md:items-center">
        //                     <div className="card col-span-3">
        //                         <div className="card-inner bg-black/[.6] p-4 rounded-md text-white">
        //                             <h2 className="text-2xl font-bold">{pokemonData.name}</h2>
        //                             <p>
        //                                 <span className="font-bold">Type:</span> {pokemonData.types.map((type) => type.type.name).join(', ')}
        //                             </p>
        //                             <div className="mt-2">
        //                                 {pokemonData.stats.map((stat) => <h3><span className='font-semibold'>{stat.stat.name}</span> : {stat.base_stat}</h3>)}
        //                             </div>
        //                         </div>
        //                     </div>
        //                     <img className="h-80 mt-2 mx-auto col-span-4" src={pokemonData.sprites.other.dream_world.front_default} alt={pokemonData.name} />
        //                     {/* <span className="font-bold">Stats:</span>  */}
        //                     {/* <p>
        //                 <span className="font-bold">Abilities:</span> {pokemonData.abilities.map((ability) => ability.ability.name).join(', ')}
        //             </p> */}
        //                 </div>
        //             )}
        //         </form>
        //     </div>
        // </div>
    );
};


export default Search;
