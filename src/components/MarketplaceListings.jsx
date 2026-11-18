
const restaurants = [
  {
    id: 1,
    name: 'Pizza House',
    category: 'Pizza • Italian',
    rating: 4.8,
    time: '20–30 min',
    icon: '🍕',
    description: 'Fresh pizza made with quality ingredients.',
  },
  {
    id: 2,
    name: 'Burger King',
    category: 'Burgers • Fast Food',
    rating: 4.7,
    time: '15–25 min',
    icon: '🍔',
    description: 'Delicious burgers and crispy fries.',
  },
  {
    id: 3,
    name: 'Chicken World',
    category: 'Chicken • Fast Food',
    rating: 4.9,
    time: '20–35 min',
    icon: '🍗',
    description: 'Enjoy crispy and freshly prepared chicken.',
  },
  {
    id: 4,
    name: 'Sweet Dessert',
    category: 'Desserts • Drinks',
    rating: 4.6,
    time: '15–25 min',
    icon: '🍰',
    description: 'Cakes, ice cream and refreshing drinks.',
  },
]

const shops = [
  {
    id: 1,
    name: 'Fresh Market',
    category: 'Groceries',
    rating: 4.8,
    time: '20–35 min',
    icon: '🥬',
    description: 'Fresh vegetables, fruits and daily groceries.',
  },
  {
    id: 2,
    name: 'Daily Essentials',
    category: 'Convenience',
    rating: 4.7,
    time: '15–30 min',
    icon: '🛒',
    description: 'Everyday products and household essentials.',
  },
  {
    id: 3,
    name: 'Beauty Store',
    category: 'Beauty',
    rating: 4.6,
    time: '25–40 min',
    icon: '💄',
    description: 'Beauty and personal care products.',
  },
  {
    id: 4,
    name: 'Drink Corner',
    category: 'Beverages',
    rating: 4.9,
    time: '15–25 min',
    icon: '🥤',
    description: 'Coffee, juice and refreshing beverages.',
  },
]

export function MarketplaceListings({
  activeTab,
  searchTerm = '',
}) {
  const isRestaurant = activeTab === 'Restaurants'

  const listings = isRestaurant ? restaurants : shops

  const filteredListings = listings.filter((item) =>
    `${item.name} ${item.category}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  )

  return (
    <section className="popular-food marketplace-listings">
      <div className="section-heading">
        <div>
          <p className="eyebrow">
            {isRestaurant ? 'EXPLORE RESTAURANTS' : 'EXPLORE SHOPS'}
          </p>

          <h2>
            {isRestaurant
              ? 'Popular Restaurants'
              : 'Popular Shops'}
          </h2>
        </div>
      </div>

      {filteredListings.length > 0 ? (
        <div className="food-grid">
          {filteredListings.map((item) => (
            <article className="food-card marketplace-card" key={item.id}>
              <div className="marketplace-card-image">
                <span>{item.icon}</span>
              </div>

              <div className="food-info">
                <h3>{item.name}</h3>

                <p>{item.category}</p>

                <p className="marketplace-description">
                  {item.description}
                </p>

                <div className="food-rating">
                  <span className="rating-stars">★</span>
                  <span className="rating-value">{item.rating}</span>
                  <span className="rating-reviews">
                    • {item.time}
                  </span>
                </div>

                <span className="marketplace-status">
                  Available on Foodies
                </span>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="no-food">
          No {isRestaurant ? 'restaurants' : 'shops'} found.
        </p>
      )}
    </section>
  )
}
