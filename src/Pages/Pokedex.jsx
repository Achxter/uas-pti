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
    <>
      <Navbar />
      <div id="background">
        <div className="m-auto pt-20 flex mt-10 shadow-md">
          <div className="flex basis-1/2 grid gap-8">
            <Card pokemon={pokeData} loading={loading} infoPokemon={poke => setPokeDex(poke)} />
          </div>
          <div className="">
            <div className='fixed right-2 md:right-4 w-1/2'>
              <Pokeinfo data={pokeDex} />
            </div>
            {/* <div className="relative"> */}
            {/* <div className="btn-group absolute bottom-0 start-1/2 text-white flex justify-around"> */}
            <div className="btn-group text-white flex bottom-0 font-semibold">
              {prevUrl && (
                <button
                  onClick={handlePrevClick}
                  // className="iniTombol mx-1 py-1.5 px-0 bg-orange-400 w-1/2 rounded-2xl"
                  className="Btnleft mr-4 p-auto"
                >
                  <div class="sign">
                    <span>&#8592;</span>
                  </div>
                  <div class="text">Previous</div>
                </button>
              )}
              {nextUrl && (
                <button
                  onClick={handleNextClick}
                  // className="Btn mx-1 py-1.5 px-0 bg-orange-400 w-1/2 rounded-2xl"
                  className="Btn ml-8"
                >
                  <div class="sign">
                    <span>&#8594;</span>
                  </div>
                  <div class="text">Next</div>
                </button>
              )}
            </div>
            {/* </div> */}
          </div>
        </div>
      </div >
    </>
  );
};

export default Main;
