import './order_summary.scss';
import { Link } from 'react-router-dom';

export default function OrderSummary() {
  return (
    <main className="summary-page">
      <header className="discount-header">
        <span>
          <strong>Get 10% OFF</strong> your first order!
        </span>
      </header>
      <article>
        <div className="continue-shopping">
          <Link to="#">Continue Shopping</Link>
        </div>
      </article>
    </main>
  );
}
