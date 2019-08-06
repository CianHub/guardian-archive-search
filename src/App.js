import React from "react";
import "./App.css";
import FrontPage from "./components/front-page/frontPage";
import { Container } from "@material-ui/core";

function App() {
  return (
    <Container className="App" maxWidth="xl">
      <FrontPage />
    </Container>
  );
}

export default App;
