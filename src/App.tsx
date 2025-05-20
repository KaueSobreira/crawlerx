import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Home from "./views/home";
import Api from "./views/api";
import Script from "./views/script";

function App() {
  return (
    <Router>
      <Header />
      <main className="flex-1 bg-black">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/api" element={<Api />} />
          <Route path="/script" element={<Script />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
