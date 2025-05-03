import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import CommentSection from '../components/CommentSection';
import { AppContext } from '../context/AppContext';
import * as commentService from '../services/commentService';

// Mock commentService methods
vi.mock('../services/commentService');

describe('CommentSection', () => {
  const mockUser = { Id: 'user-1', FullName: 'Alex Smith' };
  const token = 'mock-token';

  const renderWithContext = () =>
    render(
      <AppContext.Provider value={{ user: mockUser, token }}>
        <CommentSection recipeId={1} initialComments={[]} />
      </AppContext.Provider>
    );

  it('submits a new comment successfully', async () => {
    commentService.addComment.mockResolvedValueOnce({
      CommentId: 1,
      Content: 'Nice recipe!',
      CreatedAt: new Date().toISOString(),
      UserId: 'user-1',
      UserName: 'Alex Smith',
      UserProfileImage: '',
      RecipeId: 1,
    });

    renderWithContext();

    fireEvent.change(screen.getByPlaceholderText(/write comment here/i), {
      target: { value: 'Nice recipe!' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Comment' }));

    await waitFor(() =>
      expect(screen.getByText('Nice recipe!')).toBeInTheDocument()
    );
  });

  it('shows fallback when no user is logged in', () => {
    render(
      <AppContext.Provider value={{ user: null, token: null }}>
        <CommentSection recipeId={1} initialComments={[]} />
      </AppContext.Provider>
    );

    expect(screen.getByText(/please log in to comment/i)).toBeInTheDocument();
  });
});
