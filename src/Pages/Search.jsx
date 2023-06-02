import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import "../index.css";
import detective from "../img/detective.webp"
import pokeball2 from "../img/pokeball2.webp";
import putih from "../img/Backgroundwhite.webp";


const Search = () => {
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonInput, setPokemonInput] = useState('');
  const [showNoDataMessage, setShowNoDataMessage] = useState(false);
  const [loading, setLoading] = useState(false);

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
      setPokemonData(null);
      setShowNoDataMessage(false);
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };
  return (
    <div id="background">
      <div className="container mx-auto p-4 mt-16 md:mt-24">
        <Navbar />
        <div className='bg-white/[.06] backdrop-blur shadow-2xl rounded-md p-4 mt-4 flex justify-around md:h-48  '>
          <div className="flex items-center">
            <div className=''>
              <h1 className="text-3xl mb-3 font-bold text-white text-center md:text-left">Search Your Pokémon</h1>
              <h4 className="text-base mb-4 text-white text-center md:text-left">You can search the pokemon by their name</h4>
              <form className='relative' onSubmit={handleFormSubmit}>
                <input
                  type="text"
                  className="py-2 px-6 rounded-3xl w-full"
                  placeholder="Enter ID/Keyword"
                  value={pokemonInput}
                  onChange={handleInputChange}
                />
                <button
                  type="submit"
                  className="absolute right-0 bg-blue-500 text-white hover:bg-white hover:text-blue-500 font-bold px-4 py-2 rounded-3xl"
                >
                  Search
                </button>
              </form>
              <p className='mt-2 text-sm text-white text-center md:text-left'>*Use '-' instead of &lt;space&gt;. Type in lowercase*</p>
            </div>
          </div>
          <div className='hidden lg:flex items-center'>
            <img className='h-40' src={detective} alt="" />
          </div>
        </div>
        {loading &&
          <div className='mt-8 flex justify-center items-center'>
            <img id='pokeload' className='w-20 mr-2 rounded-full animate-spin' src={pokeball2} alt="" />
            <p className='textload text-4xl font-bold text-black text-center ml-2'>Loading...</p>
          </div>
        }
        {showNoDataMessage &&
          <div className='mt-24'>
            <div className='flex justify-center'>
              <p className='textload text-7xl font-bold'>4</p>
              <img id='pokebob' className='w-20 mx-2 rounded-full animate-bounce' src={pokeball2} alt="" />
              <p className='textload text-7xl font-bold'>4</p>
            </div>
            <p className='textload text-4xl font-bold text-black text-center ml-2'>Error: data not found</p>
          </div>
        }
        {pokemonData && (
          <div className="mt-4 p-4 pt-0 md:pt-4 capitalize w-full rounded-md grid !items-start !max-w-none gap-4 bg-white/[.06] backdrop-blur text-white">
            <div className='relative col-span-1'>
              <img id='circlet' className="absolute w-1/2 mx-auto" src={putih} alt="" />
              <img
                id='gbrPoke'
                className="w-1/3 mx-auto md:mt-2"
                src={pokemonData.sprites.other['official-artwork'].front_default}
                alt={pokemonData.name}
              />
            </div>
            <div>
              <p>#00{pokemonData.id}</p>
              <div className="card-inner md:p-0 h-full">
                <h2 className="text-2xl font-bold">{pokemonData.name}</h2>
                <p>
                  <span className="font-bold">Type:</span>{' '}
                  {pokemonData.types.map((type) => type.type.name).join(', ')}
                </p>
                <div className="mt-2">
                  {pokemonData.stats.map((stat) => (
                    <h3>
                      <span className="font-semibold">{stat.stat.name}</span> : {stat.base_stat}
                    </h3>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    //  </div >
  );
};


export default Search;
