import React from 'react';

type ConstructorType = {
  query: string;
  handleSubmit: () => void;
  handleQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export class SearchForm extends React.Component<ConstructorType> {
  render() {
    return (
      <form
        className="
        flex items-center gap-3 absolute top-[20vh] bg-white p-3 rounded-xl left-1/2
        transform -translate-x-1/2 -translate-y-1/2"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          this.props.handleSubmit();
        }}
      >
        <input
          type="text"
          className="border border-(--color-border) py-1 px-2 rounded-sm"
          placeholder="Write Pakemon name"
          required
          value={this.props.query}
          onChange={this.props.handleQueryChange}
        />
        <button
          type="submit"
          className="py-1.5 px-3 bg-(--color-bg-card) text-(--color-btn-text) rounded-sm"
        >
          Search
        </button>
      </form>
    );
  }
}
