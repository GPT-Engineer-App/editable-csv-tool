import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import SnakeGame from "./pages/SnakeGame.jsx";
import NewsFeed from "./pages/NewsFeed.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
      <Route path="/snake-game" element={<SnakeGame />} />
      <Route path="/news-feed" element={<NewsFeed />} />
      </Routes>
    </Router>
  );
}

export default App;
