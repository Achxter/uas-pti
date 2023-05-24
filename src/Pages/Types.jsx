import React, { useState } from 'react';
import axios from 'axios';

const PokeAPI = () => {
  const [type, setType] = useState('');
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
    <div className="container mx-auto p-4 mt-24">
      <h1 className="text-2xl font-bold mb-4">Search Pokémon by Type</h1>
      <form onSubmit={handleSubmit}>
        {/* <label className="mr-2">Type:</label> */}
        <input
          type="text"
          className="border border-gray-400 px-2 py-1 rounded"
          placeholder="Enter Type ID or Name"
          value={type}
          onChange={handleTypeChange}
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

      {pokemonList.length > 0 && (
        <ul className="mt-4">
          {pokemonList.map((pokemon) => (
            <li className='flex' key={pokemon.name}>
              {pokemon.name}
              {pokemon.spriteUrl && (
                <img src={pokemon.spriteUrl} alt={pokemon.name} className="ml-2 h-6" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PokeAPI;
