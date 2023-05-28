import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import "../index.css";
import rame from "../img/rame.webp";
import pokeball2 from "../img/pokeball2.webp";

const Abilities = () => {
  const [ability, setAbility] = useState('');
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [abilityName, setAbilityName] = useState('');
  const [abilityEffect, setAbilityEffect] = useState('');

  const fetchPokemonByAbility = async () => {
    try {
      setAbilityName('');
      setAbilityEffect('');
      setPokemonList([]);
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
            id: pokemonResponse.data.id
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
      <div className="container mx-auto p-4 mt-16 md:mt-32">
        <Navbar />
        <div className='bg-white/[.06] shadow-2xl backdrop-blur rounded-md p-4 flex justify-around md:h-96'>
          <div className='flex items-center'>
            <div className=''>
              <h1 className="text-4xl mb-4 font-bold text-white text-center md:text-left">Search Pokémon by Ability</h1>
              <h4 className="text-lg mb-4 text-white text-center md:text-left">You can search the pokemon based on their abilities</h4>
              <form className='relative md:w-3/4' onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="py-2 px-6 rounded-3xl w-full focus:outline-none"
                  placeholder="Enter ID/Keyword"
                  value={ability}
                  onChange={handleAbilityChange}
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
            <img className='gbrRame h-80' src={rame} alt="" />
          </div>
        </div>
        {loading &&
          <div className='mt-4 flex justify-center items-center'>
            <img id='pokeload' className='w-20 mr-2 rounded-full animate-spin' src={pokeball2} alt="" />
            <p className='textload text-4xl font-bold text-black text-center ml-2'>Loading...</p>
          </div>
        }
        {error &&
          <div className='mt-4'>
            <div className='flex justify-center'>
              <p className='textload text-7xl font-bold'>4</p>
              <img id='pokebob' className='w-20 mx-2 rounded-full animate-bounce' src={pokeball2} alt="" />
              <p className='textload text-7xl font-bold'>4</p>
            </div>
            <p className='textload text-4xl font-bold text-black text-center ml-2'>Error: data not found</p>
          </div>
        }
        {abilityName && (
          <div className="mt-4 bg-slate-100/[.8] p-4 rounded-md text-center">
            <h2 className="text-xl font-bold mb-2 capitalize">{abilityName}</h2>
            {abilityEffect}
          </div>
        )}

        {pokemonList.length > 0 && (
          <ul className="mt-5 sm:grid md:grid sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {pokemonList.map((pokemon) => (
              <li className='flex bg-slate-100 rounded-xl mt-8 capitalize items-center mt-4' key={pokemon.name}>
                {pokemon.spriteUrl && (
                  <img className="ml-2 h-20" src={pokemon.spriteUrl} alt={pokemon.name} />
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

export default Abilities;
