import React from 'react';
import "./stylingPokedex.css";
import bg from "../img/Background.webp";

const Pokeinfo = ({ data }) => {
  console.log(data);
  return (
    <>
      {
        (!data) ? "" : (
          <div id="pokeCard" className='m-4 p-4 !border-0 bg-white rounded-md'>
            <div className='relative'>
              <img className="absolute w-3/4 md:w-3/4 lg:w-1/2 mx-auto" id='circlet' src={bg} alt="" />
              <img className="w-1/2 mt-2 lg:w-1/3 xl:mt-4 absolute mx-auto" id="gbrPoke" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`} alt={data.name} />
            </div>
            <div className="flex">
              <p className='abilities px-3 py-1 text-white rounded-3xl'>ID: #00{data.id}</p>
            </div>
            <h2 className="text-2xl mt-48 xl:mt-72 text-center font-extrabold capitalize">{data.name}</h2>
            <div className="flex justify-around m-2">
              {
                data.abilities.map(poke => {
                  return (
                    <>
                      <div className="abilities capitalize px-3 py-1 rounded-3xl">
                        <h1 className='text-xl text-white capitalize'>{poke.ability.name}</h1>
                      </div>
                    </>
                  )
                })
              }
            </div>
            <div className="!grid grid-cols-2 gap-2">
              {data.stats.map((poke) => {
                return (
                  // <React.Fragment key={index}>
                  <p className='capitalize text-center'><span className='font-bold'>{poke.stat.name}</span>: <span>{poke.base_stat}</span></p>
                  // </React.Fragment>
                );
              })}
            </div>
          </div>
        )
      }
    </>
  )
}

export default Pokeinfo