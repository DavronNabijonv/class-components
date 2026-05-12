import React from 'react';
import { Card } from '../card/Card';
import { CardList } from '../card/CardList';

type ResultDisplayProps = { data: Record<string, unknown> };

export class ResultDisplay extends React.Component<ResultDisplayProps> {
  render() {
    const { data } = this.props;
    const items = data.results;

    if (Array.isArray(items) && items.every((i) => i !== null && typeof i === 'object')) {
      return <CardList items={items as Record<string, unknown>[]} />;
    }

    return <Card data={data} />;
  }
}
