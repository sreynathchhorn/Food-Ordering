
import foodData from "../data/index.json";

const { popularFoods } = foodData;

export function PopularFood({
  onAddToCart,
  activeTab = "Delivery",
  searchTerm = "",
}) {
  const filteredFoods = popularFoods.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sectionTitle =
    activeTab === "Pick-up"
      ? "Popular Food for Pick-up"
      : "Popular Food";

  return (
    <section className="popular-food" id="menu">
      <h2>{sectionTitle}</h2>

      {activeTab === "Restaurants" ? (
        <p>
          Restaurant listings need their own data. We'll add them in the
          next step.
        </p>
      ) : (
        <div className="food-grid">
          {filteredFoods.length > 0 ? (
            filteredFoods.map((food) => (
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
                    <button
                      className="btn-add"
                      onClick={() => onAddToCart(food)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-food">No food found.</p>
          )}
        </div>
      )}
    </section>
  );
}
