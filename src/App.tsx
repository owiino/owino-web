import { Fragment } from "react";
import "./App.css";
import { AppRouter } from "./routes/AppRouter";
import { AppProviders } from "./providers/AppProvider";

function App() {
  return (
    <Fragment>
      {/* <div className="bg-green-400">App routes here</div> */}
      <AppProviders>
        <AppRouter />
      </AppProviders>
    </Fragment>
  );
}

export default App;
