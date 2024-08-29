import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/Home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="container home-content">
        <h1 className="home-title">Welcome to the E-Commerce Project</h1>
        <p>Your one-stop shop for all your needs!</p>
        <div className="button-container">
          <button className="home-button" onClick={() => navigate('/login')}>Login</button>
          <button className="home-button" onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Home;