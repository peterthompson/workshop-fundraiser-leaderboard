import nock from 'nock';
import { fetchFundraisers, baseUrl, fundraisersPath } from '../';

const fundraisers = [
  { amount: 37104.00, name: 'Campbell Josephine and Libby Naylor' },
  { amount: 28827.83, name: 'Jenny payne' },
  { amount: 17350, name: 'Simon Gillespie' },
];

describe('fetchFundraisers', () => {
  describe('when data is available', () => {
    beforeAll(() => {
      nock(baseUrl)
        .get(fundraisersPath)
        .replyWithFile(200, __dirname + '/../__data__/fundraisers.json');
    });

    afterAll(() => {
      nock.cleanAll();
    });

    it('returns a list of fundraisers', () => {
      return fetchFundraisers()
        .then(fundraisers => expect(fundraisers).toEqual(fundraisers));
    });
  });

  describe('when data is unavailable', () => {
    beforeAll(() => {
      nock(baseUrl)
        .get(fundraisersPath)
        .reply(404);
    });

    afterAll(() => {
      nock.cleanAll();
    });

    it('returns an error', () => {
      return fetchFundraisers()
        .catch(err => expect(err).toEqual(Error('Data Unavailable')));
    });
  });
});
