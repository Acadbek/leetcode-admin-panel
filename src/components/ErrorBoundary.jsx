import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error: error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary tomonidan ushlangan xatolik:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', border: '1px solid red', borderRadius: '8px' }}>
          <h2>Oops! Dasturda kutilmagan xatolik yuz berdi.</h2>
          <p>Biz bu muammodan xabardormiz va uni tez orada hal qilamiz.</p>
          <button onClick={() => window.location.reload()}>Sahifani yangilash</button>
          <details style={{ marginTop: '20px', whiteSpace: 'pre-wrap' }}>
            <summary>Xatolik tafsilotlari</summary>
            {this.state.error && this.state.error.toString()}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;