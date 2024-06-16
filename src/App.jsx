import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import SnakeGame from "./pages/SnakeGame.jsx";
import NewsFeed from "./pages/NewsFeed.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import Messaging from "./pages/Messaging.jsx";
import Notifications from "./pages/Notifications.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
      <Route path="/snake-game" element={<SnakeGame />} />
      <Route path="/news-feed" element={<NewsFeed />} />
      <Route path="/user/:userId" element={<UserProfile />} />
      <Route path="/messaging" element={<Messaging />} />
      <Route path="/notifications" element={<Notifications />} />
      </Routes>
    </Router>
  );
}

export default App;
