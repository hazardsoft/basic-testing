import axios from 'axios';
import 'lodash';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => {
  return {
    throttle: jest.fn((fn) => fn),
  };
});

describe('throttledGetDataFromApi', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  const baseURL = 'https://jsonplaceholder.typicode.com';
  const relativePath = 'fakePath';
  const response = { data: { username: 'henadzi' } };

  beforeEach(() => {
    mockedAxios.create.mockReturnThis();
    mockedAxios.get.mockResolvedValue(response);
  });

  afterAll(() => {
    jest.unmock('axios');
    jest.unmock('lodash');
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(relativePath);
    expect(mockedAxios.create).toHaveBeenCalledTimes(1);
    expect(mockedAxios.create).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(relativePath);
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenLastCalledWith(relativePath);
  });

  test('should return response data', async () => {
    await expect(throttledGetDataFromApi(relativePath)).resolves.toEqual(
      response.data,
    );
  });
});
