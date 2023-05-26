import React from 'react';
import "./stylingPokedex.css";
import bg from "../img/Background.png";

const Pokeinfo = ({ data }) => {
    console.log(data);
    return (
        <>
            {
                (!data) ? "" : (
                    <div id="card">
                        <p className="hp">
                            <span>ID: #00</span>
                            {data.id}
                        </p>
                        <div className='overlay'>
                            <img className="gbrPoke" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`} alt={data.name}/>
                            <img className="w-20" src={bg} alt="circle"/>
                        </div>
                        <h2 className="poke-name capitalize">{data.name}</h2>
                        <div className="types">
                            {
                                data.abilities.map(poke => {
                                    return (
                                        <>
                                            <div className="ability bg-orange-400 px-4 py-2 text-bold text-white capitalize">
                                                <h2 className='capitalize'>{poke.ability.name}</h2>
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </div>
                        <div className="stats">
                            {data.stats.map((poke, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <h3 className='capitalize'><span className='capital text-bold'>{poke.stat.name}</span>: <span>{poke.base_stat}</span></h3>
                                    </React.Fragment>
                                );
                            })}
                        </div>
                        {/* <h1 className='uppercase font-bold text-center'>{data.name}</h1>
                        <img className='w-15 m-auto' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`} alt="" />
                        <div className="m-auto flex justify-around items-center mt-4 capitalize">
                            {
                                data.abilities.map(poke => {
                                    return (
                                        <>
                                            <div className="bg-orange-400 text-white">
                                                <h2>{poke.ability.name}</h2>
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </div>
                        <div className="base-stat text-center capitalize">
                            {data.stats.map((poke, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <h3>{poke.stat.name} : {poke.base_stat}</h3>
                                    </React.Fragment>
                                );
                            })}
                        </div> */}

                    </div>
                )
            }
        </>
    )
}

export default Pokeinfo