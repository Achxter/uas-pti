import React, { useState, useEffect } from 'react';
import Card from '../Components/Card';
import Pokeinfo from '../Components/Pokeinfo';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import "../index.css"

const Main = () => {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=6");
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [pokeDex, setPokeDex] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await axios.get(url);
      setNextUrl(response.data.next);
      setPrevUrl(response.data.previous);
      const pokemonResults = response.data.results;
      const pokemonData = await Promise.all(
        pokemonResults.map(async (item) => {
          const result = await axios.get(item.url);
          return result.data;
        })
      );
      setPokeData([]);
      setPokeData((prevState) => [...prevState, ...pokemonData]);
      setLoading(false);
    };

    fetchData();
  }, [url]);

  const handleNextClick = () => {
    setPokeData([]);
    setUrl(nextUrl);
  };

  const handlePrevClick = () => {
    setPokeData([]);
    setUrl(prevUrl);
  };

  return (
    <div>
      <Navbar />
      <div id="background" className='overflow-x-hidden'>
        <div className="md:grid grid-cols-2 gap-2 mt-20 md:mt-32 lg:mt-24">
          <div className="md:fixed mx-auto md:w-1/2">
            <Pokeinfo data={pokeDex} />
          </div>
          <div></div>
          <div className="">
            <div className='grid gap-4 mt-4'>
              <Card pokemon={pokeData} loading={loading} infoPokemon={poke => setPokeDex(poke)} />
            </div>
            <div className="text-white my-2 grid grid-cols-2 gap-8">
              {prevUrl && (
                <button onClick={handlePrevClick}>
                  <div class="svg-wrapper-2 px-4 py-2">
                    <span>Prev</span>
                    <div class="svg-wrapper">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M5.25 6.31v9.44a.75.75 0 01-1.5 0V4.5a.75.75 0 01.75-.75h11.25a.75.75 0 010 1.5H6.31l13.72 13.72a.75.75 0 11-1.06 1.06L5.25 6.31z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </button>
              )}
              {nextUrl && (
                <button onClick={handleNextClick}>
                  <div class="svg-wrapper-1 px-4 py-2">
                    <div class="svg-wrapper">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M8.25 3.75H19.5a.75.75 0 01.75.75v11.25a.75.75 0 01-1.5 0V6.31L5.03 20.03a.75.75 0 01-1.06-1.06L17.69 5.25H8.25a.75.75 0 010-1.5z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Next</span>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div >
    </div>
  );
};

export default Main;
