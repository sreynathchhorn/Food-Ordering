
import { useState } from 'react'
import './App.css'
import { HomePage } from './pages/HomePage'
import { AuthModal } from './components/AuthModal'

function App() {
  const [cartItems, setCartItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('Delivery')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [authMode, setAuthMode] = useState(null)

  const [locationName, setLocationName] = useState(
    () => localStorage.getItem('foodiesLocation') || ''
  )
  const [locationInput, setLocationInput] = useState('')
  const [isLocationOpen, setIsLocationOpen] = useState(false)

  // Load logged-in user from browser storage
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem('foodiesCurrentUser')
      ) || null
    } catch {
      return null
    }
  })

  const cartCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  )

  const cartTotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.price.replace('$', '')) * item.quantity,
    0
  )

  // Add food to cart
  function addToCart(food) {
    setCartItems((items) => {
      const existingItem = items.find(
        (item) => item.id === food.id
      )

      if (existingItem) {
        return items.map((item) =>
          item.id === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...items, { ...food, quantity: 1 }]
    })
  }

  // Update cart quantity
  function updateQuantity(foodId, change) {
    setCartItems((items) =>
      items
        .map((item) =>
          item.id === foodId
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  // Change marketplace tab
  function handleTabChange(tab) {
    setActiveTab(tab)
    setSearchTerm('')
    setSelectedCategory('All')
  }

  // Save delivery location
  function saveLocation(event) {
    event.preventDefault()

    if (!locationInput.trim()) return

    const newLocation = locationInput.trim()

    setLocationName(newLocation)
    localStorage.setItem('foodiesLocation', newLocation)
    setIsLocationOpen(false)
  }

  // Login success
  function handleLoginSuccess(account) {
    const user = {
      name: account.name,
      email: account.email,
    }

    setCurrentUser(user)
    localStorage.setItem(
      'foodiesCurrentUser',
      JSON.stringify(user)
    )
    setAuthMode(null)
  }

  // Logout
  function handleLogout() {
    localStorage.removeItem('foodiesCurrentUser')
    setCurrentUser(null)
  }

  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">
        <div className="header-container">

          <a href="#home" className="logo">
            <span className="logo-icon">🍔</span>
            <span className="logo-text">Foodies</span>
          </a>

          {/* LOCATION */}
          <button
            type="button"
            className="location location-button"
            onClick={() => {
              setLocationInput(locationName)
              setIsLocationOpen(true)
            }}
          >
            <span>📍</span>
            <div>
              <small>
                {activeTab === 'Delivery'
                  ? 'Delivering to'
                  : 'Your location'}
              </small>
              <strong>
                {locationName || 'Choose your location'}⌄
              </strong>
            </div>
          </button>

          {/* ACCOUNT AND CART */}
          <div className="header-actions">

            {currentUser ? (
              <>
                <span className="user-welcome">
                  Welcome, <strong>{currentUser.name}</strong>
                </span>

                <button
                  type="button"
                  className="login-btn"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="login-btn"
                  onClick={() => setAuthMode('login')}
                >
                  Log in
                </button>

                <button
                  type="button"
                  className="signup-btn"
                  onClick={() => setAuthMode('signup')}
                >
                  Sign up
                </button>
              </>
            )}

            <button
              type="button"
              className="cart-btn"
              onClick={() => setIsCartOpen(true)}
            >
              🛒 Cart
              <span className="cart-badge">{cartCount}</span>
            </button>

          </div>
        </div>

        {/* MARKETPLACE NAVIGATION */}
        <nav className="marketplace-nav">
          <div className="marketplace-nav-inner">

            {['Delivery', 'Pick-up', 'Restaurants', 'Shops'].map(
              (tab) => (
                <button
                  type="button"
                  key={tab}
                  aria-pressed={activeTab === tab}
                  className={`market-tab ${
                    activeTab === tab ? 'active' : ''
                  }`}
                  onClick={() => handleTabChange(tab)}
                >
                  {tab === 'Delivery' && '🛵 '}
                  {tab === 'Pick-up' && '🥡 '}
                  {tab === 'Restaurants' && '🍽️ '}
                  {tab === 'Shops' && '🛍️ '}
                  {tab}
                </button>
              )
            )}

          </div>
        </nav>
      </header>

      {/* MAIN CONTENT */}
      <main id="home">

        {activeTab === 'Shops' ? (
          <section className="search-section">
            <div className="search-container">

              <div>
                <p className="eyebrow">EXPLORE FOODIES</p>
                <h1>Discover our shops</h1>
                <p className="search-subtitle">
                  Explore everyday products and shops on Foodies.
                </p>
              </div>

              <div className="no-food">
                <span>🛍️</span>
                <h3>Shops coming soon</h3>
                <p>We're preparing our shop listings.</p>

                <button
                  type="button"
                  className="signup-btn"
                  onClick={() => handleTabChange('Delivery')}
                >
                  Explore food
                </button>
              </div>

            </div>
          </section>
        ) : (
          <>
            <section className="search-section">
              <div className="search-container">

                <div>
                  <p className="eyebrow">
                    {activeTab === 'Delivery'
                      ? 'GOOD FOOD, GOOD MOOD'
                      : activeTab === 'Pick-up'
                        ? 'ORDER AHEAD, PICK UP'
                        : 'DISCOVER FOODIES'}
                  </p>

                  <h1>
                    {activeTab === 'Delivery'
                      ? 'What are you craving today?'
                      : activeTab === 'Pick-up'
                        ? 'What would you like to pick up?'
                        : 'Discover delicious food'}
                  </h1>

                  <p className="search-subtitle">
                    {activeTab === 'Delivery'
                      ? 'Discover delicious food and get it delivered to your door.'
                      : activeTab === 'Pick-up'
                        ? 'Find your favorite food and choose the pick-up option.'
                        : 'Explore delicious meals available on Foodies.'}
                  </p>
                </div>

                <div className="search-box">
                  <span>🔍</span>

                  <input
                    type="search"
                    placeholder="Search for pizza, burgers, drinks..."
                    value={searchTerm}
                    onChange={(event) =>
                      setSearchTerm(event.target.value)
                    }
                  />

                  {searchTerm && (
                    <button
                      type="button"
                      onClick={() => setSearchTerm('')}
                      aria-label="Clear search"
                    >
                      
                    </button>
                  )}
                </div>

              </div>
            </section>

            <HomePage
              onAddToCart={addToCart}
              searchTerm={searchTerm}
              activeTab={activeTab}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </>
        )}

      </main>

      {/* FOOTER */}
      <footer className="footer">
        <p>🍔 Foodies</p>
        <p>© 2026 Foodies. All rights reserved.</p>
      </footer>

      {/* LOCATION MODAL */}
      {isLocationOpen && (
        <div
          className="location-backdrop"
          onClick={() => setIsLocationOpen(false)}
        >
          <div
            className="location-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="location-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="auth-close"
              onClick={() => setIsLocationOpen(false)}
              aria-label="Close"
            >
              ×
            </button>

            <span className="location-modal-icon">📍</span>

            <h2 id="location-title">
              Where should we deliver?
            </h2>

            <p>Enter your delivery area or address.</p>

            <form onSubmit={saveLocation}>
              <input
                type="text"
                placeholder="Example: BKK1, Phnom Penh"
                value={locationInput}
                onChange={(event) =>
                  setLocationInput(event.target.value)
                }
                required
              />

              <button type="submit" className="auth-submit">
                Save location
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CART DRAWER */}
      {isCartOpen && (
        <div
          className="cart-backdrop"
          onClick={() => setIsCartOpen(false)}
        >
          <aside
            className="cart-drawer"
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cart-header">
              <h2>Your Cart ({cartCount})</h2>

              <button
                type="button"
                className="close-button"
                onClick={() => setIsCartOpen(false)}
              >
                ×
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="empty-cart">
                <span>🛒</span>
                <p>
                  Your cart is empty.
                  <br />
                  Add something delicious!
                </p>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cartItems.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img src={item.image} alt={item.name} />

                      <div className="cart-item-details">
                        <h3>{item.name}</h3>
                        <p>{item.price}</p>

                        <div className="quantity">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, -1)
                            }
                          >
                            −
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, 1)
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-total">
                  <div className="total">
                    <span>Total</span>
                    <strong>${cartTotal.toFixed(2)}</strong>
                  </div>
                </div>
              </>
            )}
          </aside>
        </div>
      )}

      {/* LOGIN / SIGNUP MODAL */}
      {authMode && (
        <AuthModal
          mode={authMode}
          onClose={() => setAuthMode(null)}
          onSwitch={setAuthMode}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

    </div>
  )
}

export default App
