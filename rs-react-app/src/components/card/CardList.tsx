import React from 'react';
import { Card } from './Card';

type CardListProps = { items: Record<string, unknown>[] };

export class CardList extends React.Component<CardListProps> {
  render() {
    return (
      <div className="flex flex-col gap-4 w-full">
        {this.props.items.map((item, i) => (
          <Card key={i} data={item} />
        ))}
      </div>
    );
  }
}
