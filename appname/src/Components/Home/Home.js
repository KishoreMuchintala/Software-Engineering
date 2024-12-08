import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <header className="header">
        <h1>Gaming Verse</h1>
        <p>Get into the universe of gaming!</p>
      </header>

      <section className="products-section">
        <div className="product-list">
          {/* PS5 Section */}
          <div className="product">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/57/PlayStation_5_logo.svg"
              alt="PlayStation 5"
              className="product-image"
            />
            <h3>PlayStation 5</h3>
            <p>Experience the power of the next generation.</p>
          </div>

          {/* Xbox Section */}
          <div className="product">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Xbox_one_logo.svg/1200px-Xbox_one_logo.svg.png"
              alt="Xbox Series X"
              className="product-image"
            />
            <h3>Xbox Series X</h3>
            <p>Unleash the best of Xbox gaming.</p>
          </div>

          {/* PC Section */}
          <div className="product">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/PC_gaming.svg/1200px-PC_gaming.svg.png"
              alt="PC Gaming"
              className="product-image"
            />
            <h3>PC Gaming</h3>
            <p>Master the game with powerful hardware.</p>
          </div>

          {/* Nintendo Section */}
          <div className="product">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Nintendo.svg/1200px-Nintendo.svg.png"
              alt="Nintendo Switch"
              className="product-image"
            />
            <h3>Nintendo Switch</h3>
            <p>Play anywhere, anytime with Nintendo.</p>
          </div>
        </div>
      </section>

      <footer className="footer-section">
        <p></p>
      </footer>
    </div>
  );
};

export default Home;
