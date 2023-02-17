import Media from '../modules/media.js';

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve(
    [
      {
        show: {
          id: 53815,
          url: 'https://www.tvmaze.com/shows/53815/infinity-train-documentaries',
          name: 'Infinity Train Documentaries',
          type: 'Animation',
          language: 'English',
        },
      },
      {
        show: {
          id: 26194,
          url: 'https://www.tvmaze.com/shows/26194/buzz-att-original-documentaries',
          name: 'Buzz: AT&T Original Documentaries',
          type: 'Documentary',
          language: 'English',
        },
      },
    ],
  ),
}));

describe('test get media count method', () => {
  const contents = new Media();

  test('test getContents 1', async () => {
    await contents.getContents('documentaries');
    expect(contents.getContentItemCount()).toBe(2);
  });

  test('test getContents 2', async () => {
    await contents.getContents('animals');
    await contents.getContents('hits');
    expect(contents.getContentItemCount()).toBe(6);
  });
});