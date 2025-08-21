import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateDays from "./components/CreateDays";
import ResultsView from "./components/ResultsView";
import EditDay from "./components/EditDay";

function App() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-2 flex flex-col items-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nuevo" element={<CreateDays />} />
          <Route path="/results" element={<ResultsView />} />
          <Route path="/editar/:timestampEntrada" element={<EditDay />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
