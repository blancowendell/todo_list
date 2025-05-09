import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error in Tour component:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>An error occurred in the Tour component.</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
