import React from 'react'
import './PromoBanner.css'

export function PromoBanner() {
  return (
    <section className="promo-banner">
      <div className="promo-content">
        <h3>Get <span className="promo-percent">20% Off</span></h3>
        <p>On your first order</p>
        <button className="btn btn-primary">Order Now</button>
      </div>
      <div className="promo-image">
        <img
          src="https://cookingwithchefbryan.com/wp-content/uploads/2022/10/Cheese-Burgers-and-French-Fries-scaled.jpg"
          alt="Burger and Fries"
        />
      </div>
    </section>
  )
}


