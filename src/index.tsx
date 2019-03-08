import * as React from "react";
import { render } from "react-dom";

import Map from "./map";

function App() {
  return <Map />;
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
