import request from 'supertest';
import app from '../src/app';

describe('Add Transaction', () => {
  it('should create a new transaction', async () => {
    const response = await request(app)
      .post('/transaction')
      .send({ from: 'sender_address', to: 'receiver_address', amount: 100 });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('fromAddress');
    expect(response.body.fromAddress).toBe('sender_address');
    expect(response.body.toAddress).toBe('receiver_address');
    expect(response.body.amount).toBe(100);
  });

  it('should return 400 if required fields are missing', async () => {
    const response = await request(app).post('/transaction').send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});


describe('Get Balance', () => {
    it('should return the balance of an address', async () => {
      const response = await request(app).get('/balance/pawan');
  
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('balance');
      // Add more assertions based on your application logic for calculating the balance
    });
  
    
  });

  describe('Check Transaction History', () => {
    it('should return all transactions associated with an address', async () => {
      const response = await request(app).get('/transaction/some_address');
  
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('transactions');
      // Add more assertions based on your application logic for fetching transaction history
    });
  
    
  });