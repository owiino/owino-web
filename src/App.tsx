import { useState, Fragment } from "react";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Fragment>
      <div className="bg-green-400">App routes here</div>
    </Fragment>
  );
}

export default App;
