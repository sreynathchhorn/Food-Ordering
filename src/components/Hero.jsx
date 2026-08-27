import React from 'react'

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1>
            Delicious food,
            <span className="highlight"> delivered </span>
            with love
          </h1>
          <p>Choose your favorite food from our wide range of delicious meals</p>
          <div className="hero-buttons">
            <button className="btn btn-primary">Order Now</button>
            <button className="btn btn-secondary">Explore Menu</button>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&h=500&fit=crop"
            alt="Delicious Pizza"
          />
        </div>
      </div>
    </section>
  )
}
