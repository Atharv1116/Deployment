import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-dark-900 text-red-500 p-8">
                    <div className="max-w-2xl">
                        <h1 className="text-3xl font-bold mb-4">Something went wrong.</h1>
                        <p className="mb-4 text-gray-300">The application encountered an error. Please try refreshing the page.</p>
                        <pre className="bg-dark-800 p-4 rounded overflow-auto text-sm text-red-400">
                            {this.state.error && this.state.error.toString()}
                            <br />
                            {this.state.errorInfo && this.state.errorInfo.componentStack}
                        </pre>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="mt-6 px-6 py-2 bg-primary text-dark-900 rounded-lg hover:bg-opacity-90 font-bold"
                        >
                            Return Home
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
