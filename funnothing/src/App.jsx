import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Gamepad2,
  Star,
  Heart,
  Cloud,
  Music,
  Zap,
  Sun,
  Moon,
} from "lucide-react";
import { Link } from "react-router-dom";

// Simple Card components
const Card = ({ className, children, ...props }) => (
  <div
    className={`rounded-lg border border-white/30 bg-white/10 backdrop-blur-md text-white shadow-xl ${
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

// Enhanced Particle component for interactive background
const Particle = ({ initialX, initialY }) => {
  const randomSize = Math.floor(Math.random() * 20) + 10;
  const shapes = ["rounded-full", "rounded", "rounded-lg", "rounded-xl"];
  const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
  const opacity = 0.5 + Math.random() * 0.5; // Higher opacity

  return (
    <motion.div
      className={`fixed ${randomShape} bg-white shadow-lg shadow-white/30`}
      style={{
        width: randomSize,
        height: randomSize,
        filter: "blur(1px)",
      }}
      initial={{
        x: initialX,
        y: initialY,
        opacity: opacity,
      }}
      animate={{
        y: initialY + Math.random() * 300 - 150,
        x: initialX + Math.random() * 300 - 150,
        opacity: 0,
        scale: 0,
      }}
      transition={{
        duration: 4 + Math.random() * 4,
        ease: "easeOut",
      }}
    />
  );
};

// Interactive floating element
const FloatingElement = ({ icon: Icon, delay, duration, x, y }) => (
  <motion.div
    className="fixed text-white/40 pointer-events-none z-0"
    initial={{ x: x, y: y }}
    animate={{
      y: y + 150,
      x: x + 80,
      rotate: 360,
    }}
    transition={{
      repeat: Infinity,
      repeatType: "reverse",
      duration: duration,
      delay: delay,
      ease: "easeInOut",
    }}
  >
    <Icon size={32} />
  </motion.div>
);

const games = [
  {
    color: "#C084FC",
    route: "/purple",
    name: "Purple Paradise",
    icon: Gamepad2,
  },
  { color: "#818CF8", route: "/indigo", name: "Indigo Dreams", icon: Star },
  { color: "#60A5FA", route: "/blue", name: "Blue Bounce", icon: Cloud },
  { color: "#4ADE80", route: "/green", name: "Green Galaxy", icon: Sparkles },
  { color: "#FBBF24", route: "/yellow", name: "Yellow Yard", icon: Heart },
  { color: "#FB923C", route: "/orange", name: "Orange Orbit", icon: Music },
  { color: "#F87171", route: "/red", name: "Red Realm", icon: Zap },
];

const GameCard = ({ color, name, route, index, icon: Icon }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
      whileHover={{
        scale: 1.1,
        y: -10,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        rotate: 2,
      }}
      whileTap={{ scale: 0.95 }}
      className="flex justify-center w-full"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link to={route} className="block w-full">
        <Card className="w-full h-64 cursor-pointer overflow-hidden border-2 transition-all duration-300">
          <CardContent className="p-0 h-full">
            <motion.div
              className="w-full h-full rounded-lg flex flex-col items-center justify-center gap-4 relative overflow-hidden"
              style={{ backgroundColor: color }}
              whileHover={{
                background: `linear-gradient(135deg, ${color}, #ff88ee)`,
              }}
            >
              {isHovered && (
                <>
                  {[...Array(15)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full bg-white/50"
                      style={{
                        width: Math.random() * 30 + 10,
                        height: Math.random() * 30 + 10,
                        top: Math.random() * 100 + "%",
                        left: Math.random() * 100 + "%",
                        filter: "blur(2px)",
                      }}
                      animate={{
                        y: [-30, 30],
                        x: [-30, 30],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 1 + Math.random(),
                        repeat: Infinity,
                        repeatType: "loop",
                      }}
                    />
                  ))}
                </>
              )}

              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.5 }}
              >
                <Icon className="w-14 h-14 text-white drop-shadow-lg" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white tracking-wider drop-shadow-md">
                {name}
              </h3>
              <motion.div
                className="absolute bottom-3 right-3"
                whileHover={{ scale: 1.5, rotate: 15 }}
                initial={{ scale: 1 }}
                animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }}
                transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0 }}
              >
                <Heart className="w-6 h-6 text-white drop-shadow-md" />
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

