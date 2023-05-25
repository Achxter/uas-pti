import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import "../index.css"

const GachaGame = () => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchRandomPokemon = async () => {
    try {
      setLoading(true);
      setError('');
  
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000');
      const pokemonCount = response.data.results.length;
      const randomPokemonId = Math.floor(Math.random() * pokemonCount) + 1;
      const randomPokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`);
      const randomPokemon = randomPokemonResponse.data;
  
      setPokemon(randomPokemon);
    } catch (error) {
      console.error(error);
      setPokemon(null);
      setError('Oops... Failed to fetch a random Pokémon');
    } finally {
      setLoading(false);
    }
  };  

  const handleButtonClick = () => {
    fetchRandomPokemon();
  };

  return (
    <div id="background" >
      <div className="container mx-auto p-4 mt-24">
        <Navbar />
        <h1 className="text-2xl font-bold mb-4">Gacha Game</h1>
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleButtonClick}
          disabled={loading}
          >
          {loading ? 'Fetching Pokémon...' : 'Click to Get a Pokémon'}
        </button>
        {error && <p className="text-red-500">{error}</p>}
        {pokemon && (
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">{pokemon.name}</h2>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-32 h-32" />
          </div>
        )}
      </div>
    </div>
  );
};

export default GachaGame;
