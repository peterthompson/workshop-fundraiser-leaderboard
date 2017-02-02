import React, { Component } from 'react';
import uniqueId from 'lodash/uniqueId';
import { fetchFundraisers } from '../api';

class Fundraisers extends Component {

  constructor() {
    super();
    this.state = {
      isLoading: true,
      fundraisers: null,
      isError: false,
    };
  }

  componentDidMount() {
    fetchFundraisers()
      .then(fundraisers => {
        this.setState({
          isLoading: false,
          fundraisers,
          isError: false,
        })
      })
      .catch(err => {
        this.setState({
          isLoading: false,
          fundraisers: null,
          isError: true,
        });
      })
  }

  render() {
    const { isLoading, fundraisers, isError, } = this.state;

    if (isError) return (<div>Data Unavailable</div>);

    if (isLoading) return (<div>Loading&hellip;</div>);

    return (
      <div>
        <ol>
          { fundraisers.map(({ name, amount }) => (
            <li key={uniqueId()}>&pound;{amount} - {name}</li>
          )) }
        </ol>
      </div>
    );
  }
}

export default Fundraisers;
