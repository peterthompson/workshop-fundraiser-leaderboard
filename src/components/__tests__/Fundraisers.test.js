jest.mock('../../api');
jest.useFakeTimers();

import React from 'react';
import { mount } from 'enzyme';
import { fetchFundraisers, setResponse } from '../../api';
import Fundraisers from '../Fundraisers';

const fundraisers = [
  { amount: 37104.00, name: 'Campbell Josephine and Libby Naylor' },
  { amount: 28827.83, name: 'Jenny payne' },
  { amount: 17350, name: 'Simon Gillespie' },
];

describe('Fundraisers', () => {
  describe('when data is available', () => {
    it('renders a list of fundraisers', () => {
      setResponse(fundraisers);

      const component = mount(<Fundraisers />);

      expect(component.text()).toBe('Loading…');

      jest.runAllTicks(() => {
        fundraisers.forEach(fundraiser => {
          expect(component.text()).toContain(fundraiser.name);
          expect(component.text()).toContain(fundraiser.amount);
        })
      });
    });
  });

  describe('when data is unavailable', () => {
    it('renders the text "Data Unavailable"', () => {
      setResponse(Error('Data Unavailable'));

      const component = mount(<Fundraisers />);

      expect(component.text()).toBe('Loading…');

      jest.runAllTicks(() => {
        expect(component.text()).toBe('Data Unavailable');
      });
    });
  });
});
