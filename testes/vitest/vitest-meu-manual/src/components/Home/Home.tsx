import './Home.css';

function Home() {
  return (
    <section className="home">
      <h1 className="home__title">Vitest Test</h1>

      <p className="home__lead">
        Vitest is the testing framework that finally moves at the same speed as the
        code it watches over. Born from the Vite ecosystem, it inherits the same
        native ES modules pipeline, the same lightning transform layer, and the same
        instinct that feedback should arrive before you have finished the thought
        that provoked it.
      </p>

      <p className="home__text">
        There is a quiet elegance to it. One configuration serves both the app and
        its tests. TypeScript, JSX and path aliases simply work, because the bundler
        that builds your product is the very same one that runs your assertions. Its
        watch mode is surgical &mdash; touch a single module and only the suites that
        truly depend on it wake up. What used to be a coffee break becomes a blink.
      </p>

      <p className="home__text">
        And it feels familiar from the first line. A Jest-compatible API, expressive
        matchers, first-class mocking, snapshots, in-source testing, coverage and a
        browser mode for the components that deserve a real DOM. Tests stop being a
        chore appended to the end of a sprint and become a conversation you keep
        having with your own code &mdash; fast, honest, and endlessly patient.
      </p>

      <p className="home__text">
        This little playground exists to explore exactly that: a React 19 application
        wired with Vite, TypeScript, React Router in data mode and Axios, ready for
        whatever experiment comes next.
      </p>

      <p className="home__signature">Noix. Rogoo</p>
    </section>
  );
}

export default Home;
