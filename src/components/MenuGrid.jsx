import { useState } from 'react'
import FoodCard from './FoodCard'

function MenuGrid({ items, onAdd }) {
  const categories = ['All', ...new Set(items.map((item) => item.category))]
  const [activeCategory, setActiveCategory] = useState('All')
  const filteredItems = activeCategory === 'All'
    ? items
    : items.filter((item) => item.category === activeCategory)

  return (
    <section className="menu-section" id="menu">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Freshly made in small batches</span>
          <h2>Today’s menu</h2>
        </div>
        <p>Availability is updated throughout the day.</p>
      </div>
      <div className="category-tabs" aria-label="Filter menu by category">
        {categories.map((category) => (
          <button
            className={activeCategory === category ? 'active' : ''}
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="menu-grid">
        {filteredItems.map((item) => (
          <FoodCard item={item} key={item.id} onAdd={onAdd} />
        ))}
      </div>
    </section>
  )
}

export default MenuGrid
