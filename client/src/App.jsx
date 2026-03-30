import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={
          <div style={{
            display: 'flex', height: '100vh',
            alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', gap: '20px',
            background: '#d4cfc8', fontFamily: "'Barlow Condensed', sans-serif",
          }}>
            <h1 style={{ fontSize: '10rem', fontWeight: 900, color: '#0a0908', lineHeight: 1 }}>404</h1>
            <p style={{ color: '#6b6560', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Page not found</p>
            <a href="/" style={{
              color: '#0a0908', border: '1px solid #0a0908',
              padding: '12px 32px', textDecoration: 'none',
              fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.12em',
              textTransform: 'uppercase', transition: 'all 0.2s',
            }}>← GO HOME</a>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
