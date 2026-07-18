function CartModal({ cart, onClose, onUpdateQuantity, onCheckout }) {
  const subtotal = cart.reduce((sum, entry) => sum + entry.price * entry.quantity, 0)

  return (
    <div className="modal-layer" role="presentation" onMouseDown={onClose}>
      <aside
        aria-labelledby="cart-title"
        aria-modal="true"
        className="cart-drawer"
        role="dialog"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="drawer-header">
          <div>
            <span className="eyebrow">Your order</span>
            <h2 id="cart-title">Shopping cart</h2>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close cart">×</button>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <span aria-hidden="true">🥡</span>
            <h3>Your cart is empty</h3>
            <p>Add something delicious from today’s menu.</p>
            <button type="button" onClick={onClose}>Browse menu</button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((entry) => (
                <div className="cart-item" key={entry.id}>
                  <span className="cart-emoji" aria-hidden="true">{entry.emoji}</span>
                  <div>
                    <h3>{entry.name}</h3>
                    <span>${entry.price.toFixed(2)} each</span>
                    <div className="quantity-control" aria-label={`Quantity for ${entry.name}`}>
                      <button type="button" onClick={() => onUpdateQuantity(entry.id, entry.quantity - 1)}>−</button>
                      <span>{entry.quantity}</span>
                      <button type="button" onClick={() => onUpdateQuantity(entry.id, entry.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <strong>${(entry.price * entry.quantity).toFixed(2)}</strong>
                </div>
              ))}
            </div>
            <div className="drawer-footer">
              <div className="subtotal"><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div>
              <p>Delivery fees are calculated at checkout.</p>
              <button className="primary-button" type="button" onClick={onCheckout}>Continue to checkout</button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}

export default CartModal
