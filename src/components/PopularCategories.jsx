import index from "../data/index.json";

const { categories } = index;

export function PopularCategories() {
  return (
    <section className="popular-categories">
      <h2>Popular Categories</h2>
      <div className="categories-grid">
        {categories.map((cat) => (
          <div key={cat.id} className="category-card">
            <div className="category-icon">{cat.icon}</div>
            <p>{cat.name}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
