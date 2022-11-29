import React, { useState } from 'react';

export default function SearchBar() {
  const [formData, setFormData] = useState({ searchInput: '', searchType: 'ingredient' });

  function handleInput({ target: { name, value } }) {
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  return (
    <div>
      <input
        type="search"
        data-testid="search-input"
        name="searchInput"
        value={ formData.searchInput }
        onChange={ handleInput }
      />
      <label htmlFor="ingredient-search-radio">
        <input
          type="radio"
          name="searchType"
          id="ingredient-search-radio"
          data-testid="ingredient-search-radio"
          value="ingredient"
          onChange={ handleInput }
          checked={ formData.searchType === 'ingredient' }
        />
        Ingredient
      </label>
      <label htmlFor="name-search-radio">
        <input
          type="radio"
          name="searchType"
          id="name-search-radio"
          data-testid="name-search-radio"
          value="name"
          onChange={ handleInput }
          checked={ formData.searchType === 'name' }
        />
        Name
      </label>
      <label htmlFor="first-letter-search-radio">
        <input
          type="radio"
          name="searchType"
          id="first-letter-search-radio"
          data-testid="first-letter-search-radio"
          value="first-letter"
          onChange={ handleInput }
          checked={ formData.searchType === 'first-letter' }
        />
        First letter
      </label>
      <button type="button" data-testid="exec-search-btn">Search</button>
    </div>
  );
}
