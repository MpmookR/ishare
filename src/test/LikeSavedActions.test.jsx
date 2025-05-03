import { render, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import LikeSavedAction from '../components/LikeSavedAction';
import { AppContext } from '../context/AppContext';
import * as likeService from '../services/likeService';
import * as savedService from '../services/savedService';

vi.mock('../services/likeService');
vi.mock('../services/savedService');

const user = { Id: 'user-1', FullName: 'Test User' };
const token = 'mock-token';

const renderWithContext = (props) => {
  return render(
    <AppContext.Provider value={{ user, token }}>
      <LikeSavedAction {...props} />
    </AppContext.Provider>
  );
};

describe('LikeSavedActions', () => {
  it('calls likeRecipe when not liked and like icon is clicked', async () => {
    likeService.likeRecipe.mockResolvedValue({});
    const { container } = renderWithContext({ recipeId: 1, likedByCurrentUser: false });
    const icons = container.querySelectorAll('svg');
    const likeIcon = icons[0];
    fireEvent.click(likeIcon);
    expect(likeService.likeRecipe).toHaveBeenCalledWith(1, token);
  });

  it('calls unlikeRecipe when already liked and like icon is clicked', async () => {
    likeService.unlikeRecipe.mockResolvedValue({});
    const { container } = renderWithContext({ recipeId: 2, likedByCurrentUser: true });
    const icons = container.querySelectorAll('svg');
    const likeIcon = icons[0];
    fireEvent.click(likeIcon);
    expect(likeService.unlikeRecipe).toHaveBeenCalledWith(2, user.Id, token);
  });

  it('calls saveRecipe when not saved and save icon is clicked', async () => {
    savedService.saveRecipe.mockResolvedValue({});
    const { container } = renderWithContext({ recipeId: 3, defaultSaved: false });
    const icons = container.querySelectorAll('svg');
    const saveIcon = icons[1];
    fireEvent.click(saveIcon);
    expect(savedService.saveRecipe).toHaveBeenCalledWith(3, token);
  });

  it('calls deleteSavedRecipe when already saved and save icon is clicked', async () => {
    savedService.deleteSavedRecipe.mockResolvedValue({});
    const { container } = renderWithContext({ recipeId: 4, defaultSaved: true, savedRecipeId: 42 });
    const icons = container.querySelectorAll('svg');
    const saveIcon = icons[1];
    fireEvent.click(saveIcon);
    expect(savedService.deleteSavedRecipe).toHaveBeenCalledWith(42, token);
  });
});
