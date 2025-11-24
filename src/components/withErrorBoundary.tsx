import ErrorBoundary from "./ErrorBoundary";
import { errorLogger } from "@/lib/errorLogger";
import React from "react";

/**
 * HOC to wrap page components with ErrorBoundary
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorFallback?: React.ReactNode
) {
  return function WithErrorBoundaryComponent(props: P) {
    return (
      <ErrorBoundary
        fallback={errorFallback}
        onError={(error, errorInfo) => {
          errorLogger.error("Page component error", error, {
            component: Component.displayName || Component.name,
            componentStack: errorInfo.componentStack,
          });
        }}
      >
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}
