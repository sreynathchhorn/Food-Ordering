import React from 'react'
import { Hero } from '../components/Hero'
import { PopularCategories } from '../components/PopularCategories'
import { PopularFood } from '../components/PopularFood'
import { PromoBanner } from '../components/PromoBanner'

export function HomePage() {
  return (
    <div className="home-page">
      <Hero />
      <PopularCategories />
      <PopularFood />
      <PromoBanner />
    </div>
  )
}