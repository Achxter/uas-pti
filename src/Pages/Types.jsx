import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import "../index.css"
import bg from "../img/dungeon.webp"

const PokeAPI = () => {
  const [type, setType] = useState('');
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const types = [
    'normal', 'fighting', 'flying', 'poison', 'ground',
    'rock', 'bug', 'ghost', 'steel', 'fire', 'water',
    'grass', 'electric', 'psychic', 'ice', 'dragon',
    'dark', 'fairy', 'unknown', 'shadow'
  ]

  const fetchPokemonByType = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
      const updatedPokemonList = await Promise.all(
        response.data.pokemon.map(async (pokemon) => {
          const pokemonResponse = await axios.get(pokemon.pokemon.url);
          return {
            name: pokemon.pokemon.name,
            spriteUrl: pokemonResponse.data.sprites.front_default,
          };
        })
      );
      setPokemonList(updatedPokemonList);
      //   console.log(response.data);
    } catch (error) {
      console.error(error);
      setPokemonList([]);
      setError('Oops... No data found');
    } finally {
      setLoading(false);
    }
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchPokemonByType();
  };

  return (
    <div id="background">
      <div className="container mx-auto p-4 mt-16 md:mt-32">
        <Navbar />
        <div className='bg-white/[.06] shadow-2xl backdrop-blur rounded-md p-4 flex justify-around md:h-96'>
          <div className='flex items-center'>
            <div className=''>
              <h1 className="text-4xl mb-4 font-bold text-white text-center md:text-left">Search Pokémon by Type</h1>
              <h4 className="text-lg mb-4 text-white text-center md:text-left">You can search the pokemon based on their types</h4>
              <form className='relative md:w-3/4' onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="py-2 px-6 rounded-3xl w-full"
                  placeholder="Enter ID/Keyword"
                  value={type}
                  onChange={handleTypeChange}
                />
                <button
                  type="submit"
                  className="absolute right-0 bg-blue-500 text-white hover:bg-white hover:text-blue-500 font-bold px-4 py-2 rounded-3xl"
                >
                  Search
                </button>
              </form>
              <p className='mt-2 text-white text-center md:text-left'>*Use '-' instead of &lt;space&gt;. Type in lowercase*</p>
            </div>
          </div>
          <div className='hidden lg:flex items-center'>
            <img className='h-40' src={bg} alt="" />
          </div>
        </div>
        <div className='mt-2 flex justify-center'>
          <ul className='flex flex-row gap-4 overflow-x-scroll'>
            {
              types.map((item) => (
                <li className='mb-2 px-4 py-2 bg-white rounded-full text-black'>
                  {item}
                </li>
              ))
            }
          </ul>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
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
    //   <div className="container mx-auto p-4 mt-24">
    //     <Navbar />
    //     <h1 className="text-2xl font-bold mb-4">Search Pokémon by Type</h1>
    //     <form onSubmit={handleSubmit}>
    //       {/* <label className="mr-2">Type:</label> */}
    //       <input
    //         type="text"
    //         className="border border-gray-400 px-2 py-1 rounded"
    //         placeholder="Enter Type ID or Name"
    //         value={type}
    //         onChange={handleTypeChange}
    //       />
    //       <button
    //         type="submit"
    //         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 ml-2 rounded"
    //       >
    //         Search
    //       </button>
    //     </form>

    //     {loading && <p>Loading...</p>}
    //     {error && <p className="text-red-500">{error}</p>}

    //     {pokemonList.length > 0 && (
    //       <ul className="mt-4">
    //         {pokemonList.map((pokemon) => (
    //           <li className='flex' key={pokemon.name}>
    //             {pokemon.name}
    //             {pokemon.spriteUrl && (
    //               <img src={pokemon.spriteUrl} alt={pokemon.name} className="ml-2 h-6" />
    //             )}
    //           </li>
    //         ))}
    //       </ul>
    //     )}
    //   </div>
    // </div>
  );
};

export default PokeAPI;
