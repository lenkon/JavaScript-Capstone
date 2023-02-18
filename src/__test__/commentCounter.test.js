import commentCounter from '../modules/commentCounter.js';

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve([
    {
      creation_date: '2023-02-17',
      comment: 'Hello World',
      username: 'Habtamu',
    },
    {
      creation_date: '2023-02-17',
      comment: 'Hello World',
      username: 'Habtamu',
    },
    {
      creation_date: '2023-02-17',
      comment: 'Hello World',
      username: 'Habtamu',
    },
    {
      creation_date: '2023-02-17',
      comment: 'Hello World',
      username: 'Habtamu',
    },
  ]),
}));

describe('test comments calculation function', () => {
  test('test commentCounter', async () => {
    const count = await commentCounter(100);
    expect(count).toBe(4);
  });
});