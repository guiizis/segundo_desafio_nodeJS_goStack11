import request from 'supertest';
import { validate as isUuid } from 'uuid';
import server from '../server';

describe('Transaction', () => {
  it('should be able to create a new transaction', async () => {
    const response = await request(server).post('/transactions').send({
      title: 'Loan',
      type: 'income',
      value: 1200,
    });

    expect(isUuid(response.body.id)).toBe(true);

    expect(response.body).toMatchObject({
      title: 'Loan',
      type: 'income',
      value: 1200,
    });
  });

  it('should be able to list the transactions', async () => {
    await request(server).post('/transactions').send({
      title: 'Salary',
      type: 'income',
      value: 3000,
    });

    await request(server).post('/transactions').send({
      title: 'Bicycle',
      type: 'outcome',
      value: 1500,
    });

    const response = await request(server).get('/transactions');

    expect(response.body.transactions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          title: 'Salary',
          type: 'income',
          value: 3000,
        }),
        expect.objectContaining({
          id: expect.any(String),
          title: 'Bicycle',
          type: 'outcome',
          value: 1500,
        }),
        expect.objectContaining({
          id: expect.any(String),
          title: 'Loan',
          type: 'income',
          value: 1200,
        }),
      ]),
    );

    expect(response.body.balance).toMatchObject({
      income: 4200,
      outcome: 1500,
      total: 2700,
    });
  });

  it('should not be able to create outcome transaction without a valid balance', async () => {
    const response = await request(server).post('/transactions').send({
      title: 'Bicycle',
      type: 'outcome',
      value: 3000,
    });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        error: expect.any(String),
      }),
    );
  });
});
