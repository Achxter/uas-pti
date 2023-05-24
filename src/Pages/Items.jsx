import React, { useState } from 'react';
import axios from 'axios';

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
    <div className="container mx-auto p-4 mt-24">
      <h1 className="text-2xl font-bold mb-4">Search Items</h1>
      <form onSubmit={handleFormSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Enter Item ID or Name"
          value={itemInput}
          onChange={handleInputChange}
          className="border border-gray-300 rounded p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Search
        </button>
      </form>
      {showNoDataMessage && <p className="text-red-500">Oops.. No data found</p>}
      {itemData && (
        <div className="border border-gray-300 rounded p-4">
          <h2 className="text-xl font-bold mb-2">{itemData.name}</h2>
          {itemData.sprites.default && (
            <img src={itemData.sprites.default} alt={itemData.name} className="mb-2" />
          )}
          <p>
            <span className="font-bold">Category:</span> {itemData.category.name}
          </p>
          <p>
            <span className="font-bold">Cost:</span> {itemData.cost} P
          </p>
          <p>
            <span className="font-bold">Attributes:</span>{' '}
            {itemData.attributes.map((attribute) => attribute.name).join(', ')}
          </p>
          <br />
          {itemData.effect_entries[0] && (
            <p>
              {itemData.effect_entries[0].effect}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Item;
