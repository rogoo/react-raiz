import './ErrorBoundary.css';

interface ErrorFallbackProps {
  title?: string;
  message?: string;
  detail?: string;
  onRetry?: () => void;
}

/**
 * Plain <a> instead of <Link>: this view also renders above <RouterProvider>,
 * where there is no router context, and a full reload is a sane way out of a
 * broken render.
 */
function ErrorFallback({
  title = 'Something went wrong',
  message = 'An unexpected error occurred while rendering this page.',
  detail,
  onRetry,
}: ErrorFallbackProps) {
  return (
    <section className="error-boundary" role="alert">
      <h1 className="error-boundary__title">{title}</h1>
      <p className="error-boundary__text">{message}</p>

      {detail && <pre className="error-boundary__detail">{detail}</pre>}

      <div className="error-boundary__actions">
        {onRetry && (
          <button type="button" onClick={onRetry}>
            Try again
          </button>
        )}
        <a href="/" className="error-boundary__link">
          Back to Home
        </a>
      </div>
    </section>
  );
}

export default ErrorFallback;
