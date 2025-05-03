import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import SearchResults from '../pages/SearchResults';
import * as recipeService from '../services/recipeService';
import { AppContext } from '../context/AppContext';


vi.mock('../services/recipeService');

const mockRecipes = [
  { RecipeId: 1, Name: 'Spaghetti Bolognese' },
  { RecipeId: 2, Name: 'Chicken Curry' },
  { RecipeId: 3, Name: 'Spaghetti Carbonara' },
];

const renderWithQuery = (query = '', contextOverrides = {}) =>
    render(
      <AppContext.Provider value={{ user: null, token: null, setUser: vi.fn(), setToken: vi.fn(), ...contextOverrides }}>
        <MemoryRouter initialEntries={[`/search?query=${query}`]}>
          <Routes>
            <Route path="/search" element={<SearchResults />} />
          </Routes>
        </MemoryRouter>
      </AppContext.Provider>
    );

describe('SearchResults', () => {
  beforeEach(() => {
    recipeService.fetchRecipes.mockResolvedValue(mockRecipes);
  });

  it('displays matching recipes based on query', async () => {
    renderWithQuery('spaghetti');

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    expect(screen.getByText(/spaghetti bolognese/i)).toBeInTheDocument();
    expect(screen.getByText(/spaghetti carbonara/i)).toBeInTheDocument();
    expect(screen.queryByText(/chicken curry/i)).not.toBeInTheDocument();
  });

  it('shows "No recipes found" if nothing matches', async () => {
    renderWithQuery('pizza');

    await waitFor(() => {
      expect(screen.getByText(/no recipes found/i)).toBeInTheDocument();
    });
  });

  it('renders all recipes if query is empty', async () => {
    renderWithQuery('');

    await waitFor(() => {
      expect(screen.getByText(/spaghetti bolognese/i)).toBeInTheDocument();
      expect(screen.getByText(/chicken curry/i)).toBeInTheDocument();
      expect(screen.getByText(/spaghetti carbonara/i)).toBeInTheDocument();
    });
  });

  it('displays loading state initially', () => {
    recipeService.fetchRecipes.mockReturnValue(new Promise(() => {})); // never resolves
    renderWithQuery('spaghetti');

    expect(screen.getByText(/loading recipes/i)).toBeInTheDocument();
  });
});
