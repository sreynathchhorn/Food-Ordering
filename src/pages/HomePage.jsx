
import { Hero } from '../components/Hero'
import { PopularCategories } from '../components/PopularCategories'
import { PopularFood } from '../components/PopularFood'
import { PromoBanner } from '../components/PromoBanner'

export function HomePage({
  onAddToCart,
  searchTerm,
  activeTab,
  selectedCategory,
  onSelectCategory,
}) {
  return (
    <div className="home-page">
      <Hero activeTab={activeTab} />

      <PopularCategories
        activeTab={activeTab}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
      />

      <PopularFood
        activeTab={activeTab}
        onAddToCart={onAddToCart}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
      />

      <PromoBanner />
    </div>
  )
}
