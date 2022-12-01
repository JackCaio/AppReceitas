import React from 'react';
import { screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import mockFetch from './mocks/mockFetch';
import mealCategories from './mocks/mealCategories';
import drinkCategories from './mocks/drinkCategories';
import meals from './mocks/meals';
import drinks from './mocks/drinks';

const pages = {
  meals: '/meals',
  drinks: '/drinks',
};

const testIds = {
  footer: 'footer',
};

describe('Tests the display of the Recipes Page', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('Should test if the correct elements are displayed', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Meals');
    expect(screen.getByTestId(testIds.footer)).toBeInTheDocument();

    act(() => history.push('/drinks'));

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Drinks');
  });

  it('Should test if the recipes displayed are displayed according to the pathname', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

    const { history } = renderWithRouter(<App />);
    act(() => history.push(pages.meals));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      expect(screen.getByTestId('Beef-category-filter')).toBeInTheDocument();
    });
  });
  it.todo('Should test if the correct categories are displayed according to the pathname');
});

describe('Tests the functionality of the page', () => {
  it.todo('Should test if only 12 maximum recipes are displayed in the screen');
  it.todo('Should test if the category buttons are filtering the recipes');
  it.todo('Should test if the category buttons work as toggles');
  it.todo('Should test if recipe redirects the user to its details page');
});
