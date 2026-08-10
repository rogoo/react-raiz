import { act, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createUser, getUser, updateUser } from '../../api/userApi';
import { EMAIL_MAX_LENGTH, NAME_MAX_LENGTH, type User } from '../../types/user';
import { deferred, renderWithRouter } from '../../test/utils';
import UserForm from './UserForm';

vi.mock('../../api/userApi', () => ({
  createUser: vi.fn(),
  getUser: vi.fn(),
  updateUser: vi.fn(),
}));

const ada: User = { id: 7, name: 'Ada Lovelace', email: 'ada@example.com' };

function renderCreateForm() {
  return renderWithRouter(<UserForm />, { path: '/users/new' });
}

function renderEditForm(id = 7) {
  return renderWithRouter(<UserForm />, {
    path: '/users/:id/edit',
    initialEntries: [`/users/${id}/edit`],
  });
}

function nameField() {
  return screen.getByLabelText('Name *');
}

function emailField() {
  return screen.getByLabelText('E-mail *');
}

beforeEach(() => {
  vi.mocked(getUser).mockResolvedValue(ada);
  vi.mocked(createUser).mockResolvedValue({ ...ada, id: 42 });
  vi.mocked(updateUser).mockResolvedValue(ada);
});

describe('create mode', () => {
  it('renders an empty form titled "New user"', () => {
    renderCreateForm();

    expect(
      screen.getByRole('heading', { level: 1, name: 'New user' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument();
    expect(nameField()).toHaveValue('');
    expect(emailField()).toHaveValue('');
    expect(getUser).not.toHaveBeenCalled();
  });

  it('caps both inputs at the field lengths', () => {
    renderCreateForm();

    expect(nameField()).toHaveAttribute('maxlength', String(NAME_MAX_LENGTH));
    expect(emailField()).toHaveAttribute('maxlength', String(EMAIL_MAX_LENGTH));
  });

  it('submits the trimmed values and returns to the list', async () => {
    const user = userEvent.setup();
    const { router } = renderCreateForm();

    await user.type(nameField(), '  Ada Lovelace  ');
    await user.type(emailField(), '  ada@example.com  ');
    await user.click(screen.getByRole('button', { name: 'Create' }));

    expect(createUser).toHaveBeenCalledWith({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
    });
    expect(router.state.location.pathname).toBe('/users');
    expect(router.state.location.state).toBeNull();
  });

  it('disables both buttons while the request is in flight', async () => {
    const user = userEvent.setup();
    const request = deferred<User>();
    vi.mocked(createUser).mockReturnValue(request.promise);

    renderCreateForm();

    await user.type(nameField(), 'Ada Lovelace');
    await user.type(emailField(), 'ada@example.com');
    await user.click(screen.getByRole('button', { name: 'Create' }));

    expect(screen.getByRole('button', { name: 'Create' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled();

    await act(async () => {
      request.resolve(ada);
    });
  });

  it('reports a failed request and stays on the form', async () => {
    const user = userEvent.setup();
    vi.mocked(createUser).mockRejectedValue(new Error('500'));
    const { router } = renderCreateForm();

    await user.type(nameField(), 'Ada Lovelace');
    await user.type(emailField(), 'ada@example.com');
    await user.click(screen.getByRole('button', { name: 'Create' }));

    expect(
      await screen.findByText('The request failed. Check if the API is running.'),
    ).toBeInTheDocument();
    expect(router.state.location.pathname).toBe('/users/new');
    expect(screen.getByRole('button', { name: 'Create' })).toBeEnabled();
  });

  it('goes back to the list on cancel without calling the API', async () => {
    const user = userEvent.setup();
    const { router } = renderCreateForm();

    await user.type(nameField(), 'Ada Lovelace');
    await user.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(createUser).not.toHaveBeenCalled();
    expect(router.state.location.pathname).toBe('/users');
  });
});

describe('validation', () => {
  it('requires both fields and marks them invalid', async () => {
    const user = userEvent.setup();
    renderCreateForm();

    await user.click(screen.getByRole('button', { name: 'Create' }));

    expect(screen.getByText('Name is required.')).toBeInTheDocument();
    expect(screen.getByText('E-mail is required.')).toBeInTheDocument();
    expect(nameField()).toHaveClass('input--invalid');
    expect(nameField()).toHaveAttribute('aria-invalid', 'true');
    expect(emailField()).toHaveClass('input--invalid');
    expect(createUser).not.toHaveBeenCalled();
  });

  it('treats whitespace-only input as missing', async () => {
    const user = userEvent.setup();
    renderCreateForm();

    await user.type(nameField(), '   ');
    await user.type(emailField(), '   ');
    await user.click(screen.getByRole('button', { name: 'Create' }));

    expect(screen.getByText('Name is required.')).toBeInTheDocument();
    expect(screen.getByText('E-mail is required.')).toBeInTheDocument();
  });

  it('rejects a malformed e-mail', async () => {
    const user = userEvent.setup();
    renderCreateForm();

    await user.type(nameField(), 'Ada Lovelace');
    await user.type(emailField(), 'ada@example');
    await user.click(screen.getByRole('button', { name: 'Create' }));

    expect(
      screen.getByText('Please inform a valid e-mail address.'),
    ).toBeInTheDocument();
    expect(createUser).not.toHaveBeenCalled();
  });

  it('rejects a name longer than the maximum', async () => {
    const user = userEvent.setup();
    renderCreateForm();

    // `maxLength` blocks typing, so set the value straight on the input.
    fireEvent.change(nameField(), { target: { value: 'a'.repeat(56) } });
    await user.type(emailField(), 'ada@example.com');
    await user.click(screen.getByRole('button', { name: 'Create' }));

    expect(
      screen.getByText(`Name must have at most ${NAME_MAX_LENGTH} characters.`),
    ).toBeInTheDocument();
  });

  it('rejects an e-mail longer than the maximum before checking its shape', async () => {
    const user = userEvent.setup();
    renderCreateForm();

    await user.type(nameField(), 'Ada Lovelace');
    fireEvent.change(emailField(), {
      target: { value: `${'a'.repeat(54)}@example.com` },
    });
    await user.click(screen.getByRole('button', { name: 'Create' }));

    expect(
      screen.getByText(`E-mail must have at most ${EMAIL_MAX_LENGTH} characters.`),
    ).toBeInTheDocument();
  });

  it('stays quiet until the first submit', async () => {
    const user = userEvent.setup();
    renderCreateForm();

    await user.type(emailField(), 'not-an-email');

    expect(screen.queryByText('Name is required.')).toBeNull();
    expect(screen.queryByText('Please inform a valid e-mail address.')).toBeNull();
    expect(emailField()).not.toHaveClass('input--invalid');
  });

  it('re-validates on every keystroke once submitted', async () => {
    const user = userEvent.setup();
    renderCreateForm();

    await user.click(screen.getByRole('button', { name: 'Create' }));
    expect(screen.getByText('Name is required.')).toBeInTheDocument();

    await user.type(nameField(), 'Ada Lovelace');
    expect(screen.queryByText('Name is required.')).toBeNull();
    expect(screen.getByText('E-mail is required.')).toBeInTheDocument();

    await user.type(emailField(), 'ada@example.com');
    expect(screen.queryByText('E-mail is required.')).toBeNull();
    expect(emailField()).not.toHaveClass('input--invalid');
  });
});

describe('edit mode', () => {
  it('loads the user, then fills the form', async () => {
    const request = deferred<User>();
    vi.mocked(getUser).mockReturnValue(request.promise);

    renderEditForm();

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Update' })).toBeNull();

    await act(async () => {
      request.resolve(ada);
    });

    expect(getUser).toHaveBeenCalledWith(7);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Edit user #7' }),
    ).toBeInTheDocument();
    expect(nameField()).toHaveValue('Ada Lovelace');
    expect(emailField()).toHaveValue('ada@example.com');
    expect(screen.getByRole('button', { name: 'Update' })).toBeInTheDocument();
  });

  it('saves the changes and hands a message to the list', async () => {
    const user = userEvent.setup();
    const { router } = renderEditForm();

    await screen.findByRole('button', { name: 'Update' });

    await user.clear(nameField());
    await user.type(nameField(), 'Ada King');
    await user.click(screen.getByRole('button', { name: 'Update' }));

    expect(updateUser).toHaveBeenCalledWith(7, {
      name: 'Ada King',
      email: 'ada@example.com',
    });
    expect(router.state.location.pathname).toBe('/users');
    expect(router.state.location.state).toEqual({ feedback: 'User #7 updated.' });
  });

  it('reports a user that could not be loaded, but still shows the form', async () => {
    vi.mocked(getUser).mockRejectedValue(new Error('404'));

    renderEditForm(99);

    expect(
      await screen.findByText('Could not load user #99.'),
    ).toBeInTheDocument();
    expect(nameField()).toHaveValue('');
    expect(screen.getByRole('button', { name: 'Update' })).toBeInTheDocument();
  });

  it('reports a failed save', async () => {
    const user = userEvent.setup();
    vi.mocked(updateUser).mockRejectedValue(new Error('500'));
    const { router } = renderEditForm();

    await screen.findByRole('button', { name: 'Update' });
    await user.click(screen.getByRole('button', { name: 'Update' }));

    expect(
      await screen.findByText('The request failed. Check if the API is running.'),
    ).toBeInTheDocument();
    expect(router.state.location.pathname).toBe('/users/7/edit');
  });

  it('drops a response that arrives after the form is unmounted', async () => {
    const request = deferred<User>();
    vi.mocked(getUser).mockReturnValue(request.promise);

    const { unmount } = renderEditForm();
    unmount();

    await act(async () => {
      request.resolve(ada);
    });

    // No "update on an unmounted component" warning, and nothing left on screen.
    expect(screen.queryByRole('heading')).toBeNull();
  });

  it('drops a load failure that arrives after the form is unmounted', async () => {
    const request = deferred<User>();
    vi.mocked(getUser).mockReturnValue(request.promise);

    const { unmount } = renderEditForm();
    unmount();

    await act(async () => {
      request.reject(new Error('404'));
    });

    expect(screen.queryByText('Could not load user #7.')).toBeNull();
  });

  it('validates before saving, just like create mode', async () => {
    const user = userEvent.setup();
    renderEditForm();

    await screen.findByRole('button', { name: 'Update' });

    await user.clear(emailField());
    await user.click(screen.getByRole('button', { name: 'Update' }));

    expect(screen.getByText('E-mail is required.')).toBeInTheDocument();
    expect(updateUser).not.toHaveBeenCalled();
  });
});
