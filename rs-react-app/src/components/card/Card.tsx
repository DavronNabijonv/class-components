import React from 'react';

type CardProps = { data: Record<string, unknown> };
type ValueRendererProps = { value: unknown; depth?: number };

function toLabel(item: unknown): string {
  if (item === null || item === undefined) return '—';
  if (typeof item !== 'object') return String(item);
  const obj = item as Record<string, unknown>;
  if (typeof obj.name === 'string') return obj.name;
  for (const v of Object.values(obj)) {
    if (v && typeof v === 'object') {
      const nested = v as Record<string, unknown>;
      if (typeof nested.name === 'string') return nested.name;
    }
  }
  return JSON.stringify(obj);
}

class ValueRenderer extends React.Component<ValueRendererProps> {
  render() {
    const { value, depth = 0 } = this.props;

    if (value === null || value === undefined) return <span>—</span>;

    if (Array.isArray(value)) {
      if (value.length === 0) return <span className="text-(--color-text-body)">—</span>;
      return (
        <select className="border border-(--color-border) rounded px-2 py-1 text-sm bg-(--color-bg-card) text-(--color-text-body) capitalize">
          {value.map((item, i) => (
            <option key={i}>{toLabel(item)}</option>
          ))}
        </select>
      );
    }

    if (typeof value === 'string') {
      if (/^https?:\/\/.+\.(png|jpg|jpeg|gif|webp)(\?.*)?$/i.test(value)) {
        return <img src={value} alt="" className="w-16 h-16 object-contain" />;
      }
      if (/^https?:\/\//.test(value)) {
        return <span className="text-(--color-text-url) text-sm break-all">{value}</span>;
      }
      return <span className="text-(--color-text-body) capitalize">{value}</span>;
    }

    if (typeof value === 'number' || typeof value === 'boolean') {
      return <span className="text-(--color-text-body)">{String(value)}</span>;
    }

    if (typeof value === 'object') {
      if (depth >= 2) {
        return (
          <span className="text-(--color-text-body) text-sm font-mono break-all">
            {JSON.stringify(value)}
          </span>
        );
      }
      const entries = Object.entries(value as Record<string, unknown>);
      return (
        <div className="flex flex-col gap-1 pl-3 border-l-2 border-(--color-border)">
          {entries.map(([k, v]) => (
            <div key={k} className="flex items-start gap-2 text-sm">
              <span className="text-(--color-text-body) font-medium min-w-20 capitalize shrink-0">
                {k}
              </span>
              <ValueRenderer value={v} depth={depth + 1} />
            </div>
          ))}
        </div>
      );
    }

    return <span className="text-(--color-text-body)">{String(value)}</span>;
  }
}

export class Card extends React.Component<CardProps> {
  render() {
    const { data } = this.props;

    return (
      <div className="bg-(--color-bg-card) rounded-xl shadow p-6 w-full">
        {typeof data.name === 'string' && (
          <h2 className="text-(--color-text-title) text-xl font-bold capitalize mb-4 border-b border-(--color-border) pb-3">
            {data.name}
          </h2>
        )}
        <div className="flex flex-col gap-4">
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className="flex items-start gap-4">
              <span className="text-(--color-text-body) font-semibold min-w-28 capitalize text-sm shrink-0">
                {key}
              </span>
              <div className="flex-1 min-w-0">
                <ValueRenderer value={value} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
