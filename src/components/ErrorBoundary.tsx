import { Component, type ReactNode, type ErrorInfo } from 'react';
import { Link } from 'react-router-dom';
import { Home, RotateCcw, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
    this.handleReset = this.handleReset.bind(this);
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error);
  }

  handleReset() {
    this.setState({ hasError: false, error: null });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-brand-surface flex items-center justify-center px-5">
          <div className="max-w-md text-center">
            <div className="bg-brand-primary/10 p-4 rounded-full w-fit mx-auto mb-6">
              <AlertTriangle className="w-10 h-10 text-brand-primary" />
            </div>
            <h1 className="text-3xl font-display font-black text-white mb-3">Something went wrong</h1>
            <p className="text-text-soft mb-2">
              An unexpected error occurred. Please try again.
            </p>
            {this.state.error && (
              <p className="text-xs text-zinc-600 mb-8 font-mono truncate max-w-full">
                {this.state.error.message}
              </p>
            )}
            <div className="flex items-center justify-center gap-4">
              <Link
                to="/"
                onClick={this.handleReset}
                className="flex items-center gap-2 bg-brand-primary text-black font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-all"
              >
                <Home className="w-4 h-4" /> Go Home
              </Link>
              <button
                onClick={() => window.location.reload()}
                className="flex items-center gap-2 border border-zinc-700 text-white font-semibold px-6 py-3 rounded-lg hover:bg-zinc-800 transition-all"
              >
                <RotateCcw className="w-4 h-4" /> Reload
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
