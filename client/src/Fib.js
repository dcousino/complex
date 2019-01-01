import React, { Component } from 'react';
import axios from 'axios';
import SeenIndexes from './SeenIndexes';
export default class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: ''
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  fetchValues = async () => {
    const values = await axios.get('/api/values/current');
    this.setState({ values: values.data });
  };

  fetchIndexes = async () => {
    const seenIndexes = await axios.get('/api/values/all');
    this.setState({ seenIndexes: seenIndexes.data });
  };

  renderSeenIndexes = () => {
    return this.state.seenIndexes.map(({ number }) => number).join(', ');
  };

  renderValues = () => {
    const entries = [];
    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {this.state.values[key]}
        </div>
      );
    }
    return entries;
  };

  handleSubmit = async event => {
    event.preventDefault();
    await axios.post('/api/values', {
      index: this.state.index
    });
    this.setState({ index: '' });
    this.fetchValues();
    this.fetchIndexes();
  };

  onChange = event => {
    this.setState({ index: event.target.value });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="index">Enter your index:</label>
          <input
            type="text"
            name="index"
            id="index"
            value={this.state.index}
            onChange={this.onChange}
          />
          <button type="submit">Submit</button>
        </form>
        <h3>Indexes I have seen:</h3>
        <SeenIndexes indexes={this.state.seenIndexes} />
        <h3>Calculated values</h3>
        {this.renderValues()}
      </div>
    );
  }
}
