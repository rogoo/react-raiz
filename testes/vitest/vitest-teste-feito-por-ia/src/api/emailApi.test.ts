import axios, {
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  EMAIL_API_URL,
  RECIPIENT,
  SUBJECT_OPTIONS,
  getEmailErrorMessage,
  sendEmail,
  type EmailPayload,
} from './emailApi';

const config = { headers: {} } as InternalAxiosRequestConfig;

/** Builds a real `AxiosError`, so `axios.isAxiosError` is exercised for real. */
function axiosError(
  response?: Partial<AxiosResponse>,
  message = 'Request failed',
) {
  const fullResponse =
    response === undefined
      ? undefined
      : ({
          status: 500,
          statusText: 'Internal Server Error',
          data: '',
          headers: {},
          config,
          ...response,
        } as AxiosResponse);

  return new AxiosError(message, 'ERR_BAD_RESPONSE', config, {}, fullResponse);
}

const payload: EmailPayload = {
  to: RECIPIENT,
  subject: 'doubt',
  title: 'Hello',
  content: 'Is this thing on?',
};

describe('constants', () => {
  it('points at the e-mail endpoint and a fixed recipient', () => {
    expect(EMAIL_API_URL).toBe('http://localhost:8080/api/email');
    expect(RECIPIENT).toBe('yofoo@gmail.com');
  });

  it('offers the four supported subjects', () => {
    expect(SUBJECT_OPTIONS).toEqual(['congrats', 'not received', 'error', 'doubt']);
  });
});

describe('sendEmail', () => {
  beforeEach(() => {
    vi.spyOn(axios, 'post').mockResolvedValue({ data: '' });
  });

  it('posts the payload as JSON', async () => {
    await expect(sendEmail(payload)).resolves.toBeUndefined();

    expect(axios.post).toHaveBeenCalledWith(EMAIL_API_URL, payload, {
      headers: { 'Content-Type': 'application/json' },
    });
  });

  it('propagates a request failure', async () => {
    vi.spyOn(axios, 'post').mockRejectedValue(axiosError({ status: 502 }));

    await expect(sendEmail(payload)).rejects.toBeInstanceOf(AxiosError);
  });
});

describe('getEmailErrorMessage', () => {
  it('uses the axios message when the request never got a response', () => {
    expect(getEmailErrorMessage(axiosError(undefined, 'Network Error'))).toBe(
      'Network Error',
    );
  });

  it('combines status and a plain-text body', () => {
    const error = axiosError({
      status: 500,
      statusText: 'Internal Server Error',
      data: '  SMTP refused the message  ',
    });

    expect(getEmailErrorMessage(error)).toBe(
      '500 Internal Server Error: SMTP refused the message',
    );
  });

  it('reads `message` out of a JSON body', () => {
    const error = axiosError({
      status: 422,
      statusText: 'Unprocessable Entity',
      data: { message: 'Subject is not supported' },
    });

    expect(getEmailErrorMessage(error)).toBe(
      '422 Unprocessable Entity: Subject is not supported',
    );
  });

  it('falls back to `error` when the body carries no `message`', () => {
    const error = axiosError({
      status: 400,
      statusText: 'Bad Request',
      data: { error: 'Missing title' },
    });

    expect(getEmailErrorMessage(error)).toBe('400 Bad Request: Missing title');
  });

  it('prefers a null `message` over `error`, matching the ?? operator', () => {
    const error = axiosError({
      status: 400,
      statusText: 'Bad Request',
      data: { message: null, error: 'Missing title' },
    });

    expect(getEmailErrorMessage(error)).toBe('400 Bad Request: Missing title');
  });

  it.each([
    ['an unrecognised shape', { detail: 'nope' }],
    ['a non-string message', { message: 42, error: 'ignored' }],
    ['a blank body', '   '],
    ['null', null],
  ])('reports status only for %s', (_label, data) => {
    const error = axiosError({ status: 503, statusText: 'Service Unavailable', data });

    expect(getEmailErrorMessage(error)).toBe('503 Service Unavailable');
  });

  it('trims the trailing space when statusText is empty', () => {
    const error = axiosError({ status: 418, statusText: '', data: null });

    expect(getEmailErrorMessage(error)).toBe('418');
  });

  it('uses the message of a plain Error', () => {
    expect(getEmailErrorMessage(new Error('boom'))).toBe('boom');
  });

  it.each([
    ['a string', 'just a string', 'just a string'],
    ['a number', 42, '42'],
    ['null', null, 'null'],
    ['undefined', undefined, 'undefined'],
  ])('stringifies %s', (_label, thrown, expected) => {
    expect(getEmailErrorMessage(thrown)).toBe(expected);
  });
});
