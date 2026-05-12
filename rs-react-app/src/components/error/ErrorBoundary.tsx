import React from 'react';

type Props = { children: React.ReactNode };
type State = { hasError: boolean; error: Error | null };

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    console.error('Application error:', error.message);
    console.error('Component stack:', info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-(--color-bg-page) min-h-screen flex flex-col items-center justify-center px-4">
          <div className="bg-(--color-bg-card) rounded-xl shadow p-8 max-w-md w-full text-center">
            <h1 className="text-(--color-text-title) text-2xl font-bold mb-3">
              Something went wrong
            </h1>
            <p className="text-(--color-text-body) mb-6">
              {this.state.error?.message ?? 'An unexpected error occurred.'}
            </p>
            <button
              className="py-2 px-6 bg-(--color-accent) text-white rounded-lg font-medium"
              onClick={() => window.location.reload()}
            >
              Reload App
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
