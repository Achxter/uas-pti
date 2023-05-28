import React from 'react';
import "./stylingPokedex.css";
import bg from "../img/Background.webp";

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
                            <img className="circlet w-20" src={bg} alt="circle" />
                            <img className="gbrPoke ease-in-out duration-700" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`} alt={data.name} />
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
                    </div>
                )
            }
        </>
    )
}

export default Pokeinfo