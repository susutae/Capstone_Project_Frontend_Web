import { useState } from 'react'

function CheckoutForm({ cart, onBack, onComplete }) {
  const [fulfilment, setFulfilment] = useState('collection')
  const [submitted, setSubmitted] = useState(false)
  const subtotal = cart.reduce((sum, entry) => sum + entry.price * entry.quantity, 0)
  const deliveryFee = fulfilment === 'delivery' ? 5 : 0

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
    onComplete()
  }

  if (submitted) {
    return (
      <section className="confirmation-card">
        <span aria-hidden="true">✓</span>
        <p className="eyebrow">Order received</p>
        <h2>Thank you!</h2>
        <p>Your demo order has been confirmed. We’ll contact you when it is ready.</p>
        <button className="primary-button" type="button" onClick={() => window.location.reload()}>Back to menu</button>
      </section>
    )
  }

  return (
    <main className="checkout-page">
      <button className="text-button" type="button" onClick={onBack}>← Back to cart</button>
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <span className="eyebrow">Almost there</span>
          <h1>Checkout</h1>
          <fieldset className="fulfilment-toggle">
            <legend>How would you like your order?</legend>
            <label className={fulfilment === 'collection' ? 'selected' : ''}>
              <input type="radio" name="fulfilment" value="collection" checked={fulfilment === 'collection'} onChange={(e) => setFulfilment(e.target.value)} />
              <span><strong>Self-collection</strong><small>Free · 20–30 min</small></span>
            </label>
            <label className={fulfilment === 'delivery' ? 'selected' : ''}>
              <input type="radio" name="fulfilment" value="delivery" checked={fulfilment === 'delivery'} onChange={(e) => setFulfilment(e.target.value)} />
              <span><strong>Delivery</strong><small>$5.00 · 45–60 min</small></span>
            </label>
          </fieldset>
          <div className="form-grid">
            <label>Full name<input required name="name" autoComplete="name" placeholder="e.g. Alex Tan" /></label>
            <label>Phone number<input required name="phone" type="tel" autoComplete="tel" placeholder="e.g. 9123 4567" pattern="[0-9 +()-]{8,}" /></label>
            {fulfilment === 'delivery' && (
              <label className="full-width">Delivery address<textarea required name="address" autoComplete="street-address" rows="3" placeholder="Block, street, unit number and postal code" /></label>
            )}
            <label className="full-width">Order notes <span>(optional)</span><textarea name="notes" rows="3" placeholder="Allergies or special requests" /></label>
          </div>
          <button className="primary-button" type="submit">Place demo order · ${(subtotal + deliveryFee).toFixed(2)}</button>
        </form>
        <aside className="order-summary">
          <h2>Order summary</h2>
          {cart.map((entry) => (
            <div className="summary-row" key={entry.id}><span>{entry.quantity}× {entry.name}</span><strong>${(entry.price * entry.quantity).toFixed(2)}</strong></div>
          ))}
          <hr />
          <div className="summary-row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="summary-row"><span>Delivery</span><span>{deliveryFee ? `$${deliveryFee.toFixed(2)}` : 'Free'}</span></div>
          <div className="summary-row total"><strong>Total</strong><strong>${(subtotal + deliveryFee).toFixed(2)}</strong></div>
        </aside>
      </div>
    </main>
  )
}

export default CheckoutForm
