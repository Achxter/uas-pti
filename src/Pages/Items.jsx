import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import "../index.css";
import bag from "../img/backpack.png";

const Item = () => {
  const [itemData, setItemData] = useState(null);
  const [itemInput, setItemInput] = useState('');
  const [showNoDataMessage, setShowNoDataMessage] = useState(false);

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
    }
  };


  return (
    <div id="background" >
      <div className="container mx-auto p-2 mt-16 md:mt-32 text-white">
        <Navbar />
        <div className='bg-black/[.6] p-4 rounded-md flex'>
          <div className='hidden md:flex items-center mr-4 hover:scale-110 hover:rotate-1 ease-in duration-300'>
            <img className='h-20' src={bag} alt="" />
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-4">Search Items</h1>
            <form onSubmit={handleFormSubmit} className="">
              <input
                type="text"
                placeholder="Enter Item ID or Name"
                value={itemInput}
                onChange={handleInputChange}
                className="rounded p-2 mr-2 md:mr-4 text-black"
              />
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Search
              </button>
              <p className='text-white mt-2 text-sm'>*Use - instead of space. Type in lowercase*</p>
            </form>
          </div>
        </div>
        {showNoDataMessage && <p className="text-red-500">Oops.. No data found</p>}
        {itemData && (
          <div className="mt-4 md:grid md:gap-4 md:grid-cols-7 md:flex md:items-center">
            <div className='md:col-span-3 h-full'>
              <div className='h-full capitalize bg-black/[.6] p-4 rounded-md flex flex-col items-center justify-center'>
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
            <div className='bg-black/[.8] h-full p-4 mt-4 md:mt-0 rounded-md md:col-span-4 flex items-center'>
              {itemData.effect_entries[0] && (
                <p>
                  {itemData.effect_entries[0].effect}
                </p>
              )}
            </div>
            {/* <p>
              <span className="font-bold">Attributes:</span>{' '}
              {itemData.attributes.map((attribute) => attribute.name).join(', ')}
            </p> */}
          </div>
        )}
      </div>
    </div>
    // <div id="background" >
    //   <div className="container mx-auto p-4 mt-24">
    //     <Navbar />
    //     <h1 className="text-2xl font-bold mb-4">Search Items</h1>
    //     <form onSubmit={handleFormSubmit} className="mb-4">
    //       <input
    //         type="text"
    //         placeholder="Enter Item ID or Name"
    //         value={itemInput}
    //         onChange={handleInputChange}
    //         className="border border-gray-300 rounded p-2 mr-2"
    //       />
    //       <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
    //         Search
    //       </button>
    //     </form>
    //     {showNoDataMessage && <p className="text-red-500">Oops.. No data found</p>}
    //     {itemData && (
    //       <div className="border border-gray-300 rounded p-4">
    //         <h2 className="text-xl font-bold mb-2">{itemData.name}</h2>
    //         {itemData.sprites.default && (
    //           <img src={itemData.sprites.default} alt={itemData.name} className="mb-2" />
    //         )}
    //         <p>
    //           <span className="font-bold">Category:</span> {itemData.category.name}
    //         </p>
    //         <p>
    //           <span className="font-bold">Cost:</span> {itemData.cost} P
    //         </p>
    //         <p>
    //           <span className="font-bold">Attributes:</span>{' '}
    //           {itemData.attributes.map((attribute) => attribute.name).join(', ')}
    //         </p>
    //         <br />
    //         {itemData.effect_entries[0] && (
    //           <p>
    //             {itemData.effect_entries[0].effect}
    //           </p>
    //         )}
    //       </div>
    //     )}
    //   </div>
    // </div>
  );
};

export default Item;
