import React from 'react';
import { screen } from '@testing-library/react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const prfBtn = 'profile-top-btn';
const srchBtn = 'search-top-btn';
const titlePg = 'page-title';

describe('Teste Header', () => {
  const hasHeader = async (title, searchBtn = true) => {
    const profileBtn = await screen.findByTestId(prfBtn);
    const titleId = await screen.findByTestId(titlePg);
    expect(profileBtn).toBeInTheDocument();
    expect(profileBtn).toHaveAttribute('src', profileIcon);

    expect(titleId).toBeInTheDocument();
    expect(titleId).toHaveTextContent(title);

    if (searchBtn) {
      const searchBbtn = await screen.queryByTestId(srchBtn);
      expect(searchBbtn).toBeInTheDocument();
      expect(searchBbtn).toHaveAttribute('src', searchIcon);
    } else {
      expect(screen.queryByTestId(srchBtn)).not.toBeInTheDocument();
    }
  };

  it('check if there is a Header on Foods Page', async () => {
    const { history } = renderWithRouter(<App />);
    await act(async () => { history.push('/meals'); });
    await hasHeader('Meals', true);
  });
  it('check if there is a Header on Drinks Page', async () => {
    const { history } = renderWithRouter(<App />);
    await act(async () => { history.push('/drinks'); });
    await hasHeader('Drinks', true);
  });
  it('teste Header no profile', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    await hasHeader('Profile', false);
  });
  it('teste Header no Done Recipes Page', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/done-recipes');
    await hasHeader('Done Recipes', false);
  });
  it('teste Header nos Favoritos', async () => {
    const { history } = renderWithRouter(<App />);
    await act(async () => { history.push('/favorite-recipes'); });
    await hasHeader('Favorite Recipes', false);
  });
});
