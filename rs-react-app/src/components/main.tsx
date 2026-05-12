import React from 'react';
import { Header } from './header/Header';
import { SearchForm } from './search/SearchForm';
import { ResultDisplay } from './result/ResultDisplay';
import { Spinner } from './loading/Spinner';
import { request } from './request/request';

type State = {
  query: string;
  result: Record<string, unknown> | null;
  loading: boolean;
  error: string | null;
  lastSearchedQuery: string | null;
  shouldThrow: boolean;
};

export class Main extends React.Component<object, State> {
  state: State = {
    query: localStorage.getItem('last_query') ?? '',
    result: null,
    loading: false,
    error: null,
    lastSearchedQuery: null,
    shouldThrow: false,
  };

  componentDidMount() {
    void this.doFetch(this.state.query.trim());
  }

  handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = () => {
    const trimmed = this.state.query.trim();
    if (trimmed === this.state.lastSearchedQuery) return;
    this.setState({ query: trimmed });
    localStorage.setItem('last_query', trimmed);
    void this.doFetch(trimmed);
  };

  doFetch = async (query: string) => {
    this.setState({ loading: true, error: null, result: null });
    try {
      const data = await request(query);
      this.setState({
        result: data as unknown as Record<string, unknown>,
        loading: false,
        lastSearchedQuery: query,
      });
    } catch (err) {
      this.setState({ error: (err as Error).message, loading: false });
    }
  };

  render() {
    if (this.state.shouldThrow) {
      throw new Error('Simulated application error');
    }

    const { result, loading, error } = this.state;

    return (
      <div className="bg-(--color-bg-page) min-h-screen flex flex-col items-center pt-[10vh] px-4 pb-10">
        <Header title="Search Pokemon" />

        <SearchForm
          query={this.state.query}
          handleSubmit={this.handleSubmit}
          handleQueryChange={this.handleQueryChange}
        />

        <button
          className="mt-3 text-xs text-red-400 underline underline-offset-2"
          onClick={() => this.setState({ shouldThrow: true })}
        >
          Simulate Error
        </button>

        {loading && <Spinner />}

        {!loading && error && (
          <p className="mt-10 text-red-500 font-medium">{error}</p>
        )}

        {!loading && result && (
          <div className="mt-8 w-full max-w-lg">
            <ResultDisplay data={result} />
          </div>
        )}
      </div>
    );
  }
}
