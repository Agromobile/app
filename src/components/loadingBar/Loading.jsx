import './loading.scss';
import logo from '../../assets/small-logo.png';

export default function Loading() {
  return (
    <main className="loading-container">
      <article className="loading-bar">
        <img
          src={logo}
          alt="agromobile small logo"
        />
      </article>
    </main>
  );
}
