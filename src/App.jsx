import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import SnakeGame from "./pages/SnakeGame.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
      <Route path="/snake-game" element={<SnakeGame />} />
      </Routes>
    </Router>
  );
}

export default App;
