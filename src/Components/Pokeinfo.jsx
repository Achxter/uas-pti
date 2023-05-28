import React from 'react';
import "./stylingPokedex.css";
import bg from "../img/Background.webp";

const Pokeinfo = ({ data }) => {
  console.log(data);
  return (
    <>
      {
        (!data) ? "" : (
          <div id="card" className='p-4 rounded-md'>
            <p className="hp">
              <span>ID: #00</span>
              {data.id}
            </p>
            <div className='overlay'>
              <img className="circlet sm:w-80 sm:ml-40 md:ml-4 lg:ml-16 xl:ml-44" src={bg} alt="circle" />
              <img className="gbrPoke ease-in-out duration-700 m-4 mx-auto" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`} alt={data.name} />
            </div>
            <h2 className="text-2xl mt-4 md:mt-12 text-center font-extrabold capitalize">{data.name}</h2>
            <div className="flex justify-around m-4">
              {
                data.abilities.map(poke => {
                  return (
                    <>
                      <div className="ability px-4 py-2 text-bold text-white capitalize">
                        <h2 className='capitalize'>{poke.ability.name}</h2>
                      </div>
                    </>
                  )
                })
              }
            </div>
            <div className="!grid grid-cols-2 h-1/2 gap-x-2">
              {data.stats.map((poke) => {
                return (
                  // <React.Fragment key={index}>
                    <h3 className='capitalize'><span className='capital text-bold'>{poke.stat.name}</span>: <span>{poke.base_stat}</span></h3>
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