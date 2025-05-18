import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Home from "./views/home";
import Api from "./views/api";

function App() {
  return (
    <Router>
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/api" element={<Api />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
