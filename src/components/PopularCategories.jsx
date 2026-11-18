
import foodData from '../data/index.json'

export function PopularCategories({
  activeTab = 'Delivery',
  selectedCategory,
  onSelectCategory,
}) {
  const { categories } = foodData

  const heading =
    activeTab === 'Pick-up'
      ? 'Browse pick-up categories'
      : activeTab === 'Restaurants'
        ? 'Explore restaurants'
        : 'Browse by category'

  return (
    <section className="popular-categories">
      <div className="section-heading">
        <div>
          <p className="eyebrow">
            {activeTab === 'Restaurants'
              ? 'FIND YOUR FAVORITE'
              : 'EXPLORE OUR MENU'}
          </p>
          <h2>{heading}</h2>
        </div>

        <button
          className="view-all-btn"
          onClick={() => onSelectCategory('All')}
        >
          View all
        </button>
      </div>

      <div className="categories-grid">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={`category-card ${
              selectedCategory === cat.name ? 'selected' : ''
            }`}
            onClick={() => onSelectCategory(cat.name)}
          >
            <span className="category-icon">{cat.icon}</span>
            <span className="category-name">{cat.name}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
