import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, message: '' };
    }
    
    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, message: error.message };
    }
    
    componentDidCatch(error, info) {
        // You can also log the error to an error reporting service
        // logErrorToMyService(error, info);
    }

    render() {
        const { children } = this.props;
        const { hasError, message } = this.state;
        if (hasError) {
            return <h1>{`Something went wrong. ${message}`}</h1>;
        }
        return children;
    }
}

export default ErrorBoundary;