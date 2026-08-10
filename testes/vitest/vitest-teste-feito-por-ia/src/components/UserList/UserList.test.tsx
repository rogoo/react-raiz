import { act, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { deleteUser, listUsers } from '../../api/userApi';
import { EMAIL_MAX_LENGTH, NAME_MAX_LENGTH, type User } from '../../types/user';
import { deferred, renderWithRouter } from '../../test/utils';
import UserList from './UserList';

vi.mock('../../api/userApi', () => ({
  listUsers: vi.fn(),
  deleteUser: vi.fn(),
}));

const ada: User = { id: 1, name: 'Ada Lovelace', email: 'ada@example.com' };
const alan: User = { id: 2, name: 'Alan Turing', email: 'alan@turing.uk' };
const grace: User = { id: 3, name: 'Grace Hopper', email: 'grace@example.com' };

const everyone = [ada, alan, grace];

function renderList(state?: { feedback?: string }) {
  return renderWithRouter(<UserList />, {
    path: '/users',
    initialEntries: [{ pathname: '/users', state: state ?? null }],
  });
}

/** Names in the table body, top to bottom. */
function listedNames() {
  const rows = within(screen.getByRole('table')).getAllByRole('row').slice(1);

  return rows.map((row) => row.querySelectorAll('td')[1]?.textContent);
}

beforeEach(() => {
  vi.mocked(listUsers).mockResolvedValue(everyone);
  vi.mocked(deleteUser).mockResolvedValue(undefined);
});

describe('loading the list', () => {
  it('shows a loading message until the request settles', async () => {
    const request = deferred<User[]>();
    vi.mocked(listUsers).mockReturnValue(request.promise);

    renderList();

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await act(async () => {
      request.resolve([ada]);
    });

    expect(screen.queryByText(/loading/i)).toBeNull();
    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument();
  });

  it('renders one row per user with id, name and e-mail', async () => {
    renderList();

    await screen.findByRole('table');

    expect(listedNames()).toEqual([
      'Ada Lovelace',
      'Alan Turing',
      'Grace Hopper',
    ]);
    expect(screen.getByText('ada@example.com')).toBeInTheDocument();
    expect(listUsers).toHaveBeenCalledOnce();
  });

  it('gives every row an edit link and a delete button', async () => {
    renderList();

    await screen.findByRole('table');

    expect(screen.getByRole('link', { name: 'Edit Ada Lovelace' })).toHaveAttribute(
      'href',
      '/users/1/edit',
    );
    expect(
      screen.getByRole('button', { name: 'Delete Grace Hopper' }),
    ).toBeInTheDocument();
  });

  it('links to the create form', async () => {
    renderList();

    await screen.findByRole('table');

    expect(screen.getByRole('link', { name: 'New user' })).toHaveAttribute(
      'href',
      '/users/new',
    );
  });

  it('says so when the API returns nothing', async () => {
    vi.mocked(listUsers).mockResolvedValue([]);

    renderList();

    expect(await screen.findByText('No users found.')).toBeInTheDocument();
    expect(screen.queryByRole('table')).toBeNull();
  });

  it('reports a failed request', async () => {
    vi.mocked(listUsers).mockRejectedValue(new Error('Network Error'));

    renderList();

    expect(
      await screen.findByText('Could not load users. Check if the API is running.'),
    ).toBeInTheDocument();
    expect(screen.queryByText(/loading/i)).toBeNull();
  });
});

describe('filtering', () => {
  it('matches names case-insensitively on a substring', async () => {
    const user = userEvent.setup();
    renderList();
    await screen.findByRole('table');

    await user.type(screen.getByLabelText('Name'), 'ada');

    expect(listedNames()).toEqual(['Ada Lovelace']);
  });

  it('matches e-mails case-insensitively on a substring', async () => {
    const user = userEvent.setup();
    renderList();
    await screen.findByRole('table');

    await user.type(screen.getByLabelText('E-mail'), 'EXAMPLE.COM');

    expect(listedNames()).toEqual(['Ada Lovelace', 'Grace Hopper']);
  });

  it('requires both filters to match at once', async () => {
    const user = userEvent.setup();
    renderList();
    await screen.findByRole('table');

    await user.type(screen.getByLabelText('Name'), 'grace');
    await user.type(screen.getByLabelText('E-mail'), 'example.com');

    expect(listedNames()).toEqual(['Grace Hopper']);
  });

  it('ignores surrounding whitespace in the filter', async () => {
    const user = userEvent.setup();
    renderList();
    await screen.findByRole('table');

    await user.type(screen.getByLabelText('Name'), '  alan  ');

    expect(listedNames()).toEqual(['Alan Turing']);
  });

  it('explains an empty result without claiming there are no users', async () => {
    const user = userEvent.setup();
    renderList();
    await screen.findByRole('table');

    await user.type(screen.getByLabelText('Name'), 'nobody');

    expect(screen.getByText('No users match the filter.')).toBeInTheDocument();
    expect(screen.queryByText('No users found.')).toBeNull();
    expect(screen.queryByRole('table')).toBeNull();
  });

  it('restores the full list when the filter is cleared', async () => {
    const user = userEvent.setup();
    renderList();
    await screen.findByRole('table');

    await user.type(screen.getByLabelText('Name'), 'ada');
    await user.type(screen.getByLabelText('E-mail'), 'ada@');
    await user.click(screen.getByRole('button', { name: 'Clear' }));

    expect(screen.getByLabelText('Name')).toHaveValue('');
    expect(screen.getByLabelText('E-mail')).toHaveValue('');
    expect(listedNames()).toHaveLength(3);
  });

  it('caps the filter inputs at the field lengths', async () => {
    renderList();
    await screen.findByRole('table');

    expect(screen.getByLabelText('Name')).toHaveAttribute(
      'maxlength',
      String(NAME_MAX_LENGTH),
    );
    expect(screen.getByLabelText('E-mail')).toHaveAttribute(
      'maxlength',
      String(EMAIL_MAX_LENGTH),
    );
  });

  it('does not re-fetch when the filter changes', async () => {
    const user = userEvent.setup();
    renderList();
    await screen.findByRole('table');

    await user.type(screen.getByLabelText('Name'), 'ada');

    expect(listUsers).toHaveBeenCalledOnce();
  });
});

describe('deleting a user', () => {
  it('deletes, confirms and reloads', async () => {
    const user = userEvent.setup();
    vi.mocked(listUsers)
      .mockResolvedValueOnce(everyone)
      .mockResolvedValueOnce([alan, grace]);

    renderList();
    await screen.findByRole('table');

    await user.click(screen.getByRole('button', { name: 'Delete Ada Lovelace' }));

    expect(deleteUser).toHaveBeenCalledWith(1);
    expect(await screen.findByText('User #1 deleted.')).toBeInTheDocument();
    expect(listUsers).toHaveBeenCalledTimes(2);
    expect(listedNames()).toEqual(['Alan Turing', 'Grace Hopper']);
  });

  it('reports a failed delete and keeps the row', async () => {
    const user = userEvent.setup();
    vi.mocked(deleteUser).mockRejectedValue(new Error('403'));

    renderList();
    await screen.findByRole('table');

    await user.click(screen.getByRole('button', { name: 'Delete Ada Lovelace' }));

    expect(
      await screen.findByText('Could not delete user #1.'),
    ).toBeInTheDocument();
    expect(listUsers).toHaveBeenCalledOnce();
    expect(listedNames()).toContain('Ada Lovelace');
  });
});

describe('the feedback handed over by UserForm', () => {
  it('shows the message carried in the location state', async () => {
    const { router } = renderList({ feedback: 'User #2 updated.' });

    expect(await screen.findByText('User #2 updated.')).toBeInTheDocument();
    expect(router.state.location.state).toBeNull();
  });

  it('shows nothing when there is no location state', async () => {
    renderList();

    await screen.findByRole('table');

    expect(screen.queryByText(/updated\./)).toBeNull();
  });
});

describe('the feedback timeout', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('clears the message after 2.5 seconds', async () => {
    renderList({ feedback: 'User #2 updated.' });

    await act(async () => {});
    expect(screen.getByText('User #2 updated.')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2499);
    });
    expect(screen.getByText('User #2 updated.')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(screen.queryByText('User #2 updated.')).toBeNull();
  });
});
