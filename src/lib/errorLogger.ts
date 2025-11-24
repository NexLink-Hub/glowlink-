/**
 * Error Logging Service
 * Handles error tracking, monitoring, and reporting for production use
 */

export interface ErrorLog {
  message: string;
  error: Error | string;
  context?: Record<string, unknown>;
  timestamp: number;
  level: "error" | "warning" | "info";
}

class ErrorLogger {
  private errors: ErrorLog[] = [];
  private maxLogs = 50;

  log(message: string, error: Error | string, context?: Record<string, unknown>, level: "error" | "warning" | "info" = "error") {
    const errorLog: ErrorLog = {
      message,
      error,
      context,
      timestamp: Date.now(),
      level,
    };

    this.errors.push(errorLog);

    // Keep only recent logs in memory
    if (this.errors.length > this.maxLogs) {
      this.errors = this.errors.slice(-this.maxLogs);
    }

    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      const color = level === "error" ? "color: red" : level === "warning" ? "color: orange" : "color: blue";
      console.log(`%c[${level.toUpperCase()}] ${message}`, color, error, context);
    }

    // Send to external service in production
    if (process.env.NODE_ENV === "production") {
      this.sendToServer(errorLog);
    }
  }

  error(message: string, error: Error | string, context?: Record<string, unknown>) {
    this.log(message, error, context, "error");
  }

  warning(message: string, error: Error | string, context?: Record<string, unknown>) {
    this.log(message, error, context, "warning");
  }

  info(message: string, context?: Record<string, unknown>) {
    this.log(message, "", context, "info");
  }

  getLogs(): ErrorLog[] {
    return [...this.errors];
  }

  clearLogs() {
    this.errors = [];
  }

  private sendToServer(errorLog: ErrorLog) {
    // TODO: Implement sending logs to your backend
    // Example:
    // fetch('/api/logs', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(errorLog),
    // }).catch(err => console.error('Failed to send log', err));

    // Or use a service like Sentry:
    // Sentry.captureException(errorLog.error);
  }
}

export const errorLogger = new ErrorLogger();
