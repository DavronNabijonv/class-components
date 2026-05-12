import React from 'react';

type HeaderProps = { title: string };

export class Header extends React.Component<HeaderProps> {
  render() {
    return (
      <h1 className="text-(--color-text-title) text-3xl font-bold mb-10">
        {this.props.title}
      </h1>
    );
  }
}
