import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Gamepad2, Sparkles, Star, Trophy, Heart, Search } from "lucide-react";
import PurpleBubblePop from "./routes/PurpleBubblePop";

const App = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [favorites, setFavorites] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const games = [
    {
      id: 1,
      title: "Purple Bubble Pop",
      description: "Pop colorful bubbles in this arcade-style game!",
      path: "/bubble-pop",
      color: "bg-purple-500",
      category: "arcade",
      component: PurpleBubblePop,
      ready: true,
      rating: 4.5,
    },
    {
      id: 2,
      title: "Game 2",
      description: "Coming soon...",
      path: "/game2",
      color: "bg-blue-500",
      category: "puzzle",
      component: null,
      ready: false,
      rating: 0,
    },
    // Add more games here
  ];

  const categories = [
    { id: "all", name: "All Games" },
    { id: "arcade", name: "Arcade" },
    { id: "puzzle", name: "Puzzle" },
    { id: "action", name: "Action" },
  ];

  const toggleFavorite = (gameId) => {
    setFavorites((prev) => {
      if (prev.includes(gameId)) {
        return prev.filter((id) => id !== gameId);
      }
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
      return [...prev, gameId];
    });
  };

  const filteredGames = games.filter((game) => {
    const matchesSearch = game.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || game.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Confetti effect component
  const Confetti = () => (
    <div className="fixed inset-0 pointer-events-none">
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="absolute animate-confetti"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-10px`,
            backgroundColor: ["#FFD700", "#FF69B4", "#4169E1"][
              Math.floor(Math.random() * 3)
            ],
            width: "10px",
            height: "10px",
            transform: `rotate(${Math.random() * 360}deg)`,
            animationDuration: `${1 + Math.random() * 2}s`,
            animationDelay: `${Math.random() * 0.5}s`,
          }}
        />
      ))}
    </div>
  );

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <Routes>
          <Route
            path="/"
            element={
              <div className="container mx-auto px-4 py-8">
                {showConfetti && <Confetti />}

                <header className="text-center mb-12">
                  <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-2">
                    <Gamepad2 className="h-8 w-8 animate-bounce" />
                    Interactive Arcade Hub
                    <Sparkles className="h-8 w-8 animate-spin" />
                  </h1>
                  <p className="text-purple-200 animate-pulse">
                    Explore a collection of unique interactive experiences
                  </p>
                </header>

                {/* Search and Filter Section */}
                <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-center">
                  <div className="relative">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type="text"
                      placeholder="Search games..."
                      className="pl-10 pr-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          selectedCategory === category.id
                            ? "bg-purple-500 text-white"
                            : "bg-white/10 text-white hover:bg-white/20"
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Games Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredGames.map((game) => (
                    <div
                      key={game.id}
                      className={`relative bg-white/10 rounded-lg p-6 transform transition-all duration-300 hover:scale-105 ${
                        hoveredCard === game.id ? "z-10" : "z-0"
                      }`}
                      onMouseEnter={() => setHoveredCard(game.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <div
                        className={`absolute inset-0 ${game.color} opacity-10 rounded-lg`}
                      />
                      <div className="flex justify-between items-start mb-4">
                        <h2 className="text-2xl font-bold text-white">
                          {game.title}
                        </h2>
                        <button
                          onClick={() => toggleFavorite(game.id)}
                          className="text-white hover:scale-110 transition-transform"
                        >
                          <Heart
                            fill={
                              favorites.includes(game.id) ? "#ff69b4" : "none"
                            }
                            color={
                              favorites.includes(game.id) ? "#ff69b4" : "white"
                            }
                          />
                        </button>
                      </div>
                      <p className="text-gray-300 mb-4">{game.description}</p>

                      {/* Rating Stars */}
                      <div className="flex items-center mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={16}
                            className={`${
                              star <= game.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-400"
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-gray-300">
                          {game.rating.toFixed(1)}
                        </span>
                      </div>

                      {game.ready ? (
                        <Link
                          to={game.path}
                          className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors group"
                        >
                          Play Now
                          <Gamepad2 className="ml-2 h-4 w-4 group-hover:animate-bounce" />
                        </Link>
                      ) : (
                        <span className="inline-flex items-center px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed">
                          Coming Soon
                          <Sparkles className="ml-2 h-4 w-4" />
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            }
          />

          <Route path="/bubble-pop" element={<PurpleBubblePop />} />
          {/* Add more routes as you create games */}
        </Routes>
      </div>
    </Router>
  );
};

// Add custom animation
const style = document.createElement("style");
style.textContent = `
  @keyframes confetti {
    0% { transform: translateY(0) rotate(0deg); }
    100% { transform: translateY(100vh) rotate(360deg); }
  }
  .animate-confetti {
    animation: confetti 2s linear forwards;
  }
`;
document.head.appendChild(style);

export default App;
