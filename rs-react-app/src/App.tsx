import React from 'react';
import './App.css';
import { Main } from './components/main';
import { ErrorBoundary } from './components/error/ErrorBoundary';

export class App extends React.Component {
  render() {
    return (
      <ErrorBoundary>
        <Main />
      </ErrorBoundary>
    );
  }
}

export default App;
