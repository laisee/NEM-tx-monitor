const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
chai.use(chaiHttp);

const { processTransaction } = require('../controllers/transactionController');

describe('Transaction Controller', () => {
  describe('processTransaction', () => {
    const validAddress = 'TALICELCD3XPH4FFI5STGGNSNSWPOTG5E4DS2TOS';
    const nemServer = 'example-nem-server';
    const updateUrl = 'http://example.com/update';

    it('should return an array', async () => {
      const errors = await processTransaction(validAddress, nemServer, updateUrl);
      expect(errors).to.be.an('array');
    });

    it('should return an error for missing address', async () => {
      const errors = await processTransaction(null, nemServer, updateUrl);
      expect(errors).to.include('Invalid input parameters');
    });

    it('should return an error for missing nemServer', async () => {
      const errors = await processTransaction(validAddress, null, updateUrl);
      expect(errors).to.include('Invalid input parameters');
    });

    it('should return an error for missing updateUrl', async () => {
      const errors = await processTransaction(validAddress, nemServer, null);
      expect(errors).to.include('Invalid input parameters');
    });
  });
});

