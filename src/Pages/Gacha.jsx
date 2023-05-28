import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import "../index.css"
import "../Pages/card/card.css";
import "../Pages/card/flip-transition.css";
import { CSSTransition } from 'react-transition-group';
import "../Pages/flippable-card.css";
import Pokecard from "../img/pokemon_card_backside_in_high_resolution_by_atomicmonkeytcg_dah43cy-pre.webp";

const GachaGame = () => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

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
    setShowFront(true);
    setShake(true);
    setTimeout(() => {
      setShake(false);
    }, 500);
  };
  const [showFront, setShowFront] = useState(true);
  function flipCard(v) {
    setShowFront((v) => !v);
  }


  return (
    <div id="background" >
      <Navbar />
      <div className="container mx-auto p-4 mt-16 md:mt-28 flex flex-col items-center">
        <div className='bg-slate-100/[.8] rounded-lg mt-4 p-4'>
          <h1 className="text-3xl font-bold mb-2 text-center">Gacha Game</h1>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-md text-white font-bold py-4 px-9 rounded-3xl"
            onClick={handleButtonClick}
            disabled={loading}
          >
            {loading ? 'Fetching Pokémon...' : 'Click to Get a Pokémon'}
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {pokemon && (
          <div className={`flippable-card-container ${shake ? 'shake' : ''}`}>
            <CSSTransition
              in={showFront}
              timeout={300}
              classNames='flipeu'
            >
              <div className="cardeu mt-12" onClick={flipCard}>
                <div className="cardeu-back">
                  <div className="kartu">
                    <div className='karts capitalize '>
                      <div className="alas ">
                        <div className='info'>
                          <h4 className='namaKartu mt-1 text-lg text-center'>{pokemon.name}</h4>
                        </div>
                        <div className='gambarPokemon mt-1'>
                          <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-40 h-40" />
                        </div>
                        <div className="dataPokemon mt-1">
                          {pokemon.stats.map((stat) => (
                            <div className='grid mt-2' key={stat.stat.name}>
                              <p><span className="font-bold">{stat.stat.name}</span>:&nbsp;{stat.base_stat}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="cardeu-front">
                  <img src={Pokecard} className="posisiFoto" alt="Poke-Card" />
                </div>
              </div>
            </CSSTransition>
          </div>
        )}
      </div >
    </div >
    // <div id="background" >
    //   <div className="container mx-auto p-4 mt-24">
    //     <Navbar />
    //     <div>
    //       <h1 className="text-2xl font-bold mb-4">Gacha Game</h1>
    //       <button
    //         type="button"
    //         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    //         onClick={handleButtonClick}
    //         disabled={loading}
    //       >
    //         {loading ? 'Fetching Pokémon...' : 'Click to Get a Pokémon'}
    //       </button>
    //     </div>
    //     {error && <p className="text-red-500">{error}</p>}
    //     {pokemon && (
    //       <div className="kartu mt-4">
    //         <div className='karts capitalize '>
    //           <div className="alas ">
    //             <div className='info'>
    //               <h4 className='namaKartu mt-1'>{pokemon.name}</h4>
    //             </div>
    //             <div className='gambarPokemon mt-1'>
    //                 <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-40 h-40" />
    //             </div>
    //             <div className="dataPokemon mt-1">
    //               {pokemon.stats.map((stat) => (
    //                 <div className='grid mt-2' key={stat.stat.name}>
    //                   <p><span className="font-bold">{stat.stat.name}</span>:&nbsp;{stat.base_stat}</p>
    //                 </div>
    //               ))}
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </div>
  );
};

export default GachaGame;
