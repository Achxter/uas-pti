import React from 'react'
import styles from "./SmallCard.module.css";

const Card = ({ pokemon, loading, infoPokemon }) => {
  return (
    <>
      {
        loading ? <h1>Loading</h1> : pokemon.map((item) => {
          return (
            <div className='cardingan'>
              <div key={item.id} onClick={() => infoPokemon(item)} className={`${styles["float-shadow"]} h-60 w-48 rounded-3xl p-2 bg-grayTheme shadow-2xl cursor-pointer`}>
                {/* <div className='fto'> */}
                <div className="h-full w-full ">
                  <div className="w-full h-3/5 flex items-center mt-2 justify-center">
                    <img
                      className="h-full"
                      src={item.sprites.front_default}
                      alt={item.name}
                      draggable="false"
                    ></img>
                  </div>
                  <div className="h-2/5 px-3 text-sm">
                    <div className="h-1/6 w-full "></div>
                    <div>
                      <h2 className="text-lg capitalize font-bold">{item.name}</h2>
                    </div>
                    <div className=" flex justify-between">
                      <p className="text-sm text-purpleTheme">#00{item.id}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            // </div>
          )
        })
      }
    </>
  )
}

export default Card