const App = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [theme, setTheme] = useState("light");

  // Track mouse movement with enhanced particle generation
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Add more particles and more frequently
      if (Math.random() > 0.4) {
        const newParticle = {
          id: Date.now(),
          x: e.clientX,
          y: e.clientY,
        };

        setParticles((prev) => [...prev.slice(-40), newParticle]); // Keep more particles
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Generate more floating elements for better background effect
  const floatingElements = [];
  const icons = [Heart, Star, Cloud, Sparkles, Music, Sun, Moon];

  for (let i = 0; i < 30; i++) {
    const Icon = icons[i % icons.length];
    floatingElements.push(
      <FloatingElement
        key={i}
        icon={Icon}
        delay={i * 0.3}
        duration={10 + i * 2}
        x={Math.random() * window.innerWidth}
        y={Math.random() * window.innerHeight}
      />
    );
  }

  // Theme toggle function
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const gradientStyle = {
    background:
      theme === "light"
        ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, #ff9ef3, #ff66cc, #ff45dd)`
        : `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, #8b5cf6, #6366f1, #3b82f6)`,
    transition: "background 0.8s ease",
    width: "100vw",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: -1,
  };

  return (
    <>
      {/* Full-screen gradient background */}
      <div style={gradientStyle} />

      {/* Floating background elements */}
      {floatingElements}

      {/* Mouse trail particles */}
      {particles.map((particle) => (
        <Particle
          key={particle.id}
          initialX={particle.x}
          initialY={particle.y}
        />
      ))}

      {/* Content container - spans full viewport */}
      <div className="w-screen min-h-screen pt-8 pb-16 px-4 sm:px-8 relative z-10">
        {/* Header section */}
        <div className="text-center py-16">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-12 h-12 text-white drop-shadow-lg" />
            </motion.div>
            <h1 className="text-6xl sm:text-7xl font-bold text-white drop-shadow-xl">
              Isha's Website For Nothing
            </h1>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-12 h-12 text-white drop-shadow-lg" />
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-white text-2xl font-light max-w-2xl mx-auto drop-shadow-md"
          >
            Because It's Fun To Do Nothing, & I Like Doing Nothing!
          </motion.p>
        </div>

        {/* Games grid - with improved spacing */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center w-full max-w-7xl mx-auto px-4 sm:px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {games.map((game, index) => (
            <GameCard key={game.route} {...game} index={index} />
          ))}
        </motion.div>

        {/* Interactive footer with functional buttons */}
        <motion.div
          className="text-center mt-16 mb-8 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <p className="mb-4 text-xl drop-shadow-md">
            Move your mouse around for magical particles!
          </p>
          <motion.div className="mt-8 flex justify-center gap-6 flex-wrap">
            <motion.button
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 15px rgba(255,255,255,0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-full border border-white/40 flex items-center gap-2 cursor-pointer transition-all"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
              <span>Toggle Theme</span>
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 15px rgba(255,255,255,0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setParticles([]);
                for (let i = 0; i < 100; i++) {
                  setTimeout(() => {
                    setParticles((prev) => [
                      ...prev,
                      {
                        id: Date.now() + i,
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                      },
                    ]);
                  }, i * 30);
                }
              }}
              className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-full border border-white/40 flex items-center gap-2 cursor-pointer transition-all"
            >
              <Sparkles className="w-5 h-5" />
              <span>Particle Explosion</span>
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 15px rgba(255,255,255,0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                // Animate all cards
                document
                  .querySelectorAll(".games-grid > div")
                  .forEach((el, i) => {
                    el.animate(
                      [
                        { transform: "translateY(0)" },
                        { transform: "translateY(-20px)" },
                        { transform: "translateY(0)" },
                      ],
                      {
                        duration: 500,
                        delay: i * 100,
                        easing: "ease-in-out",
                      }
                    );
                  });
              }}
              className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-full border border-white/40 flex items-center gap-2 cursor-pointer transition-all"
            >
              <Star className="w-5 h-5" />
              <span>Animate Cards</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default App;
