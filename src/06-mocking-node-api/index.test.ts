import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = () => console.log('callback call');
    const timeout = 500;

    const spy = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, timeout);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const mockCallback = jest.fn();
    const timeout = 500;

    doStuffByTimeout(mockCallback, timeout);
    expect(mockCallback).toHaveBeenCalledTimes(0);
    jest.advanceTimersByTime(timeout);
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = () => console.log('callback call');
    const timeout = 500;

    const spy = jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, timeout);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const mockCallback = jest.fn();
    const timeout = 500;
    const timesCalled = 3;

    doStuffByInterval(mockCallback, timeout);
    jest.advanceTimersByTime(timeout * timesCalled);
    expect(mockCallback).toHaveBeenCalledTimes(timesCalled);
  });
});

jest.mock('path');
jest.mock('fs');
jest.mock('fs/promises');

describe('readFileAsynchronously', () => {
  const filePath = 'fakePath';

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should call join with pathToFile', async () => {
    const spy = jest.spyOn(path, 'join');
    await readFileAsynchronously(filePath);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(expect.anything(), filePath);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockImplementation(() => false);
    await expect(readFileAsynchronously(filePath)).resolves.toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockImplementation(() => true);
    const fileContents = 'file to read';
    const fileBuffer = Buffer.from(fileContents);
    jest
      .spyOn(fsPromises, 'readFile')
      .mockImplementation(() => Promise.resolve(fileBuffer));
    await expect(readFileAsynchronously(filePath)).resolves.toBe(fileContents);
  });
});
