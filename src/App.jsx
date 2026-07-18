import { useEffect, useState } from 'react'
import Header from './components/Header'
import MenuGrid from './components/MenuGrid'
import CartModal from './components/CartModal'
import CheckoutForm from './components/CheckoutForm'
import menuItems from './data/menuData.json'
import './App.css'

function App() {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('dapur-cart')) ?? [] }
    catch { return [] }
  })
  const [cartOpen, setCartOpen] = useState(false)
  const [view, setView] = useState('menu')

  useEffect(() => {
    localStorage.setItem('dapur-cart', JSON.stringify(cart))
  }, [cart])

  function addToCart(item) {
    setCart((current) => {
      const existing = current.find((entry) => entry.id === item.id)
      return existing
        ? current.map((entry) => entry.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry)
        : [...current, { ...item, quantity: 1 }]
    })
    setCartOpen(true)
  }

  function updateQuantity(id, quantity) {
    setCart((current) => quantity < 1
      ? current.filter((entry) => entry.id !== id)
      : current.map((entry) => entry.id === id ? { ...entry, quantity } : entry))
  }

  const cartCount = cart.reduce((sum, entry) => sum + entry.quantity, 0)

  if (view === 'checkout') {
    return <CheckoutForm cart={cart} onBack={() => { setView('menu'); setCartOpen(true) }} onComplete={() => setCart([])} />
  }

  return (
    <div id="top">
      <Header cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />
      <main>
        <section className="hero-section">
          <div className="hero-copy">
            <span className="eyebrow">From our kitchen to your table</span>
            <h1>Comfort food,<br /><em>made like home.</em></h1>
            <p>Small-batch Singapore favourites prepared fresh with family recipes and honest ingredients.</p>
            <a className="primary-button" href="#menu">Explore today’s menu</a>
            <div className="hero-notes"><span>✓ Islandwide delivery</span><span>✓ Self-collection</span></div>
          </div>
          <div className="hero-visual" aria-label="A freshly prepared meal">
            <span>🍛</span>
            <div className="hero-sticker"><strong>Made fresh</strong><small>every morning</small></div>
          </div>
        </section>
        <MenuGrid items={menuItems} onAdd={addToCart} />
        <section className="story-section" id="about">
          <span className="story-icon" aria-hidden="true">🏠</span>
          <div><span className="eyebrow">Our little kitchen</span><h2>Good food starts at home.</h2></div>
          <p>Dapur Rumah began with recipes passed down through three generations. Every dish is cooked in small batches, just as we would serve it to our own family.</p>
        </section>
      </main>
      <footer><strong>Dapur Rumah</strong><span>Tue–Fri 11 AM–8 PM · Sat 10 AM–6 PM</span><small>© 2026 Dapur Rumah. Built with care.</small></footer>
      {cartOpen && (
        <CartModal
          cart={cart}
          onClose={() => setCartOpen(false)}
          onUpdateQuantity={updateQuantity}
          onCheckout={() => { setCartOpen(false); setView('checkout') }}
        />
      )}
    </div>
  )
}

export default App
