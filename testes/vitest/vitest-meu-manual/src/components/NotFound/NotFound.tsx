import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section>
      <h1>404</h1>
      <p>This page does not exist.</p>
      <Link to="/">Back to Home</Link>
    </section>
  );
}

export default NotFound;
