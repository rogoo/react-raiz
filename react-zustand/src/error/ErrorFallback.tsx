interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) => {
  return (
    <div>
      <h2>Problems babyyyy... go fix!!!</h2>
      <pre style={{ color: "red" }}>
        {error.message || JSON.stringify(error)}
      </pre>
      <button onClick={resetErrorBoundary}>try again</button>
    </div>
  );
};
