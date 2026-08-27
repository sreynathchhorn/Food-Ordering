import React from "react";
import foodData from "../data/index.json";

const { popularFoods } = foodData;

export function PopularFood() {
  return (
    <section className="popular-food">
      <h2>Popular Food</h2>

      <div className="food-grid">
        {popularFoods.map((food) => (
          <div key={food.id} className="food-card">
            <div className="food-image">
              <img src={food.image} alt={food.name} />
              <span className="food-label">BEST</span>
            </div>

            <div className="food-info">
              <h3>{food.name}</h3>

              <div className="food-rating">
                <span className="rating-stars">★</span>
                <span className="rating-value">{food.rating}</span>
                <span className="rating-reviews">
                  ({food.reviews} reviews)
                </span>
              </div>

              <div className="food-footer">
                <span className="food-price">{food.price}</span>
                <button className="btn-add">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}