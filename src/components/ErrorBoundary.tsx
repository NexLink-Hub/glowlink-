import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });

    // Log error for monitoring
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    // Call optional error callback
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Send to error tracking service in production
    if (process.env.NODE_ENV === "production") {
      // Example: Sentry.captureException(error);
      // Example: logErrorToServer(error, errorInfo);
    }
  }

  private handleReset = () => {
    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
    });
  };

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-6">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-lg p-8">
              <div className="text-center">
                <div className="text-6xl mb-4">⚠️</div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h1>
                <p className="text-gray-600 mb-4">We encountered an unexpected error. Please try again.</p>

                {process.env.NODE_ENV === "development" && this.state.error && (
                  <div className="mt-6 p-4 bg-red-50 rounded-lg text-left max-h-60 overflow-auto">
                    <p className="text-sm font-mono text-red-700 break-words font-semibold mb-2">Error:</p>
                    <p className="text-xs text-red-600 mb-3 break-words">{this.state.error.toString()}</p>
                    {this.state.errorInfo?.componentStack && (
                      <details className="mt-3">
                        <summary className="text-xs font-semibold text-red-600 cursor-pointer hover:underline">
                          Component Stack
                        </summary>
                        <pre className="text-xs text-red-600 mt-2 overflow-auto max-h-40 whitespace-pre-wrap bg-white p-2 rounded border border-red-200">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </details>
                    )}
                  </div>
                )}

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => (window.location.href = "/")}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-full font-medium transition-all"
                  >
                    Go Home
                  </button>
                  <button
                    onClick={this.handleReset}
                    className="flex-1 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full font-medium transition-all"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
