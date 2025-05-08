import "./App.css";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
import Headers from "./components/Headers";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";

function App() {
  return (
    <div>
      <Router>
        <Headers />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contactUs" element={<ContactUs />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
