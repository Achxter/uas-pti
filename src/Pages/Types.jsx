import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import "../index.css";
import tipe from "../img/element.webp";

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
  ];

  const fetchPokemonByType = async (selectedType) => {
    try {
      setLoading(true);
      setError('');
      setPokemonList([]);
      const response = await axios.get(`https://pokeapi.co/api/v2/type/${selectedType}`);
      const updatedPokemonList = await Promise.all(
        response.data.pokemon.map(async (pokemon) => {
          const pokemonResponse = await axios.get(pokemon.pokemon.url);
          return {
            name: pokemon.pokemon.name,
            spriteUrl: pokemonResponse.data.sprites.front_default,
            id: pokemonResponse.data.id
          };
        })
      );
      setPokemonList(updatedPokemonList);
    } catch (error) {
      console.error(error);
      setPokemonList([]);
      setError('Oops... No data found');
    } finally {
      setLoading(false);
    }
  };

  const handleTypeChange = async (event, selectedType) => {
    setPokemonList([]);
    event.preventDefault();
    setType(selectedType);
    await fetchPokemonByType(selectedType);
  };

  const handleSubmit = (event) => {
    setPokemonList([]);
    event.preventDefault();
    fetchPokemonByType(type);
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
                  onChange={(event) => setType(event.target.value)}
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
            <img className='h-60' src={tipe} alt="" />
          </div>
        </div>
        <div className='mt-2 flex justify-center'>
          <ul className='flex flex-row gap-4 overflow-x-scroll'>
            {types.map((item) => (
              <li
                className='mb-2 px-4 py-2 hover:bg-white rounded-full font-bold hover:text-blue-500 cursor-pointer text-white bg-blue-500'
                onClick={(event) => handleTypeChange(event, item)}
                key={item}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        {loading && <p className='mt-8 text-4xl text-white text-center'>Loading...</p>}
        {error && <p className="mt-8 text-4xl text-white text-center">{error}</p>}
        {pokemonList.length > 0 && (
          <ul className="mt-5 sm:grid md:grid sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {pokemonList.map((pokemon) => (
              <li className='flex bg-slate-100 rounded-xl mt-8 capitalize items-center mt-4' key={pokemon.name}>
                {pokemon.spriteUrl && (
                  <img className="ml-2 h-25 " src={pokemon.spriteUrl} alt={pokemon.name} />
                )}
                <div className="px-4">
                  <p className="text-xl mx-auto font-medium">{pokemon.name}</p>
                  <p className="text-md mx-auto">#00{pokemon.id}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PokeAPI;
