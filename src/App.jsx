import { useState } from 'react'
import './App.css'
import { HomePage } from './pages/HomePage'

function App() {
  const [cartCount] = useState(0)

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <span className="logo-icon">🍔</span>
            <span className="logo-text">Foodies</span>
          </div>
          <nav className="nav">
            <a href="#home">Home</a>
            <a href="#menu">Menu</a>
            <a href="#cart">Cart</a>
            <a href="#about">About Us</a>
          </nav>
          <button className="cart-btn">
            Cart
            <span className="cart-badge">{cartCount}</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <HomePage />

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2026 Foodies. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
