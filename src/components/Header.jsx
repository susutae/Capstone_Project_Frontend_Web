import { getBusinessStatus, hoursSummary } from '../utils/businessHours'

function Header({ cartCount, onOpenCart }) {
  const status = getBusinessStatus()

  return (
    <>
      <div className={`hours-banner ${status.isOpen ? 'is-open' : ''}`}>
        <span className="status-dot" aria-hidden="true" />
        <span>{status.message}</span>
      </div>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Dapur Rumah home">
          <span className="brand-mark">DR</span>
          <span>
            <strong>Dapur Rumah</strong>
            <small>Home-cooked with heart</small>
          </span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#menu">Menu</a>
          <a href="#about">Our story</a>
          <button className="cart-button" type="button" onClick={onOpenCart}>
            Cart <span>{cartCount}</span>
          </button>
        </nav>
      </header>
      <p className="sr-only">Business hours: {hoursSummary}</p>
    </>
  )
}

export default Header
