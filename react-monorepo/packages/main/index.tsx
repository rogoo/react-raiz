import Footer from "footer";
import Header from "header";
import React from "react";
import ReactDOM from "react-dom/client";

const App = () => (
  <div>
    <Header />
    <main>
      <p> Main e mais testeeeeeeee</p>
    </main>
    <Footer />
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
