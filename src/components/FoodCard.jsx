function FoodCard({ item, onAdd }) {
  return (
    <article className={`food-card ${item.available ? '' : 'sold-out'}`}>
      <div className="food-image" aria-hidden="true">
        <span>{item.emoji}</span>
        {!item.available && <strong>Sold out</strong>}
      </div>
      <div className="food-content">
        <div className="food-title-row">
          <h3>{item.name}</h3>
          <span className="price">${item.price.toFixed(2)}</span>
        </div>
        <p>{item.description}</p>
        <div className="food-footer">
          <div className="tags">
            {item.dietary.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          <button type="button" disabled={!item.available} onClick={() => onAdd(item)}>
            {item.available ? 'Add to cart' : 'Unavailable'}
          </button>
        </div>
      </div>
    </article>
  )
}

export default FoodCard
