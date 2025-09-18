// src/components/ErrorBoundary.jsx
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorDetails: null,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error: error,
      errorDetails: {
        message: error.message,
        stack: error.stack,
        name: error.name,
      },
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error);
    console.error("Error info:", errorInfo);

    this.setState({
      error: error,
      errorInfo: errorInfo,
      errorDetails: {
        message: error.message,
        stack: error.stack,
        name: error.name,
        componentStack:
          errorInfo?.componentStack || "No component stack available",
      },
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "20px",
            textAlign: "center",
            backgroundColor: "#f8f9fa",
            border: "1px solid #dee2e6",
            borderRadius: "8px",
            margin: "20px",
          }}
        >
          <h2 style={{ color: "#dc3545" }}>Something went wrong</h2>
          <p style={{ color: "#6c757d", marginBottom: "20px" }}>
            The application encountered an error. Please check the console for
            more details.
          </p>

          {this.state.errorDetails && (
            <details
              style={{
                textAlign: "left",
                backgroundColor: "#f8f9fa",
                padding: "10px",
                borderRadius: "4px",
                marginBottom: "20px",
              }}
            >
              <summary style={{ cursor: "pointer", fontWeight: "bold" }}>
                Error Details
              </summary>
              <div
                style={{
                  marginTop: "10px",
                  fontSize: "14px",
                  fontFamily: "monospace",
                }}
              >
                <p>
                  <strong>Type:</strong> {this.state.errorDetails.name}
                </p>
                <p>
                  <strong>Message:</strong> {this.state.errorDetails.message}
                </p>
                {this.state.errorDetails.stack && (
                  <details style={{ marginTop: "10px" }}>
                    <summary>Stack Trace</summary>
                    <pre
                      style={{
                        whiteSpace: "pre-wrap",
                        fontSize: "12px",
                        overflow: "auto",
                        maxHeight: "200px",
                      }}
                    >
                      {this.state.errorDetails.stack}
                    </pre>
                  </details>
                )}
                {this.state.errorDetails.componentStack && (
                  <details style={{ marginTop: "10px" }}>
                    <summary>Component Stack</summary>
                    <pre
                      style={{
                        whiteSpace: "pre-wrap",
                        fontSize: "12px",
                        overflow: "auto",
                        maxHeight: "200px",
                      }}
                    >
                      {this.state.errorDetails.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            </details>
          )}

          <div>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              Reload Page
            </button>
            <button
              onClick={() =>
                this.setState({
                  hasError: false,
                  error: null,
                  errorInfo: null,
                  errorDetails: null,
                })
              }
              style={{
                padding: "10px 20px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
