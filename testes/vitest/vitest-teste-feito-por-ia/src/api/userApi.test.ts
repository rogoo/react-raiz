import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { User } from '../types/user';
import {
  API_URL,
  createUser,
  deleteUser,
  getUser,
  listUsers,
  updateUser,
} from './userApi';

/**
 * `userApi` builds its axios instance at import time, so the mock has to be in
 * place before the module is evaluated — hence `vi.hoisted`. `createConfig`
 * records what `axios.create` was called with; a plain array survives the
 * `clearMocks` that runs between tests.
 */
const { client, createConfig } = vi.hoisted(() => {
  const createConfig: unknown[] = [];

  return {
    createConfig,
    client: {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
    },
  };
});

vi.mock('axios', () => ({
  default: {
    create: (config: unknown) => {
      createConfig.push(config);
      return client;
    },
  },
}));

const ada: User = { id: 1, name: 'Ada Lovelace', email: 'ada@example.com' };
const alan: User = { id: 2, name: 'Alan Turing', email: 'alan@example.com' };

beforeEach(() => {
  client.get.mockResolvedValue({ data: [] });
  client.post.mockResolvedValue({ data: ada });
  client.put.mockResolvedValue({ data: ada });
  client.delete.mockResolvedValue({ data: undefined });
});

describe('the axios instance', () => {
  it('is created once, pointed at the user endpoint and sends JSON', () => {
    expect(API_URL).toBe('http://localhost:8080/api/user');
    expect(createConfig).toEqual([
      {
        baseURL: API_URL,
        headers: { 'Content-Type': 'application/json' },
      },
    ]);
  });
});

describe('listUsers', () => {
  it('returns the users from the response body', async () => {
    client.get.mockResolvedValue({ data: [ada, alan] });

    await expect(listUsers()).resolves.toEqual([ada, alan]);
    expect(client.get).toHaveBeenCalledWith('');
  });

  it.each([
    ['an object', { users: [] }],
    ['null', null],
    ['a string', 'boom'],
    ['undefined', undefined],
  ])('falls back to an empty list when the body is %s', async (_label, data) => {
    client.get.mockResolvedValue({ data });

    await expect(listUsers()).resolves.toEqual([]);
  });

  it('propagates a request failure', async () => {
    client.get.mockRejectedValue(new Error('Network Error'));

    await expect(listUsers()).rejects.toThrow('Network Error');
  });
});

describe('getUser', () => {
  it('requests the user by id and returns it', async () => {
    client.get.mockResolvedValue({ data: ada });

    await expect(getUser(1)).resolves.toEqual(ada);
    expect(client.get).toHaveBeenCalledWith('/1');
  });

  it('propagates a request failure', async () => {
    client.get.mockRejectedValue(new Error('404'));

    await expect(getUser(99)).rejects.toThrow('404');
  });
});

describe('createUser', () => {
  it('posts the form values and returns the created user', async () => {
    const values = { name: 'Ada Lovelace', email: 'ada@example.com' };
    client.post.mockResolvedValue({ data: ada });

    await expect(createUser(values)).resolves.toEqual(ada);
    expect(client.post).toHaveBeenCalledWith('', values);
  });

  it('propagates a request failure', async () => {
    client.post.mockRejectedValue(new Error('409'));

    await expect(
      createUser({ name: 'Ada', email: 'ada@example.com' }),
    ).rejects.toThrow('409');
  });
});

describe('updateUser', () => {
  it('puts the id alongside the form values', async () => {
    const values = { name: 'Alan Turing', email: 'alan@example.com' };
    client.put.mockResolvedValue({ data: alan });

    await expect(updateUser(2, values)).resolves.toEqual(alan);
    expect(client.put).toHaveBeenCalledWith('/2', { id: 2, ...values });
  });

  it('propagates a request failure', async () => {
    client.put.mockRejectedValue(new Error('500'));

    await expect(
      updateUser(2, { name: 'Alan', email: 'alan@example.com' }),
    ).rejects.toThrow('500');
  });
});

describe('deleteUser', () => {
  it('deletes the user by id and resolves with nothing', async () => {
    await expect(deleteUser(3)).resolves.toBeUndefined();
    expect(client.delete).toHaveBeenCalledWith('/3');
  });

  it('propagates a request failure', async () => {
    client.delete.mockRejectedValue(new Error('403'));

    await expect(deleteUser(3)).rejects.toThrow('403');
  });
});
