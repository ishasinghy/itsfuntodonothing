import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Card = ({ game }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="card"
      style={{ backgroundColor: game.color }}
    >
      <Link to={game.path} className="card-link">
        {game.name}
      </Link>
    </motion.div>
  );
};

export default Card;
