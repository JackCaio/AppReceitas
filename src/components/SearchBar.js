import React, { useState, useContext } from 'react';
import { Context } from '../context/useContext';

export default function SearchBar() {
  const { fetchRecipes } = useContext(Context);
  const [formData, setFormData] = useState({ searchInput: '', searchType: 'ingredient' });

  function handleInput({ target: { name, value } }) {
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function searchRecipes() {
    const { searchType, searchInput } = formData;
    if (searchInput.length === 0) return; // Mata código caso a busca seja feita vazia
    if (searchType === 'firstLetter' && searchInput.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    fetchRecipes({ [searchType]: searchInput });
  }

  return (
    <div>
      <button type="button" data-testid="search-top-btn">GAMBIARRA</button>
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
          value="recipeName"
          onChange={ handleInput }
          checked={ formData.searchType === 'recipeName' }
        />
        Name
      </label>
      <label htmlFor="first-letter-search-radio">
        <input
          type="radio"
          name="searchType"
          id="first-letter-search-radio"
          data-testid="first-letter-search-radio"
          value="firstLetter"
          onChange={ handleInput }
          checked={ formData.searchType === 'firstLetter' }
        />
        First letter
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ searchRecipes }
      >
        Search
      </button>
    </div>
  );
}
