import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';
import lodash from 'lodash';

const initialBalance = 101;
const invalidaWithdrawalAmount = initialBalance + 1;
const invalidTransferAmount = initialBalance + 2;
const depositAmount = 10;
const withdrawalAmount = initialBalance - 1;
const transferAmount = initialBalance - 2;

describe('BankAccount', () => {
  let account: BankAccount;

  beforeEach(() => {
    account = getBankAccount(initialBalance);
  });

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(invalidaWithdrawalAmount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const toAccount = getBankAccount(initialBalance);
    expect(() => account.transfer(invalidTransferAmount, toAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(invalidTransferAmount, account)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    account.deposit(depositAmount);
    expect(account.getBalance()).toBe(initialBalance + depositAmount);
  });

  test('should withdraw money', () => {
    account.withdraw(withdrawalAmount);
    expect(account.getBalance()).toBe(initialBalance - withdrawalAmount);
  });

  test('should transfer money', () => {
    const toAccount = getBankAccount(initialBalance);
    account.transfer(transferAmount, toAccount);
    expect(account.getBalance()).toBe(initialBalance - transferAmount);
    expect(toAccount.getBalance()).toBe(initialBalance + transferAmount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const fetchedBalance = 42;
    const spy = jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(fetchedBalance) // used as random balance received
      .mockReturnValueOnce(1); // used to determine if request is failed, 0 - fail, 1 - success
    await expect(account.fetchBalance()).resolves.toBe(fetchedBalance);
    expect(spy).toHaveBeenCalledTimes(2);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const syncBalance = 200;
    account.fetchBalance = jest.fn(() => Promise.resolve(syncBalance));
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(syncBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    account.fetchBalance = jest.fn(() => Promise.resolve(null));
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
