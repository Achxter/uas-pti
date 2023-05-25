import React, { useState, useEffect } from 'react';
import Card from '../Components/Card';
import Pokeinfo from '../Components/Pokeinfo';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import "../index.css"

const Main = () => {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
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
    <>
      <div id="background">

      <div className="m-auto pt-28 flex shadow-md">
        <Navbar />
        <div className="flex basis-1/2 grid gap-8">
          <Card pokemon={pokeData} loading={loading} infoPokemon={poke => setPokeDex(poke)} />
          <div className="btn-group text-white flex justify-around">
            {prevUrl && (
              <button
              onClick={handlePrevClick}
              className="m-1 py-1.5 px-0 bg-orange-400 w-1/2 rounded-2xl"
              >
                Previous
              </button>
            )}
            {nextUrl && (
              <button
                onClick={handleNextClick}
                className="m-1 py-1.5 px-0 bg-orange-400 w-1/2 rounded-2xl"
                >
                Next
              </button>
            )}
          </div>
        </div>
        <div className="w-1/2">
          <Pokeinfo data={pokeDex} />
        </div>
      </div>
            </div>
    </>
  );
};

export default Main;
