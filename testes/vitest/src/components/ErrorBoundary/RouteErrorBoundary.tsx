import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import ErrorFallback from './ErrorFallback';

function describe(error: unknown): { title: string; detail: string } {
  if (isRouteErrorResponse(error)) {
    return {
      title: `${error.status} ${error.statusText}`,
      detail: typeof error.data === 'string' ? error.data : JSON.stringify(error.data),
    };
  } else if (error instanceof Error) {
    return { title: 'Something went wrong', detail: error.message };
  } else {
    return { title: 'Something went wrong', detail: String(error) };
  }
}

/**
 * Rendered by the data router when a route component, loader or action throws.
 */
function RouteErrorBoundary() {
  const error = useRouteError();
  const { title, detail } = describe(error);

  return (
    <ErrorFallback
      title={title}
      detail={import.meta.env.DEV ? detail : undefined}
      onRetry={() => window.location.reload()}
    />
  );
}

export default RouteErrorBoundary;
