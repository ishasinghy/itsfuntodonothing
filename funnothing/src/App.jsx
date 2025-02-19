import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Gamepad2, Stars, Heart } from "lucide-react";
import { Link } from "react-router-dom";

// Simple Card components
const Card = ({ className, children, ...props }) => (
  <div
    className={`rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 ${
      className || ""
    }`}
    {...props}
  >
    {children}
  </div>
);

const CardContent = ({ className, children, ...props }) => (
  <div className={`p-6 ${className || ""}`} {...props}>
    {children}
  </div>
);

// Floating bubble component for background animation
const FloatingBubble = ({ size, color, speed, delay, startPosition }) => {
  return (
    <motion.div
      className="absolute rounded-full opacity-20"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        top: `${startPosition.y}%`,
        left: `${startPosition.x}%`,
      }}
      animate={{
        y: [0, -100, 0],
        x: [0, Math.random() * 50 - 25, 0],
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut",
      }}
    />
  );
};

const games = [
  {
    color: "#C084FC",
    route: "/purple",
    name: "Purple Paradise",
    icon: Sparkles,
  },
  { color: "#818CF8", route: "/indigo", name: "Indigo Dreams", icon: Stars },
  { color: "#60A5FA", route: "/blue", name: "Blue Bounce", icon: Gamepad2 },
  { color: "#4ADE80", route: "/green", name: "Green Galaxy", icon: Stars },
  { color: "#FBBF24", route: "/yellow", name: "Yellow Yard", icon: Sparkles },
  { color: "#FB923C", route: "/orange", name: "Orange Orbit", icon: Gamepad2 },
  { color: "#F87171", route: "/red", name: "Red Realm", icon: Heart },
];

const GameCard = ({ color, name, route, index, icon: Icon }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="w-full flex justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link to={route} className="w-64">
        <Card className="w-full h-64 cursor-pointer overflow-hidden relative">
          <CardContent className="p-0 h-full">
            <div
              className="w-full h-full rounded-lg flex flex-col items-center justify-center gap-4 transition-all duration-300"
              style={{ backgroundColor: color }}
            >
              <motion.div
                animate={
                  isHovered
                    ? {
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0],
                      }
                    : {}
                }
                transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
              >
                <Icon className="w-12 h-12 text-white" />
              </motion.div>
              <h3 className="text-xl font-bold text-white">{name}</h3>

              {/* Mini animated sparkles that appear on hover */}
              {isHovered && (
                <>
                  <motion.div
                    className="absolute top-2 right-2 text-white"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Sparkles size={16} />
                  </motion.div>
                  <motion.div
                    className="absolute bottom-2 left-2 text-white"
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Sparkles size={16} />
                  </motion.div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

const App = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Generate 15 random bubbles for the background
  const bubbles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    size: Math.random() * 80 + 20,
    color: games[Math.floor(Math.random() * games.length)].color,
    speed: Math.random() * 15 + 10,
    delay: Math.random() * 5,
    startPosition: {
      x: Math.random() * 100,
      y: Math.random() * 100 + 50,
    },
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8 overflow-hidden relative">
      {/* Interactive background elements */}
      {bubbles.map((bubble) => (
        <FloatingBubble key={bubble.id} {...bubble} />
      ))}

      {/* Interactive cursor spotlight */}
      <div
        className="absolute pointer-events-none w-64 h-64 rounded-full bg-gradient-to-r from-pink-500/20 to-blue-500/20 blur-3xl"
        style={{
          left: `calc(${mousePosition.x}% - 128px)`,
          top: `calc(${mousePosition.y}% - 128px)`,
          transition: "left 0.5s ease, top 0.5s ease",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <Sparkles className="w-8 h-8 text-yellow-400" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-500"
            >
              Rainbow Games
            </motion.h1>
            <motion.div
              animate={{
                rotate: [0, -10, 10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 0.2,
              }}
            >
              <Sparkles className="w-8 h-8 text-yellow-400" />
            </motion.div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-300 text-lg"
          >
            Choose your color, find your fun!
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {games.map((game, index) => (
            <GameCard key={game.route} {...game} index={index} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default App;
