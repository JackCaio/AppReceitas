import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

const adjustIngredients = (obj) => {
  const ingArr = [];
  Object.entries(obj).forEach((entrie) => {
    if (entrie[0].includes('strIngredient') && entrie[1] !== '' && entrie[1] !== null) {
      const measure = entrie[0].replace('strIngredient', 'strMeasure');
      ingArr.push(`${entrie[1]} - ${obj[measure]}`);
    }
  });

  return ingArr;
};

export default function RecipeInProgress(props) {
  const { match: { params: { id }, url }, history } = props;
  const recType = url.includes('drinks') ? 'drinks' : 'meals';
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    async function fetchRecipeById(route, recipeId) {
      try {
        const type = route.includes('drinks') ? 'thecocktaildb' : 'themealdb';
        const URL = `https://www.${type}.com/api/json/v1/1/lookup.php?i=${recipeId}`;

        const response = await fetch(URL);
        const data = await response.json();
        if (type === 'thecocktaildb') {
          setRecipe(data.drinks[0]);
          return;
        }
        setRecipe(data.meals[0]);
      } catch (e) {
        console.error(e);
      }
    }

    fetchRecipeById(url, id);
  }, [url, id]);

  useEffect(() => {
    setIngredients(adjustIngredients(recipe));
  }, [recipe]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (stored !== null) {
      const utilizedIngredients = stored[recType][id];
      const newStoreObj = {
        ...stored,
        [recType]: {
          ...stored[recType],
          [id]: [...utilizedIngredients],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newStoreObj));
    } else {
      const newStoreObj = {
        [recType]: {
          [id]: [],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newStoreObj));
    }
  }, [id, recType]);

  return (
    <div>
      <h1>Recipe In Progress</h1>
      <button
        type="button"
        onClick={ () => history.push('/meals') }
      >
        Back
      </button>
      <h2 data-testid="recipe-title">{ recipe.strMeal || recipe.strDrink }</h2>
      <img
        data-testid="recipe-photo"
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt="Recipe"
        width="100px"
      />
      <div>
        <button
          data-testid="share-btn"
          type="button"
          onClick={ () => {} }
        >
          Compartilhar
        </button>
        <button
          data-testid="favorite-btn"
          type="button"
          onClick={ () => {} }
        >
          Favoritar
        </button>
      </div>
      <h3 data-testid="recipe-category">{ recipe.strCategory }</h3>
      <p data-testid="instructions">
        { recipe.strInstructions }
      </p>
      <ul>
        {
          ingredients.map((ing, index) => (
            <li key={ ing }>
              <label
                htmlFor={ ing }
                data-testid={ `${index}-ingredient-step` }
              >
                <input
                  type="checkbox"
                  id={ ing }
                />
                {ing}
              </label>
            </li>
          ))
        }
      </ul>
      <button
        data-testid="finish-recipe-btn"
        type="button"
        onClick={ () => {} }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

RecipeInProgress.propTypes = {
  match: propTypes.shape().isRequired,
  history: propTypes.shape().isRequired,
};
