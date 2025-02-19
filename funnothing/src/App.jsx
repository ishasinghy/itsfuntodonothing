import { Routes, Route, Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./styles.css";

import PurpleGame from "./pages/PurpleGame";
import BlueGame from "./pages/BlueGame";
import GreenGame from "./pages/GreenGame";
import YellowGame from "./pages/YellowGame";
import OrangeGame from "./pages/OrangeGame";
import RedGame from "./pages/RedGame";
import Card from "./components/Card";

const games = [
  { name: "Purple Game", path: "/purple", color: "#9b59b6" },
  { name: "Blue Game", path: "/blue", color: "#3498db" },
  { name: "Green Game", path: "/green", color: "#2ecc71" },
  { name: "Yellow Game", path: "/yellow", color: "#f1c40f" },
  { name: "Orange Game", path: "/orange", color: "#e67e22" },
  { name: "Red Game", path: "/red", color: "#e74c3c" },
];

function App() {
  return (
    <div className="container">
      <h1 className="title">Fun Rainbow Games</h1>
      <div className="cards">
        {games.map((game, index) => (
          <Card key={index} game={game} />
        ))}
      </div>

      <Routes>
        <Route path="/purple" element={<PurpleGame />} />
        <Route path="/blue" element={<BlueGame />} />
        <Route path="/green" element={<GreenGame />} />
        <Route path="/yellow" element={<YellowGame />} />
        <Route path="/orange" element={<OrangeGame />} />
        <Route path="/red" element={<RedGame />} />
      </Routes>
    </div>
  );
}

export default App;
