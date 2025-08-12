import React from 'react';

type Props = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

type State = {
  hasError: boolean;
  error?: Error;
};

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    // eslint-disable-next-line no-console
    console.error('[ErrorBoundary]', error, info);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div style={{ padding: 20, color: '#ffb3b3', background: 'rgba(255,0,0,0.07)', border: '1px solid rgba(255,0,0,0.2)', borderRadius: 8 }}>
          <h3 style={{ marginTop: 0 }}>Une erreur est survenue</h3>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{String(this.state.error?.message ?? 'Unknown error')}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}


