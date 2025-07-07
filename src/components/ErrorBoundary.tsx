import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorId?: string;
}

function generateErrorId() {
  return 'ERR-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

async function logErrorRemotely(error: Error, errorInfo: ErrorInfo, errorId: string) {
  // Example: send error to a remote logging service (replace with your endpoint)
  try {
    await fetch('/api/log-error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        errorId,
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        url: window.location.href,
        userAgent: navigator.userAgent,
        time: new Date().toISOString(),
      }),
    });
  } catch (e) {
    // Ignore logging errors
  }
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  async componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const errorId = generateErrorId();
    this.setState({ errorId });
    console.error('Error caught by boundary:', error, errorInfo);
    // Log error to remote endpoint
    await logErrorRemotely(error, errorInfo, errorId);
  }

  handleReload = () => {
    // Redirect to home page and clear error state
    window.location.href = '/';
  };

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorId: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-red-600 mb-2">Oops! Something went wrong</h1>
              <p className="text-muted-foreground">
                We encountered an unexpected error. Please try again or contact support if the problem persists.
              </p>
              {this.state.errorId && (
                <p className="text-xs text-muted-foreground mt-2">Error Code: <span className="font-mono">{this.state.errorId}</span></p>
              )}
            </div>
            <div className="space-y-3">
              <Button 
                onClick={this.handleRetry}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Try Again
              </Button>
              <Button 
                onClick={this.handleReload}
                variant="outline"
                className="w-full"
              >
                Go to Home Page
              </Button>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-muted-foreground">
                  Error Details (Development)
                </summary>
                <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
                  {this.state.error.message}
                  {'\n'}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary; 