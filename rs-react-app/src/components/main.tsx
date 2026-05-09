import React from 'react';
import { SearchForm } from './search/SearchForm';
import { request } from './search/request';

export class Main extends React.Component {
  state = {
    query: localStorage.getItem('last_query') || '',
  };
  handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: e.target.value });
    localStorage.setItem('last_query', e.target.value);
  };
  handleSubmit = async () => {
    const { query } = this.state;
    console.log(query);
    const data = await request(query);
    console.log(data);
  };
  render() {
    return (
      <div className="bg-(--color-bg-page) absolute w-full h-full">
        <h1
          className="
          absolute top-[10vh] left-1/2 transform -translate-x-1/2 -translate-y-1/2
          text-(--color-text-title) text-3xl font-bold"
        >
          Search Pakemon
        </h1>
        <SearchForm
          query={this.state.query}
          handleSubmit={this.handleSubmit}
          handleQueryChange={this.handleQueryChange}
        />
      </div>
    );
  }
}
