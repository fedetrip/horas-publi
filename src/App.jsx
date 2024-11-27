import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateDays from "./components/CreateDays";
import ResultsView from "./components/ResultsView";
import EditDay from "./components/EditDay";

function App() {
  return (
    <>
      <Navbar />
      <Container
        maxWidth="lg"
        sx={{
          mt: 2,
          // justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/nuevo"
            element={<CreateDays />}
          />
          <Route
            path="/results"
            element={<ResultsView />}
          />
          <Route
            path="/editar/:timestampEntrada"
            element={<EditDay />}
          />
        </Routes>
      </Container>
    </>
  );
}

export default App;
