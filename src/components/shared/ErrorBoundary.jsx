import React from 'react'

/**
 * Error boundary to catch React errors and show a fallback instead of crashing.
 * Use to wrap components that may throw (e.g. charts, third-party libs).
 */
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error }
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught:', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback
            }
            return (
                <div
                    className="calculator-section"
                    style={{
                        background: '#fef2f2',
                        border: '1px solid #fecaca',
                        borderRadius: '12px',
                        padding: '20px',
                        color: '#991b1b'
                    }}
                >
                    <p style={{ margin: 0, fontWeight: 500 }}>Something went wrong loading the dashboard.</p>
                    <p style={{ margin: '8px 0 0 0', fontSize: '0.9em', opacity: 0.9 }}>
                        {this.state.error?.message || 'Unknown error'}
                    </p>
                </div>
            )
        }
        return this.props.children
    }
}

export default ErrorBoundary
