import React from 'react';

export class Spinner extends React.Component {
  render() {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="w-12 h-12 border-4 border-(--color-border) border-t-(--color-accent) rounded-full animate-spin" />
      </div>
    );
  }
}
