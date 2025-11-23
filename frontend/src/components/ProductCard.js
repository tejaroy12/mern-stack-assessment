import { Star } from "lucide-react";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <div className="prod-card">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="prod-img"
        onError={(e) => (e.target.src = "https://placehold.co/400")}
      />

      <div className="prod-info">
        <h3>{product.name}</h3>
        <p className="price">${product.price.toFixed(2)}</p>

        <div className="bottom">
          <div className="rating">
            {[...Array(5)].map((_, idx) => (
              <Star
                key={idx}
                size={16}
                fill={idx < product.rating ? "#ffc107" : "none"}
                stroke="#ccc"
              />
            ))}
          </div>

          <button className="add-btn">+</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
