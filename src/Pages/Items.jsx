import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import "../index.css";
import pokeball from "../img/pokeball.webp";

const Item = () => {
  const [itemData, setItemData] = useState(null);
  const [itemInput, setItemInput] = useState('');
  const [showNoDataMessage, setShowNoDataMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setItemInput(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (itemInput.trim() !== '') {
      fetchItemData();
    }
  };

  const fetchItemData = async () => {
    try {
      setShowNoDataMessage(false);
      setItemData(null);
      setLoading(true);
      const response = await axios.get(`https://pokeapi.co/api/v2/item/${itemInput}`);
      if (response.status === 200) {
        setItemData(response.data);
        setShowNoDataMessage(false);
      } else {
        setItemData(null);
        setShowNoDataMessage(true);
      }
    } catch (error) {
      console.log(error);
      setItemData(null);
      setShowNoDataMessage(true);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div id="background" >
      <div className="container mx-auto p-4 mt-16 md:mt-32">
        <Navbar />
        <div className='bg-white/[.06] shadow-2xl backdrop-blur rounded-md p-4 flex justify-around md:h-96'>
          <div className='flex items-center'>
            <div>
              <h1 className="text-4xl mb-4 font-bold text-white text-center md:text-left">Search All Items</h1>
              <h4 className="text-lg mb-4 text-white text-center md:text-left">You can search all the in-game items here</h4>
              <form className="relative" onSubmit={handleFormSubmit}>
                <input
                  type="text"
                  className="py-2 px-6 rounded-3xl w-full"
                  placeholder="Enter ID/Keyword"
                  value={itemInput}
                  onChange={handleInputChange}
                />
                <button
                  type="submit"
                  className="absolute right-0 bg-blue-500 text-white hover:bg-white hover:text-blue-500 font-bold px-4 py-2 rounded-3xl"
                >
                  Search
                </button>
              </form>
              <p className='mt-2 text-white text-center md:text-left'>*Use '-' instead of &lt;space&gt;. Type in lowercase*</p>
            </div>
          </div>
          <div className='hidden lg:flex items-center'>
            <img className='h-60' src={pokeball} alt="" />
          </div>
        </div>
        {loading && <p className='mt-8 text-4xl text-white text-center'>Loading...</p>}
        {showNoDataMessage && <p className="mt-8 text-4xl text-white text-center">Oops.. No data found</p>}
        {itemData && (
          <div className="mt-4 md:grid md:gap-4 md:grid-cols-7 md:flex md:items-center text-white">
            <div className='md:col-span-3 h-full'>
              <div className='h-full capitalize bg-black/[.6] backdrop-blur-sm p-4 rounded-md flex flex-col items-center justify-center'>
                <h2 className="text-xl font-bold mb-2 capitalize">{itemData.name}</h2>
                {itemData.sprites.default && (
                  <img className="w-24 mb-2 bg-white/[.9] rounded-md active:scale-110 ease-in duration-300" src={itemData.sprites.default} alt={itemData.name} />
                )}
                <p>
                  <span className="font-bold">Category:</span> {itemData.category.name}
                </p>
                <p>
                  <span className="font-bold">Cost:</span> {itemData.cost} P
                </p>
              </div>
            </div>
            <div className='bg-black/[.8] backdrop-blur-sm h-full p-4 mt-4 md:mt-0 rounded-md md:col-span-4 flex items-center'>
              {itemData.effect_entries[0] && (
                <p>
                  {itemData.effect_entries[0].effect}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Item;
